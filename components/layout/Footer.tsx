import Image from 'next/image'
import Link from 'next/link'

const NAV = [
  { label: 'Concept',     href: '/concept' },
  { label: 'Sweets',      href: '/sweets' },
  { label: 'Gift',        href: '/gift' },
  { label: 'News',        href: '/news' },
  { label: 'Shop Info',   href: '/shop' },
  { label: 'Online Store',href: 'https://square.site', external: true },
  { label: 'Contact',     href: '/contact' },
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
            <p className="font-noto-serif text-sm text-grace-text-tertiary leading-relaxed tracking-wide">
              美しい暮らしには、お菓子がある。
            </p>
          </div>

          {/* ナビ */}
          <div>
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-4">MENU</p>
            <ul className="space-y-2">
              {NAV.map(({ label, href, external }) => (
                <li key={href}>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-noto-serif text-sm text-grace-text-secondary hover:text-grace-brown transition-colors"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="font-noto-serif text-sm text-grace-text-secondary hover:text-grace-brown transition-colors"
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
            <address className="not-italic font-noto-serif text-sm text-grace-text-secondary leading-relaxed mb-6">
              〒486-0844<br />
              愛知県春日井市<br />
              営業時間 9:30–19:30<br />
              不定休
            </address>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/grace_lifestyle_dessert"
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
              <a
                href="mailto:info@grace-patisserie.jp"
                aria-label="メールで問い合わせ"
                className="text-grace-text-tertiary hover:text-grace-brown transition-colors"
              >
                <svg width="16" height="16" className="block flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
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
