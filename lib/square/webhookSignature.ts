// Square Webhook署名検証（inventory.count.updated等の受信確認）
//
// 仕様（2026-08-31 Square公式ドキュメント developer.squareup.com/docs/webhooks/step3validate で一次確認済み）：
// - 署名は `x-square-hmacsha256-signature` ヘッダーで送られる
// - 署名対象は「通知URL（Square Developer Consoleに登録したWebhook URLそのもの）＋リクエストのraw body」
// - アルゴリズムはHMAC-SHA256、鍵はWebhookサブスクリプションのSignature Key
// - 比較はタイミング攻撃対策のため定数時間比較を使う（Node標準のcrypto.timingSafeEqualを使用）

import { createHmac, timingSafeEqual } from 'crypto'

/**
 * @param rawBody リクエストボディの生文字列（JSON.parse前のもの。署名はraw bodyに対して計算されるため必須）
 * @param signatureHeader `x-square-hmacsha256-signature` ヘッダーの値
 * @param notificationUrl Square Developer Consoleに登録したWebhook通知URL（末尾スラッシュ等も完全一致させること）
 * @param signatureKey Square Developer ConsoleのWebhookサブスクリプションのSignature Key
 */
export function verifySquareSignature(
  rawBody: string,
  signatureHeader: string | null,
  notificationUrl: string,
  signatureKey: string
): boolean {
  if (!signatureHeader) return false

  const hmac = createHmac('sha256', signatureKey)
  hmac.update(notificationUrl + rawBody)
  const expected = hmac.digest('base64')

  const expectedBuf = Buffer.from(expected)
  const actualBuf = Buffer.from(signatureHeader)

  // 長さが違うとtimingSafeEqualが例外を投げるため先にチェック
  if (expectedBuf.length !== actualBuf.length) return false

  return timingSafeEqual(expectedBuf, actualBuf)
}
