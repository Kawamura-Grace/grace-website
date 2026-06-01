import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { ConceptExcerpt } from '@/components/sections/ConceptExcerpt'
import { SeasonalProducts } from '@/components/sections/SeasonalProducts'
import { JournalLatest } from '@/components/sections/JournalLatest'
import { EcInvitation } from '@/components/sections/EcInvitation'
import { getSeasonalProducts } from '@/lib/notion/products'
import { getLatestJournalPosts } from '@/lib/notion/journal'
import { getTopNews } from '@/lib/notion/news'
import Link from 'next/link'
import { formatDate } from '@/lib/utils/date'

export const revalidate = 3600 // ISR 1時間

export default async function HomePage() {
  const [seasonalProducts, latestJournals, topNews] = await Promise.all([
    getSeasonalProducts('秋').catch(() => []),
    getLatestJournalPosts(3).catch(() => []),
    getTopNews().catch(() => null),
  ])

  return (
    <>
      <Header variant="transparent" />

      {/* ニュースティッカー */}
      {topNews && (
        <div className="bg-grace-wasabi text-grace-offwhite py-2 px-4 text-center">
          <Link href={`/news/${topNews.slug}`} className="font-noto-serif text-base tracking-wide hover:underline">
            {formatDate(topNews.publishedAt)} — {topNews.title}
          </Link>
        </div>
      )}

      <main>
        <Hero />
        <ConceptExcerpt />
        <SeasonalProducts products={seasonalProducts} />
        <JournalLatest posts={latestJournals} />

        {/* Shop Info 簡易 */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            <div className="section-label mb-8">SHOP INFO</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
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
                <Link
                  href="/shop"
                  className="inline-block mt-8 font-noto-sans text-[10px] tracking-widest text-grace-text-secondary hover:text-grace-brown transition-colors border-b border-grace-line pb-1"
                >
                  SHOP INFO →
                </Link>
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
