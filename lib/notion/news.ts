import { notion, DB_IDS } from './client'
import type { NewsPost } from './types'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

function parseNews(page: PageObjectResponse): NewsPost {
  const props = page.properties as Record<string, any>
  return {
    id:          page.id,
    slug:        props['slug']?.rich_text?.[0]?.plain_text ?? '',
    title:       props['タイトル']?.title?.[0]?.plain_text ?? '',
    category:    props['カテゴリ']?.select?.name ?? 'お知らせ',
    publishedAt: props['公開日']?.date?.start ?? '',
    importance:  props['重要度']?.select?.name,
    status:      props['ステータス']?.select?.name ?? '下書き',
  }
}

export async function getNewsPosts(limit?: number): Promise<NewsPost[]> {
  const res = await notion.databases.query({
    database_id: DB_IDS.NEWS,
    filter: { property: 'ステータス', select: { equals: '公開中' } },
    sorts: [{ property: '公開日', direction: 'descending' }],
    page_size: limit ?? 100,
  })
  return res.results.map(p => parseNews(p as PageObjectResponse))
}

// TOPのニュースティッカー用（重要度=高の最新1件）
export async function getTopNews(): Promise<NewsPost | null> {
  const res = await notion.databases.query({
    database_id: DB_IDS.NEWS,
    filter: {
      and: [
        { property: 'ステータス', select: { equals: '公開中' } },
        { property: '重要度', select: { equals: '高' } },
      ],
    },
    sorts: [{ property: '公開日', direction: 'descending' }],
    page_size: 1,
  })
  if (!res.results.length) return null
  return parseNews(res.results[0] as PageObjectResponse)
}

// Shop Infoの臨時定休アラート用
export async function getShopAlerts(): Promise<NewsPost[]> {
  const res = await notion.databases.query({
    database_id: DB_IDS.NEWS,
    filter: {
      and: [
        { property: 'ステータス', select: { equals: '公開中' } },
        {
          or: [
            { property: 'カテゴリ', select: { equals: '臨時定休' } },
          ],
        },
      ],
    },
    sorts: [{ property: '公開日', direction: 'descending' }],
  })
  return res.results.map(p => parseNews(p as PageObjectResponse))
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  const res = await notion.databases.query({
    database_id: DB_IDS.NEWS,
    filter: {
      and: [
        { property: 'ステータス', select: { equals: '公開中' } },
        { property: 'slug', rich_text: { equals: slug } },
      ],
    },
  })
  if (!res.results.length) return null
  return parseNews(res.results[0] as PageObjectResponse)
}

export async function getNewsBlocks(pageId: string) {
  const res = await notion.blocks.children.list({ block_id: pageId })
  return res.results
}
