/**
 * LogoDrawing — 正式ロゴ（PNG）表示コンポーネント
 *
 * 現在: public/logo-vertical.png（ボタニカルアイコン + Grace スクリプト + PATISSERIE）を
 *   opacity fade-in で表示。
 *
 * 将来: SVG 正式入稿後は variant="animated" で stroke-drawing アニメ版に切り替え可能。
 *   CSS アニメは globals.css の prefers-reduced-motion: reduce ルールで自動無効化される。
 *
 * LCP 対策: priority prop でプリロード。
 */

import Image from 'next/image'

interface LogoDrawingProps {
  className?: string
  /**
   * 将来の SVG アニメ対応用。
   * "static": PNG fade-in（現在の実装）
   * "animated": SVG stroke-drawing（SVG 入稿後に実装予定）
   */
  variant?: 'static' | 'animated'
}

export function LogoDrawing({ className = '', variant: _variant = 'static' }: LogoDrawingProps) {
  return (
    <div
      className={className}
      style={{
        /* opacity 0 → 1 fade-in: delay 0.3s / duration 0.8s */
        /* globals.css の prefers-reduced-motion: reduce で transition-duration が 0.01ms になり即表示 */
        opacity: 0,
        animation: 'logoPngFadeIn 0.8s cubic-bezier(.22,1,.36,1) 0.3s forwards',
        width: 'min(46vw, 190px)',
        lineHeight: 0,
      }}
    >
      <style>{`
        @keyframes logoPngFadeIn {
          to { opacity: 1; }
        }
      `}</style>
      <Image
        src="/logo-vertical.png"
        alt="Grace Pâtisserie"
        width={380}
        height={480}
        priority
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  )
}
