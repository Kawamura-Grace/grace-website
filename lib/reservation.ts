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
export const RESERVATION_LABEL = 'ホールケーキのご予約'
// 受付の条件（予約サイトの特定商取引法表記「申込みの有効期限」と同じ内容）
export const RESERVATION_NOTE = 'お受け取り希望日の3日前 19:30までのご予約で、店頭でのお受け取りです。'
