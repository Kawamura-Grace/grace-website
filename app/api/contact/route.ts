// お問い合わせAPIエンドポイント
// 処理順: zodバリデーション → ハニーポット検証 → reCAPTCHA検証 → Notion記録 → 代表宛メール → 自動返信メール（検証を通った場合のみ）
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
  recaptchaToken: z.string().optional(),       // reCAPTCHA v3 トークン
})

// reCAPTCHA v3 検証。true のときだけ自動返信を送る。
// RECAPTCHA_SECRET_KEY 未設定時は検証しない（true）。
// 設定時は、トークン無し・通信失敗・検証失敗・低スコア・action不一致をすべて false にする。
const RECAPTCHA_ACTION = 'contact' // ContactForm.tsx の execute で指定する action と同じ値
const RECAPTCHA_MIN_SCORE = 0.5

async function verifyRecaptcha(token: string | undefined): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return true
  if (!token) return false
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(5000), // 応答が無くても問い合わせの受付を止めない
    })
    if (!res.ok) {
      console.error('[Contact API] reCAPTCHA検証APIエラー:', res.status)
      return false
    }
    const json = await res.json() as { success?: boolean; score?: number; action?: string }
    return (
      json.success === true &&
      json.action === RECAPTCHA_ACTION &&
      (json.score ?? 0) >= RECAPTCHA_MIN_SCORE
    )
  } catch (error) {
    // 通信失敗・不正な応答でも例外にせず、要確認として受け付ける
    console.error('[Contact API] reCAPTCHA検証エラー:', error)
    return false
  }
}

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

    // reCAPTCHA v3 検証（通らなくても拒否はしない。Notion記録と店舗宛通知は行い、
    // 対応状態を「要確認」にして自動返信だけ止める）
    const isVerified = await verifyRecaptcha(data.recaptchaToken)

    // ─── Notion ContactDB に記録 ───
    if (process.env.NOTION_TOKEN) {
      try {
        await notion.pages.create({
          parent: { database_id: DB_IDS.CONTACTS },
          properties: {
            // 件名 が title型（DBの主キー）
            '件名':       { title: [{ text: { content: `[${data.category}] ${data.name}` } }] },
            'メール':     { email: data.email },
            '送信者名':   { rich_text: [{ text: { content: data.name } }] },
            '分類':       { select: { name: data.category } },
            '対応状態':   { select: { name: isVerified ? '未返信' : '要確認' } },
            '本文':       { rich_text: [{ text: { content: data.message } }] },
            ...(data.company ? { '会社名': { rich_text: [{ text: { content: data.company } }] } } : {}),
            ...(data.phone   ? { '電話':   { phone_number: data.phone } } : {}),
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

    // ─── メール送信（Promise.allでawaitし、serverless function終了前に完了させる） ───
    if (resend) {
      const from = process.env.CONTACT_EMAIL_FROM ?? 'onboarding@resend.dev'
      const staffTo = process.env.CONTACT_EMAIL_TO ?? 'info@grace-foods.com'
      // Resend SDK v4 は送信失敗を例外ではなく { error } で返すため、ここでログに出す
      const logResult = (label: string) => (res: { error: unknown }) => {
        if (res.error) console.error(`[Contact API] ${label}送信エラー:`, res.error)
      }
      // 代表宛通知
      const sendStaffNotice = () =>
        resend.emails.send({
          from,
          to:      staffTo,
          // 通知メールに返信すると、お問い合わせしたお客様に届く
          replyTo: data.email,
          // 件名に送信者名を入れ、Gmailで問い合わせごとに別スレッドになるようにする（改行は除去）
          subject: `【Grace HP】新規お問合せ: ${data.category}／${data.name.replace(/[\r\n]+/g, ' ').slice(0, 40)} 様`,
          text: [
            `${data.name} 様${data.company ? `（${data.company}）` : ''}からのお問い合わせ`,
            `メール: ${data.email}`,
            data.phone ? `電話: ${data.phone}` : '',
            '',
            '内容:',
            data.message,
          ].filter(Boolean).join('\n'),
        }).then(logResult('代表宛メール')).catch((err: Error) => {
          console.error('[Contact API] 代表宛メール送信エラー:', err)
        })

      // 送信者への自動返信
      // 宛先は入力されたアドレスのため、利用者が自由に入力した内容（氏名・本文など）は載せず定型文のみにする
      const sendAutoReply = () =>
        resend.emails.send({
          from,
          to:      data.email,
          // 自動返信にお客様が返信すると、店の受付アドレスに届く（送信元ドメインは受信できないため）
          replyTo: staffTo,
          subject: '【Grace】お問合せを承りました',
          text: [
            'お客様',
            '',
            'このたびはGraceへお問合せをいただき、誠にありがとうございます。',
            'スタッフより、3営業日以内にご返信させていただきます。',
            '',
            '──────────────────────',
            '株式会社Grace Foods',
            'Grace PÂTISSERIE グレイス',
            '愛知県春日井市朝宮町1-2-6',
            '──────────────────────',
          ].join('\n'),
        }).then(logResult('自動返信メール')).catch((err: Error) => {
          console.error('[Contact API] 自動返信メール送信エラー:', err)
        })

      await Promise.all([
        sendStaffNotice(),
        ...(isVerified ? [sendAutoReply()] : []),
      ])
    } else {
      console.log('[contact] RESEND_API_KEY未設定のためメール送信スキップ')
    }

    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error('[Contact API] 予期しないエラー:', error)
    return NextResponse.json({ message: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}
