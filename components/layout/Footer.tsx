'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SHOW_HALLCAKE_RESERVE, RESERVATION_URL } from '@/lib/reservation'

// フッターナビゲーション
// 表示フラグ：オンラインショップの開店まで、準備中の案内にしか行かないリンクは出さない（2026-10-13）。
// 開店したらリンク先を実際のショップのURLに変えて true に戻す
const SHOW_ONLINE_SHOP_LINK = false

const FNAV_ALL = [
  { label: 'Concept',     href: '/concept',                                      external: false },
  { label: 'Sweets',      href: '/sweets',                                      external: false },
  { label: 'Gift',        href: '/gift',                                        external: false },
  { label: 'Showcase',    href: '/#case',                                        external: false },
  { label: 'Shop',        href: '/shop',                                         external: false },
  { label: 'Online Shop', href: '/#online-shop',                                 external: false },
  { label: 'Journal',     href: '/journal',                                      external: false },
  { label: 'News',        href: '/news',                                         external: false },
  { label: 'Contact',     href: '/contact',                                      external: false },
  { label: 'Recruit',     href: '/recruit',                                      external: false },
]
const FNAV = FNAV_ALL.filter(({ label }) => SHOW_ONLINE_SHOP_LINK || label !== 'Online Shop')

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
            style={{ height: '36px', marginBottom: '20px' }}
          >
            {/* footer-logo クラスが .logo-d を非表示 .logo-w を表示 */}
            <Image
              className="logo-d"
              src="/logo/Grace横ダークブラウン版.png"
              alt="Grace"
              width={124}
              height={36}
              priority
              style={{ height: '100%', width: 'auto' }}
            />
            <Image
              className="logo-w"
              src="/logo/Grace横白版.png"
              alt="Grace"
              width={124}
              height={36}
              priority
              style={{ height: '100%', width: 'auto' }}
            />
            <span
              style={{
                display: 'none',
                fontFamily: "var(--font-cormorant), Georgia, serif",
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
            Grace PÂTISSERIE グレイス<br />
            愛知県春日井市朝宮町1-2-6<br />
            9:30 - 19:30 ／ 元日を除き毎日営業（臨時休業はお知らせでご案内）
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

          {/* ホールケーキ予約（予約サイト公開後に環境変数で表示） */}
          {SHOW_HALLCAKE_RESERVE && (
            <p
              style={{
                marginTop: '8px',
                fontSize: '12px',
                letterSpacing: '0.16em',
              }}
            >
              ご予約&nbsp;&nbsp;
              <a
                href={RESERVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#B8956A',
                  borderBottom: '1px solid rgba(184,149,106,.4)',
                  paddingBottom: '2px',
                }}
              >
                ホールケーキ
              </a>
            </p>
          )}

          {/* 公式LINE */}
          <p
            style={{
              marginTop: '8px',
              fontSize: '12px',
              letterSpacing: '0.16em',
            }}
          >
            公式LINE&nbsp;&nbsp;
            <a
              href="https://lin.ee/SHBoDiLI"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#B8956A',
                borderBottom: '1px solid rgba(184,149,106,.4)',
                paddingBottom: '2px',
              }}
            >
              友だち追加
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
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '13.5px',
            letterSpacing: '0.22em',
            alignContent: 'start',
          }}
          className="footer-fnav"
        >
          {FNAV.map(({ label, href, external }) => (
            <a
              key={href}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
        <p>&copy; 2026 株式会社Grace Foods</p>
        <p>
          <Link href="/privacy" style={{ color: 'inherit' }}>Privacy Policy</Link>
          &nbsp;&nbsp;／&nbsp;&nbsp;
          <Link href="/terms" style={{ color: 'inherit' }}>特定商取引法に基づく表記</Link>
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
