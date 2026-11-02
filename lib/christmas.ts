// クリスマスケーキ予約の案内（トップのバナー用）。2026-11-02 追加
// 予約サイトの直リンク（店舗選択なしでクリスマス店舗に入る）。ホールケーキ用の RESERVATION_URL とは別
export const XMAS_RESERVE_URL = 'https://grace-hallcake-reserve.square.site/?location=LJGYR5RMH5BHF'

// バナーの表示スイッチ。受付終了後は false にする（受付は受取日の3日前19:30まで。最終は12/22 19:30）
export const SHOW_XMAS_BANNER = true

// 掲載する3品（売価・上限数・アレルゲンは載せない：2026-10-22決裁）
export const XMAS_ITEMS = [
  { name: '苺のクリスマスケーキ', src: '/photos/xmas_strawberry.webp' },
  { name: 'ブッシュドノエル', src: '/photos/xmas_buche.webp' },
  { name: '苺とピスタチオのクリスマスミルフィーユ', src: '/photos/xmas_millefeuille.webp' },
] as const
