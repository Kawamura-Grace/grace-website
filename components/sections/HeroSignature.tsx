'use client'

import { useEffect, useState } from 'react'
import { LogoDrawing } from '@/components/brand/LogoDrawing'

/**
 * HeroSignature — signature-v1 ヒーローセクション
 *
 * レイアウト: 100svh / cream (#F7F3EF) 背景
 * アニメーション順序:
 *   1. LogoDrawing stroke-drawing (0.3s〜 / 2.2s で完了)
 *   2. ワードマーク「Grace」fade-in (delay 2.6s)
 *   3. 「PATISSERIE」fade-in (delay 3.0s)
 *   4. 縦書きタグライン (delay 3.4s)
 *   5. Scroll キュー (delay 4.0s)
 *
 * LCP 対策:
 * - SVG インライン（画像 fetch なし）
 * - ヒーロー内に外部画像なし
 * - フォントは next/font で preload 済み
 */

interface FadeItemProps {
  delay: number
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

function FadeItem({ delay, children, className = '', style = {} }: FadeItemProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // prefers-reduced-motion: reduce の場合は即表示
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
        transition: `opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1)`,
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
      className="relative flex items-center justify-center overflow-hidden bg-cream"
      style={{ minHeight: '100svh' }}
      aria-label="Pâtisserie Grace ヒーロー"
    >
      {/* 中央コンテンツ */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        {/* ロゴ線画（LCP対象: インライン SVG） */}
        <LogoDrawing width={200} className="mx-auto mb-4" />

        {/* ワードマーク Grace */}
        <FadeItem delay={2.6}>
          <h1
            className="font-cormorant italic text-brown tracking-widest"
            style={{
              fontSize: 'clamp(44px,11vw,72px)',
              fontWeight: 300,
              lineHeight: 1,
            }}
          >
            Grace
          </h1>
        </FadeItem>

        {/* PATISSERIE */}
        <FadeItem delay={3.0}>
          <p
            className="font-cormorant text-brown tracking-[0.4em]"
            style={{
              fontSize: 'clamp(10px,1.8vw,14px)',
              fontWeight: 400,
              marginTop: '6px',
              letterSpacing: '0.4em',
            }}
          >
            PATISSERIE
          </p>
        </FadeItem>
      </div>

      {/* 縦書きタグライン（右側） */}
      <FadeItem
        delay={3.4}
        className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
        style={{}}
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
          美しく残るには、草木がいる。
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

      {/* Scroll キュー */}
      <FadeItem
        delay={4.0}
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
