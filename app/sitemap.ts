import { MetadataRoute } from 'next'
import { getProducts } from '@/lib/notion/products'
import { getJournalPosts } from '@/lib/notion/journal'
import { getNewsPosts } from '@/lib/notion/news'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://grace-patisserie.jp'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,            priority: 1.0,  changeFrequency: 'daily' },
    { url: `${BASE}/concept`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/sweets`,  priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/gift`,    priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/shop`,    priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/journal`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/news`,    priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE}/contact`, priority: 0.6, changeFrequency: 'yearly' },
  ]

  try {
    const [products, journals, newsPosts] = await Promise.all([
      getProducts(),
      getJournalPosts(),
      getNewsPosts(),
    ])

    const productPages: MetadataRoute.Sitemap = products
      .filter(p => p.slug)
      .map(p => ({
        url: `${BASE}/sweets/${p.slug}`,
        priority: 0.7,
        changeFrequency: 'monthly' as const,
      }))

    const journalPages: MetadataRoute.Sitemap = journals
      .filter(j => j.slug)
      .map(j => ({
        url: `${BASE}/journal/${j.slug}`,
        lastModified: new Date(j.publishedAt),
        priority: 0.6,
        changeFrequency: 'yearly' as const,
      }))

    const newsPages: MetadataRoute.Sitemap = newsPosts
      .filter(n => n.slug)
      .map(n => ({
        url: `${BASE}/news/${n.slug}`,
        lastModified: new Date(n.publishedAt),
        priority: 0.5,
        changeFrequency: 'yearly' as const,
      }))

    return [...staticPages, ...productPages, ...journalPages, ...newsPages]
  } catch {
    return staticPages
  }
}
