// 表示フラグ（サイト全体の出し分け）
//
// SHOW_PRODUCT_DETAIL：商品ごとの詳しいページ（/sweets/[slug]）と、そこへのリンクを出すか。
//   false の間は /sweets は「商品名と写真だけの一覧」になり、/sweets/[slug] は 404、
//   sitemap にも載せず、Journal の関連商品もリンクなしにする（2026-10-13 河村決裁：価格・アレルゲンは載せない）。
//   開くときは、先に価格の扱い・アレルゲン表示（食品表示の確認）・特商法ページの文言を決めること。
export const SHOW_PRODUCT_DETAIL: boolean = false
