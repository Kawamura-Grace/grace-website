import { Client } from '@notionhq/client'

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const DB_IDS = {
  PRODUCTS:    process.env.NOTION_DB_PRODUCTS!,
  JOURNAL:     process.env.NOTION_DB_JOURNAL!,
  NEWS:        process.env.NOTION_DB_NEWS!,
  CONTACTS:    process.env.NOTION_DB_CONTACTS!,
  SUBSCRIBERS: process.env.NOTION_DB_SUBSCRIBERS!,
} as const
