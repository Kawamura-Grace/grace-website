// メール登録APIエンドポイント
// 処理順: zodバリデーション → reCAPTCHA v3 スコア検証 → 登録処理
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const schema = z.object({
  email: z.string().email(),
  recaptchaToken: z.string().optional(),
})

// reCAPTCHA v3 スコア検証（未設定時は 1.0 として通過）
async function verifyRecaptcha(token: string): Promise<number> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return 1.0
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`,
  })
  const json = await res.json() as { success: boolean; score: number }
  return json.success ? (json.score ?? 0) : 0
}

export async function POST(request: NextRequest) {
  try {
    // JSONパース
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ message: '不正なリクエスト' }, { status: 400 })
    }

    // バリデーション
    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ message: '入力エラー' }, { status: 422 })
    }

    const { email, recaptchaToken } = result.data

    // reCAPTCHA v3 スコア検証
    let score = 1.0
    if (recaptchaToken) {
      score = await verifyRecaptcha(recaptchaToken)
    }
    const flagged = score < 0.5

    // TODO: Notion メーリングリストDB または外部メール配信サービスへの登録
    console.log('[subscribe]', { email, score, flagged })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[subscribe] error:', error)
    return NextResponse.json({ message: 'サーバーエラー' }, { status: 500 })
  }
}
