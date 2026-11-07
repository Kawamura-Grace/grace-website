// オンラインショップ（Square Online・EC TOP）への案内。トップ・フッター・/gift のリンク先はこのファイルで管理する。
// 注意：特商法ページ app/terms/page.tsx の「ウェブサイトURL」欄にも同じURLを直書きしている。URLを変えるときは2か所を直す。
// 公開日の記録：2026-11-07 にECを公開。公開後に実機で確認した実URLは https://grace-patisserie.square.site
//       （公開前に管理画面の表示から推定していた別のURLは使われなかった）。
// 経緯：Notion「EC構築（Square Online アカウント・商品ページ）」2026-08-19 河村決裁（独自ドメインを取得するまでは
//       無料サブドメインで運用）／同「Square Online プラスプラン契約」の備考（EC TOPと予約専用の2サイト構成）。
// 2026-11-05 河村決定：Squareプラスは今は契約しない（12月にECの実績を見て再判断）。当面は独自ドメイン
//       shop.grace-patisserie.jp を使わず、このURLで運用する。
// 注意：ホールケーキ予約サイト（lib/reservation.ts の RESERVATION_URL＝grace-hallcake-reserve.square.site）とは別のサイト。取り違えないこと。
export const ONLINE_SHOP_URL = 'https://grace-patisserie.square.site'
export const ONLINE_SHOP_LABEL = 'オンラインショップを見る'
