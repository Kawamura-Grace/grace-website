'use client'

import { useEffect, useState } from 'react'
import { LogoDrawing } from '@/components/brand/LogoDrawing'

/**
 * HeroSignature — signature-v1 ヒーローセクション
 *
 * レイアウト: 100svh / cream (#F7F3EF) 背景
 *
 * フェードインシーケンス:
 *   1. SVG stroke-drawing (LogoDrawing): 0.3s〜2.2s
 *   2. ワードマーク「Grace」:       opacity 0→1, delay 2.6s, duration 1.2s
 *   3. サブタイトル「PÂTISSERIE」:  delay 3.0s, duration 1.2s
 *   4. 縦書きタグライン:             delay 3.4s, duration 1.2s
 *   5. Scroll キュー:               delay 4.0s, duration 1.2s
 */

interface FadeItemProps {
  delay: number   // seconds
  duration?: number // seconds（デフォルト 1.2s）
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

function FadeItem({ delay, duration = 1.2, children, className = '', style = {} }: FadeItemProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // prefers-reduced-motion: reduce 時は即時表示
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const timer = setTimeout(
      () => setVisible(true),
      prefersReduced ? 0 : delay * 1000
    )
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity ${duration}s cubic-bezier(.22,1,.36,1), transform ${duration}s cubic-bezier(.22,1,.36,1)`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function HeroSignature() {
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden bg-cream"
      style={{ minHeight: '100svh' }}
      aria-label="Pâtisserie Grace ヒーロー"
    >
      {/* 中央コンテンツ */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">

        {/* SVG stroke-drawing: 0.3s〜2.2s（LogoDrawing 内部で制御） */}
        <LogoDrawing className="mx-auto mb-6" variant="animated" />

        {/* ワードマーク「Grace」: delay 2.6s */}
        <FadeItem delay={2.6} duration={1.2}>
          <p
            className="font-cormorant italic text-brown"
            style={{
              fontSize: 'clamp(32px,5vw,56px)',
              fontWeight: 300,
              letterSpacing: '0.06em',
              lineHeight: 1,
            }}
          >
            Grace
          </p>
        </FadeItem>

        {/* サブタイトル「PÂTISSERIE」: delay 3.0s */}
        <FadeItem delay={3.0} duration={1.2}>
          <p
            className="font-cormorant text-brown/60"
            style={{
              fontSize: 'clamp(9px,1.2vw,11px)',
              letterSpacing: '0.38em',
              fontWeight: 400,
              marginTop: '6px',
            }}
          >
            PÂTISSERIE
          </p>
        </FadeItem>
      </div>

      {/* 縦書きタグライン（右側）: delay 3.4s */}
      <FadeItem
        delay={3.4}
        duration={1.2}
        className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
      >
        <p
          className="font-shippori text-brown"
          style={{
            writingMode: 'vertical-rl',
            fontSize: 'clamp(11px,1.6vw,14px)',
            letterSpacing: '0.18em',
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          美しい暮らしには、お菓子がある。
        </p>
        {/* gold 縦罫 56px */}
        <span
          className="block"
          style={{
            width: '1px',
            height: '56px',
            backgroundColor: '#B8956A',
          }}
          aria-hidden="true"
        />
      </FadeItem>

      {/* Scroll キュー: delay 4.0s */}
      <FadeItem
        delay={4.0}
        duration={1.2}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="font-cormorant italic text-brown/60"
          style={{ fontSize: '9px', letterSpacing: '0.3em' }}
        >
          Scroll
        </span>
        <span
          className="block"
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(44,36,33,0.4), transparent)',
          }}
          aria-hidden="true"
        />
      </FadeItem>
    </section>
  )
}
