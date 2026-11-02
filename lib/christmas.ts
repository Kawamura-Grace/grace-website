// クリスマスケーキ予約の案内（トップのバナー用）。2026-11-02 追加
// 予約サイトの直リンク（店舗選択なしでクリスマス店舗に入る）。ホールケーキ用の RESERVATION_URL とは別
export const XMAS_RESERVE_URL = 'https://grace-hallcake-reserve.square.site/?location=LJGYR5RMH5BHF'

// バナーの表示スイッチ。受付終了後は false にする（受付は受取日の3日前19:30まで。最終は12/22 19:30）
export const SHOW_XMAS_BANNER = true

// 掲載する3品（売価・上限数・アレルゲンは載せない：2026-10-22決裁）
// name の「|」は、バナーで語の途中で改行しないための区切り位置（表示では消える）
export const XMAS_ITEMS = [
  { name: '苺の|クリスマスケーキ', src: '/photos/xmas_strawberry.webp' },
  { name: 'ブッシュドノエル', src: '/photos/xmas_buche.webp' },
  { name: '苺とピスタチオの|クリスマス|ミルフィーユ', src: '/photos/xmas_millefeuille.webp' },
] as const

// ===== 紹介ページ（/christmas）用 =====
// 売価は河村さんの今回の指示（2026-11-02）による例外。サイト全体は価格を載せない方針（2026-10-13）だが、このページだけ載せる。
// 出典：08_商品・製造/_作業ログ/2026-11-01_クリスマス3品_仕様と原価計算.md 冒頭の表（売価・税込・確定）
// 説明文：03_マーケティング・販促/_作業ログ/2026-11-02_クリスマス予約開始_告知確定版.md
export const XMAS_DETAILS = [
  {
    name: '苺のクリスマスケーキ',
    src: '/photos/xmas_strawberry.webp',
    text: 'スポンジの間に5mmにスライスした苺をはさみ、クリームで仕上げました。',
    sizes: [
      { label: '5号（直径15cm）', price: '6,900円' },
      { label: '6号（直径18cm）', price: '7,900円' },
      { label: '7号（直径21cm）', price: '8,900円' },
    ],
  },
  {
    name: 'ブッシュドノエル',
    src: '/photos/xmas_buche.webp',
    text: 'アールグレイとミルクチョコレートのロール生地に、オレンジとバナナを合わせています。',
    sizes: [{ label: '18×10cm', price: '7,900円' }],
  },
  {
    name: '苺とピスタチオのクリスマスミルフィーユ',
    src: '/photos/xmas_millefeuille.webp',
    text: '3枚のパイの間に、ピスタチオのクリームと半分に切った苺を重ねました。',
    sizes: [{ label: '10×18cm', price: '11,000円' }],
  },
] as const

// 受取日ごとの予約締切（受取日の3日前の19:30）
export const XMAS_DEADLINES = [
  { pickup: '12月22日（火）', deadline: '12月19日（土）19:30' },
  { pickup: '12月23日（水）', deadline: '12月20日（日）19:30' },
  { pickup: '12月24日（木）', deadline: '12月21日（月）19:30' },
  { pickup: '12月25日（金）', deadline: '12月22日（火）19:30' },
] as const
