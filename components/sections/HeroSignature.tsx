'use client'

import { useEffect, useState } from 'react'
import { LogoDrawing } from '@/components/brand/LogoDrawing'

/**
 * HeroSignature — signature-v1 ヒーローセクション
 *
 * レイアウト: 100svh / cream (#F7F3EF) 背景
 * アニメーション順序:
 *   1. LogoDrawing PNG fade-in (delay 0.3s / duration 0.8s → 完了 1.1s)
 *   2. 縦書きタグライン fade-in (delay 1.4s)
 *   3. Scroll キュー fade-in (delay 2.0s)
 *
 * LCP 対策:
 * - LogoDrawing に priority prop → ロゴ PNG がプリロードされる
 * - フォントは next/font で preload 済み
 *
 * ワードマーク「Grace」と「PATISSERIE」は logo-vertical.png に含まれているため
 * テキスト要素としての出力は行わない（二重表示防止）。
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
    // globals.css の prefers-reduced-motion: reduce で transition が 0.01ms になるが、
    // JS タイマーも即時化してレイアウトシフトを防ぐ
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
      {/* 中央コンテンツ: ロゴ PNG のみ（Grace / PATISSERIE は PNG に内包） */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <LogoDrawing className="mx-auto" />
      </div>

      {/* 縦書きタグライン（右側） */}
      <FadeItem
        delay={1.4}
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
        delay={2.0}
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
