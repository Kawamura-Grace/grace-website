/**
 * NewsBar — ニュース一行帯（1-3）
 * 上下 1px 罫線 / 中央寄せ
 * Phase 4 で News DB 接続予定（現在は仮テキスト固定）
 */

interface NewsBarProps {
  /** Phase 4 以降: 外部から注入 */
  text?: string
}

export function NewsBar({
  text = '2026.10.01 — グランドオープン',
}: NewsBarProps) {
  return (
    <div
      className="w-full text-center bg-cream"
      style={{
        borderTop: '1px solid rgba(44,36,33,.12)',
        borderBottom: '1px solid rgba(44,36,33,.12)',
        paddingTop: '14px',
        paddingBottom: '14px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      <p
        className="font-shippori text-brown"
        style={{
          fontSize: 'clamp(11px,1.4vw,13px)',
          letterSpacing: '0.12em',
          fontWeight: 400,
        }}
      >
        {text}
      </p>
    </div>
  )
}
