import type { Metadata } from 'next'

/**
 * サイト共通のSEOメタデータ生成ヘルパー
 *
 * 【目的】
 * canonical / og:url を「サイトルート固定」ではなく、各ページが自分自身のURLを指す
 * self-canonical にする。
 *
 * 【背景】
 * Next.js App Router の metadata は親レイアウトから子ページへ「浅くマージ」される。
 * 子ページが alternates を定義しない場合、ルートレイアウトの canonical をそのまま
 * 継承してしまう。ルートレイアウト（app/layout.tsx）が canonical / og:url に
 * 絶対URL（サイトルート）を固定値で持っていたため、alternates を自前で持たない
 * 全ページがサイトルートへ正規化されていた（self-canonical だったのは
 * alternates を独自定義していた /recruit のみ）。
 *
 * さらに openGraph も「浅いマージ」の対象で、ページ側で openGraph を定義すると
 * 親の siteName / images / type は引き継がれずに消える。各ページで og を手書きすると
 * その欠落を全ページ分だけ再生産することになるため、このヘルパーに集約する。
 */

/**
 * 正規ホスト。
 * 非www（https://grace-patisserie.jp）は Vercel 側の設定で www へ 307 リダイレクト
 * されるため、canonical には必ず www 付きを使う。
 * ホストを変更する場合はこの定数だけを直せばよい（各ページは相対パスで指定するため）。
 */
export const SITE_URL = 'https://www.grace-patisserie.jp'

/** og:site_name に出す表記 */
export const SITE_NAME = 'Grace Patisserie'

/** OGP画像の既定値（ページ固有の画像がない場合に使う） */
export const DEFAULT_OG_IMAGE = '/logo-horizontal.png'

type BuildPageMetadataInput = {
  /**
   * 自ページのパス。先頭スラッシュ付きで渡す（例: '/concept', '/journal/my-slug'）。
   * metadataBase（= SITE_URL、app/layout.tsx で設定）を基準に絶対URLへ解決される。
   */
  path: string
  title: string
  description: string
  /** ページ固有のOGP画像URL。省略時は DEFAULT_OG_IMAGE を使う */
  images?: string[]
}

/**
 * ページ単位の Metadata を組み立てる。
 * canonical・og:url を必ず自ページのパスに向けたうえで、
 * openGraph の置換によって欠落しがちな siteName / images / type を補う。
 */
export function buildPageMetadata({
  path,
  title,
  description,
  images,
}: BuildPageMetadataInput): Metadata {
  const imageUrls = images && images.length > 0 ? images : [DEFAULT_OG_IMAGE]

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: path,
      siteName: SITE_NAME,
      images: imageUrls.map((url) => ({ url })),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrls,
    },
  }
}
