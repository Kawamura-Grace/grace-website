import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// 既定値を非wwwからwww（= canonical と同じ正規ホスト）へ変更。
// 非wwwは www へ307リダイレクトされるため、sitemap の所在もwwwで示す。
const BASE = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${BASE}/sitemap.xml`,
  }
}
