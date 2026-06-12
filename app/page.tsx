'use client'

import { useEffect, useRef, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { usePhase } from '@/lib/hooks/usePhase'

export const dynamic = 'force-dynamic'

// ============ フェーズ別メッセージ ============
const PHASES = {
  morning: { t: 'MORNING', msg: '焼き上がりの時間。ショーケースに、今日の一段目が並びはじめます。' },
  day:     { t: 'MIDDAY',  msg: 'ショーケースがいちばん賑やかな時間です。' },
  dusk:    { t: 'EVENING', msg: '日が傾いてきました。本日のお菓子は、残りわずかです。' },
  night:   { t: 'CLOSED',  msg: '本日は閉店いたしました。また明日、9:30にお会いしましょう。' },
} as const

// ============ ショーケースデータ ============
const ITEMS = ['チーズケーキ', 'ショートケーキ', '季節のタルト', 'フィナンシェ', 'マドレーヌ', 'クッキー缶']
const IMGS = ['6607325', '10311435', '6605303', '797761', '10511210', '5985991'].map(
  (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600`
)
const STOCK = {
  morning: ['焼き上がり', '準備中', '準備中', '焼き上がり', '在庫あり', '在庫あり'],
  day:     ['在庫あり', '在庫あり', '在庫あり', '在庫あり', '在庫あり', '在庫あり'],
  dusk:    ['残りわずか', '残りわずか', '完売', '在庫あり', '残りわずか', '在庫あり'],
  night:   ['本日終了', '本日終了', '本日終了', '本日終了', '本日終了', '本日終了'],
} as const

function badgeBorder(s: string) {
  if (s === '残りわずか') return '#B8956A'
  if (s === '完売' || s === '本日終了') return undefined
  if (s === '焼き上がり') return '#7B8B6F'
  return 'color-mix(in srgb, var(--ink) 25%, var(--bg))'
}
function badgeColor(s: string) {
  if (s === '残りわずか') return '#B8956A'
  if (s === '完売' || s === '本日終了') return 'color-mix(in srgb, var(--ink) 65%, var(--bg))'
  if (s === '焼き上がり') return '#7B8B6F'
  return 'color-mix(in srgb, var(--ink) 65%, var(--bg))'
}

// ============ IntersectionObserver セットアップ ============
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

// ============ ボタニカルSVG定義 ============
function BotanicalDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <g id="m-vanilla">
          <path pathLength={1} d="M8 40 C 14 20, 26 10, 40 8 C 30 14, 22 26, 18 40" />
          <path pathLength={1} d="M30 33 c 2 -3 5 -4 8 -3 c -1 3 -4 5 -8 3 z" />
        </g>
        <g id="m-citrus">
          <circle pathLength={1} cx="24" cy="24" r="15" />
          <line pathLength={1} x1="24" y1="9.5" x2="24" y2="38.5" />
          <line pathLength={1} x1="9.5" y1="24" x2="38.5" y2="24" />
          <line pathLength={1} x1="14" y1="14" x2="34" y2="34" />
          <line pathLength={1} x1="34" y1="14" x2="14" y2="34" />
        </g>
        <g id="m-herb">
          <path pathLength={1} d="M24 42 C 24 30, 24 18, 24 8" />
          <path pathLength={1} d="M24 34 c -5 -1 -9 -5 -9 -10 c 5 1 9 5 9 10 z" />
          <path pathLength={1} d="M24 26 c 5 -1 9 -5 9 -10 c -5 1 -9 5 -9 10 z" />
          <path pathLength={1} d="M24 18 c -4 -1 -7 -4 -7 -8 c 4 1 7 4 7 8 z" />
        </g>
        <g id="m-butter">
          <path pathLength={1} d="M10 32 h 28 v 8 h -28 z" />
          <path pathLength={1} d="M14 32 c 0 -8 4 -14 10 -16 c 6 2 10 8 10 16" />
          <path pathLength={1} d="M24 10 c 1.5 2.5 1.5 4.5 0 6 c -1.5 -1.5 -1.5 -3.5 0 -6 z" />
        </g>
        <g id="m-fruit">
          <circle pathLength={1} cx="22" cy="28" r="11" />
          <path pathLength={1} d="M22 17 c 0 -4 2 -7 6 -8" />
          <path pathLength={1} d="M22 14 c 4 -3 8 -3 11 0 c -3 3 -7 3 -11 0 z" />
        </g>
        <g id="m-milk">
          <path pathLength={1} d="M17 12 h 14 l 3 8 v 20 h -20 v -20 z" />
          <path pathLength={1} d="M14 26 c 4 -3 8 3 12 0 c 3 -2 5 -1 8 1" />
        </g>
      </defs>
    </svg>
  )
}

// ============ 香気モチーフ（フィラー的SVG区切り線） ============
function Sep({ motif }: { motif: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 'clamp(40px,6vw,72px) 0' }}>
      <svg className="draw rise" viewBox="0 0 48 48" width="64" height="64" style={{ opacity: 0.9 }} aria-hidden="true">
        <use href={`#${motif}`} />
      </svg>
    </div>
  )
}

// ============ 商品プレースホルダー ============
function Ph({
  src,
  alt,
  aspectRatio = '4/5',
  style: extraStyle,
}: {
  src?: string
  alt?: string
  aspectRatio?: string
  style?: React.CSSProperties
}) {
  const [failed, setFailed] = useState(false)
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(150deg, color-mix(in srgb, var(--ink) 10%, var(--bg)), color-mix(in srgb, var(--ink) 20%, var(--bg)))',
        aspectRatio,
        width: '100%',
        ...extraStyle,
      }}
    >
      {/* PHOTOテキスト（フォールバック） */}
      {(!src || failed) && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            letterSpacing: '0.5em',
            fontSize: '11px',
            color: 'color-mix(in srgb, var(--ink) 32%, var(--bg))',
            textIndent: '0.5em',
          }}
        >
          PHOTO
        </div>
      )}
      {src && !failed && (
        <>
          <img
            src={src}
            alt={alt ?? ''}
            loading="lazy"
            onError={() => setFailed(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1,
              filter: 'saturate(.82) contrast(.96)',
              transition: 'transform 6s ease',
            }}
          />
          <span
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              zIndex: 2,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontSize: '8.5px',
              letterSpacing: '0.26em',
              color: 'rgba(247,243,239,.85)',
              background: 'rgba(44,36,33,.5)',
              padding: '3px 9px',
              backdropFilter: 'blur(2px)',
            }}
          >
            PLACEHOLDER
          </span>
        </>
      )}
    </div>
  )
}

// ============ ラベル ============
function Label({ children }: { children: React.ReactNode }) {
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
        gap: '16px',
      }}
    >
      <span style={{ width: '42px', height: '1px', background: '#B8956A', flexShrink: 0, display: 'inline-block' }} />
      {children}
    </p>
  )
}

// ============ CTAボタン ============
function Btn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
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
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.gap = '20px' }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.gap = '14px' }}
    >
      {children}
      <span style={{ fontStyle: 'normal' }}>→</span>
    </a>
  )
}

// ============ Shop dl行コンポーネント（Reactキー問題回避） ============
function ShopDtDd({ dt, dd }: { dt: string; dd: string }) {
  return (
    <>
      <dt style={{ color: '#B8956A', letterSpacing: '0.22em', whiteSpace: 'nowrap' }}>{dt}</dt>
      <dd>{dd}</dd>
    </>
  )
}

// ============ メインページ ============
export default function HomePage() {
  const { phase } = usePhase()
  const phaseData = PHASES[phase]
  const isOpen = (() => {
    if (typeof window === 'undefined') return false
    const d = new Date()
    const t = d.getHours() * 60 + d.getMinutes()
    return t >= 570 && t < 1170
  })()

  return (
    <>
      <BotanicalDefs />
      <RiseObserver />
      <Header />

      <main>
        {/* ===== Hero ===== */}
        <section
          id="top"
          style={{
            position: 'relative',
            minHeight: '100svh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* ヒーロー背景グロー */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              transition: 'opacity 2s',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '-20%',
                background: 'radial-gradient(ellipse 60% 50% at 50% 28%, var(--glow), transparent 65%), radial-gradient(ellipse 70% 60% at 18% 80%, var(--glow2), transparent 70%)',
              }}
            />
          </div>

          {/* vapor（光の拡散） */}
          <div
            className="vapor"
            aria-hidden="true"
            style={{
              left: '18%', bottom: '6%',
              width: '34vmin', height: '34vmin',
              background: 'var(--glow)',
              animationDelay: '0s',
            }}
          />
          <div
            className="vapor"
            aria-hidden="true"
            style={{
              left: '58%', bottom: '-4%',
              width: '46vmin', height: '46vmin',
              background: 'var(--glow)',
              animationDelay: '5s',
            }}
          />
          <div
            className="vapor"
            aria-hidden="true"
            style={{
              left: '38%', bottom: '12%',
              width: '24vmin', height: '24vmin',
              background: 'var(--glow2)',
              animationDelay: '9s',
            }}
          />

          {/* ヒーロー本文 */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px' }}>
            {/* 場所 */}
            <p
              className="rise"
              data-d="1"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(11px,1.6vw,13px)',
                letterSpacing: '0.46em',
                color: '#B8956A',
                marginBottom: '24px',
                textIndent: '0.46em',
              }}
            >
              PÂTISSERIE — KASUGAI, AICHI
            </p>

            {/* ロゴ */}
            <div
              className="rise"
              data-d="2"
              style={{ display: 'flex', justifyContent: 'center', margin: '0 auto 40px' }}
            >
              <img
                className="logo-d"
                src="/logo/Grace縦ダークブラウン版.png"
                alt="Grace"
                style={{ width: 'min(190px,44vw)', height: 'auto', transition: 'opacity 1.2s' }}
              />
              <img
                className="logo-w"
                src="/logo/Grace縦白版.png"
                alt="Grace"
                style={{ width: 'min(190px,44vw)', height: 'auto', transition: 'opacity 1.2s' }}
              />
            </div>

            {/* タグライン */}
            <p
              className="rise"
              data-d="3"
              style={{
                fontSize: 'clamp(15px,2.4vw,19px)',
                letterSpacing: '0.32em',
                textIndent: '0.32em',
              }}
            >
              美しい暮らしには、お菓子がある。
            </p>

            {/* 開業日 */}
            <p
              className="rise"
              data-d="4"
              style={{
                marginTop: '30px',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(12.5px,1.8vw,15px)',
                letterSpacing: '0.34em',
                color: '#B8956A',
              }}
            >
              Grand Open
              <span
                style={{
                  display: 'block',
                  fontStyle: 'normal',
                  fontSize: 'clamp(20px,3.2vw,26px)',
                  letterSpacing: '0.22em',
                  marginTop: '6px',
                  color: 'var(--ink)',
                }}
              >
                2026.10.01
              </span>
            </p>
          </div>

          {/* スクロールキュー */}
          <div
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 2,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontSize: '11px',
              letterSpacing: '0.4em',
              color: 'color-mix(in srgb, var(--ink) 55%, var(--bg))',
              textAlign: 'center',
            }}
          >
            SCROLL
            <div
              style={{
                width: '1px',
                height: '44px',
                background: 'linear-gradient(to bottom, currentColor, transparent)',
                margin: '10px auto 0',
                animation: 'cue 2.6s ease-in-out infinite',
              }}
            />
          </div>

          <style>{`
            @keyframes cue {
              0%, 100% { transform: scaleY(.4); transform-origin: top }
              50% { transform: scaleY(1) }
            }
          `}</style>
        </section>

        {/* ===== いまのGrace（時間帯ステータス） ===== */}
        <div
          id="now"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '18px',
            padding: '20px 24px',
            borderTop: '1px solid color-mix(in srgb, var(--ink) 12%, var(--bg))',
            borderBottom: '1px solid color-mix(in srgb, var(--ink) 12%, var(--bg))',
            fontSize: '13px',
            letterSpacing: '0.14em',
            flexWrap: 'wrap',
            textAlign: 'center',
          }}
        >
          {/* 営業ステータスドット */}
          <span
            aria-hidden="true"
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: isOpen ? '#7B8B6F' : 'color-mix(in srgb, var(--ink) 38%, var(--bg))',
              boxShadow: isOpen ? '0 0 0 4px color-mix(in srgb, #7B8B6F 18%, transparent)' : 'none',
              flexShrink: 0,
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              color: '#B8956A',
              letterSpacing: '0.26em',
              flexShrink: 0,
            }}
          >
            {phaseData.t}
          </span>
          <span>{phaseData.msg}</span>
        </div>

        {/* ===== Concept（縦書き） ===== */}
        <section
          id="concept"
          style={{
            minHeight: '88svh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(36px,7vw,110px)',
            padding: 'clamp(70px,9vw,120px) 24px',
            flexWrap: 'wrap',
          }}
        >
          {/* 縦書きテキスト */}
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
            <p
              style={{
                writingMode: 'vertical-rl',
                letterSpacing: '0.34em',
                lineHeight: 2.6,
                fontSize: '13.5px',
                color: 'color-mix(in srgb, var(--ink) 72%, var(--bg))',
              }}
            >
              焦がしバター、バニラ、柑橘、ハーブ。<br />
              Graceのお菓子は、香りから設計します。<br />
              食べ終えたあとの余韻までが、ひとつの体験。
            </p>
          </div>

          {/* サイドテキスト */}
          <div className="rise" data-d="2" style={{ maxWidth: '330px' }}>
            <Label>Concept</Label>
            <p style={{ marginTop: '24px', fontSize: '13.5px' }}>
              かしこまった日のためではなく、いつもの暮らしのなかの、少し美しい時間のために。日常にも、贈りものにも寄り添うパティスリーです。
            </p>
            <p
              style={{
                marginTop: '30px',
                fontSize: '12px',
                letterSpacing: '0.26em',
                color: '#7B8B6F',
                lineHeight: 2.4,
              }}
            >
              やさしさ ／ 余白 ／ 季節 ／ 香り ／ 素材 ／ 手仕事 ／ 豊かさ
            </p>
            <p style={{ marginTop: '36px' }}>
              <Btn href="/concept">View Concept</Btn>
            </p>
          </div>
        </section>

        <Sep motif="m-citrus" />

        {/* ===== 一品一章: チーズケーキ ===== */}
        <section
          id="sweets"
          className="chapter-section"
          style={{
            minHeight: '92svh',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: 'clamp(28px,5vw,80px)',
            padding: 'clamp(60px,8vw,110px) clamp(24px,6vw,80px)',
          }}
        >
          <figure className="rise" style={{ margin: 0 }}>
            <Ph
              src="https://images.pexels.com/photos/6607325/pexels-photo-6607325.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="チーズケーキ（仮素材）"
              aspectRatio="4/5"
              style={{ maxHeight: '74svh' }}
            />
          </figure>
          <div
            className="rise"
            data-d="2"
            style={{ display: 'flex', gap: 'clamp(20px,3vw,44px)', alignItems: 'flex-start' }}
          >
            <h2
              style={{
                writingMode: 'vertical-rl',
                letterSpacing: '0.34em',
                lineHeight: 2.6,
                fontSize: 'clamp(24px,3.6vw,34px)',
                fontWeight: 500,
                flexShrink: 0,
              }}
            >
              チーズケーキ
            </h2>
            <div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: '13px',
                  letterSpacing: '0.3em',
                  color: '#B8956A',
                }}
              >
                SIGNATURE CHEESECAKE
              </p>
              <p style={{ marginTop: '20px', maxWidth: '30em', fontSize: '14.5px' }}>
                チーズの主張をあえて抑え、バニラと果実の香りを引き立てた独自の設計。「チーズっぽくない」が褒め言葉になる、Graceの看板です。
              </p>
              <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '18px 26px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', letterSpacing: '0.22em', color: '#7B8B6F' }}>
                  <svg className="draw" viewBox="0 0 48 48" width="30" height="30" style={{ flexShrink: 0 }}><use href="#m-vanilla" /></svg>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', color: '#B8956A', letterSpacing: '0.18em', marginRight: '2px' }}>Aroma</span>バニラ
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', letterSpacing: '0.22em', color: '#7B8B6F' }}>
                  <svg className="draw" viewBox="0 0 48 48" width="30" height="30" style={{ flexShrink: 0 }}><use href="#m-fruit" /></svg>果実
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 一品一章: ショートケーキ（反転） ===== */}
        <section
          className="chapter-section chapter-rev"
          style={{
            minHeight: '92svh',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: 'clamp(28px,5vw,80px)',
            padding: 'clamp(60px,8vw,110px) clamp(24px,6vw,80px)',
          }}
        >
          <figure className="rise chapter-photo-rev" style={{ margin: 0, order: 2 }}>
            <Ph
              src="https://images.pexels.com/photos/10311435/pexels-photo-10311435.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="ショートケーキ（仮素材）"
              aspectRatio="4/5"
              style={{ maxHeight: '74svh' }}
            />
          </figure>
          <div
            className="rise"
            data-d="2"
            style={{ display: 'flex', gap: 'clamp(20px,3vw,44px)', alignItems: 'flex-start' }}
          >
            <h2
              style={{
                writingMode: 'vertical-rl',
                letterSpacing: '0.34em',
                lineHeight: 2.6,
                fontSize: 'clamp(24px,3.6vw,34px)',
                fontWeight: 500,
                flexShrink: 0,
              }}
            >
              ショートケーキ
            </h2>
            <div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: '13px',
                  letterSpacing: '0.3em',
                  color: '#B8956A',
                }}
              >
                SHORTCAKE
              </p>
              <p style={{ marginTop: '20px', maxWidth: '30em', fontSize: '14.5px' }}>
                季節の果実と、軽やかなクリーム。定番だからこそ、素材とバランスで違いが出る一品です。
              </p>
              <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '18px 26px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', letterSpacing: '0.22em', color: '#7B8B6F' }}>
                  <svg className="draw" viewBox="0 0 48 48" width="30" height="30" style={{ flexShrink: 0 }}><use href="#m-fruit" /></svg>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', color: '#B8956A', letterSpacing: '0.18em', marginRight: '2px' }}>Aroma</span>季節の果実
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', letterSpacing: '0.22em', color: '#7B8B6F' }}>
                  <svg className="draw" viewBox="0 0 48 48" width="30" height="30" style={{ flexShrink: 0 }}><use href="#m-milk" /></svg>ミルク
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 一品一章: 季節のタルト ===== */}
        <section
          className="chapter-section"
          style={{
            minHeight: '92svh',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: 'clamp(28px,5vw,80px)',
            padding: 'clamp(60px,8vw,110px) clamp(24px,6vw,80px)',
          }}
        >
          <figure className="rise" style={{ margin: 0 }}>
            <Ph
              src="https://images.pexels.com/photos/6605303/pexels-photo-6605303.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="季節のタルト（仮素材）"
              aspectRatio="4/5"
              style={{ maxHeight: '74svh' }}
            />
          </figure>
          <div
            className="rise"
            data-d="2"
            style={{ display: 'flex', gap: 'clamp(20px,3vw,44px)', alignItems: 'flex-start' }}
          >
            <h2
              style={{
                writingMode: 'vertical-rl',
                letterSpacing: '0.34em',
                lineHeight: 2.6,
                fontSize: 'clamp(24px,3.6vw,34px)',
                fontWeight: 500,
                flexShrink: 0,
              }}
            >
              季節のタルト
            </h2>
            <div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: '13px',
                  letterSpacing: '0.3em',
                  color: '#B8956A',
                }}
              >
                SEASONAL TART
              </p>
              <p style={{ marginTop: '20px', maxWidth: '30em', fontSize: '14.5px' }}>
                旬の移ろいをそのままに。季節ごとに表情を変える、ショーケースの楽しみです。
              </p>
              <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '18px 26px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', letterSpacing: '0.22em', color: '#7B8B6F' }}>
                  <svg className="draw" viewBox="0 0 48 48" width="30" height="30" style={{ flexShrink: 0 }}><use href="#m-fruit" /></svg>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', color: '#B8956A', letterSpacing: '0.18em', marginRight: '2px' }}>Aroma</span>旬の果実
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', letterSpacing: '0.22em', color: '#7B8B6F' }}>
                  <svg className="draw" viewBox="0 0 48 48" width="30" height="30" style={{ flexShrink: 0 }}><use href="#m-butter" /></svg>焦がしバター
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Grace Crumb（ギフト・暗背景） ===== */}
        <section
          id="gift"
          className="chapter-section chapter-rev"
          style={{
            minHeight: '92svh',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: 'clamp(28px,5vw,80px)',
            padding: 'clamp(60px,8vw,110px) clamp(24px,6vw,80px)',
            background: '#2C2421',
            color: '#F7F3EF',
          }}
        >
          <figure className="rise chapter-photo-rev" style={{ margin: 0, order: 2 }}>
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(150deg, #46392f, #372d26 55%, #2C2421)',
                aspectRatio: '4/5',
                maxHeight: '74svh',
                width: '100%',
              }}
            >
              <img
                src="https://images.pexels.com/photos/34909568/pexels-photo-34909568.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Grace Crumb 焼き菓子（仮素材）"
                loading="lazy"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 1,
                  filter: 'saturate(.82) contrast(.96)',
                }}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  zIndex: 2,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: '8.5px',
                  letterSpacing: '0.26em',
                  color: 'rgba(247,243,239,.85)',
                  background: 'rgba(44,36,33,.5)',
                  padding: '3px 9px',
                  backdropFilter: 'blur(2px)',
                }}
              >
                PLACEHOLDER
              </span>
            </div>
          </figure>
          <div
            className="rise"
            data-d="2"
            style={{ display: 'flex', gap: 'clamp(20px,3vw,44px)', alignItems: 'flex-start' }}
          >
            <h2
              style={{
                writingMode: 'vertical-rl',
                letterSpacing: '0.34em',
                lineHeight: 2.6,
                fontSize: 'clamp(24px,3.6vw,34px)',
                fontWeight: 500,
                flexShrink: 0,
              }}
            >
              グレイスクラム
            </h2>
            <div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: '13px',
                  letterSpacing: '0.3em',
                  color: '#B8956A',
                }}
              >
                GRACE CRUMB &mdash; BAKED &amp; GIFT
              </p>
              <p style={{ marginTop: '20px', maxWidth: '30em', fontSize: '14.5px' }}>
                Grace Crumbは、Graceの焼き菓子ライン。フィナンシェを中心に、焦がしバター・バニラ・柑橘・ハーブを丁寧に重ねた焼き菓子を展開します。ひとつずつ味わうにも、まとめて贈るにも、「Graceらしさ」をそのまま届ける一箱に。
              </p>
              <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '18px 26px' }}>
                {[
                  { motif: 'm-butter', label: '焦がしバター', isAroma: true },
                  { motif: 'm-vanilla', label: 'バニラ' },
                  { motif: 'm-citrus', label: '柑橘' },
                  { motif: 'm-herb', label: 'ハーブ' },
                ].map(({ motif, label, isAroma }) => (
                  <span key={motif} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', letterSpacing: '0.22em', color: 'color-mix(in srgb, #F7F3EF 70%, #2C2421)' }}>
                    <svg className="draw" viewBox="0 0 48 48" width="30" height="30" style={{ flexShrink: 0 }}><use href={`#${motif}`} /></svg>
                    {isAroma && <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', color: '#B8956A', letterSpacing: '0.18em', marginRight: '2px' }}>Aroma</span>}
                    {label}
                  </span>
                ))}
              </div>
              <p style={{ marginTop: '34px' }}>
                <Btn href="/gift">View Gift</Btn>
              </p>
            </div>
          </div>
        </section>

        {/* ===== いまのショーケース ===== */}
        <section
          id="case"
          style={{
            padding: 'clamp(70px,9vw,120px) clamp(24px,6vw,80px)',
          }}
        >
          <div
            className="rise"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '18px',
            }}
          >
            <div>
              <Label>Showcase &mdash; {phaseData.t}</Label>
              <h2
                style={{
                  fontSize: 'clamp(22px,3.4vw,30px)',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  marginTop: '18px',
                  lineHeight: 1.9,
                }}
              >
                いまのショーケース
              </h2>
            </div>
            <p
              style={{
                fontSize: '11.5px',
                letterSpacing: '0.16em',
                color: 'color-mix(in srgb, var(--ink) 55%, var(--bg))',
              }}
            >
              時間とともに、店の「いま」をお伝えします（デモ表示）
            </p>
          </div>

          {/* ショーケースグリッド */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(16px,2.6vw,36px)',
              marginTop: 'clamp(36px,5vw,60px)',
            }}
            className="case-grid"
          >
            {ITEMS.map((name, i) => {
              const stock = STOCK[phase][i]
              return (
                <article key={name} className="rise in">
                  <Ph
                    src={IMGS[i]}
                    alt={`${name}（仮素材）`}
                    aspectRatio="1/1"
                  />
                  <h3
                    style={{
                      fontSize: '13.5px',
                      fontWeight: 500,
                      letterSpacing: '0.16em',
                      marginTop: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                    }}
                  >
                    {name}
                    <span
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        padding: '3px 10px',
                        border: `1px solid ${badgeBorder(stock) ?? 'color-mix(in srgb, var(--ink) 25%, var(--bg))'}`,
                        color: badgeColor(stock),
                        whiteSpace: 'nowrap',
                        opacity: (stock === '完売' || stock === '本日終了') ? 0.45 : 1,
                      }}
                    >
                      {stock}
                    </span>
                  </h3>
                </article>
              )
            })}
          </div>
          <style>{`
            @media (max-width: 880px) { .case-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          `}</style>
        </section>

        {/* ===== Journal ===== */}
        <section
          id="journal"
          style={{
            padding: 'clamp(60px,8vw,100px) clamp(24px,6vw,80px)',
            borderTop: '1px solid color-mix(in srgb, var(--ink) 12%, var(--bg))',
          }}
        >
          <Label>
            <span className="rise">Journal</span>
          </Label>
          <div
            className="rise"
            data-d="1"
            style={{ marginTop: '30px' }}
          >
            {[
              { cat: 'Story', title: 'Graceが生まれるまで — 春日井に小さなパティスリーをひらく理由' },
              { cat: 'Craft', title: '素材のはなし — 香りを大切にする、お菓子づくりの考えかた' },
              { cat: 'Gift',  title: '贈るという時間 — 大切な人へ、Graceのお菓子を選ぶ' },
            ].map(({ cat, title }) => (
              <a
                key={title}
                href="#"
                style={{
                  display: 'flex',
                  gap: '22px',
                  alignItems: 'baseline',
                  padding: '18px 4px',
                  borderBottom: '1px solid color-mix(in srgb, var(--ink) 12%, var(--bg))',
                  fontSize: '14px',
                  letterSpacing: '0.1em',
                  transition: 'opacity .3s',
                  color: 'var(--ink)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.55' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: 'italic',
                    fontSize: '12px',
                    letterSpacing: '0.24em',
                    color: '#B8956A',
                    flexShrink: 0,
                    minWidth: '64px',
                  }}
                >
                  {cat}
                </span>
                {title}
              </a>
            ))}
          </div>
        </section>

        {/* ===== Shop ===== */}
        <section
          id="shop"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
          className="shop-section"
        >
          <Ph
            src="https://images.pexels.com/photos/33683554/pexels-photo-33683554.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="店舗イメージ（仮素材）"
            style={{ minHeight: '420px', height: '100%', aspectRatio: undefined }}
          />
          <div
            className="rise"
            data-d="1"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(48px,8vw,110px)',
            }}
          >
            <Label>Shop</Label>
            <h2
              style={{
                fontSize: 'clamp(22px,3.4vw,30px)',
                fontWeight: 500,
                letterSpacing: '0.18em',
                marginTop: '18px',
                lineHeight: 1.9,
              }}
            >
              店舗のご案内
            </h2>
            <dl
              style={{
                marginTop: '32px',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '13px 30px',
                fontSize: '13.5px',
              }}
            >
              {[
                ['店名', 'パティスリー Grace'],
                ['住所', '愛知県春日井市朝宮町1-2-6'],
                ['営業時間', '9:30 - 19:30'],
                ['営業日', '元旦を除き、毎日営業しています'],
                ['駐車場', '8台（お車でのご来店に便利です）'],
                ['形態', 'テイクアウト専門'],
              ].map(([dt, dd]) => (
                <ShopDtDd key={dt} dt={dt!} dd={dd!} />
              ))}
            </dl>
            <p
              style={{
                fontSize: '12px',
                color: '#7B8B6F',
                marginTop: '22px',
                letterSpacing: '0.12em',
              }}
            >
              最新の営業情報・ショーケースの様子はInstagramをご覧ください。
            </p>
            <p style={{ marginTop: '38px' }}>
              <Btn href="https://maps.google.com">Google Maps</Btn>
            </p>
          </div>
          <style>{`
            @media (max-width: 880px) { .shop-section { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>

        {/* ===== Online Shop（EC誘導） ===== */}
        <section
          id="online-shop"
          style={{
            background: '#2C2421',
            color: '#F7F3EF',
            textAlign: 'center',
            padding: 'clamp(80px,11vw,140px) 24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '-10%',
              background: 'radial-gradient(ellipse 55% 60% at 50% 30%, rgba(184,149,106,.18), transparent 65%)',
              pointerEvents: 'none',
            }}
          />
          <div className="rise" style={{ position: 'relative' }}>
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
                justifyContent: 'center',
                gap: '16px',
              }}
            >
              <span style={{ width: '42px', height: '1px', background: '#B8956A', display: 'inline-block' }} />
              Online Shop
              <span style={{ width: '42px', height: '1px', background: '#B8956A', display: 'inline-block' }} />
            </p>
            <h2
              style={{
                fontSize: 'clamp(20px,3vw,27px)',
                fontWeight: 500,
                letterSpacing: '0.2em',
                marginTop: '22px',
              }}
            >
              遠くのあなたへも、Graceを。
            </h2>
            <p
              style={{
                marginTop: '22px',
                fontSize: '13.5px',
                color: 'rgba(247,243,239,.72)',
                letterSpacing: '0.12em',
              }}
            >
              焼き菓子と冷凍スイーツのお届けを準備しています。<br />
              オンラインショップは2026年秋、オープン予定です。
            </p>
            {/* メール登録フォーム */}
            <div
              style={{
                marginTop: '46px',
                display: 'flex',
                justifyContent: 'center',
                maxWidth: '460px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <input
                type="email"
                placeholder="メールアドレス"
                aria-label="メールアドレス"
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: 'transparent',
                  border: '1px solid rgba(247,243,239,.35)',
                  borderRight: 'none',
                  color: '#F7F3EF',
                  fontFamily: "'Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
                  fontSize: '13px',
                  padding: '15px 18px',
                  outline: 'none',
                }}
              />
              <button
                type="button"
                style={{
                  background: '#B8956A',
                  color: '#2C2421',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: '13.5px',
                  letterSpacing: '0.2em',
                  padding: '0 24px',
                  transition: 'opacity .3s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                お知らせを受け取る
              </button>
            </div>
            <p
              style={{
                display: 'inline-block',
                marginTop: '24px',
                fontSize: '12.5px',
                letterSpacing: '0.16em',
                color: 'rgba(247,243,239,.75)',
              }}
            >
              日々の様子はInstagramで&nbsp;&nbsp;
              <a
                href="https://www.instagram.com/patisserie_grace_/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#B8956A', borderBottom: '1px solid rgba(184,149,106,.4)', paddingBottom: '2px' }}
              >
                @patisserie_grace_
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* レスポンシブ: chapter（一品一章）のグリッド */}
      <style>{`
        @media (max-width: 880px) {
          .chapter-section {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .chapter-photo-rev {
            order: 0 !important;
          }
        }
      `}</style>
    </>
  )
}
