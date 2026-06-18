import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { ConceptExcerpt } from '@/components/sections/ConceptExcerpt'
import { SeasonalProducts } from '@/components/sections/SeasonalProducts'
// JournalLatest はティザーフェーズで非表示 — 本番化時に復活
// import { JournalLatest } from '@/components/sections/JournalLatest'
import { EcInvitation } from '@/components/sections/EcInvitation'
import { getSeasonalProducts } from '@/lib/notion/products'
// getLatestJournalPosts はティザーフェーズで不使用
// import { getLatestJournalPosts } from '@/lib/notion/journal'
import { getTopNews } from '@/lib/notion/news'
// Link はティザーフェーズで page.tsx 内未使用（子ページリンクを span に変更したため）
// import Link from 'next/link'
import { formatDate } from '@/lib/utils/date'

export const revalidate = 3600 // ISR 1時間

export default async function HomePage() {
  const [seasonalProducts, topNews] = await Promise.all([
    getSeasonalProducts('秋').catch(() => []),
    // getLatestJournalPosts(3) はティザーフェーズで非使用
    getTopNews().catch(() => null),
  ])

  return (
    <>
      <Header variant="transparent" />

      {/* ニュースティッカー — ティザーフェーズでは /news ページへの遷移を無効化 */}
      {topNews && (
        <div className="bg-grace-wasabi text-grace-offwhite py-2 px-4 text-center">
          <span className="font-noto-serif text-base tracking-wide">
            {formatDate(topNews.publishedAt)} — {topNews.title}
          </span>
        </div>
      )}

      <main>
        <Hero />
        <ConceptExcerpt />
        <SeasonalProducts products={seasonalProducts} />
        {/* Journal section - ティザーフェーズで非表示（本番化時にコメント解除） */}
        {/* <JournalLatest posts={latestJournals} /> */}

        {/* Shop Info 簡易 */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            <div className="section-label mb-8">SHOP INFO</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-cormorant italic text-4xl text-grace-brown mb-6">Visit Us</h2>
                <dl className="space-y-3 font-noto-serif text-lg text-grace-text-secondary">
                  <div>
                    <dt className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-1">ADDRESS</dt>
                    <dd>〒486-0844 愛知県春日井市</dd>
                  </div>
                  <div>
                    <dt className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-1">HOURS</dt>
                    <dd>9:30 – 19:30　不定休</dd>
                  </div>
                </dl>
                {/* ティザーフェーズ：/shop への遷移を無効化 */}
                <span
                  className="inline-block mt-8 font-noto-sans text-[10px] tracking-widest text-grace-text-secondary border-b border-grace-line pb-1 cursor-default"
                >
                  SHOP DETAIL →
                </span>
              </div>
              {/* 地図プレースホルダー */}
              <div className="aspect-video bg-grace-stone flex items-center justify-center">
                <span className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary">MAP</span>
              </div>
            </div>
          </div>
        </section>

        <EcInvitation />
      </main>

      <Footer />
    </>
  )
}
