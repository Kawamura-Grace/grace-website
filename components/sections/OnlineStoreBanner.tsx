'use client'

import { useReveal, revealStyle } from '@/components/brand/useReveal'
import { GoldButton } from '@/components/brand/Typography'

/**
 * OnlineStoreBanner — Online Store 帯（1-7中）
 * - brown 背景 + gold 枠線ボタン（hover: gold 塗り × brown 文字）
 */

export function OnlineStoreBanner() {
  const { ref: revealRef, isVisible } = useReveal()

  return (
    <section
      className="bg-brown py-20 px-6 text-center"
      aria-label="Online Store"
    >
      <div
        ref={revealRef as React.RefObject<HTMLDivElement>}
      >
        <div style={revealStyle(isVisible, 0, '0.8s')}>
          <span
            className="block font-cormorant italic text-gold mb-4"
            style={{ fontSize: '10px', letterSpacing: '0.35em' }}
          >
            Online
          </span>
        </div>

        <div style={revealStyle(isVisible, 80, '1.2s')}>
          <h2
            className="font-cormorant italic text-cream mb-4"
            style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 300 }}
          >
            Grace Online Store
          </h2>
        </div>

        <div style={revealStyle(isVisible, 160, '0.8s')}>
          <p
            className="font-shippori text-cream/60 mb-10"
            style={{ fontSize: '13px', letterSpacing: '0.08em' }}
          >
            全国配送承ります。ギフトラッピング対応。
          </p>
        </div>

        <div style={revealStyle(isVisible, 240, '0.8s')}>
          <GoldButton href="/sweets" variant="outline">
            Shop Online
          </GoldButton>
        </div>
      </div>
    </section>
  )
}
