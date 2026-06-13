'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MobileMenu } from './MobileMenu'
import { usePhase } from '@/lib/hooks/usePhase'

// デスクトップナビゲーション項目
const NAV_ITEMS = [
  { label: 'Concept',  href: '/concept' },
  { label: 'Sweets',   href: '/#sweets' },
  { label: 'Gift',     href: '/#gift' },
  { label: 'Showcase', href: '/#case' },
  { label: 'Journal',  href: '/journal' },
  { label: 'News',     href: '/news' },
  { label: 'Shop',     href: '/shop' },
  { label: 'Contact',  href: '/contact' },
]

/**
 * cinematic-b ヘッダー
 * - usePhase() で html[data-phase] を設定（時間フェーズシステム）
 * - スクロールで .solid クラス付与（backdrop-blur）
 * - ロゴはCSSクラス(.logo-d/.logo-w)で時間帯ごとに切り替え
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSolid, setIsSolid] = useState(false)
  const { phase } = usePhase()

  // html[data-phase] を設定してCSSカスタムプロパティを切り替える
  useEffect(() => {
    document.documentElement.dataset.phase = phase
  }, [phase])

  // スクロール検知: ビューポート高さの70%以降でソリッドに
  useEffect(() => {
    const onScroll = () => {
      setIsSolid(window.scrollY > window.innerHeight * 0.7)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={[
          'header',
          isSolid ? 'solid' : '',
        ].filter(Boolean).join(' ')}
        id="header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isSolid ? '12px 28px' : '20px 28px',
          transition: 'background .5s, padding .5s',
          background: isSolid
            ? 'color-mix(in srgb, var(--bg) 92%, transparent)'
            : 'transparent',
          backdropFilter: isSolid ? 'blur(8px)' : undefined,
          borderBottom: isSolid
            ? '1px solid color-mix(in srgb, var(--ink) 10%, var(--bg))'
            : undefined,
        }}
      >
        {/* ロゴ */}
        <Link
          href="/"
          aria-label="Grace"
          style={{ display: 'flex', alignItems: 'center', height: '26px' }}
        >
          {/* 朝・昼フェーズ: ダークブラウン版（CSSで切り替え） */}
          <Image
            className="logo-d"
            src="/logo/Grace横ダークブラウン版.png"
            alt="Grace"
            width={120}
            height={26}
            priority
            style={{ height: '100%', width: 'auto', transition: 'opacity 1.2s' }}
          />
          {/* 夕・夜フェーズ: 白版（CSSで切り替え） */}
          <Image
            className="logo-w"
            src="/logo/Grace横白版.png"
            alt="Grace"
            width={120}
            height={26}
            priority
            style={{ height: '100%', width: 'auto', transition: 'opacity 1.2s' }}
          />
          {/* フォールバック */}
          <span
            className="logo-fallback"
            style={{
              display: 'none',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 300,
              letterSpacing: '0.22em',
              fontSize: '21px',
              color: 'var(--ink)',
            }}
          >
            Grace
          </span>
        </Link>

        {/* デスクトップナビ（880px以上で表示） */}
        <nav
          aria-label="メインナビゲーション"
          style={{
            display: 'flex',
            gap: '24px',
          }}
          className="desktop-nav"
        >
          {NAV_ITEMS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '14.5px',
                letterSpacing: '0.18em',
                color: 'var(--ink)',
                opacity: 0.85,
                transition: 'opacity .3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.5' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.85' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* ハンバーガーボタン（モバイルのみ表示） */}
        <button
          aria-label="メニュー"
          className="menu-btn-cinematic"
          onClick={() => setIsMenuOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '34px',
            height: '34px',
            position: 'relative',
            zIndex: 70,
            padding: 0,
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: '5px',
              right: '5px',
              height: '1px',
              background: 'var(--ink)',
              top: '12px',
              transition: '.35s',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: '5px',
              right: '5px',
              height: '1px',
              background: 'var(--ink)',
              top: '21px',
              transition: '.35s',
            }}
          />
        </button>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* レスポンシブ: デスクトップナビの表示制御 */}
      <style>{`
        @media (max-width: 880px) {
          .desktop-nav { display: none !important; }
          .menu-btn-cinematic { display: block !important; }
        }
        @media (min-width: 881px) {
          .menu-btn-cinematic { display: none !important; }
        }
      `}</style>
    </>
  )
}
