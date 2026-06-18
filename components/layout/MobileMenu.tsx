'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

// ティザーフェーズのナビ設定
// disabled: true のリンクはティザー期間中クリック不可（span で描画）
const NAV_ITEMS = [
  { label: 'Concept',      href: '/concept',                               disabled: true },
  { label: 'Sweets',       href: '/sweets',                                disabled: true },
  { label: 'Gift',         href: '/gift',                                  disabled: true },
  { label: 'News',         href: '/news',                                  disabled: true },
  { label: 'Shop Info',    href: '/shop',                                  disabled: true },
  { label: 'Online Store', href: 'https://square.site',                    external: true },
  { label: 'Contact',      href: '/contact',                               disabled: true },
  { label: '採用情報',       href: 'https://arwrk.net/recruit/grace-patisserie', external: true },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // スクロール防止
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* オーバーレイ */}
      <div
        className={cn(
          'fixed inset-0 bg-grace-brown/60 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* メニューパネル */}
      <nav
        className={cn(
          'fixed top-0 left-0 h-full w-72 bg-grace-offwhite z-50 flex flex-col transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="ナビゲーションメニュー"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-grace-line">
          <span className="font-cormorant italic text-lg text-grace-brown">Grace</span>
          <button
            onClick={onClose}
            aria-label="メニューを閉じる"
            className="text-grace-text-tertiary hover:text-grace-brown transition-colors"
          >
            <svg width="20" height="20" className="block flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 6l12 12M6 18L18 6"/>
            </svg>
          </button>
        </div>

        <ul className="flex-1 px-8 py-8 space-y-1">
          {NAV_ITEMS.map(({ label, href, external, disabled }) => (
            <li key={href}>
              {external ? (
                // 外部リンク（Online Store・採用情報）はそのまま有効
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="block font-cormorant italic text-2xl text-grace-text-secondary hover:text-grace-brown transition-colors py-2"
                >
                  {label}
                </a>
              ) : disabled ? (
                // ティザーフェーズ：子ページリンクは span で無効化（外観維持）
                <span className="block font-cormorant italic text-2xl text-grace-text-secondary py-2 cursor-default">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  onClick={onClose}
                  className="block font-cormorant italic text-2xl text-grace-text-secondary hover:text-grace-brown transition-colors py-2"
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="px-8 py-6 border-t border-grace-line">
          <p className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary">
            © {new Date().getFullYear()} Grace Foods
          </p>
        </div>
      </nav>
    </>
  )
}
