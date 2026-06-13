'use client'

// コンセプトページ — 本番コピーに全面差し替え（2026-06-12）
// デザインシステム: rise アニメーション・ボタニカルSVG・Label/Btn コンポーネントを page.tsx と統一
// 注意: 'use client' コンポーネントでは dynamic エクスポートは無効（Next.js 14 仕様）。
//       静的ビルドで問題ない（Notionデータ不要）ため、dynamic 宣言は不要。

import { useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'

// ============ IntersectionObserver で .rise に .in を付与 ============
function RiseObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.rise')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return null
}


// ============ ラベル（page.tsx と同一設計） ============
function Label({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontStyle: 'italic',
        fontWeight: 300,
        fontSize: '13px',
        letterSpacing: '0.42em',
        color: '#B8956A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: center ? 'center' : undefined,
        gap: '16px',
      }}
    >
      <span style={{ width: '42px', height: '1px', background: '#B8956A', flexShrink: 0, display: 'inline-block' }} />
      {children}
      {center && <span style={{ width: '42px', height: '1px', background: '#B8956A', flexShrink: 0, display: 'inline-block' }} />}
    </p>
  )
}

// ============ ボタニカルSVG定義（非表示） ============
function BotanicalDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <g id="c-vanilla" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path pathLength={1} d="M8 40 C 14 20, 26 10, 40 8 C 30 14, 22 26, 18 40" />
          <path pathLength={1} d="M30 33 c 2 -3 5 -4 8 -3 c -1 3 -4 5 -8 3 z" />
        </g>
        <g id="c-herb" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path pathLength={1} d="M24 42 C 24 30, 24 18, 24 8" />
          <path pathLength={1} d="M24 34 c -5 -1 -9 -5 -9 -10 c 5 1 9 5 9 10 z" />
          <path pathLength={1} d="M24 26 c 5 -1 9 -5 9 -10 c -5 1 -9 5 -9 10 z" />
          <path pathLength={1} d="M24 18 c -4 -1 -7 -4 -7 -8 c 4 1 7 4 7 8 z" />
        </g>
        <g id="c-citrus" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          <circle pathLength={1} cx="24" cy="24" r="15" />
          <line pathLength={1} x1="24" y1="9.5" x2="24" y2="38.5" />
          <line pathLength={1} x1="9.5" y1="24" x2="38.5" y2="24" />
          <line pathLength={1} x1="14" y1="14" x2="34" y2="34" />
          <line pathLength={1} x1="34" y1="14" x2="14" y2="34" />
        </g>
      </defs>
    </svg>
  )
}

// ============ ボタニカルセパレーター ============
function Sep({ motif }: { motif: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 'clamp(40px,6vw,72px) 0' }}>
      <svg className="draw rise" viewBox="0 0 48 48" width="64" height="64" style={{ color: '#B8956A', opacity: 0.9 }} aria-hidden="true">
        <use href={`#${motif}`} />
      </svg>
    </div>
  )
}

// ============ メインページ ============
export default function ConceptPage() {
  return (
    <>
      <BotanicalDefs />
      <RiseObserver />
      <Header />

      <main>

        {/* ===== 1. PHILOSOPHY ===== */}
        <section
          style={{
            minHeight: '56svh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(70px,10vw,130px) 24px clamp(50px,7vw,90px)',
            textAlign: 'center',
            borderBottom: '1px solid color-mix(in srgb, var(--ink) 10%, var(--bg))',
          }}
        >
          <div className="rise">
            {/* ラベル: PHILOSOPHY */}
            <Label center>PHILOSOPHY</Label>
            <h2
              style={{
                fontFamily: "'Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
                fontWeight: 500,
                fontSize: 'clamp(20px,3.2vw,30px)',
                letterSpacing: '0.16em',
                lineHeight: 1.8,
                marginTop: '28px',
              }}
            >
              香りは、時間とともに立ちのぼる。
            </h2>
            <p
              style={{
                marginTop: '24px',
                fontSize: '14px',
                lineHeight: 2.2,
                letterSpacing: '0.08em',
                color: 'color-mix(in srgb, var(--ink) 70%, var(--bg))',
                maxWidth: '440px',
                margin: '24px auto 0',
              }}
            >
              焦がしバター、バニラ、柑橘、ハーブ。Graceのお菓子は、香りから設計します。食べ終えたあとの余韻までが、ひとつの体験。
            </p>
            <h1
              style={{
                fontFamily: "'Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
                fontWeight: 500,
                fontSize: 'clamp(26px,4.4vw,46px)',
                letterSpacing: '0.18em',
                lineHeight: 1.7,
                marginTop: '28px',
              }}
            >
              美しい暮らしには、お菓子がある。
            </h1>
            <p
              style={{
                marginTop: '32px',
                fontSize: '14px',
                lineHeight: 2.2,
                letterSpacing: '0.1em',
                color: 'color-mix(in srgb, var(--ink) 70%, var(--bg))',
                maxWidth: '440px',
                margin: '32px auto 0',
              }}
            >
              贈り物に、特別な日に、何気ない朝に。<br />
              暮らしに深みを添えるお菓子を、ここで作ります。
            </p>
          </div>
        </section>

        {/* ===== 2. CRAFTSMANSHIP（縦書きキャッチ + サイドテキスト + イメージ写真） ===== */}
        <section
          style={{
            minHeight: '78svh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(28px,5vw,80px)',
            padding: 'clamp(70px,9vw,120px) clamp(24px,5vw,60px)',
            flexWrap: 'wrap',
          }}
        >
          {/* 縦書きキャッチ */}
          <div
            className="rise"
            style={{
              display: 'flex',
              gap: 'clamp(22px,3.4vw,40px)',
              maxHeight: '62svh',
              flexShrink: 0,
            }}
          >
            <p
              style={{
                writingMode: 'vertical-rl',
                letterSpacing: '0.34em',
                lineHeight: 2.6,
                fontSize: 'clamp(20px,3vw,27px)',
                fontWeight: 500,
                fontFamily: "'Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
              }}
            >
              こだわりの素材と製法
            </p>
          </div>

          {/* サイドテキスト */}
          <div className="rise" data-d="2" style={{ maxWidth: '300px', flexShrink: 0 }}>
            <Label>Dedicated Handcraft</Label>
            <p style={{ marginTop: '24px', fontSize: '14px', lineHeight: 2.1 }}>
              素材と向き合い、気候と対話しながら、その日だけの一品を仕上げる。
              手が加わることで、お菓子に温度と揺らぎが生まれると信じているから。
            </p>
          </div>

          {/* イメージ写真 */}
          <div
            className="rise"
            data-d="3"
            style={{
              width: 'clamp(200px,28vw,360px)',
              aspectRatio: '3 / 4',
              flexShrink: 0,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* 写真ファイルを /public/images/craftsmanship.jpg に配置するだけで差し替え可 */}
            <img
              src="/images/craftsmanship.jpg"
              alt="こだわりの素材と製法 — Grace"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              onError={(e) => {
                // 写真未配置時はプレースホルダーを表示
                const el = e.currentTarget
                el.style.display = 'none'
                const parent = el.parentElement
                if (parent && !parent.querySelector('.img-placeholder')) {
                  const ph = document.createElement('div')
                  ph.className = 'img-placeholder'
                  ph.style.cssText = 'width:100%;height:100%;background:color-mix(in srgb,var(--ink) 6%,var(--bg));display:flex;align-items:center;justify-content:center;'
                  const txt = document.createElement('span')
                  txt.style.cssText = 'font-size:11px;letter-spacing:.2em;color:color-mix(in srgb,var(--ink) 35%,var(--bg));font-family:Cormorant Garamond,Georgia,serif;font-style:italic'
                  txt.textContent = 'PHOTO'
                  ph.appendChild(txt)
                  parent.appendChild(ph)
                }
              }}
            />
            <div style={{
              position: 'absolute',
              right: '10px',
              bottom: '10px',
              background: 'rgba(0,0,0,0.45)',
              color: '#fff',
              fontSize: '9px',
              letterSpacing: '0.18em',
              padding: '3px 7px',
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontStyle: 'italic',
              pointerEvents: 'none',
            }}>
              PLACEHOLDER
            </div>
          </div>
        </section>

        <Sep motif="c-herb" />

        {/* ===== 3. A NOTE FROM GRACE ===== */}
        <section
          style={{
            borderTop: '1px solid color-mix(in srgb, var(--ink) 10%, var(--bg))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(36px,6vw,100px)',
            padding: 'clamp(70px,9vw,120px) clamp(24px,5vw,80px)',
            flexWrap: 'wrap',
          }}
        >
          {/* イメージ写真 */}
          <div
            className="rise"
            data-d="1"
            style={{
              width: 'clamp(200px,26vw,340px)',
              aspectRatio: '3 / 4',
              flexShrink: 0,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img
              src="/images/note-from-grace.jpg"
              alt="お菓子が、誰かの大切な日の横にいる — Grace"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => {
                const el = e.currentTarget
                el.style.display = 'none'
                const parent = el.parentElement
                if (parent && !parent.querySelector('.img-placeholder')) {
                  const ph = document.createElement('div')
                  ph.className = 'img-placeholder'
                  ph.style.cssText = 'width:100%;height:100%;background:color-mix(in srgb,var(--ink) 6%,var(--bg));display:flex;align-items:center;justify-content:center;'
                  const txt = document.createElement('span')
                  txt.style.cssText = 'font-size:11px;letter-spacing:.2em;color:color-mix(in srgb,var(--ink) 35%,var(--bg));font-family:Cormorant Garamond,Georgia,serif;font-style:italic'
                  txt.textContent = 'PHOTO'
                  ph.appendChild(txt)
                  parent.appendChild(ph)
                }
              }}
            />
            <div style={{
              position: 'absolute',
              right: '10px',
              bottom: '10px',
              background: 'rgba(0,0,0,0.45)',
              color: '#fff',
              fontSize: '9px',
              letterSpacing: '0.18em',
              padding: '3px 7px',
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontStyle: 'italic',
              pointerEvents: 'none',
            }}>
              PLACEHOLDER
            </div>
          </div>

          {/* テキスト */}
          <div className="rise" data-d="2" style={{ maxWidth: '480px', flex: '1 1 300px' }}>
            <Label>A NOTE FROM GRACE</Label>
            <h2
              style={{
                fontFamily: "'Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
                fontWeight: 500,
                fontSize: 'clamp(20px,3.2vw,30px)',
                letterSpacing: '0.16em',
                lineHeight: 1.8,
                marginTop: '32px',
              }}
            >
              お菓子が、誰かの大切な日の横にいる。
            </h2>
            <p
              style={{
                marginTop: '32px',
                fontSize: '15px',
                lineHeight: 2.3,
                letterSpacing: '0.08em',
                color: 'color-mix(in srgb, var(--ink) 75%, var(--bg))',
              }}
            >
              誕生日の朝、大事な人への手土産、何もない夜の自分へのご褒美。
              そういう場面に、確かに美しいものを届けたい。
              その思いだけを軸に、Graceは生まれました。
            </p>
            <p
              style={{
                marginTop: '40px',
                fontSize: '13px',
                letterSpacing: '0.22em',
                color: '#B8956A',
                lineHeight: 2.2,
                fontFamily: "'Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
              }}
            >
              素材に誠実に。季節に正直に。来てくれた人に丁寧に。
            </p>
          </div>

        </section>

        <Sep motif="c-citrus" />

        {/* ===== 4. PRODUCT PHILOSOPHY ===== */}
        <section
          style={{
            padding: 'clamp(60px,8vw,110px) clamp(24px,6vw,80px)',
            borderTop: '1px solid color-mix(in srgb, var(--ink) 10%, var(--bg))',
          }}
        >
          <div
            className="rise"
            style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,72px)' }}
          >
            <Label center>PRODUCT PHILOSOPHY</Label>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(36px,5vw,72px)',
              maxWidth: '960px',
              margin: '0 auto',
            }}
          >
            {[
              {
                en: 'Aroma',
                ja: '香り',
                text: '見た目と同時に鼻に届く香り。バターの豊かさ、柑橘の清潔感、スパイスの奥行き。食べる前から始まる体験を大切にしています。',
                motif: 'c-vanilla',
              },
              {
                en: 'Texture',
                ja: '食感',
                text: 'サクッとほろりと、もちもちとしっとり。口の中で変わりゆく食感のグラデーションが、一口を特別なものにします。',
                motif: 'c-herb',
              },
              {
                en: 'Aftertaste',
                ja: '余韻',
                text: '食べ終わったあとも続く、あのおいしさ。しつこくなく、でも確かに残る余韻に、素材の純粋さが現れます。',
                motif: 'c-citrus',
              },
            ].map(({ en, ja, text, motif }) => (
              <div key={en} className="rise" style={{ textAlign: 'center' }}>
                {/* ボタニカルアイコン */}
                <svg
                  className="draw"
                  viewBox="0 0 48 48"
                  width="52"
                  height="52"
                  style={{ margin: '0 auto 24px', display: 'block', color: '#B8956A', opacity: 0.85 }}
                  aria-hidden="true"
                >
                  <use href={`#${motif}`} />
                </svg>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: '12px',
                    letterSpacing: '0.3em',
                    color: '#B8956A',
                    marginBottom: '10px',
                  }}
                >
                  {en}
                </p>
                <h2
                  style={{
                    fontSize: '17px',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    marginBottom: '20px',
                    fontFamily: "'Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
                  }}
                >
                  {ja}
                </h2>
                <div
                  style={{
                    width: '24px',
                    height: '1px',
                    background: '#B8956A',
                    margin: '0 auto 20px',
                  }}
                />
                <p
                  style={{
                    fontSize: '13.5px',
                    lineHeight: 2.0,
                    color: 'color-mix(in srgb, var(--ink) 72%, var(--bg))',
                    letterSpacing: '0.06em',
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 5. CTAボタン → /sweets ===== */}
        <section
          style={{
            padding: 'clamp(60px,8vw,100px) 24px',
            textAlign: 'center',
            borderTop: '1px solid color-mix(in srgb, var(--ink) 10%, var(--bg))',
          }}
        >
          <div className="rise">
            <Link
              href="/sweets"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '14px',
                letterSpacing: '0.3em',
                color: 'inherit',
                borderBottom: '1px solid #B8956A',
                padding: '0 4px 8px',
                transition: 'opacity .3s, gap .3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.55'
                e.currentTarget.style.gap = '20px'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.gap = '14px'
              }}
            >
              VIEW SWEETS
              <span style={{ fontStyle: 'normal' }}>→</span>
            </Link>
          </div>
        </section>

      </main>

      <Footer />

      {/* レスポンシブ補完 */}
      <style>{`
        @media (max-width: 640px) {
          .concept-vertical-wrap {
            max-height: none !important;
            flex-direction: column !important;
          }
        }
      `}</style>
    </>
  )
}
