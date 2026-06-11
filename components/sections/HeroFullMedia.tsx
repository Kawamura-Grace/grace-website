import { BrandMedia } from '@/components/brand/BrandMedia'

/**
 * HeroFullMedia — ヒーロー直後のフルブリードメディア（1-2）
 * - placeholder/live: 画面幅フル 70svh object-cover
 * - none: 非表示（何もレンダリングしない）
 */

export function HeroFullMedia() {
  const mode = process.env.NEXT_PUBLIC_MEDIA_MODE ?? 'none'

  // none モードでは非表示
  if (mode === 'none') return null

  return (
    <div
      className="w-full overflow-hidden"
      style={{ height: '70svh' }}
      aria-hidden="true"
    >
      <BrandMedia
        slot="hero-full"
        fill
        className="w-full h-full"
        priority={false}
      />
    </div>
  )
}
