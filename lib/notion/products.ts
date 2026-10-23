import { notion, DB_IDS } from './client'
import type { Product, ProductCategory, Season } from './types'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

// 商品写真は public/photos のサイト内画像を slug で引く。
// Notion のメイン画像は署名付きURL（約1時間で期限切れ）のため使わない（2026-10-13）。
// 写真を足す・替えるときは、ファイルを置いてこの表を書き換える。表に無い slug の商品は一覧に出さない。
export const PRODUCT_IMAGE_BY_SLUG: Record<string, string> = {
  'shortcake':       '/photos/own_shortcake_hiki.jpg',
  'chocolate-cake':  '/photos/own_chocolatecake.jpg',
  'brioche':         '/photos/own_brioche.jpg',
  'gateau-chocolat': '/photos/own_gateau_chocolat_side.jpg',
  'millefeuille':    '/photos/own_millefeuille.jpg',
  'choux':           '/photos/own_choux.jpg',
  'financier':       '/photos/own_financier.jpg',
  'carrot-cake':     '/photos/own_carrotcake.jpg',
  'cheesecake-1':    '/photos/own_cheesecake_single.jpg',
  'cheesecake-6':    '/photos/own_cheesecake6.jpg',
  'cheesecake-10':   '/photos/own_cheesecake10.jpg',
  'gift-s':          '/photos/own_gift_s.jpg',
  'gift-m':          '/photos/own_gift_m_box.jpg',
  'gift-l':          '/photos/own_gift_l_box.jpg',
}

// 一覧に出すのは「slug があり、写真が対応づいている商品」だけ（空リンク・空の写真枠を出さない）
function toVisibleProducts(pages: unknown[]): Product[] {
  return pages
    .map(p => parseProduct(p as PageObjectResponse))
    .filter(p => p.slug && p.mainImage)
}

// 価格は読まない・載せない（2026-10-13 決裁）。Product型にも価格を持たせないこと。
function parseProduct(page: PageObjectResponse): Product {
  const props = page.properties as Record<string, any>
  const slug = props['slug']?.rich_text?.[0]?.plain_text ?? ''

  return {
    id: page.id,
    slug,
    name:                 props['商品名']?.title?.[0]?.plain_text ?? '',
    category:             props['カテゴリ']?.select?.name ?? 'プチガトー',
    size:                 props['サイズ']?.rich_text?.[0]?.plain_text,
    mainImage:            PRODUCT_IMAGE_BY_SLUG[slug],
    subImages:            [],
    scentDescription:     props['香りの説明']?.rich_text?.[0]?.plain_text ?? '',
    textureDescription:   props['食感の説明']?.rich_text?.[0]?.plain_text ?? '',
    aftertasteDescription:props['余韻の説明']?.rich_text?.[0]?.plain_text ?? '',
    ingredients:          props['使用素材']?.multi_select?.map((s: any) => s.name),
    allergens:            props['アレルゲン']?.multi_select?.map((s: any) => s.name) ?? [],
    expiryDate:           props['賞味期限']?.rich_text?.[0]?.plain_text,
    storageMethod:        props['保存方法']?.rich_text?.[0]?.plain_text,
    squareUrl:            props['Square購入URL']?.url ?? undefined,
    displayOrder:         props['表示順']?.number ?? 99,
    status:               props['ステータス']?.select?.name ?? '下書き',
    season:               props['シーズンタグ']?.select?.name,
    relatedJournalIds:    props['関連Journal']?.relation?.map((r: any) => r.id),
  }
}

export async function getProducts(): Promise<Product[]> {
  const res = await notion.databases.query({
    database_id: DB_IDS.PRODUCTS,
    filter: { property: 'ステータス', select: { equals: '公開中' } },
    sorts: [
      { property: 'カテゴリ', direction: 'ascending' },
      { property: '表示順', direction: 'ascending' },
    ],
  })
  return toVisibleProducts(res.results)
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const res = await notion.databases.query({
    database_id: DB_IDS.PRODUCTS,
    filter: {
      and: [
        { property: 'ステータス', select: { equals: '公開中' } },
        { property: 'カテゴリ', select: { equals: category } },
      ],
    },
    sorts: [{ property: '表示順', direction: 'ascending' }],
  })
  return toVisibleProducts(res.results)
}

export async function getSeasonalProducts(season: Season): Promise<Product[]> {
  const res = await notion.databases.query({
    database_id: DB_IDS.PRODUCTS,
    filter: {
      and: [
        { property: 'ステータス', select: { equals: '公開中' } },
        { property: 'シーズンタグ', select: { equals: season } },
      ],
    },
    sorts: [{ property: '表示順', direction: 'ascending' }],
    page_size: 4,
  })
  return toVisibleProducts(res.results)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await notion.databases.query({
    database_id: DB_IDS.PRODUCTS,
    filter: {
      and: [
        { property: 'ステータス', select: { equals: '公開中' } },
        { property: 'slug', rich_text: { equals: slug } },
      ],
    },
  })
  if (!res.results.length) return null
  return parseProduct(res.results[0] as PageObjectResponse)
}
