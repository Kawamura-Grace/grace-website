// News一覧ページ — リスト表示
import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Tag } from '@/components/ui/Tag'
import { getNewsPosts } from '@/lib/notion/news'
import { formatDate } from '@/lib/utils/date'
import type { NewsCategory } from '@/lib/notion/types'

export const revalidate = 1800 // 30分

export const metadata: Metadata = {
  title: 'News | Grace — PATISSERIE',
  description: 'Pâtisserie Graceのお知らせ。新商品・催事・臨時定休などの最新情報。',
}

// カテゴリのバッジスタイル
const CATEGORY_VARIANTS: Record<NewsCategory, 'wasabi' | 'gold' | 'stone'> = {
  'お知らせ':   'stone',
  '催事':       'gold',
  'メディア掲載': 'wasabi',
  '臨時定休':   'stone',
}

export default async function NewsPage() {
  const posts = await getNewsPosts().catch(() => [])

  return (
    <>
      <Header />
      <main>
        {/* ─── ページヘッダー ─── */}
        <section className="bg-grace-bg-dark section-padding">
          <div className="container-content text-center">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-6">LATEST</p>
            <h1 className="font-cormorant italic text-5xl md:text-7xl text-grace-offwhite leading-none mb-8">
              News
            </h1>
            <div className="w-8 h-px bg-grace-gold mx-auto" />
          </div>
        </section>

        {/* ─── ニュースリスト ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            {posts.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-noto-serif text-sm text-grace-text-tertiary mb-8">
                  現在お知らせはありません。
                </p>
                <a
                  href="/contact"
                  className="inline-block font-noto-sans text-[10px] tracking-widest text-grace-text-secondary border border-grace-line px-8 py-3 hover:border-grace-brown hover:text-grace-brown transition-colors"
                >
                  お問い合わせはこちら →
                </a>
              </div>
            ) : (
              <ul className="max-w-article mx-auto divide-y divide-grace-line">
                {posts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/news/${post.slug}`}
                      className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-6 hover:bg-grace-cream/50 -mx-4 px-4 transition-colors"
                    >
                      {/* 日付 */}
                      <time
                        dateTime={post.publishedAt}
                        className="font-noto-sans text-[10px] tracking-wide text-grace-text-tertiary flex-shrink-0 w-24"
                      >
                        {formatDate(post.publishedAt)}
                      </time>
                      {/* カテゴリ */}
                      <div className="flex-shrink-0">
                        <Tag variant={CATEGORY_VARIANTS[post.category]}>{post.category}</Tag>
                      </div>
                      {/* タイトル */}
                      <h2 className="font-noto-serif text-sm text-grace-brown leading-relaxed group-hover:text-grace-text-secondary transition-colors flex-1">
                        {post.title}
                      </h2>
                      {/* 矢印 */}
                      <span className="font-noto-sans text-[10px] text-grace-text-tertiary hidden md:block">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
