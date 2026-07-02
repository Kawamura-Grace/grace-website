import Image from 'next/image'
import Link from 'next/link'

// ティザーフェーズのナビ設定
// disabled: true のリンクはティザー期間中クリック不可（span で描画）
const NAV = [
  { label: 'Concept',     href: '/concept',                   disabled: true },
  { label: 'Sweets',      href: '/sweets',                    disabled: true },
  { label: 'Gift',        href: '/gift',                      disabled: true },
  { label: 'News',        href: '/news',                      disabled: true },
  { label: 'Shop Info',   href: '/shop',                      disabled: true },
  { label: 'Online Store',href: 'https://square.site',        external: true },
  { label: 'Contact',     href: '/contact',                   disabled: true },
  { label: 'Recruit',     href: '/recruit' },
]

const LEGAL = [
  { label: 'プライバシーポリシー', href: '/privacy' },
  { label: '特定商取引法表記',     href: '/terms' },
]

export function Footer() {
  return (
    <footer className="bg-grace-offwhite border-t border-grace-line">
      <div className="container-content py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* ブランド */}
          <div>
            <Image
              src="/logo-horizontal.png"
              alt="Pâtisserie Grace"
              width={160}
              height={40}
              className="mb-4"
            />
            <p className="font-noto-serif text-base text-grace-text-tertiary leading-relaxed tracking-wide">
              美しい暮らしには、お菓子がある。
            </p>
          </div>

          {/* ナビ */}
          <div>
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-4">MENU</p>
            <ul className="space-y-2">
              {NAV.map(({ label, href, external, disabled }) => (
                <li key={href}>
                  {external ? (
                    // 外部リンク（Online Store）はそのまま有効
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-noto-serif text-base text-grace-text-secondary hover:text-grace-brown transition-colors"
                    >
                      {label}
                    </a>
                  ) : disabled ? (
                    // ティザーフェーズ：子ページリンクは span で無効化（外観維持）
                    <span className="font-noto-serif text-base text-grace-text-secondary cursor-default">
                      {label}
                    </span>
                  ) : (
                    <Link
                      href={href}
                      className="font-noto-serif text-base text-grace-text-secondary hover:text-grace-brown transition-colors"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* 店舗・SNS */}
          <div>
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-4">SHOP</p>
            <address className="not-italic font-noto-serif text-base text-grace-text-secondary leading-relaxed mb-6">
              〒486-0844<br />
              愛知県春日井市<br />
              営業時間 9:30–19:30<br />
              不定休
            </address>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/patisserie_grace_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-grace-text-tertiary hover:text-grace-brown transition-colors"
              >
                <svg width="16" height="16" className="block flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ボトム */}
        <div className="border-t border-grace-line pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6">
            {LEGAL.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="font-noto-sans text-[10px] tracking-wide text-grace-text-tertiary hover:text-grace-brown transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
          <p className="font-noto-sans text-[10px] tracking-wide text-grace-text-tertiary">
            © {new Date().getFullYear()} 株式会社Grace Foods
          </p>
        </div>
      </div>
    </footer>
  )
}
