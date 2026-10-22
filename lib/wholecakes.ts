// ホールケーキ5品の掲載（予約サイトへ案内する静的リスト）。
// 価格・アレルギー情報は載せない（2026-10-22決裁）。サイズ・お値段は予約サイトで確認してもらう。
// 写真は public/photos/whole_*.jpg（1500x2000）。説明文は予約サイトの商品説明（2026-10-23取得）にそろえた。アレルゲン・保存方法・消費期限・価格は載せない。
export interface WholeCake {
  id: string
  name: string
  description: string
  image: string
}

export const WHOLE_CAKES: WholeCake[] = [
  { id: 'strawberry', name: '苺のデコレーション',     description: '本和香糖を使った、やわらかく優しい甘さのスポンジの間に、生クリームといちごをはさんだデコレーションケーキです。', image: '/photos/whole_strawberry.jpg' },
  { id: 'fruit',      name: 'フルーツデコレーション', description: '本和香糖を使った優しい甘さのスポンジに、生クリームといちごをはさみ、上にはさまざまな旬のフルーツを飾ったデコレーションケーキです。', image: '/photos/whole_fruit.jpg' },
  { id: 'gateau',     name: 'ガトーショコラ',         description: 'カカオ分60%のチョコレートを使って、しっとりと焼き上げた生地に、生クリームをたっぷりと添えたガトーショコラです。', image: '/photos/whole_gateau.jpg' },
  { id: 'rare',       name: 'レアチーズケーキ',       description: 'やわらかく焼き上げたチーズケーキの上に、軽いクリームを重ねたケーキです。', image: '/photos/whole_rare.jpg' },
  { id: 'choco',      name: 'チョコレートケーキ ホール', description: 'ココア生地にチョコレートクリームをはさみ、マーブル模様のガナッシュで仕上げたケーキです。隠し味に、チョコレートと相性のよい、塩味を少し効かせたヘーゼルナッツのプラリネを使用しています。', image: '/photos/whole_choco.jpg' },
]
