'use client'

import Link from 'next/link'
import { BrandMedia } from '@/components/brand/BrandMedia'
import { useReveal, revealStyle } from '@/components/brand/useReveal'

/**
 * SeasonalSelectionV2 — Seasonal Selection（1-6）signature-v1版
 *
 * - カード: aspect-ratio 4:5 フレーム
 * - BrandMedia slot="product-{slug}"
 * - 商品名（Cormorant italic 18px）+ 価格（Cormorant italic gold）
 * - 仮データ 3個（チーズケーキ / 季節のタルト / フィナンシェ）
 */

const MOCK_PRODUCTS = [
  {
    slug: 'cheesecake',
    name: 'Fromage Blanc',
    nameJa: 'チーズケーキ',
    href: '/sweets/cheesecake',
  },
  {
    slug: 'tart',
    name: 'Tarte de Saison',
    nameJa: '季節のタルト',
    href: '/sweets/tart',
  },
  {
    slug: 'financier',
    name: 'Financier',
    nameJa: 'フィナンシェ',
    href: '/sweets/financier',
  },
] as const

export function SeasonalSelectionV2() {
  const { ref: revealRef, isVisible } = useReveal()

  return (
    <section
      className="bg-cream-deep py-24 px-6"
      aria-label="Seasonal Selection"
    >
      <div className="max-w-5xl mx-auto">
        {/* セクションラベル */}
        <div
          ref={revealRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-14"
          style={revealStyle(isVisible, 0, '0.8s')}
        >
          <span
            className="font-cormorant italic text-gold block mb-3"
            style={{ fontSize: '10px', letterSpacing: '0.35em' }}
          >
            Selection
          </span>
          <h2
            className="font-cormorant italic text-brown"
            style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 300 }}
          >
            Seasonal Sweets
          </h2>
        </div>

        {/* 3カードグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {MOCK_PRODUCTS.map((product, i) => (
            <div
              key={product.slug}
              style={revealStyle(isVisible, i * 120 + 100, '0.8s')}
            >
              <Link href={product.href} className="group block">
                {/* aspect 4:5 フレーム */}
                <div
                  className="relative overflow-hidden mb-4"
                  style={{ aspectRatio: '4/5' }}
                >
                  <BrandMedia
                    slot={`product-${product.slug}`}
                    fill
                    className="w-full h-full group-hover:scale-[1.03] transition-transform duration-[800ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)]"
                  />
                </div>

                {/* 商品情報 */}
                <div className="px-1 mt-4">
                  <p
                    className="font-cormorant italic text-brown"
                    style={{ fontSize: '18px', fontWeight: 300 }}
                  >
                    {product.name}
                  </p>
                  <p
                    className="font-shippori text-brown/60"
                    style={{ fontSize: '11px', marginTop: '2px', letterSpacing: '0.06em' }}
                  >
                    {product.nameJa}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* 全商品リンク */}
        <div
          className="text-center mt-14"
          style={revealStyle(isVisible, 480, '0.8s')}
        >
          <Link
            href="/sweets"
            className="font-cormorant italic text-brown border-b border-gold pb-0.5 hover:text-wasabi hover:border-wasabi transition-colors"
            style={{
              fontSize: '12px',
              letterSpacing: '0.12em',
              transitionDuration: '0.8s',
              transitionTimingFunction: 'cubic-bezier(.22,1,.36,1)',
            }}
          >
            All Sweets
          </Link>
        </div>
      </div>
    </section>
  )
}
