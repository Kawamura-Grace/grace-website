/**
 * NoMediaFrame — 写真不在時の設計プレースフレーム
 * - cream-deep 背景 / 1px 罫線（rgba(44,36,33,.1)）
 * - 中央にボタニカル線画 SVG（opacity 0.28）
 * - 下部に「Photography — Sep. 2026」テキスト
 */

interface NoMediaFrameProps {
  className?: string
  /** オプション: スロット名表示（デバッグ用） */
  label?: string
}

export function NoMediaFrame({ className = '', label }: NoMediaFrameProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        backgroundColor: '#EFE9E2',
        border: '1px solid rgba(44,36,33,.1)',
      }}
    >
      {/* ボタニカル線画（ハーブ・葉のシルエット） */}
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.28 }}
      >
        {/* 茎 */}
        <path
          d="M100 180 L100 60"
          stroke="#2C2421"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        {/* 左葉1 */}
        <path
          d="M100 140 C80 130 60 120 65 100 C70 80 90 95 100 110"
          stroke="#2C2421"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* 右葉1 */}
        <path
          d="M100 140 C120 130 140 120 135 100 C130 80 110 95 100 110"
          stroke="#2C2421"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* 左葉2 */}
        <path
          d="M100 115 C75 105 58 88 65 70 C72 52 95 72 100 88"
          stroke="#2C2421"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* 右葉2 */}
        <path
          d="M100 115 C125 105 142 88 135 70 C128 52 105 72 100 88"
          stroke="#2C2421"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* 先端の小葉 */}
        <path
          d="M100 88 C90 75 88 60 100 55 C112 60 110 75 100 88"
          stroke="#2C2421"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* 根元の小さな草 */}
        <path
          d="M100 180 C90 165 85 150 92 145"
          stroke="#2C2421"
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M100 180 C110 165 115 150 108 145"
          stroke="#2C2421"
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* 下部テキスト */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <span
          className="font-cormorant italic"
          style={{
            fontSize: '10px',
            color: 'rgba(44,36,33,.45)',
            letterSpacing: '0.08em',
          }}
        >
          Photography{label ? ` — ${label}` : ''} — Sep. 2026
        </span>
      </div>
    </div>
  )
}
