'use client'

import Image from 'next/image'
import Link from 'next/link'

// フッターナビゲーション
const FNAV = [
  { label: 'Concept',     href: '/concept' },
  { label: 'Sweets',      href: '/#sweets' },
  { label: 'Gift',        href: '/#gift' },
  { label: 'Showcase',    href: '/#case' },
  { label: 'Shop',        href: '/shop' },
  { label: 'Online Shop', href: '/#online-shop' },
  { label: 'Journal',     href: '/journal' },
  { label: 'News',        href: '/news' },
  { label: 'Contact',     href: '/contact' },
]

/**
 * cinematic-b フッター
 * - 背景: var(--grace-brown)
 * - ロゴ: 横版白（footer-logo クラスで常に白版表示）
 * - 参照HTML .footer に準拠
 */
export function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: '#2C2421',
        color: '#F7F3EF',
        padding: 'clamp(56px,8vw,84px) clamp(24px,6vw,80px) 38px',
        borderTop: '1px solid rgba(247,243,239,.08)',
      }}
    >
      {/* フッター上部 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '40px',
        }}
      >
        {/* ブランド情報 */}
        <div>
          {/* ロゴ（横版白を常時表示） */}
          <div
            className="footer-logo"
            style={{ height: '30px', marginBottom: '20px' }}
          >
            {/* footer-logo クラスが .logo-d を非表示 .logo-w を表示 */}
            <Image
              className="logo-d"
              src="/logo/Grace横ダークブラウン版.png"
              alt="Grace"
              width={120}
              height={26}
              priority
              style={{ height: '100%', width: 'auto' }}
            />
            <Image
              className="logo-w"
              src="/logo/Grace横白版.png"
              alt="Grace"
              width={120}
              height={26}
              priority
              style={{ height: '100%', width: 'auto' }}
            />
            <span
              style={{
                display: 'none',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '24px',
                color: '#F7F3EF',
              }}
            >
              Grace
            </span>
          </div>

          {/* 住所・営業時間 */}
          <address
            style={{
              fontStyle: 'normal',
              fontSize: '12.5px',
              color: 'rgba(247,243,239,.6)',
              letterSpacing: '0.12em',
              lineHeight: 2.1,
            }}
          >
            パティスリー Grace<br />
            愛知県春日井市朝宮町1-2-6<br />
            9:30 - 19:30 ／ 元旦を除き毎日営業
          </address>

          {/* Instagram */}
          <p
            style={{
              marginTop: '20px',
              fontSize: '12px',
              letterSpacing: '0.16em',
            }}
          >
            Instagram&nbsp;&nbsp;
            <a
              href="https://www.instagram.com/patisserie_grace_/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#B8956A',
                borderBottom: '1px solid rgba(184,149,106,.4)',
                paddingBottom: '2px',
              }}
            >
              @patisserie_grace_
            </a>
          </p>

          {/* お問い合わせ */}
          <p
            style={{
              marginTop: '8px',
              fontSize: '12px',
              letterSpacing: '0.12em',
              color: 'rgba(247,243,239,.6)',
            }}
          >
            取材・法人ギフト・卸・採用のお問い合わせ&nbsp;&nbsp;
            <Link
              href="/contact"
              style={{ color: '#B8956A', borderBottom: '1px solid rgba(184,149,106,.4)', paddingBottom: '2px' }}
            >
              Contact Form
            </Link>
          </p>
        </div>

        {/* フッターナビ */}
        <nav
          aria-label="フッターナビゲーション"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, auto)',
            gap: '13px 42px',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '13.5px',
            letterSpacing: '0.22em',
            alignContent: 'start',
          }}
          className="footer-fnav"
        >
          {FNAV.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                color: '#F7F3EF',
                transition: 'opacity .3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.55' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* フッター下部 */}
      <div
        style={{
          marginTop: '48px',
          paddingTop: '22px',
          borderTop: '1px solid rgba(247,243,239,.1)',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '11px',
          letterSpacing: '0.16em',
          color: 'rgba(247,243,239,.45)',
        }}
      >
        <p>&copy; 2026 Grace Foods Inc.</p>
        <p>
          <Link href="/privacy" style={{ color: 'inherit' }}>Privacy Policy</Link>
          &nbsp;&nbsp;／&nbsp;&nbsp;
          <Link href="/terms" style={{ color: 'inherit' }}>Terms</Link>
        </p>
      </div>

      {/* フッターナビのレスポンシブ */}
      <style>{`
        @media (max-width: 880px) {
          .footer-fnav { grid-template-columns: repeat(2, auto) !important; }
        }
      `}</style>
    </footer>
  )
}
