'use client'

import { useReveal, revealStyle } from '@/components/brand/useReveal'

/**
 * ShopInfoV2 — Shop Info / フッター前帯（1-7前半）
 * - offwhite 背景
 * - 住所 / 営業時間
 */

export function ShopInfoV2() {
  const { ref: revealRef, isVisible } = useReveal()

  return (
    <section className="bg-cream py-20 px-6" aria-label="Shop Info">
      <div
        ref={revealRef as React.RefObject<HTMLDivElement>}
        className="max-w-xl mx-auto text-center"
      >
        <div style={revealStyle(isVisible, 0, '0.8s')}>
          <span
            className="block font-cormorant italic text-gold mb-6"
            style={{ fontSize: '10px', letterSpacing: '0.35em' }}
          >
            Visit Us
          </span>
        </div>

        <div style={revealStyle(isVisible, 80, '1.2s')}>
          <h2
            className="font-cormorant italic text-brown mb-6"
            style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 300 }}
          >
            Pâtisserie Grace
          </h2>
        </div>

        <div style={revealStyle(isVisible, 160, '0.8s')}>
          <p
            className="font-shippori text-brown/80 leading-loose mb-10"
            style={{ fontSize: '14px', letterSpacing: '0.06em' }}
          >
            〒486-0844 愛知県春日井市<br />
            9:30 – 19:30　不定休
          </p>
        </div>

        <div style={revealStyle(isVisible, 240, '0.8s')}>
          <a
            href="/shop"
            className="inline-flex items-center gap-3 font-cormorant italic text-brown border border-brown px-8 py-4 hover:bg-brown hover:text-cream transition-colors"
            style={{
              fontSize: '13px',
              letterSpacing: '0.15em',
              transitionDuration: '0.8s',
              transitionTimingFunction: 'cubic-bezier(.22,1,.36,1)',
            }}
          >
            SHOP INFO
          </a>
        </div>
      </div>
    </section>
  )
}
