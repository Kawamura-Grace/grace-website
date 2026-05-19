// Journal一覧ページ — カテゴリフィルタはsearchParams
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Tag } from '@/components/ui/Tag'
import { getJournalPosts } from '@/lib/notion/journal'
import { formatDate } from '@/lib/utils/date'
import type { JournalCategory } from '@/lib/notion/types'

export const revalidate = 3600 // 1時間

export const metadata: Metadata = {
  title: 'Journal | Grace — PATISSERIE',
  description: 'Grace Patisserieのジャーナル。素材・季節・製造の話など、お菓子にまつわる物語。',
}

// カテゴリ定義
const CATEGORIES: { label: string; value: JournalCategory | 'all' }[] = [
  { label: 'すべて',     value: 'all' },
  { label: '素材の話',   value: '素材の話' },
  { label: '季節の話',   value: '季節の話' },
  { label: 'スタッフの話', value: 'スタッフの話' },
  { label: '製造の話',   value: '製造の話' },
]

interface PageProps {
  searchParams: { category?: string }
}

export default async function JournalPage({ searchParams }: PageProps) {
  const allPosts = await getJournalPosts().catch(() => [])

  const activeCategory = searchParams.category as JournalCategory | 'all' | undefined
  const posts = (!activeCategory || activeCategory === 'all')
    ? allPosts
    : allPosts.filter(p => p.category === activeCategory)

  return (
    <>
      <Header />
      <main>
        {/* ─── ページヘッダー ─── */}
        <section className="bg-grace-bg-dark section-padding">
          <div className="container-content text-center">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-6">STORIES</p>
            <h1 className="font-cormorant italic text-5xl md:text-7xl text-grace-offwhite leading-none mb-8">
              Journal
            </h1>
            <div className="w-8 h-px bg-grace-gold mx-auto mb-8" />
            <p className="font-noto-serif text-base text-grace-stone leading-loose max-w-md mx-auto">
              素材のこと、季節のこと、つくり手のこと。<br />
              お菓子の向こう側にある、小さな物語。
            </p>
          </div>
        </section>

        {/* ─── カテゴリタブ ─── */}
        <section className="bg-grace-offwhite border-b border-grace-line sticky top-16 z-20">
          <div className="container-content">
            <nav aria-label="ジャーナルカテゴリ" className="flex gap-0 overflow-x-auto">
              {CATEGORIES.map(({ label, value }) => {
                const isActive = (!activeCategory && value === 'all') || activeCategory === value
                return (
                  <Link
                    key={value}
                    href={value === 'all' ? '/journal' : `/journal?category=${encodeURIComponent(value)}`}
                    className={`
                      flex-shrink-0 px-4 md:px-6 py-4 font-noto-sans text-[10px] tracking-widest transition-colors border-b-2
                      ${isActive
                        ? 'text-grace-brown border-grace-brown'
                        : 'text-grace-text-tertiary border-transparent hover:text-grace-text-secondary'}
                    `}
                  >
                    {label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </section>

        {/* ─── 記事グリッド ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            {posts.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-noto-serif text-base text-grace-text-tertiary">
                  現在この カテゴリの記事はありません。
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/journal/${post.slug}`}
                    className="group block"
                    aria-label={post.title}
                  >
                    {/* アイキャッチ */}
                    <div className="relative aspect-video bg-grace-cream overflow-hidden mb-4">
                      {post.eyecatch ? (
                        <Image
                          src={post.eyecatch}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary">PHOTO</span>
                        </div>
                      )}
                    </div>

                    {/* 記事情報 */}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Tag variant="stone">{post.category}</Tag>
                        <time
                          dateTime={post.publishedAt}
                          className="font-noto-sans text-[10px] tracking-wide text-grace-text-tertiary"
                        >
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                      <h2 className="font-noto-serif text-base text-grace-brown leading-relaxed mb-2 group-hover:text-grace-text-secondary transition-colors">
                        {post.title}
                      </h2>
                      {post.summary && (
                        <p className="font-noto-serif text-sm text-grace-text-tertiary leading-relaxed line-clamp-2">
                          {post.summary}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
