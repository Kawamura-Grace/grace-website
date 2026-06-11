/**
 * GrainOverlay — SVG fractalNoise グレインオーバーレイ
 * - fixed / opacity 0.035 / pointer-events:none / z-index 最上層
 * - 全ページで共通使用
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px',
        backgroundRepeat: 'repeat',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )
}
