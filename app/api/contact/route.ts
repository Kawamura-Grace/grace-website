// お問い合わせAPIエンドポイント — Notionへの記録 + Resendでメール通知
import { NextRequest, NextResponse } from 'next/server'
import { notion, DB_IDS } from '@/lib/notion/client'
import { Resend } from 'resend'
import { z } from 'zod'

// ─── バリデーションスキーマ（ContactForm側と同一）───
const schema = z.object({
  category:  z.enum(['取材', '法人ギフト', '卸', '採用', 'EC関連', 'メディア掲載', 'インフルエンサー提携', 'その他']),
  name:      z.string().min(1).max(50),
  company:   z.string().max(100).optional(),
  email:     z.string().email(),
  phone:     z.string().max(20).optional(),
  message:   z.string().min(10).max(2000),
  privacy:   z.boolean().refine(v => v === true),
  website:   z.string().max(0).optional(), // ハニーポット
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
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

    // ハニーポット: 値があればスパムとして無視（200を返してbotを誤魔化す）
    if (data.website) {
      return NextResponse.json({ ok: true })
    }

    // ─── Notionに記録 ───
    try {
      await notion.pages.create({
        parent: { database_id: DB_IDS.CONTACTS },
        properties: {
          '送信者名': { title: [{ text: { content: data.name } }] },
          'メール':   { email: data.email },
          'カテゴリ': { select: { name: data.category } },
          'ステータス': { select: { name: '未返信' } },
          ...(data.company  ? { '会社名':   { rich_text: [{ text: { content: data.company } }] } } : {}),
          ...(data.phone    ? { '電話番号': { phone_number: data.phone } } : {}),
          'メッセージ': { rich_text: [{ text: { content: data.message } }] },
        },
      })
    } catch (notionError) {
      // Notion記録失敗は致命的エラーとして扱う（ロストを防ぐため）
      console.error('[Contact API] Notion記録エラー:', notionError)
      return NextResponse.json({ message: '送信に失敗しました。しばらく経ってからお試しください。' }, { status: 500 })
    }

    // ─── 運営へのメール通知（失敗しても送信成功として返す）───
    if (process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL) {
      resend.emails.send({
        from:    'Grace Website <noreply@grace-patisserie.jp>',
        to:      process.env.NOTIFY_EMAIL,
        subject: `[お問い合わせ] ${data.category} — ${data.name}様`,
        text: [
          `カテゴリ: ${data.category}`,
          `お名前: ${data.name}`,
          data.company ? `会社名: ${data.company}` : '',
          `メール: ${data.email}`,
          data.phone ? `電話: ${data.phone}` : '',
          '',
          '──────────',
          data.message,
          '──────────',
          '',
          'このメールはGrace WebサイトからのAuto Notificationです。',
        ].filter(Boolean).join('\n'),
      }).catch(err => {
        console.error('[Contact API] メール通知エラー:', err)
      })
    }

    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error('[Contact API] 予期しないエラー:', error)
    return NextResponse.json({ message: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}
