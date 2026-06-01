// コンセプトページ — 静的コンテンツのみ（Notion連携なし）
import type { Metadata } from 'next'
import Image from 'next/image'
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
        <section className="relative overflow-hidden bg-grace-bg-dark flex items-center justify-center" style={{ minHeight: '480px' }}>
          {/* 背景写真: パティスリーの製造工程 */}
          <Image
            src="https://images.pexels.com/photos/2128027/pexels-photo-2128027.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            fill
            className="object-cover opacity-30"
            sizes="100vw"
            crossOrigin="anonymous"
            aria-hidden="true"
            priority
          />
          <div className="absolute inset-0 bg-grace-bg-dark/70" aria-hidden="true" />
          <div className="relative z-10 container-content text-center py-24">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-6">OUR STORY</p>
            <h1 className="font-cormorant italic text-5xl md:text-7xl text-grace-offwhite leading-none mb-8">
              Concept
            </h1>
            <div className="w-8 h-px bg-grace-gold mx-auto mb-8" />
            <p className="font-noto-serif text-lg text-grace-stone leading-loose max-w-md mx-auto">
              美しいお菓子は、暮らしの余白に置かれた、
              小さな幸福です。
            </p>
          </div>
        </section>

        {/* ─── PHILOSOPHY ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content max-w-article mx-auto text-center">
            <div className="section-label mb-12">PHILOSOPHY</div>
            <h2 className="font-noto-serif text-2xl md:text-3xl text-grace-brown leading-relaxed mb-10 tracking-widest">
              美しい暮らしには、<br />お菓子がある。
            </h2>
            <p className="font-noto-serif text-lg text-grace-text-secondary leading-loose tracking-wide">
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
                <p className="font-noto-serif text-lg text-grace-text-secondary leading-loose">
                  素材と向き合い、気候と対話しながら、その日だけの一皿を仕上げる。<br />
                  手が加わることで、お菓子に温度と揺らぎが生まれると信じているから。
                </p>
              </div>
              {/* 仮写真（撮影後差し替え） */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1593353994452-97b4560c50c2?w=800&q=80&auto=format&fit=crop"
                  alt="Pâtisserie Grace のカヌレ"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── PHILOSOPHY（テキストのみ） ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content max-w-2xl mx-auto">
            <span
              className="block font-noto-sans tracking-[6px] text-grace-brown/50 mb-10 text-center text-[11px]"
            >
              CONCEPT
            </span>
            <h2
              className="font-cormorant italic text-grace-brown leading-none mb-10 text-center text-5xl md:text-6xl"
              style={{ fontWeight: 300 }}
            >
              Philosophy
            </h2>
            <p className="font-noto-serif text-lg md:text-xl text-grace-brown/80 leading-[2.2] mb-12 text-center">
              厳選した素材と、丁寧な手仕事。<br />
              お菓子は、日常に小さな豊かさを<br />
              もたらすものだと信じています。
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['やさしさ', '余白', '季節', '香り', '素材', '手仕事', '豊かさ'].map((word) => (
                <span
                  key={word}
                  className="font-noto-serif text-base text-grace-brown/70 border border-grace-brown/30 px-6 py-3 tracking-wider"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRODUCT PHILOSOPHY ─── */}
        <section className="relative overflow-hidden section-padding bg-grace-bg-dark">
          {/* 背景写真: 黒背景のカラフルなマカロン */}
          <Image
            src="https://images.pexels.com/photos/4600651/pexels-photo-4600651.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
            crossOrigin="anonymous"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-grace-bg-dark/75" aria-hidden="true" />
          <div className="relative z-10 container-content">
            <div className="section-label mb-12 text-grace-text-tertiary">PRODUCT PHILOSOPHY</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  label: '香り',
                  en: 'Aroma',
                  text: '見た目と同時に鼻に届く香り。バターの豊かさ、柑橘の清潔感、スパイスの奥行き。食べる前から始まる体験を大切にしています。',
                },
                {
                  label: '食感',
                  en: 'Texture',
                  text: 'サクッとほろりと、もちもちとしっとり。口の中で変わりゆく食感のグラデーションが、一口を特別なものにします。',
                },
                {
                  label: '余韻',
                  en: 'Aftertaste',
                  text: '食べ終わったあとも続く、あのおいしさ。しつこくなく、でも確かに残る余韻に、素材の純粋さが現れます。',
                },
              ].map(({ label, en, text }) => (
                <div key={label} className="text-center">
                  <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-2">{en}</p>
                  <h3 className="font-noto-serif text-2xl text-grace-offwhite mb-4">{label}</h3>
                  <div className="w-6 h-px bg-grace-gold mx-auto mb-6" />
                  <p className="font-noto-serif text-base text-grace-stone leading-loose">{text}</p>
                </div>
              ))}
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
