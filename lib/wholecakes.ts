// ホールケーキ5品の掲載（予約サイトへ案内する静的リスト）。
// 価格・アレルギー情報は載せない（2026-10-22決裁）。サイズ・お値段は予約サイトで確認してもらう。
// 写真は public/photos/whole_*.jpg（1500x2000）。説明文は案（予約サイトの商品説明と突き合わせて確定する）。
export interface WholeCake {
  id: string
  name: string
  description: string
  image: string
}

export const WHOLE_CAKES: WholeCake[] = [
  { id: 'strawberry', name: '苺のデコレーション',     description: 'スポンジとクリームに、苺を飾ったホールケーキ。', image: '/photos/whole_strawberry.jpg' },
  { id: 'fruit',      name: 'フルーツデコレーション', description: 'スポンジとクリームに、フルーツを盛ったホールケーキ。', image: '/photos/whole_fruit.jpg' },
  { id: 'gateau',     name: 'ガトーショコラ',         description: 'しっとり焼き上げたチョコレートのケーキ。', image: '/photos/whole_gateau.jpg' },
  { id: 'rare',       name: 'レアチーズケーキ',       description: 'なめらかなチーズのケーキ。', image: '/photos/whole_rare.jpg' },
  { id: 'choco',      name: 'チョコレートケーキ',     description: 'チョコレートのクリームで仕上げたホールケーキ。', image: '/photos/whole_choco.jpg' },
]
