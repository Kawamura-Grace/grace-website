// ホールケーキ予約サイト（Square Online）への案内。
// リンクの出し入れはこのファイルだけで管理する（Footer・/shop・トップのギフト欄が使う）。
//
// 表示スイッチ：環境変数 NEXT_PUBLIC_SHOW_HALLCAKE_RESERVE を 'true' にしたときだけリンクを出す。
//   未設定・それ以外＝非表示。予約サイトが公開されるまではリンク先が404になるため、
//   予約サイトを公開してから Vercel の環境変数を 'true' にして再デプロイする（コード変更は不要）。
//   NEXT_PUBLIC_ の値はビルド時に埋め込まれるため、変更後は再デプロイが必要。
export const SHOW_HALLCAKE_RESERVE: boolean =
  process.env.NEXT_PUBLIC_SHOW_HALLCAKE_RESERVE === 'true'

export const RESERVATION_URL = 'https://grace-hallcake-reserve.square.site'
// 【クリスマス期間限定・2026-11-11 河村決定・12月末に戻す】
// 予約サイトは、URLに店舗（ロケーション）の指定が無いと通常店舗が選ばれ、クリスマスケーキのカテゴリが出ない（2026-11-11 実機で再現）。
// HPから予約サイトへ入るリンクは、ナビ・本文・フッターすべてこの RESERVATION_ENTRY_URL を使い、クリスマス専用店舗を選んだ状態で開く。
// 戻すとき：RESERVATION_LOCATION_QUERY を '' （空文字）にするだけ。リンクは元の RESERVATION_URL と同じ値に戻る。
// 注意：特商法ページ（RESERVATION_LEGAL_URL）と /christmas の XMAS_RESERVE_URL（lib/christmas.ts）はこの定数を使わない。
export const RESERVATION_LOCATION_QUERY = '/?location=LJGYR5RMH5BHF'
export const RESERVATION_ENTRY_URL = `${RESERVATION_URL}${RESERVATION_LOCATION_QUERY}`
export const RESERVATION_LABEL = 'ホールケーキのご予約'
// 予約サイト側の「特定商取引法に基づく表記」ページ（2026-11-07 実際に開いて確認。タイトル「特定商取引法に基づく表記 | ホールケーキのご予約」）。
// HPの /terms はオンラインストア（配送販売）用の表のため、クリスマスケーキ・ホールケーキのご予約はこちらへ案内する（/terms と /christmas が使う）。
// 経緯：05_法務・登記/_作業ログ/2026-11-07_クリスマス予約_特商法表示の確認.md F1-a・F1-b・F2
export const RESERVATION_LEGAL_URL = `${RESERVATION_URL}/s/transaction-policy`
export const RESERVATION_LEGAL_LABEL = '特定商取引法に基づく表記'
// 受付の条件（予約サイトの特定商取引法表記「申込みの有効期限」と同じ内容）
export const RESERVATION_NOTE = 'お受け取り希望日の3暦日前の19:30までにご予約ください（例：土曜日のお受け取りは水曜日の19:30まで）。店頭でのお受け取りです。'
