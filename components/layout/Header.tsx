'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MobileMenu } from './MobileMenu'
import { cn } from '@/lib/utils/cn'

interface HeaderProps {
  variant?: 'transparent' | 'solid'
}

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
          'sticky top-0 z-30 transition-all duration-300',
          isTransparent
            ? 'bg-transparent'
            : 'bg-grace-bg-primary/95 backdrop-blur-sm border-b border-grace-line',
        )}
      >
        <div className="container-content">
          <div className="flex items-center justify-between h-16">

            {/* ハンバーガー */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="メニューを開く"
              aria-expanded={isMenuOpen}
              className={cn(
                'flex items-center justify-center p-2 transition-colors',
                isTransparent
                  ? 'text-grace-offwhite hover:text-grace-stone'
                  : 'text-grace-text-secondary hover:text-grace-brown',
              )}
            >
              <svg width="20" height="20" className="block flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18"/>
              </svg>
            </button>

            {/* ロゴ（中央） */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <Image
                src="/logo-horizontal.png"
                alt="Grace Patisserie"
                width={120}
                height={32}
                className={cn('h-7 w-auto block transition-opacity', isTransparent && 'brightness-0 invert')}
                priority
              />
            </Link>

            {/* カート（Square Online）— ティザー期は非表示 */}
            <a
              href="https://square.site"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="オンラインストア"
              className={cn(
                'flex items-center justify-center p-2 transition-colors',
                isTransparent
                  ? 'text-grace-offwhite hover:text-grace-stone'
                  : 'text-grace-text-secondary hover:text-grace-brown',
              )}
            >
              <svg width="20" height="20" className="block flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
