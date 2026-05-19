// スイーツ一覧ページ — カテゴリはsearchParamsで切替（サーバーコンポーネント）
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Tag } from '@/components/ui/Tag'
import { getProducts } from '@/lib/notion/products'
import type { ProductCategory } from '@/lib/notion/types'

export const revalidate = 3600 // 1時間

export const metadata: Metadata = {
  title: 'Sweets | Grace — PATISSERIE',
  description: 'Pâtisserie Graceのスイーツ一覧。プチガトー・チーズケーキ・焼き菓子・ホール・カヌレ。',
}

// カテゴリタブの定義
const CATEGORIES: { label: string; value: ProductCategory | 'all' }[] = [
  { label: 'すべて',       value: 'all' },
  { label: 'プチガトー',   value: 'プチガトー' },
  { label: 'チーズケーキ', value: 'チーズケーキ' },
  { label: '焼き菓子',     value: '焼き菓子' },
  { label: 'ホール',       value: 'ホール' },
  { label: 'カヌレ',       value: 'カヌレ' },
]

// シーズンバッジのスタイル
function SeasonBadge({ season }: { season?: string }) {
  if (!season || season === '通年') return null
  const variants: Record<string, 'wasabi' | 'gold' | 'stone'> = {
    '春': 'wasabi',
    '夏': 'wasabi',
    '秋': 'gold',
    '冬': 'stone',
  }
  return <Tag variant={variants[season] ?? 'stone'}>{season}</Tag>
}

interface PageProps {
  searchParams: { category?: string }
}

export default async function SweetsPage({ searchParams }: PageProps) {
  // 全商品取得（失敗時は空配列）
  const allProducts = await getProducts().catch(() => [])

  // カテゴリフィルタリング
  const activeCategory = searchParams.category as ProductCategory | 'all' | undefined
  const products = (!activeCategory || activeCategory === 'all')
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory)

  return (
    <>
      <Header />
      <main>
        {/* ─── ページヘッダー ─── */}
        <section className="bg-grace-bg-dark section-padding">
          <div className="container-content text-center">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-6">OUR PRODUCTS</p>
            <h1 className="font-cormorant italic text-5xl md:text-7xl text-grace-offwhite leading-none mb-8">
              Sweets
            </h1>
            <div className="w-8 h-px bg-grace-gold mx-auto" />
          </div>
        </section>

        {/* ─── カテゴリタブ ─── */}
        <section className="bg-grace-offwhite border-b border-grace-line sticky top-16 z-20">
          <div className="container-content">
            <nav aria-label="商品カテゴリ" className="flex gap-0 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map(({ label, value }) => {
                const isActive = (!activeCategory && value === 'all') || activeCategory === value
                return (
                  <Link
                    key={value}
                    href={value === 'all' ? '/sweets' : `/sweets?category=${encodeURIComponent(value)}`}
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

        {/* ─── 商品グリッド ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            {products.length === 0 ? (
              // 空ステート（開業前）
              <div className="text-center py-24">
                <p className="font-noto-serif text-base text-grace-text-tertiary mb-2">
                  商品は2026年10月の開業時より順次公開予定です。
                </p>
                <p className="font-noto-serif text-sm text-grace-text-tertiary mb-10">
                  Instagramで開業前の最新情報をお届けしています。
                </p>
                <a
                  href="https://www.instagram.com/grace_lifestyle_dessert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-noto-sans text-[10px] tracking-widest text-grace-text-secondary border border-grace-line px-8 py-3 hover:border-grace-brown hover:text-grace-brown transition-colors"
                >
                  @grace_lifestyle_dessert →
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/sweets/${product.slug}`}
                    className="group block"
                    aria-label={product.name}
                  >
                    {/* 商品画像 */}
                    <div className="relative aspect-square bg-grace-cream overflow-hidden mb-3">
                      {product.mainImage ? (
                        <Image
                          src={product.mainImage}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary">PHOTO</span>
                        </div>
                      )}
                      {/* シーズンバッジ */}
                      {product.season && product.season !== '通年' && (
                        <div className="absolute top-2 left-2">
                          <SeasonBadge season={product.season} />
                        </div>
                      )}
                    </div>

                    {/* 商品情報 */}
                    <div>
                      <p className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-1">
                        {product.category}
                      </p>
                      <h2 className="font-noto-serif text-base text-grace-brown mb-1 group-hover:text-grace-text-secondary transition-colors">
                        {product.name}
                      </h2>
                      <p className="font-noto-sans text-xs text-grace-text-secondary">
                        ¥{product.price.toLocaleString()}
                        {product.size && (
                          <span className="text-grace-text-tertiary ml-1">({product.size})</span>
                        )}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
        {/* ─── ギフトCTA ─── */}
        <section className="section-padding bg-grace-cream">
          <div className="container-content text-center">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-4">GIFT</p>
            <p className="font-noto-serif text-base text-grace-text-secondary mb-6">
              贈り物にお使いの方は、ギフトページもご覧ください。
            </p>
            <a
              href="/gift"
              className="inline-block font-noto-sans text-[10px] tracking-widest text-grace-offwhite bg-grace-brown px-8 py-3 hover:bg-grace-text-secondary transition-colors"
            >
              GIFT PAGE →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
