// 仕様書 3章 Notion DBスキーマに対応する型定義

export type ProductCategory = 'プチガトー' | 'チーズケーキ' | '焼き菓子' | 'ホール' | 'カヌレ'
export type Season = '通年' | '春' | '夏' | '秋' | '冬'
export type PublishStatus = '下書き' | '公開中' | '非公開'

// 仕様書カテゴリ（日本語）+ 初期記事カテゴリ（英語）
export type JournalCategory = '素材の話' | '季節の話' | 'スタッフの話' | '製造の話' | 'Story' | 'Craft' | 'Gift'

export type NewsCategory = 'お知らせ' | '催事' | 'メディア掲載' | '臨時定休'
export type NewsImportance = '高' | '中' | '低'

export type ContactCategory = '取材' | '法人ギフト' | '卸' | '採用' | 'EC関連' | 'メディア掲載' | 'インフルエンサー提携' | 'その他'
export type ContactStatus = '未返信' | '対応中' | '完了' | '返信不要'

export type SubscriberRoute = 'ティザー' | 'プレオープン' | 'オープン後・フッター'

// ─── 商品 ───

export interface Product {
  id: string
  slug: string
  name: string
  category: ProductCategory
  price: number
  size?: string
  mainImage?: string
  subImages?: string[]
  scentDescription: string
  textureDescription: string
  aftertasteDescription: string
  ingredients?: string[]
  allergens: string[]
  expiryDate?: string
  storageMethod?: string
  squareUrl?: string
  displayOrder: number
  status: PublishStatus
  season?: Season
  relatedJournalIds?: string[]
}

// ─── Journal ───

export interface JournalPost {
  id: string
  slug: string
  title: string
  category: JournalCategory
  eyecatch?: string
  summary: string
  publishedAt: string
  status: PublishStatus
  author?: string
  relatedProductIds?: string[]
}

// ─── News ───

export interface NewsPost {
  id: string
  slug: string
  title: string
  category: NewsCategory
  publishedAt: string
  importance?: NewsImportance
  status: PublishStatus
}

// ─── Contact ───

export interface ContactEntry {
  category: ContactCategory
  senderName: string
  company?: string
  email: string
  phone?: string
  message: string
}

// ─── Subscriber ───

export interface Subscriber {
  email: string
  name?: string
  route: SubscriberRoute
}
