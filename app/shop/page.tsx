// 店舗情報ページ — 臨時定休アラートはNotionから取得
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getShopAlerts } from '@/lib/notion/news'
import { formatDateJa } from '@/lib/utils/date'
import Link from 'next/link'

export const revalidate = 1800 // 30分

export const metadata: Metadata = {
  title: 'Shop Info | Grace — PATISSERIE',
  description: 'Grace Patisserie の店舗情報。営業時間・アクセス・駐車場。愛知県春日井市。',
}

export default async function ShopPage() {
  // 臨時定休アラートを取得（失敗時は空配列）
  const alerts = await getShopAlerts().catch(() => [])

  return (
    <>
      <Header />
      <main>
        {/* ─── 臨時定休アラート ─── */}
        {alerts.length > 0 && (
          <div className="bg-grace-gold/10 border-b border-grace-gold/30">
            <div className="container-content py-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-grace-gold flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <div>
                    <span className="font-noto-sans text-[10px] tracking-widest text-grace-gold mr-3">
                      {formatDateJa(alert.publishedAt)}
                    </span>
                    <span className="font-noto-serif text-sm text-grace-brown">{alert.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── ページヘッダー ─── */}
        <section className="bg-grace-bg-dark section-padding">
          <div className="container-content text-center">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-6">VISIT US</p>
            <h1 className="font-cormorant italic text-5xl md:text-7xl text-grace-offwhite leading-none mb-8">
              Shop Info
            </h1>
            <div className="w-8 h-px bg-grace-gold mx-auto" />
          </div>
        </section>

        {/* ─── 店舗基本情報 ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            <div className="section-label mb-12">BASIC INFO</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* 左: 店舗情報 */}
              <div>
                <h2 className="font-cormorant italic text-3xl text-grace-brown mb-2">Grace Patisserie</h2>
                <p className="font-noto-serif text-xs text-grace-text-tertiary tracking-widest mb-8">グレース パティスリー</p>

                <dl className="space-y-6">
                  <div>
                    <dt className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-1">ADDRESS</dt>
                    <dd className="font-noto-serif text-sm text-grace-text-secondary leading-relaxed">
                      〒486-0844<br />
                      愛知県春日井市
                    </dd>
                  </div>
                  <div>
                    <dt className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-1">TEL</dt>
                    <dd>
                      <a href="tel:0000-00-0000" className="font-noto-serif text-sm text-grace-text-secondary hover:text-grace-brown transition-colors">
                        000-0000-0000
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-1">HOURS</dt>
                    <dd className="font-noto-serif text-sm text-grace-text-secondary">
                      9:30 – 19:30<br />
                      <span className="text-grace-text-tertiary text-xs">火曜定休（祝日の場合は営業、翌水曜休）</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-1">INSTAGRAM</dt>
                    <dd>
                      <a
                        href="https://www.instagram.com/grace_lifestyle_dessert"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-noto-serif text-sm text-grace-text-secondary hover:text-grace-brown transition-colors"
                      >
                        @grace_lifestyle_dessert
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* 右: 店舗写真プレースホルダー */}
              <div className="aspect-video bg-grace-cream flex items-center justify-center">
                <span className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary">SHOP PHOTO</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 営業時間詳細 ─── */}
        <section className="section-padding bg-grace-cream">
          <div className="container-content">
            <div className="section-label mb-12">HOURS</div>
            <div className="max-w-lg mx-auto">
              <table className="w-full font-noto-serif text-sm text-grace-text-secondary">
                <tbody>
                  {[
                    { day: '月曜日', time: '9:30 – 19:30' },
                    { day: '火曜日', time: '定休日', closed: true },
                    { day: '水曜日', time: '9:30 – 19:30' },
                    { day: '木曜日', time: '9:30 – 19:30' },
                    { day: '金曜日', time: '9:30 – 19:30' },
                    { day: '土曜日', time: '9:30 – 19:30' },
                    { day: '日曜日', time: '9:30 – 19:30' },
                  ].map(({ day, time, closed }) => (
                    <tr key={day} className="border-b border-grace-line">
                      <td className="py-3 pr-8 text-grace-text-secondary">{day}</td>
                      <td className={`py-3 ${closed ? 'text-grace-text-tertiary' : 'text-grace-brown'}`}>
                        {time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="font-noto-sans text-[10px] tracking-wide text-grace-text-tertiary mt-4">
                ※ 祝日は通常営業、翌水曜日が振替休日となります。<br />
                ※ 臨時休業や営業時間変更はInstagramにてお知らせします。
              </p>
            </div>
          </div>
        </section>

        {/* ─── Google Maps ─── */}
        <section className="bg-grace-offwhite">
          <div className="container-content py-0">
            <div className="section-label py-12">ACCESS MAP</div>
          </div>
          <div className="w-full aspect-video max-h-[480px]">
            <iframe
              title="Grace Patisserie アクセスマップ"
              src="https://maps.google.com/maps?q=愛知県春日井市&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="店舗の地図"
            />
          </div>
        </section>

        {/* ─── アクセス・駐車場 ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            <div className="section-label mb-12">ACCESS</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* 電車 */}
              <div>
                <h3 className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-4">TRAIN</h3>
                <ul className="space-y-3 font-noto-serif text-sm text-grace-text-secondary leading-relaxed">
                  <li>JR中央線「春日井駅」より徒歩約XX分</li>
                  <li>名鉄小牧線「味美駅」より徒歩約XX分</li>
                </ul>
              </div>
              {/* 駐車場 */}
              <div>
                <h3 className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-4">PARKING</h3>
                <p className="font-noto-serif text-sm text-grace-text-secondary leading-relaxed">
                  店舗横に駐車場あり（X台）<br />
                  お買い物のお客様は無料でご利用いただけます。
                </p>
              </div>
            </div>

            {/* お問い合わせ誘導 */}
            <div className="mt-16 pt-12 border-t border-grace-line text-center">
              <p className="font-noto-serif text-sm text-grace-text-secondary mb-6">
                ご不明な点はお気軽にお問い合わせください
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-noto-sans text-[10px] tracking-widest text-grace-brown border border-grace-brown px-6 py-3 hover:bg-grace-brown hover:text-grace-offwhite transition-colors"
              >
                CONTACT
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
