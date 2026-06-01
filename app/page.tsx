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
import Image from 'next/image'
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
        <section className="relative overflow-hidden bg-grace-bg-dark py-20 px-6">
          {/* 背景写真: パティスリー外観・ショーケースイメージ（暗いトーン） */}
          <Image
            src="https://images.pexels.com/photos/3740429/pexels-photo-3740429.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            crossOrigin="anonymous"
            aria-hidden="true"
          />
          {/* ダークブラウンオーバーレイ */}
          <div className="absolute inset-0 bg-grace-bg-dark/75" aria-hidden="true" />

          {/* コンテンツ */}
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-8">
              ━ SHOP INFO ━
            </p>
            <h2 className="font-cormorant italic text-4xl md:text-5xl text-grace-offwhite mb-6 leading-tight">
              Pâtisserie Grace
            </h2>
            <p className="font-noto-serif text-grace-stone text-sm leading-loose tracking-wide mb-10">
              〒486-0844 愛知県春日井市朝宮町1-2-6<br />
              9:30 – 19:30　不定休
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 font-noto-sans text-xs tracking-widest text-grace-offwhite border border-grace-gold px-8 py-4 hover:bg-grace-gold hover:text-grace-brown transition-all duration-500"
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
