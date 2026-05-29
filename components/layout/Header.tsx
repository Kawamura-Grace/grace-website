'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MobileMenu } from './MobileMenu'
import { cn } from '@/lib/utils/cn'

interface HeaderProps {
  variant?: 'transparent' | 'solid'
}

/**
 * ヘッダー — ハンバーガー + 中央ロゴスタイル
 * - ヒーロー上では transparent（fixed）、スクロール60px以降は solid に切り替え
 * - transparent 時: ロゴに brightness-0 invert を適用してホワイト表示
 * - solid 時: 通常カラー表示
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
        <div className="container-content">
          <div className="flex items-center justify-between h-16">

            {/* ハンバーガーボタン */}
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

            {/* 中央ロゴ（logo-horizontal.png） */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <Image
                src="/logo-horizontal.png"
                alt="Pâtisserie Grace"
                width={120}
                height={32}
                className={cn(
                  'h-7 w-auto block transition-opacity',
                  isTransparent && 'brightness-0 invert',
                )}
                priority
              />
            </Link>

            {/* レイアウト維持用スペーサー（ティザー期はカート非表示） */}
            <div className="invisible w-10 h-10" aria-hidden="true" />
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
