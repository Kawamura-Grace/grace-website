import { notion, DB_IDS } from './client'
import type { Product, ProductCategory, Season } from './types'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

function parseProduct(page: PageObjectResponse): Product {
  const props = page.properties as Record<string, any>

  const files = (prop: any): string[] =>
    (prop?.files ?? []).map((f: any) => f.file?.url ?? f.external?.url ?? '').filter(Boolean)

  return {
    id: page.id,
    slug:                 props['slug']?.rich_text?.[0]?.plain_text ?? '',
    name:                 props['商品名']?.title?.[0]?.plain_text ?? '',
    category:             props['カテゴリ']?.select?.name ?? 'プチガトー',
    price:                props['価格']?.number ?? 0,
    size:                 props['サイズ']?.rich_text?.[0]?.plain_text,
    mainImage:            files(props['メイン画像'])[0],
    subImages:            files(props['サブ画像']),
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
  return res.results.map(p => parseProduct(p as PageObjectResponse))
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
  return res.results.map(p => parseProduct(p as PageObjectResponse))
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
  return res.results.map(p => parseProduct(p as PageObjectResponse))
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
