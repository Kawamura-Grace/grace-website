import { Client } from '@notionhq/client'

// 環境変数が未設定の場合はダミートークンで初期化し、
// 呼び出し側の catch で安全にフォールバックさせる。
// VercelにNOTION_TOKEN未設定でデプロイされた場合でも500エラーにならないよう保護。
export const notion = new Client({
  auth: process.env.NOTION_TOKEN ?? 'not-configured',
})

// NOTION_TOKENが設定されているかどうかを呼び出し側で確認できるようエクスポート
export const isNotionConfigured = Boolean(process.env.NOTION_TOKEN)

export const DB_IDS = {
  PRODUCTS:    process.env.NOTION_DB_PRODUCTS ?? '',
  JOURNAL:     process.env.NOTION_DB_JOURNAL ?? '',
  NEWS:        process.env.NOTION_DB_NEWS ?? '',
  CONTACTS:    process.env.NOTION_DB_CONTACTS ?? '',
  SUBSCRIBERS: process.env.NOTION_DB_SUBSCRIBERS ?? '',
} as const
