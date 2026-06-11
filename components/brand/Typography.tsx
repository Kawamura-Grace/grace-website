/**
 * タイポグラフィ部品 — signature-v1
 * Eyebrow / DisplayHeading / MoreLink / GoldButton
 */

import Link from 'next/link'
import type { ReactNode } from 'react'

// ─── Eyebrow ─────────────────────────────────────────────────────────────
interface EyebrowProps {
  children: ReactNode
  className?: string
}

/** セクションラベル（Cormorant Garamond 400 italic / 英字10px / gold） */
export function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <span
      className={`block font-cormorant italic text-gold ${className}`}
      style={{
        fontSize: '10px',
        letterSpacing: '0.35em',
        fontWeight: 400,
      }}
    >
      {children}
    </span>
  )
}

// ─── DisplayHeading ───────────────────────────────────────────────────────
interface DisplayHeadingProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  /** Cormorant italic weight 300（display）または 400（eyebrow直下） */
  weight?: 300 | 400
  className?: string
}

/** 大見出し（Cormorant Garamond italic / clamp表示サイズ） */
export function DisplayHeading({
  children,
  as: Tag = 'h2',
  weight = 300,
  className = '',
}: DisplayHeadingProps) {
  return (
    <Tag
      className={`font-cormorant italic text-brown leading-none ${className}`}
      style={{
        fontWeight: weight,
        fontSize: 'clamp(36px,6vw,72px)',
      }}
    >
      {children}
    </Tag>
  )
}

// ─── MoreLink ─────────────────────────────────────────────────────────────
interface MoreLinkProps {
  href: string
  children?: ReactNode
  className?: string
}

/** テキストリンク（gold 下線・hover wasabi） */
export function MoreLink({ href, children = 'More', className = '' }: MoreLinkProps) {
  return (
    <Link
      href={href}
      className={`font-cormorant italic text-brown border-b border-gold pb-0.5 hover:text-wasabi hover:border-wasabi transition-colors ${className}`}
      style={{
        fontSize: '12px',
        letterSpacing: '0.12em',
        transitionDuration: '0.8s',
        transitionTimingFunction: 'cubic-bezier(.22,1,.36,1)',
      }}
    >
      {children}
    </Link>
  )
}

// ─── GoldButton ───────────────────────────────────────────────────────────
interface GoldButtonProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  /** outline（デフォルト）or fill */
  variant?: 'outline' | 'fill'
}

/** gold 枠線ボタン（hover: gold 塗り × brown 文字） */
export function GoldButton({
  href,
  onClick,
  children,
  className = '',
  variant = 'outline',
}: GoldButtonProps) {
  const baseStyle: React.CSSProperties = {
    transitionDuration: '0.8s',
    transitionTimingFunction: 'cubic-bezier(.22,1,.36,1)',
  }

  const cls = [
    'inline-flex items-center justify-center gap-2',
    'font-cormorant italic',
    'border border-gold px-8 py-3',
    'transition-colors',
    variant === 'fill'
      ? 'bg-gold text-brown hover:bg-transparent hover:text-gold'
      : 'text-brown hover:bg-gold hover:text-brown',
    className,
  ].join(' ')

  if (href) {
    return (
      <Link href={href} className={cls} style={baseStyle}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls} style={baseStyle}>
      {children}
    </button>
  )
}
