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

        {/* Shop Info */}
        <section className="bg-grace-offwhite py-20 px-6">
          {/* コンテンツ */}
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-brown mb-8">
              ━ SHOP INFO ━
            </p>
            <h2 className="font-cormorant italic text-4xl md:text-5xl text-grace-brown mb-6 leading-tight">
              Pâtisserie Grace
            </h2>
            <p className="font-noto-serif text-grace-text-primary text-sm leading-loose tracking-wide mb-10">
              〒486-0844 愛知県春日井市朝宮町1-2-6<br />
              9:30 – 19:30　不定休
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 font-noto-sans text-xs tracking-widest text-grace-brown border border-grace-brown px-8 py-4 hover:bg-grace-brown hover:text-grace-offwhite transition-all duration-500"
            >
              SHOP INFO →
            </Link>
          </div>
        </section>

        <EcInvitation />
      </main>

      <Footer />
    </>
  )
}
