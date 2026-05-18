// コンセプトページ — 静的コンテンツのみ（Notion連携なし）
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const revalidate = 86400 // 24時間

export const metadata: Metadata = {
  title: 'Concept | Grace — PATISSERIE',
  description: '美しい暮らしには、お菓子がある。Grace Patisserieのコンセプトをご紹介します。',
}

// コンセプトキーワード 7つ
const KEYWORDS = [
  { word: 'やさしさ', en: 'Kindness',     desc: '口に入れた瞬間、ほっとほどける。そんなやさしさを一粒に。' },
  { word: '余白',     en: 'Ma',            desc: '詰め込まない。引くことで生まれる、静けさと豊かさ。' },
  { word: '季節',     en: 'Season',        desc: '旬の素材が語る、今この瞬間だけのおいしさ。' },
  { word: '香り',     en: 'Aroma',         desc: '食べる前から始まる体験。香りは記憶と結びつく。' },
  { word: '素材',     en: 'Ingredient',    desc: '産地・生産者を知り、選び抜いた素材だけを使う。' },
  { word: '手仕事',   en: 'Handcraft',     desc: '機械では生まれない、手が加わることで宿る温度。' },
  { word: '豊かさ',   en: 'Richness',      desc: '値段ではなく、心が満ちる瞬間を提供する。' },
]

export default function ConceptPage() {
  return (
    <>
      <Header />
      <main>
        {/* ─── ヒーロー風ヘッダー ─── */}
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
            <h2 className="font-noto-serif text-2xl md:text-3xl text-grace-brown leading-relaxed mb-8 tracking-widest">
              美しい暮らしには、<br className="md:hidden" />お菓子がある。
            </h2>
            <p className="font-noto-serif text-sm text-grace-text-secondary leading-loose tracking-wide">
              日常の中に、確かな豊かさを。<br />
              Grace Patisserieは、そう願ってお菓子を作ります。<br /><br />
              誰かを想う贈り物、大切な時間のしつらえ、<br />
              朝の静かな一口、特別な日の記憶。<br /><br />
              お菓子はただの甘いものではなく、<br />
              暮らしに深みをそえ、記憶に刻まれる、<br />
              小さな、けれど確かな豊かさです。
            </p>
          </div>
        </section>

        {/* ─── Concept Keywords ─── */}
        <section className="section-padding bg-grace-cream">
          <div className="container-content">
            <div className="section-label mb-12">CONCEPT KEYWORDS</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-grace-line border border-grace-line">
              {KEYWORDS.map(({ word, en, desc }) => (
                <div key={word} className="bg-grace-offwhite p-8 hover:bg-white transition-colors">
                  <p className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-2">{en}</p>
                  <h3 className="font-noto-serif text-xl text-grace-brown mb-4">{word}</h3>
                  <p className="font-noto-serif text-xs text-grace-text-secondary leading-loose">{desc}</p>
                </div>
              ))}
              {/* 最後のセルを埋めるための空白（グリッド揃え） */}
              <div className="bg-grace-offwhite hidden lg:block" />
            </div>
          </div>
        </section>

        {/* ─── CRAFTSMANSHIP ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* テキスト */}
              <div>
                <div className="section-label mb-8">CRAFTSMANSHIP</div>
                <h2 className="font-cormorant italic text-4xl md:text-5xl text-grace-brown mb-6 leading-tight">
                  Dedicated<br />Handcraft
                </h2>
                <p className="font-noto-serif text-sm text-grace-text-secondary leading-loose mb-4">
                  Graceのお菓子は、すべて少量ずつ、手で作っています。
                  素材と向き合い、気候と対話しながら、その日だけの一皿を仕上げる。
                  手が加わることで、お菓子に温度と揺らぎが生まれると信じているから。
                </p>
                <p className="font-noto-serif text-sm text-grace-text-secondary leading-loose">
                  仕込みの前日から素材を整え、温度と湿度を見ながら、
                  その日の生地と向き合う。
                  そうした積み重ねが、ひとつひとつのお菓子に宿ります。
                </p>
              </div>
              {/* 画像プレースホルダー */}
              <div className="aspect-square bg-grace-cream flex items-center justify-center">
                <span className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary">PHOTO</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PRODUCT PHILOSOPHY ─── */}
        <section className="section-padding bg-grace-bg-dark">
          <div className="container-content">
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
                  <p className="font-noto-serif text-xs text-grace-stone leading-loose">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOUNDER MESSAGE は非公開方針のため省略 */}
      </main>
      <Footer />
    </>
  )
}
