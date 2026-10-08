// Square Webhook受信エンドポイント（inventory.count.updated → ISRキャッシュの即時再検証）
//
// Square Developer ConsoleのWebhookサブスクリプションにこのURLを登録し、
// イベント種別「inventory.count.updated」を選択することで、店頭・EC・取り置きの
// 在庫が動いた瞬間にHP側の表示を最新化できる（Square側で1分キャッシュのため、
// このWebhookが無くても最大1分遅れで自動的に追従する＝Webhook登録は必須ではなく高速化のための任意設定）。
//
// 登録手順は河村さん向けの手順書（レポート参照）にまとめてある。

import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { verifySquareSignature } from '@/lib/square/webhookSignature'

export async function POST(request: NextRequest) {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY
  const notificationUrl = process.env.SQUARE_WEBHOOK_NOTIFICATION_URL

  if (!signatureKey || !notificationUrl) {
    console.error('[webhooks/square] SQUARE_WEBHOOK_SIGNATURE_KEY / SQUARE_WEBHOOK_NOTIFICATION_URL が未設定です')
    return NextResponse.json({ error: 'not configured' }, { status: 503 })
  }

  // 署名はraw bodyに対して計算されるため、JSON.parseする前に文字列のまま取得する
  const rawBody = await request.text()
  const signature = request.headers.get('x-square-hmacsha256-signature')

  if (!verifySquareSignature(rawBody, signature, notificationUrl, signatureKey)) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 401 })
  }

  let event: { type?: string }
  try {
    event = JSON.parse(rawBody) as { type?: string }
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  if (event.type === 'inventory.count.updated') {
    revalidatePath('/', 'layout')
    revalidatePath('/sweets', 'layout')
  }

  // Squareはタイムアウトに敏感なため、処理内容によらず即座に200を返す
  return NextResponse.json({ received: true })
}
