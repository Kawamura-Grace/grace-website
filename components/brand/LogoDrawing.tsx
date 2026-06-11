'use client'

/**
 * LogoDrawing — ボタニカルイラスト SVG stroke-drawing アニメ
 *
 * 構造:
 *   PATHS: SVGパスデータ定義（将来 HarukDesign 正式 SVG 入稿時はここだけ差し替え）
 *   ANIMATIONS: 各パスのアニメーション設定（len / delay / duration）
 *   LogoDrawing: レンダリング + CSS インジェクション
 *
 * 仕様:
 *   - stroke-drawing: strokeDasharray={len} strokeDashoffset={len} → CSS で 0 に
 *   - easing: cubic-bezier(.22,1,.36,1)
 *   - stroke: 1.6 / color: #2C2421 / fill: none
 *   - strokeLinecap: round / strokeLinejoin: round
 *   - animation-fill-mode: forwards（終了後そのまま表示）
 *   - prefers-reduced-motion: reduce 時は全要素即時表示
 *   - 画像 fetch ゼロ（next/image 不使用）
 *
 * variant prop:
 *   "static"  : アニメなし即時表示（将来の fallback 用）
 *   "animated": stroke-drawing アニメ（デフォルト）
 */

// ─── パスデータ定義（正式 SVG 入稿時はここを差し替える） ─────────────────────

type PathDef = {
  type: 'path'
  id: string
  d: string
  len: number
  delay: number // seconds
}

type CircleDef = {
  type: 'circle'
  id: string
  cx: number
  cy: number
  r: number
  len: number
  delay: number // seconds
}

type ElementDef = PathDef | CircleDef

// viewBox="0 0 200 240"
const ELEMENTS: ElementDef[] = [
  // ボタニカルーンズ（中心軸）
  {
    type: 'path',
    id: 'stem',
    d: 'M100 18 C 92 60, 108 100, 98 150 C 92 184, 100 206, 110 220',
    len: 300,
    delay: 0.3,
  },
  {
    type: 'path',
    id: 'tip',
    d: 'M100 18 C 104 12, 112 10, 116 14',
    len: 40,
    delay: 1.0,
  },
  // 柑橘・輪切り（左）
  {
    type: 'circle',
    id: 'citrus-ring',
    cx: 56,
    cy: 150,
    r: 25,
    len: 160,
    delay: 1.2,
  },
  {
    type: 'path',
    id: 'citrus-seg-1',
    d: 'M56 128 L56 148',
    len: 25,
    delay: 1.8,
  },
  {
    type: 'path',
    id: 'citrus-seg-2',
    d: 'M37 161 L53 153',
    len: 25,
    delay: 1.9,
  },
  {
    type: 'path',
    id: 'citrus-seg-3',
    d: 'M75 161 L59 153',
    len: 25,
    delay: 2.0,
  },
  // ハーブの小枝（右）
  {
    type: 'path',
    id: 'herb-stem',
    d: 'M150 196 C 148 160, 146 130, 142 104',
    len: 120,
    delay: 1.5,
  },
  {
    type: 'path',
    id: 'herb-leaf-1',
    d: 'M147 170 C 158 166, 166 156, 166 146 C 156 150, 149 158, 147 170 Z',
    len: 46,
    delay: 1.9,
  },
  {
    type: 'path',
    id: 'herb-leaf-2',
    d: 'M145 142 C 134 138, 128 128, 128 118 C 138 122, 144 130, 145 142 Z',
    len: 46,
    delay: 2.05,
  },
  {
    type: 'path',
    id: 'herb-leaf-3',
    d: 'M143 116 C 152 110, 156 100, 154 90 C 146 96, 142 106, 143 116 Z',
    len: 46,
    delay: 2.2,
  },
]

// ─── アニメーション共通定数 ───────────────────────────────────────────────────

const DURATION = '2.2s'
const EASING = 'cubic-bezier(.22,1,.36,1)'
const STROKE_COLOR = '#2C2421'
const STROKE_WIDTH = 1.6

// ─── CSS 生成（各パスの @keyframes + animation rule） ────────────────────────

function buildCSS(animated: boolean): string {
  if (!animated) return ''

  const rules = ELEMENTS.map((el) => {
    const keyName = `draw-${el.id}`
    return `
      @keyframes ${keyName} {
        to { stroke-dashoffset: 0; }
      }
      .logo-path-${el.id} {
        animation: ${keyName} ${DURATION} ${EASING} ${el.delay}s forwards;
      }
    `
  })

  return `
    /* prefers-reduced-motion: reduce → 全パスを即時表示 */
    @media (prefers-reduced-motion: reduce) {
      [data-logo-drawing] * {
        animation: none !important;
        stroke-dashoffset: 0 !important;
        opacity: 1 !important;
      }
    }
    ${rules.join('\n')}
  `
}

// ─── コンポーネント ────────────────────────────────────────────────────────────

interface LogoDrawingProps {
  className?: string
  /** "animated"（デフォルト）: stroke-drawing アニメ / "static": 即時表示 */
  variant?: 'static' | 'animated'
}

export function LogoDrawing({ className = '', variant = 'animated' }: LogoDrawingProps) {
  const isAnimated = variant === 'animated'

  return (
    <div
      className={className}
      data-logo-drawing
      style={{ width: 'min(46vw, 190px)', lineHeight: 0 }}
    >
      {/* CSS アニメーション定義（パスデータと分離） */}
      <style>{buildCSS(isAnimated)}</style>

      {/* SVG 本体 — パスデータのみここに集約 */}
      <svg
        viewBox="0 0 200 240"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Grace Pâtisserie ボタニカルイラスト"
        role="img"
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      >
        {ELEMENTS.map((el) => {
          // アニメ初期状態: stroke-dasharray = stroke-dashoffset = len（非表示）
          // static / reduced-motion 時は dashoffset=0 で即表示
          const dashOffset = isAnimated ? el.len : 0

          const sharedProps = {
            key: el.id,
            className: `logo-path-${el.id}`,
            stroke: STROKE_COLOR,
            strokeWidth: STROKE_WIDTH,
            fill: 'none' as const,
            strokeLinecap: 'round' as const,
            strokeLinejoin: 'round' as const,
            strokeDasharray: el.len,
            strokeDashoffset: dashOffset,
          }

          if (el.type === 'circle') {
            return (
              <circle
                {...sharedProps}
                cx={el.cx}
                cy={el.cy}
                r={el.r}
              />
            )
          }

          return (
            <path
              {...sharedProps}
              d={el.d}
            />
          )
        })}
      </svg>
    </div>
  )
}
