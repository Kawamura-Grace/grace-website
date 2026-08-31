// メール登録APIエンドポイント
// 処理順: zodバリデーション → reCAPTCHA v3 スコア検証 → Square顧客作成
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const schema = z.object({
  email: z.string().email(),
  recaptchaToken: z.string().optional(),
})

// --- Square API レスポンス型定義 ---

interface SquareCustomer {
  id: string
  email_address?: string
}

interface SquareSearchResponse {
  customers?: SquareCustomer[]
  errors?: SquareError[]
}

interface SquareCreateResponse {
  customer?: SquareCustomer
  errors?: SquareError[]
}

interface SquareError {
  category: string
  code: string
  detail?: string
}

// --- reCAPTCHA v3 スコア検証（未設定時は 1.0 として通過） ---

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

// --- Square顧客検索（メールアドレス重複チェック） ---

async function searchSquareCustomer(
  email: string,
  accessToken: string
): Promise<string | null> {
  const res = await fetch('https://connect.squareup.com/v2/customers/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Square-Version': '2024-01-17',
    },
    body: JSON.stringify({
      query: {
        filter: {
          email_address: { exact: email },
        },
      },
    }),
  })
  const json = await res.json() as SquareSearchResponse
  const customers = json.customers ?? []
  return customers.length > 0 ? (customers[0].id) : null
}

// --- Square顧客作成 ---

async function createSquareCustomer(
  email: string,
  accessToken: string
): Promise<string> {
  const res = await fetch('https://connect.squareup.com/v2/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Square-Version': '2024-01-17',
    },
    body: JSON.stringify({
      email_address: email,
      note: 'オープン通知登録',
      reference_id: 'open-notice',
    }),
  })
  const json = await res.json() as SquareCreateResponse
  if (!json.customer?.id) {
    const detail = json.errors?.[0]?.detail ?? 'unknown'
    throw new Error(`Square顧客作成失敗: ${detail}`)
  }
  return json.customer.id
}

// --- Squareグループ付与（補助的操作・失敗しても全体をエラーにしない） ---

async function addCustomerToGroup(
  customerId: string,
  groupId: string,
  accessToken: string
): Promise<void> {
  const res = await fetch(
    `https://connect.squareup.com/v2/customers/${customerId}/groups/${groupId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Square-Version': '2024-01-17',
      },
    }
  )
  if (!res.ok) {
    const text = await res.text()
    console.warn(`[subscribe] グループ付与失敗（非致命的）: ${res.status} ${text}`)
  }
}

// --- POST ハンドラ ---

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

    // reCAPTCHA v3 スコア検証（score < 0.5 はflaggedとして記録するが登録は継続）
    let score = 1.0
    if (recaptchaToken) {
      score = await verifyRecaptcha(recaptchaToken)
    }
    const flagged = score < 0.5

    // [廃止] Notion登録者DB（41dedea8）への記録 - Square移行後に削除予定
    // await notion.pages.create({ parent: { database_id: '41dedea8...' }, ... })

    // Square未設定チェック（Preview / Development 環境ではフォールバック）
    const accessToken = process.env.SQUARE_ACCESS_TOKEN
    if (!accessToken) {
      console.log('[subscribe] Square未設定（フォールバック）:', { email, score, flagged })
      return NextResponse.json({ ok: true })
    }

    // Square顧客検索（メールアドレス重複チェック）
    const existingId = await searchSquareCustomer(email, accessToken)
    if (existingId !== null) {
      console.log('[subscribe] 既存顧客（重複）:', { email, customerId: existingId, score, flagged })
      return NextResponse.json({ ok: true, duplicate: true })
    }

    // Square顧客作成
    const customerId = await createSquareCustomer(email, accessToken)
    console.log('[subscribe] 顧客作成完了:', { email, customerId, score, flagged })

    // Squareグループ付与（SQUARE_OPEN_NOTICE_GROUP_ID が設定されている場合のみ）
    const groupId = process.env.SQUARE_OPEN_NOTICE_GROUP_ID
    if (groupId) {
      await addCustomerToGroup(customerId, groupId, accessToken)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[subscribe] error:', error)
    return NextResponse.json({ message: 'サーバーエラー' }, { status: 500 })
  }
}
