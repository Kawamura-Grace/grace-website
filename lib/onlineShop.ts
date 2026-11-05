// オンラインショップ（Square Online・EC TOP）への案内。トップ・フッター・/gift のリンク先はこのファイルで管理する。
// 注意：特商法ページ app/terms/page.tsx の「ウェブサイトURL」欄にも同じURLを直書きしている。URLを変えるときは2か所を直す。
// 出典：Notion「EC構築（Square Online アカウント・商品ページ）」2026-08-19 河村決裁（独自ドメインを取得するまでは
//       無料サブドメイン grace-106312.square.site で運用）／同「Square Online プラスプラン契約」の備考
//       （EC TOP＝grace-106312.square.site、予約専用＝grace-hallcake-reserve.square.site の2サイト）。
// 2026-11-05 河村決定：Squareプラスは今は契約しない（12月にECの実績を見て再判断）。当面は独自ドメイン
//       shop.grace-patisserie.jp を使わず、このURLで運用する。
// 注意：ホールケーキ予約サイト（lib/reservation.ts の RESERVATION_URL）とは別のサイト。取り違えないこと。
export const ONLINE_SHOP_URL = 'https://grace-106312.square.site'
export const ONLINE_SHOP_LABEL = 'オンラインショップを見る'
