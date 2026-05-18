// コンセプトページ — 静的コンテンツのみ（Notion連携なし）
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'

export const revalidate = 86400 // 24時間

export const metadata: Metadata = {
  title: 'Concept | Grace — PATISSERIE',
  description: '美しい暮らしには、お菓子がある。Pâtisserie Graceのコンセプトをご紹介します。',
}

export default function ConceptPage() {
  return (
    <>
      <Header />
      <main>
        {/* ─── ヒーロー ─── */}
        <section className="bg-grace-bg-dark section-padding">
          <div className="container-content text-center">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-6">OUR STORY</p>
            <h1 className="font-cormorant italic text-5xl md:text-7xl text-grace-offwhite leading-none mb-8">
              Concept
            </h1>
            <div className="w-8 h-px bg-grace-gold mx-auto" />
          </div>
        </section>

        {/* ─── PHILOSOPHY ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content max-w-article mx-auto text-center">
            <div className="section-label mb-12">PHILOSOPHY</div>
            <h2 className="font-noto-serif text-2xl md:text-3xl text-grace-brown leading-relaxed mb-10 tracking-widest">
              美しい暮らしには、<br />お菓子がある。
            </h2>
            <p className="font-noto-serif text-sm text-grace-text-secondary leading-loose tracking-wide">
              贈り物に、特別な日に、何気ない朝に。<br />
              暮らしに深みを添えるお菓子を、ここで作ります。
            </p>
          </div>
        </section>

        {/* ─── CRAFTSMANSHIP ─── */}
        <section className="section-padding bg-grace-cream">
          <div className="container-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="section-label mb-8">CRAFTSMANSHIP</div>
                <h2 className="font-cormorant italic text-4xl md:text-5xl text-grace-brown mb-6 leading-tight">
                  Dedicated<br />Handcraft
                </h2>
                <p className="font-noto-serif text-sm text-grace-text-secondary leading-loose">
                  素材と向き合い、気候と対話しながら、その日だけの一皿を仕上げる。<br />
                  手が加わることで、お菓子に温度と揺らぎが生まれると信じているから。
                </p>
              </div>
              <div className="aspect-square bg-grace-stone flex items-center justify-center">
                <span className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary">PHOTO</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Sweets誘導 ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content text-center">
            <Link
              href="/sweets"
              className="inline-flex items-center gap-2 font-noto-sans text-[10px] tracking-widest text-grace-brown border border-grace-brown px-8 py-4 hover:bg-grace-brown hover:text-grace-offwhite transition-all duration-300"
            >
              VIEW SWEETS →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
