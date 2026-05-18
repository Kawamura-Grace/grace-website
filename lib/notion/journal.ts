import { notion, DB_IDS } from './client'
import type { JournalPost } from './types'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

function parseJournal(page: PageObjectResponse): JournalPost {
  const props = page.properties as Record<string, any>
  const files = (prop: any): string[] =>
    (prop?.files ?? []).map((f: any) => f.file?.url ?? f.external?.url ?? '').filter(Boolean)

  return {
    id: page.id,
    slug:             props['slug']?.rich_text?.[0]?.plain_text ?? '',
    title:            props['タイトル']?.title?.[0]?.plain_text ?? '',
    category:         props['カテゴリ']?.select?.name ?? '素材の話',
    eyecatch:         files(props['アイキャッチ'])[0],
    summary:          props['サマリー']?.rich_text?.[0]?.plain_text ?? '',
    publishedAt:      props['公開日']?.date?.start ?? '',
    status:           props['ステータス']?.select?.name ?? '下書き',
    author:           props['作者']?.rich_text?.[0]?.plain_text,
    relatedProductIds:props['関連商品']?.relation?.map((r: any) => r.id),
  }
}

export async function getJournalPosts(limit?: number): Promise<JournalPost[]> {
  const res = await notion.databases.query({
    database_id: DB_IDS.JOURNAL,
    filter: { property: 'ステータス', select: { equals: '公開中' } },
    sorts: [{ property: '公開日', direction: 'descending' }],
    page_size: limit ?? 100,
  })
  return res.results.map(p => parseJournal(p as PageObjectResponse))
}

export async function getLatestJournalPosts(count = 3): Promise<JournalPost[]> {
  return getJournalPosts(count)
}

export async function getJournalBySlug(slug: string): Promise<JournalPost | null> {
  const res = await notion.databases.query({
    database_id: DB_IDS.JOURNAL,
    filter: {
      and: [
        { property: 'ステータス', select: { equals: '公開中' } },
        { property: 'slug', rich_text: { equals: slug } },
      ],
    },
  })
  if (!res.results.length) return null
  return parseJournal(res.results[0] as PageObjectResponse)
}

// Notionページ本文をブロック形式で取得
export async function getJournalBlocks(pageId: string) {
  const res = await notion.blocks.children.list({ block_id: pageId })
  return res.results
}
