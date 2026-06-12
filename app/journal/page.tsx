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

// ビルド時のNotionタイムアウト防止: 静的生成を無効化しリクエスト時にデータ取得する
export const dynamic = 'force-dynamic'

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
        <section className="relative overflow-hidden bg-grace-bg-dark flex items-center justify-center" style={{ minHeight: '480px' }}>
          {/* 背景写真: パティスリーの素材・製造 */}
          <Image
            src="https://images.pexels.com/photos/3983674/pexels-photo-3983674.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
            crossOrigin="anonymous"
            aria-hidden="true"
            priority
          />
          <div className="absolute inset-0 bg-grace-bg-dark/72" aria-hidden="true" />
          <div className="relative z-10 container-content text-center py-24">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-6">STORIES</p>
            <h1 className="font-cormorant italic text-5xl md:text-7xl text-grace-offwhite leading-none mb-8">
              Journal
            </h1>
            <div className="w-8 h-px bg-grace-gold mx-auto mb-8" />
            <p className="font-noto-serif text-lg text-grace-stone leading-loose max-w-md mx-auto">
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
                <p className="font-noto-serif text-lg text-grace-text-tertiary mb-2">
                  {(!activeCategory || activeCategory === 'all')
                    ? 'ジャーナルは2026年10月の開業にあわせて公開予定です。'
                    : 'このカテゴリの記事はまだありません。'}
                </p>
                {(!activeCategory || activeCategory === 'all') && (
                  <p className="font-noto-serif text-base text-grace-text-tertiary mb-10">
                    素材・季節・製造の話を、開業前から少しずつお届けします。
                  </p>
                )}
                <a
                  href="https://www.instagram.com/patisserie_grace_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-noto-sans text-[10px] tracking-widest text-grace-text-secondary border border-grace-line px-8 py-3 hover:border-grace-brown hover:text-grace-brown transition-colors"
                >
                  @patisserie_grace_ →
                </a>
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
                      <h2 className="font-noto-serif text-lg text-grace-brown leading-relaxed mb-2 group-hover:text-grace-text-secondary transition-colors">
                        {post.title}
                      </h2>
                      {post.summary && (
                        <p className="font-noto-serif text-base text-grace-text-tertiary leading-relaxed line-clamp-2">
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
