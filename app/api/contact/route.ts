// お問い合わせAPIエンドポイント
// 処理順: ハニーポット検証 → zodバリデーション → Notion記録 → 代表宛メール → 自動返信メール
import { NextRequest, NextResponse } from 'next/server'
import { notion, DB_IDS } from '@/lib/notion/client'
import { Resend } from 'resend'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

// ─── バリデーションスキーマ（ContactForm側と同一） ───
const schema = z.object({
  category:     z.enum(['取材', '法人ギフト', '卸', '採用', 'EC関連', 'メディア掲載', 'インフルエンサー提携', 'その他']),
  name:         z.string().min(1).max(50),
  company:      z.string().max(100).optional(),
  email:        z.string().email(),
  phone:        z.string().max(20).optional(),
  message:      z.string().min(10).max(2000),
  privacyAgreed: z.literal(true),
  website:      z.string().max(0).optional(), // ハニーポット
})

export async function POST(request: NextRequest) {
  // Resendインスタンスはリクエスト時に生成（ビルド時のenv未設定エラーを防ぐ）
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

  try {
    // JSONパース
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ message: 'リクエスト形式が不正です' }, { status: 400 })
    }

    // バリデーション
    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { message: '入力内容に誤りがあります', errors: result.error.flatten() },
        { status: 422 }
      )
    }

    const data = result.data

    // ハニーポット検証: 値があればスパムとして無視（200を返してbotを誤魔化す）
    if (data.website) {
      return NextResponse.json({ ok: true })
    }

    // ─── Notion ContactDB に記録 ───
    if (process.env.NOTION_TOKEN) {
      try {
        await notion.pages.create({
          parent: { database_id: DB_IDS.CONTACTS },
          properties: {
            '送信者名':  { title: [{ text: { content: data.name } }] },
            'メール':    { email: data.email },
            'カテゴリ':  { select: { name: data.category } },
            'ステータス': { select: { name: '未返信' } },
            ...(data.company ? { '会社名':   { rich_text: [{ text: { content: data.company } }] } } : {}),
            ...(data.phone   ? { '電話番号': { phone_number: data.phone } } : {}),
            'メッセージ': { rich_text: [{ text: { content: data.message } }] },
          },
        })
      } catch (notionError) {
        // Notion記録失敗は致命的エラー（問い合わせロストを防ぐ）
        console.error('[Contact API] Notion記録エラー:', notionError)
        return NextResponse.json(
          { message: '送信に失敗しました。しばらく経ってからお試しください。' },
          { status: 500 }
        )
      }
    } else {
      // NOTION_TOKEN 未設定の場合はスキップ（開発環境対応）
      console.log('[contact] NOTION_TOKEN未設定のためNotion記録スキップ')
    }

    // ─── 代表宛メール通知（失敗しても送信成功として返す） ───
    if (resend) {
      resend.emails.send({
        from:    'noreply@grace-patisserie.jp',
        to:      'kawamura@grace-foods.com',
        subject: `【Grace HP】新規お問合せ: ${data.category}`,
        text: [
          `${data.name} 様${data.company ? `（${data.company}）` : ''}からのお問い合わせ`,
          `メール: ${data.email}`,
          data.phone ? `電話: ${data.phone}` : '',
          '',
          '内容:',
          data.message,
        ].filter(Boolean).join('\n'),
      }).catch((err: Error) => {
        console.error('[Contact API] 代表宛メール送信エラー:', err)
      })
    } else {
      console.log('[contact] RESEND_API_KEY未設定のためメール送信スキップ')
    }

    // ─── 送信者への自動返信メール（失敗しても送信成功として返す） ───
    if (resend) {
      // メッセージ本文は先頭200文字に制限
      const messagePreview = data.message.slice(0, 200) + (data.message.length > 200 ? '...' : '')

      resend.emails.send({
        from:    'noreply@grace-patisserie.jp',
        to:      data.email,
        subject: '【Grace】お問合せを承りました',
        text: [
          `${data.name} 様`,
          '',
          'このたびはGraceへお問合せをいただき、誠にありがとうございます。',
          'スタッフより、3営業日以内にご返信させていただきます。',
          '',
          'お問い合わせ内容：',
          messagePreview,
          '',
          '──────────────────────',
          '株式会社Grace Foods',
          'パティスリー Grace',
          '愛知県春日井市朝宮町1-2-6',
          '──────────────────────',
        ].join('\n'),
      }).catch((err: Error) => {
        console.error('[Contact API] 自動返信メール送信エラー:', err)
      })
    }

    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error('[Contact API] 予期しないエラー:', error)
    return NextResponse.json({ message: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}
