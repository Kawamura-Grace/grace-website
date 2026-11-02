// クリスマスケーキ紹介ページ（2026-11-02 追加）
import type { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { buildPageMetadata } from '@/lib/seo'
import { XMAS_RESERVE_URL, XMAS_DETAILS, XMAS_DEADLINES } from '@/lib/christmas'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildPageMetadata({
  path: '/christmas',
  title: 'クリスマスケーキ | Grace PÂTISSERIE',
  description: 'Grace PÂTISSERIEのクリスマスケーキ。苺のクリスマスケーキ、ブッシュドノエル、苺とピスタチオのクリスマスミルフィーユ。お受け取りは12月22日〜25日、店頭のみ。',
})

function ReserveButton({ onDark = false }: { onDark?: boolean }) {
  return (
    <a
      href={XMAS_RESERVE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block border border-grace-gold px-10 py-4 font-noto-serif text-sm tracking-widest ${onDark ? 'text-grace-offwhite' : 'text-grace-brown'} hover:bg-grace-gold hover:text-grace-offwhite transition-colors`}
    >
      ご予約はこちら
    </a>
  )
}

export default function ChristmasPage() {
  return (
    <>
      <Header />
      <main>
        {/* ─── 見出し ─── */}
        <section className="bg-grace-bg-dark text-center pt-36 pb-20">
          <div className="container-content">
            <p className="font-cormorant italic text-sm tracking-[0.4em] text-grace-gold mb-6">CHRISTMAS 2026</p>
            <h1 className="font-noto-serif text-2xl md:text-4xl text-grace-offwhite tracking-widest leading-relaxed">
              クリスマスケーキ
            </h1>
            <div className="w-8 h-px bg-grace-gold mx-auto my-8" />
            <p className="font-noto-serif text-base md:text-lg text-grace-stone leading-loose">
              ご予約受付中<br />
              <span className="inline-block">お受け取り　12月22日（火）〜25日（金）</span><span className="inline-block">・店頭のみ</span>
            </p>
            <div className="mt-10"><ReserveButton onDark /></div>
            <p className="font-noto-sans text-xs tracking-wide text-grace-stone mt-4">数に限りがあります</p>
          </div>
        </section>

        {/* ─── 3品 ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content max-w-4xl mx-auto space-y-20">
            {XMAS_DETAILS.map((it) => (
              <article key={it.name} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative aspect-[3/4] overflow-hidden bg-grace-cream">
                  <Image src={it.src} alt={it.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
                </div>
                <div>
                  <h2 className="font-noto-serif text-xl md:text-2xl text-grace-brown leading-relaxed mb-4">{it.name}</h2>
                  <p className="font-noto-serif text-base text-grace-text-secondary leading-loose mb-6">{it.text}</p>
                  <ul className="border-t border-grace-line">
                    {it.sizes.map((sz) => (
                      <li key={sz.label} className="flex justify-between gap-4 py-3 border-b border-grace-line font-noto-serif text-base text-grace-text-secondary">
                        <span>{sz.label}</span>
                        <span>{sz.price}（税込）</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── お受け取りと締切 ─── */}
        <section className="section-padding bg-grace-offwhite border-t border-grace-line">
          <div className="container-content max-w-2xl mx-auto">
            <h2 className="font-noto-serif text-xl text-grace-brown mb-6 pb-2 border-b border-grace-line">お受け取り</h2>
            <p className="font-noto-serif text-base text-grace-text-secondary leading-loose mb-4">
              12月22日（火）〜25日（金）の4日間、10:00〜19:00に店頭でお受け取りください。配送はしていません。場所は愛知県春日井市朝宮町1-2-6です。この期間は、クリスマスケーキのみのお受け取りです。
            </p>
            <p className="font-noto-serif text-base text-grace-text-secondary leading-loose mb-8">
              生菓子です。要冷蔵（10℃以下）で、消費期限はお受け取り当日です。
            </p>

            <h2 className="font-noto-serif text-xl text-grace-brown mb-6 pb-2 border-b border-grace-line">ご予約の締切</h2>
            <p className="font-noto-serif text-base text-grace-text-secondary leading-loose mb-4">
              受取日の3日前の19:30までにご予約ください。
            </p>
            <table className="w-full font-noto-serif text-base text-grace-text-secondary mb-8">
              <thead>
                <tr className="border-b border-grace-line text-left text-sm text-grace-text-tertiary">
                  <th className="py-2 font-normal">お受け取り日</th>
                  <th className="py-2 font-normal">ご予約の締切</th>
                </tr>
              </thead>
              <tbody>
                {XMAS_DEADLINES.map((d) => (
                  <tr key={d.pickup} className="border-b border-grace-line">
                    <td className="py-3">{d.pickup}</td>
                    <td className="py-3">{d.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="font-noto-serif text-xl text-grace-brown mb-6 pb-2 border-b border-grace-line">ご注意</h2>
            <p className="font-noto-serif text-base text-grace-text-secondary leading-loose mb-4">
              食品のため、ご注文確定後の、お客様のご都合によるキャンセル・受取日や内容の変更・返品・交換はお受けできません。
            </p>
            <p className="font-noto-serif text-base text-grace-text-secondary leading-loose">
              数に限りがあります。最新の情報は、公式LINEとInstagramでお知らせします。
            </p>

            <div className="text-center mt-14"><ReserveButton /></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
