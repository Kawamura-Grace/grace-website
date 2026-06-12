'use client'

// コンセプトページ — page.tsxのConceptセクションを全ページ版に拡張
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

// ============ ボタニカルSVG定義（非表示） ============
function BotanicalDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <g id="c-vanilla">
          <path pathLength={1} d="M8 40 C 14 20, 26 10, 40 8 C 30 14, 22 26, 18 40" />
          <path pathLength={1} d="M30 33 c 2 -3 5 -4 8 -3 c -1 3 -4 5 -8 3 z" />
        </g>
        <g id="c-herb">
          <path pathLength={1} d="M24 42 C 24 30, 24 18, 24 8" />
          <path pathLength={1} d="M24 34 c -5 -1 -9 -5 -9 -10 c 5 1 9 5 9 10 z" />
          <path pathLength={1} d="M24 26 c 5 -1 9 -5 9 -10 c -5 1 -9 5 -9 10 z" />
          <path pathLength={1} d="M24 18 c -4 -1 -7 -4 -7 -8 c 4 1 7 4 7 8 z" />
        </g>
        <g id="c-citrus">
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

// ============ ボタニカルセパレーター ============
function Sep({ motif }: { motif: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 'clamp(40px,6vw,72px) 0' }}>
      <svg
        className="draw rise"
        viewBox="0 0 48 48"
        width="64"
        height="64"
        style={{ opacity: 0.9 }}
        aria-hidden="true"
      >
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

        {/* ===== 1. ページヘッダー ===== */}
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
            <Label center>Concept</Label>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(38px,6vw,64px)',
                letterSpacing: '0.08em',
                marginTop: '24px',
                lineHeight: 1.15,
              }}
            >
              ブランド理念
            </h1>
          </div>
        </section>

        {/* ===== 2. メインコンセプト（縦書きキャッチ + サイドテキスト） ===== */}
        <section
          style={{
            minHeight: '78svh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(36px,7vw,110px)',
            padding: 'clamp(70px,9vw,120px) 24px',
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
            }}
          >
            <p
              style={{
                writingMode: 'vertical-rl',
                letterSpacing: '0.34em',
                lineHeight: 2.6,
                fontSize: 'clamp(20px,3vw,27px)',
                fontWeight: 500,
              }}
            >
              香りは、時間とともに立ちのぼる。
            </p>
          </div>

          {/* サイドテキスト */}
          <div className="rise" data-d="2" style={{ maxWidth: '340px' }}>
            <Label>Concept</Label>
            <p style={{ marginTop: '24px', fontSize: '14px', lineHeight: 2.1 }}>
              焦がしバター、バニラ、柑橘、ハーブ。Graceのお菓子は、香りから設計します。
              食べ終えたあとの余韻までが、ひとつの体験。
            </p>
            <p style={{ marginTop: '16px', fontSize: '14px', lineHeight: 2.1 }}>
              かしこまった日のためではなく、いつもの暮らしのなかの、少し美しい時間のために。
              日常にも、贈りものにも寄り添うパティスリーです。
            </p>
          </div>
        </section>

        {/* ===== 3. 7つのキーワード ===== */}
        <section
          style={{
            padding: 'clamp(50px,7vw,90px) 24px',
            borderTop: '1px solid color-mix(in srgb, var(--ink) 10%, var(--bg))',
            borderBottom: '1px solid color-mix(in srgb, var(--ink) 10%, var(--bg))',
          }}
        >
          <div
            className="rise"
            style={{
              maxWidth: '760px',
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'clamp(12px,2vw,22px)',
              justifyContent: 'center',
            }}
          >
            {['やさしさ', '余白', '季節', '香り', '素材', '手仕事', '豊かさ'].map((word) => (
              <span
                key={word}
                style={{
                  fontFamily: "'Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
                  fontSize: '14px',
                  letterSpacing: '0.26em',
                  color: 'color-mix(in srgb, var(--ink) 70%, var(--bg))',
                  border: '1px solid color-mix(in srgb, var(--ink) 22%, var(--bg))',
                  padding: '14px 28px',
                  display: 'inline-block',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </section>

        {/* ===== 4. ブランドストーリー ===== */}
        <section
          style={{
            padding: 'clamp(70px,9vw,120px) 24px',
            maxWidth: '680px',
            margin: '0 auto',
          }}
        >
          <div className="rise">
            <Label>Brand Story</Label>
            <p
              style={{
                marginTop: '36px',
                fontSize: '15px',
                lineHeight: 2.3,
                letterSpacing: '0.08em',
              }}
            >
              パティスリー Graceは、2026年秋、愛知県春日井市に開業します。
            </p>
            <p
              style={{
                marginTop: '24px',
                fontSize: '15px',
                lineHeight: 2.3,
                letterSpacing: '0.08em',
                color: 'color-mix(in srgb, var(--ink) 75%, var(--bg))',
              }}
            >
              お菓子は、食べるその瞬間だけでなく、一口目から立ちのぼる香り、
              食べ終えたあとにふと思い出すあの余韻まで含めて、ひとつの体験です。
              Graceのお菓子は、その余韻を設計することから始まります。
            </p>
            <p
              style={{
                marginTop: '24px',
                fontSize: '15px',
                lineHeight: 2.3,
                letterSpacing: '0.08em',
                color: 'color-mix(in srgb, var(--ink) 75%, var(--bg))',
              }}
            >
              記念日だけのお菓子ではなく、いつもの暮らしに溶け込む、
              「今日もGraceにしよう」と思ってもらえるような店でありたいと考えています。
            </p>
          </div>
        </section>

        {/* ===== 5. ボタニカルセパレーター ===== */}
        <Sep motif="c-citrus" />

        {/* ===== 6. 3つの柱 ===== */}
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
            <Label center>Our Values</Label>
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
                en: 'Aroma First',
                ja: '香りから設計する',
                text: 'バニラ、柑橘、ハーブ。素材の香りを最大限に引き出す製法で、一口目から余韻まで設計されたお菓子を作ります。',
                motif: 'c-vanilla',
              },
              {
                en: 'Everyday Luxury',
                ja: '日常に寄り添う',
                text: '記念日だけでなく、何気ない日の豊かさのために。手に取りやすく、それでいて特別な一品を。',
                motif: 'c-herb',
              },
              {
                en: 'Craft & Ingredient',
                ja: '手仕事と素材',
                text: '機械ラインではなく、手仕事で丁寧に。厳選した素材と誠実な製法が、Graceの品質を支えています。',
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
                  style={{ margin: '0 auto 24px', opacity: 0.85 }}
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

        {/* ===== 7. CTAボタン → /shop ===== */}
        <section
          style={{
            padding: 'clamp(60px,8vw,100px) 24px',
            textAlign: 'center',
            borderTop: '1px solid color-mix(in srgb, var(--ink) 10%, var(--bg))',
          }}
        >
          <div className="rise">
            <p
              style={{
                fontFamily: "'Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
                fontSize: '14px',
                letterSpacing: '0.18em',
                color: 'color-mix(in srgb, var(--ink) 65%, var(--bg))',
                marginBottom: '36px',
              }}
            >
              Graceのお菓子に会いに来てください。
            </p>
            <Link
              href="/shop"
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
              Shop Info
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
