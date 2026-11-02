import Image from 'next/image'
import { SHOW_XMAS_BANNER, XMAS_RESERVE_URL, XMAS_ITEMS } from '@/lib/christmas'

const GOLD = '#B8956A'
const LINE = 'color-mix(in srgb, var(--ink) 12%, var(--bg))'
const ctaStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '14px 36px',
  border: `1px solid ${GOLD}`,
  color: 'var(--ink)',
  fontSize: '14px',
  letterSpacing: '0.24em',
  textIndent: '0.24em',
}

// ヒーロー内の短い案内（ファーストビュー用）
export function ChristmasHeroLink() {
  if (!SHOW_XMAS_BANNER) return null
  return (
    <div className="rise" data-d="4" style={{ marginTop: '28px' }}>
      <a href={XMAS_RESERVE_URL} target="_blank" rel="noopener noreferrer" style={{ ...ctaStyle, padding: '10px 24px', fontSize: '13px' }}>
        クリスマスケーキ ご予約受付中
      </a>
    </div>
  )
}

// ヒーロー直後のバナー本体
export function ChristmasBanner() {
  if (!SHOW_XMAS_BANNER) return null
  return (
    <section
      id="christmas"
      aria-labelledby="xmas-title"
      style={{ borderBottom: `1px solid ${LINE}`, padding: '64px 24px', textAlign: 'center' }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <p
          className="rise"
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '13px',
            letterSpacing: '0.42em',
            textIndent: '0.42em',
            color: GOLD,
          }}
        >
          CHRISTMAS 2026
        </p>
        <h2 id="xmas-title" className="rise" data-d="1" style={{ marginTop: '14px', fontSize: 'clamp(19px, 4vw, 26px)', letterSpacing: '0.16em', fontWeight: 400 }}>
          <span style={{ display: 'inline-block' }}>クリスマスケーキ</span>　<span style={{ display: 'inline-block' }}>ご予約受付中</span>
        </h2>
        <p className="rise" data-d="2" style={{ marginTop: '14px', fontSize: '14px', letterSpacing: '0.1em', lineHeight: 1.9 }}>
          <span style={{ display: 'inline-block' }}>お受け取り　12月22日（火）〜25日（金）</span>
          <span style={{ display: 'inline-block' }}>・店頭のみ</span>
        </p>

        <ul
          className="rise"
          data-d="3"
          style={{ listStyle: 'none', padding: 0, margin: '36px 0 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}
        >
          {XMAS_ITEMS.map((it) => (
            <li key={it.name}>
              <div style={{ position: 'relative', aspectRatio: '3 / 4', overflow: 'hidden' }}>
                <Image src={it.src} alt={it.name} fill sizes="(max-width: 760px) 30vw, 240px" style={{ objectFit: 'cover' }} />
              </div>
              <p style={{ marginTop: '10px', fontSize: '12px', letterSpacing: '0.02em', lineHeight: 1.7, textWrap: 'balance' as const }}>{it.name}</p>
            </li>
          ))}
        </ul>

        <div className="rise" data-d="4" style={{ marginTop: '36px' }}>
          <a href={XMAS_RESERVE_URL} target="_blank" rel="noopener noreferrer" style={ctaStyle}>
            ご予約はこちら
          </a>
          <p style={{ marginTop: '14px', fontSize: '12px', letterSpacing: '0.1em', color: 'color-mix(in srgb, var(--ink) 65%, var(--bg))' }}>
            数に限りがあります
          </p>
        </div>
      </div>
    </section>
  )
}
