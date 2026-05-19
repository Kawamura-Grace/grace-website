// ギフトページ — 静的コンテンツ
import type { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const revalidate = 86400 // 24時間

export const metadata: Metadata = {
  title: 'Gift | Grace — PATISSERIE',
  description: 'Pâtisserie Graceのギフトサービス。化粧箱・熨斗・メッセージカード対応。法人ギフトのご相談も承ります。',
}

export default function GiftPage() {
  return (
    <>
      <Header />
      <main>
        {/* ─── ヒーロー見出し ─── */}
        <section className="bg-grace-bg-dark section-padding">
          <div className="container-content text-center">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-6">FOR SPECIAL MOMENTS</p>
            <h1 className="font-cormorant italic text-5xl md:text-7xl text-grace-offwhite leading-none mb-8">
              Gift
            </h1>
            <div className="w-8 h-px bg-grace-gold mx-auto mb-8" />
            <p className="font-noto-serif text-base text-grace-stone leading-loose max-w-md mx-auto">
              大切な人への気持ちを、美しい贈り物に。<br />
              Pâtisserie Graceの贈り物は、開ける瞬間から体験が始まります。
            </p>
          </div>
        </section>

        {/* ─── ギフト包装 ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            <div className="section-label mb-12">WRAPPING</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* テキスト */}
              <div>
                <h2 className="font-cormorant italic text-4xl text-grace-brown mb-6">
                  Beautiful Packaging
                </h2>
                <p className="font-noto-serif text-base text-grace-text-secondary leading-loose mb-6">
                  Graceのギフトボックスは、受け取った瞬間の喜びを大切に設計しています。
                  落ち着いたトーンの化粧箱と、ブランドロゴをあしらった帯紙で、
                  そのままお渡しいただけるクオリティに仕上げています。
                </p>
                <ul className="space-y-3 font-noto-serif text-base text-grace-text-secondary">
                  {[
                    { label: '化粧箱', desc: 'ブランドカラーの上品なボックス。単品・詰め合わせ両対応' },
                    { label: '帯紙',   desc: 'Graceロゴ入り。季節・目的に応じたデザインをご用意' },
                    { label: '袋',     desc: 'ショッパー付き。手提げ袋のお渡しも可能' },
                  ].map(({ label, desc }) => (
                    <li key={label} className="flex gap-4">
                      <span className="font-noto-sans text-[10px] tracking-widest text-grace-gold w-12 flex-shrink-0 mt-0.5">{label}</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* 仮写真（撮影後差し替え） */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1592903297149-37fb25202dfa?w=800&q=80&auto=format&fit=crop"
                  alt="Pâtisserie Grace ギフト包装"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* WRAPPING直下CTA — 開業後に ONLINE STORE リンクへ差し替え */}
            <div className="mt-12 text-center">
              <p className="font-noto-serif text-sm text-grace-text-tertiary mb-3">
                オンラインストアは2026年10月開業時にオープン予定です。
              </p>
              <a
                href="https://www.instagram.com/grace_lifestyle_dessert"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-noto-sans text-[10px] tracking-widest text-grace-text-secondary border border-grace-line px-8 py-4 hover:border-grace-brown hover:text-grace-brown transition-all duration-300"
              >
                Instagram で最新情報を見る →
              </a>
            </div>
          </div>
        </section>

        {/* ─── 熨斗・メッセージカード ─── */}
        <section className="section-padding bg-grace-cream">
          <div className="container-content">
            <div className="section-label mb-12">NOSHI &amp; MESSAGE</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* 熨斗 */}
              <div className="bg-grace-offwhite p-8 border border-grace-line">
                <h3 className="font-cormorant italic text-2xl text-grace-brown mb-2">Noshi</h3>
                <p className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-4">熨斗対応</p>
                <p className="font-noto-serif text-base text-grace-text-secondary leading-loose">
                  御祝・御礼・粗品など、各種熨斗に対応しております。
                  ご注文時にご希望の表書きと名入れをお知らせください。
                </p>
                <ul className="mt-4 space-y-1 font-noto-serif text-sm text-grace-text-tertiary">
                  <li>御祝・御礼・粗品・寸志</li>
                  <li>内祝・快気祝・引き出物</li>
                  <li>その他ご要望に対応可能</li>
                </ul>
              </div>
              {/* メッセージカード */}
              <div className="bg-grace-offwhite p-8 border border-grace-line">
                <h3 className="font-cormorant italic text-2xl text-grace-brown mb-2">Message</h3>
                <p className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-4">メッセージカード</p>
                <p className="font-noto-serif text-base text-grace-text-secondary leading-loose">
                  Graceオリジナルのメッセージカードに、
                  お好きなメッセージを手書きでお入れします。
                  誕生日・記念日・季節のご挨拶など、気持ちをかたちに。
                </p>
                <p className="mt-4 font-noto-serif text-sm text-grace-text-tertiary">
                  文字数: 最大100文字程度<br />
                  ご注文時の備考欄にご記入ください
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 配送サービス ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            <div className="section-label mb-12">DELIVERY</div>
            <div className="max-w-2xl mx-auto">
              <h2 className="font-cormorant italic text-3xl text-grace-brown mb-6">Nationwide Delivery</h2>
              <p className="font-noto-serif text-base text-grace-text-secondary leading-loose mb-8">
                オンラインストアでご購入いただいたギフト商品は、全国への配送に対応しています。
                クール便・常温便どちらも対応。お日にちの指定も承りますので、
                大切な記念日に合わせてお届けします。
              </p>
              <dl className="space-y-4">
                {[
                  { label: '配送エリア', value: '全国（離島・一部地域を除く）' },
                  { label: '配送方法',   value: '常温便・冷蔵便（商品により異なります）' },
                  { label: '日時指定',   value: '可能（ご注文時に備考欄にてご指定ください）' },
                  { label: '送料',       value: '全国一律 / 一定金額以上は送料無料（詳細はオンラインストアにて）' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-4 py-3 border-b border-grace-line">
                    <dt className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary w-24 flex-shrink-0">{label}</dt>
                    <dd className="font-noto-serif text-base text-grace-text-secondary">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ─── 法人ギフト → Contact誘導 ─── */}
        <section className="section-padding bg-grace-bg-dark">
          <div className="container-content text-center">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-6">CORPORATE GIFT</p>
            <h2 className="font-cormorant italic text-4xl text-grace-offwhite mb-6">
              For Corporate
            </h2>
            <p className="font-noto-serif text-base text-grace-stone leading-loose mb-10 max-w-md mx-auto">
              大量注文・のし対応・個別包装など、法人様向けのギフトご相談を承ります。
              周年記念・お歳暮・催事などにぜひご活用ください。
            </p>
            <Link
              href="/contact?category=法人ギフト"
              className="inline-flex items-center gap-2 font-noto-sans text-[10px] tracking-widest text-grace-offwhite border border-grace-offwhite px-8 py-4 hover:bg-grace-offwhite hover:text-grace-brown transition-all duration-300"
            >
              CORPORATE INQUIRY
            </Link>
          </div>
        </section>

        {/* ─── Online Store予告 — 開業後にEC誘導へ差し替え ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content text-center">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-6">ONLINE STORE</p>
            <h2 className="font-cormorant italic text-3xl text-grace-brown mb-6">
              Coming Soon
            </h2>
            <p className="font-noto-serif text-base text-grace-text-secondary leading-loose mb-10 max-w-md mx-auto">
              オンラインストアは2026年10月の開業に合わせてオープン予定です。<br />
              Instagramで先行情報をお届けしています。
            </p>
            <a
              href="https://www.instagram.com/grace_lifestyle_dessert"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-noto-sans text-[10px] tracking-widest text-grace-offwhite bg-grace-brown px-8 py-4 hover:bg-grace-text-secondary transition-colors"
            >
              Instagram をフォローする →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
