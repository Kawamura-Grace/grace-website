/**
 * placeholder モード専用: ストック素材定義
 *
 * このファイルは BrandMedia.tsx から placeholder モード時のみ動的 import される。
 * none / live モードのバンドルには含まれない。
 */
export const PLACEHOLDER_ASSETS: Record<string, { src: string; alt: string }> = {
  'hero-full': {
    src: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'パティスリーの焼き菓子（プレースホルダー）',
  },
  'product-cheesecake': {
    src: 'https://images.pexels.com/photos/3992131/pexels-photo-3992131.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'チーズケーキ（プレースホルダー）',
  },
  'product-tart': {
    src: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: '季節のタルト（プレースホルダー）',
  },
  'product-financier': {
    src: 'https://images.pexels.com/photos/2144200/pexels-photo-2144200.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'フィナンシェ（プレースホルダー）',
  },
}
