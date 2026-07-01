'use client'

import { useEffect } from 'react'

// モバイルメニューの項目（英語ラベル + 日本語サブテキスト）
const MENU_ITEMS = [
  { label: 'Concept',  jp: 'ブランドについて', href: '/concept',                                    external: false },
  { label: 'Sweets',   jp: 'お菓子',           href: '/#sweets',                                    external: false },
  { label: 'Gift',     jp: '贈りもの',          href: '/#gift',                                      external: false },
  { label: 'Showcase', jp: 'ショーケース',       href: '/#case',                                      external: false },
  { label: 'Journal',  jp: 'ジャーナル',        href: '/journal',                                    external: false },
  { label: 'News',     jp: 'お知らせ',          href: '/news',                                       external: false },
  { label: 'Shop',     jp: '店舗案内',          href: '/shop',                                       external: false },
  { label: 'Contact',  jp: 'お問い合わせ',      href: '/contact',                                    external: false },
  { label: 'Recruit',  jp: '採用情報',          href: '/recruit',                                    external: false },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * cinematic-b モバイルメニュー
 * - フルスクリーンオーバーレイ（背景: var(--grace-brown)）
 * - 参照HTML .mobile-menu に完全準拠
 * - 各リンクに日本語サブテキスト（.jp）付き
 */
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
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#2C2421',
        zIndex: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '22px',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity .4s',
      }}
      aria-hidden={!isOpen}
    >
      {/* 閉じるボタン */}
      <button
        onClick={onClose}
        aria-label="メニューを閉じる"
        style={{
          position: 'absolute',
          top: '24px',
          right: '28px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          width: '34px',
          height: '34px',
          zIndex: 70,
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: '5px',
            right: '5px',
            height: '1px',
            background: '#F7F3EF',
            top: '16px',
            transform: 'rotate(26deg)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: '5px',
            right: '5px',
            height: '1px',
            background: '#F7F3EF',
            top: '16px',
            transform: 'rotate(-26deg)',
          }}
        />
      </button>

      {/* ナビゲーション項目 */}
      {MENU_ITEMS.map(({ label, jp, href, external }) => (
        <a
          key={href}
          href={href}
          onClick={onClose}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '22px',
            letterSpacing: '0.2em',
            color: '#F7F3EF',
            textAlign: 'center',
            display: 'block',
          }}
        >
          {label}
          <span
            style={{
              fontFamily: "'Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
              fontStyle: 'normal',
              fontSize: '10.5px',
              letterSpacing: '0.3em',
              color: '#B8956A',
              display: 'block',
              marginTop: '2px',
            }}
          >
            {jp}
          </span>
        </a>
      ))}
    </div>
  )
}
