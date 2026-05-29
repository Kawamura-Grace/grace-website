'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MobileMenu } from './MobileMenu'
import { cn } from '@/lib/utils/cn'

interface HeaderProps {
  variant?: 'transparent' | 'solid'
}

/**
 * ヘッダー — シネマティック案B
 * - ヒーロー上では transparent（スクロール60px以降は solid に切り替え）
 * - 左右分割レイアウト: コンセプト・スウィーツ ← テキストロゴ → ギフト・ショップ情報
 * - モバイルではハンバーガーメニューを維持
 */
export function Header({ variant = 'solid' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (variant !== 'transparent') return
    const onScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [variant])

  const isTransparent = variant === 'transparent' && !isScrolled

  return (
    <>
      <header
        className={cn(
          'top-0 left-0 right-0 z-30 transition-all duration-300',
          // transparent variant（TOPページ）は fixed でヒーロー上に重ねる
          // solid variant（他ページ）は sticky でコンテンツを押し下げる
          variant === 'transparent' ? 'fixed' : 'sticky',
          isTransparent
            ? 'bg-transparent'
            : 'bg-grace-bg-primary/95 backdrop-blur-sm border-b border-grace-line',
        )}
      >
        {/* デスクトップ: 左右分割ナビ */}
        <div className="hidden md:flex items-center justify-between px-16 py-[34px]">
          {/* 左ナビ */}
          <nav className="flex gap-[38px]" aria-label="左ナビゲーション">
            {[
              { label: 'コンセプト', href: '/concept' },
              { label: 'スウィーツ', href: '/sweets' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'font-noto-serif text-[11px] tracking-[3px] transition-opacity hover:opacity-70',
                  isTransparent ? 'text-grace-offwhite' : 'text-grace-brown',
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* 中央テキストロゴ */}
          <Link
            href="/"
            className={cn(
              'font-cormorant italic text-[22px] tracking-[4px] transition-colors',
              isTransparent ? 'text-grace-offwhite' : 'text-grace-brown',
            )}
            style={{ fontWeight: 300 }}
          >
            Grace
          </Link>

          {/* 右ナビ */}
          <nav className="flex gap-[38px]" aria-label="右ナビゲーション">
            {[
              { label: 'ギフト', href: '/gift' },
              { label: 'ショップ情報', href: '/shop' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'font-noto-serif text-[11px] tracking-[3px] transition-opacity hover:opacity-70',
                  isTransparent ? 'text-grace-offwhite' : 'text-grace-brown',
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* モバイル: ハンバーガー + テキストロゴ */}
        <div className="flex md:hidden items-center justify-between h-16 px-4">
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="メニューを開く"
            aria-expanded={isMenuOpen}
            className={cn(
              'relative z-10 flex items-center justify-center p-2 transition-colors',
              isTransparent
                ? 'text-grace-offwhite hover:text-grace-stone'
                : 'text-grace-text-secondary hover:text-grace-brown',
            )}
          >
            <svg
              width="20"
              height="20"
              className="block flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          <Link
            href="/"
            className={cn(
              'font-cormorant italic text-xl tracking-[3px] transition-colors',
              isTransparent ? 'text-grace-offwhite' : 'text-grace-brown',
            )}
            style={{ fontWeight: 300 }}
          >
            Grace
          </Link>

          {/* レイアウト維持用スペーサー */}
          <div className="invisible w-10 h-10" aria-hidden="true" />
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
