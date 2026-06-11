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
    // signature-v1: wasabi 1px 上罫線、hover=wasabi
    <footer className="bg-cream" style={{ borderTop: '1px solid #7B8B6F' }}>
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
            <p
              className="font-shippori text-brown/60 leading-relaxed"
              style={{ fontSize: '13px', letterSpacing: '0.06em' }}
            >
              美しい暮らしには、お菓子がある。
            </p>
          </div>

          {/* ナビ */}
          <div>
            <p className="font-cormorant italic text-[10px] tracking-widest text-brown/40 mb-4">Menu</p>
            <ul className="space-y-2">
              {NAV.map(({ label, href, external }) => (
                <li key={href}>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-shippori text-sm text-brown/70 hover:text-wasabi transition-colors"
                      style={{ transitionDuration: '0.8s' }}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="font-shippori text-sm text-brown/70 hover:text-wasabi transition-colors"
                      style={{ transitionDuration: '0.8s' }}
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
            <p className="font-cormorant italic text-[10px] tracking-widest text-brown/40 mb-4">Shop</p>
            <address className="not-italic font-shippori text-sm text-brown/70 leading-relaxed mb-6">
              〒486-0844<br />
              愛知県春日井市朝宮町1-2-6<br />
              営業時間 9:30–19:30<br />
              不定休
            </address>
            {/* SNS アイコン: Instagram / LINE / Mail */}
            <div className="flex gap-5">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/patisserie_grace_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-brown/50 hover:text-wasabi transition-colors"
                style={{ transitionDuration: '0.8s' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              {/* TODO: LINE公式アカウントID確定後に設定 */}
              <a
                href="#"
                aria-label="LINE"
                className="text-brown/50 hover:text-wasabi transition-colors"
                style={{ transitionDuration: '0.8s' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5c0 4.14-4.03 7.5-9 7.5a9.98 9.98 0 0 1-3-.46L4 20l1.08-3.5C3.78 15.16 3 13.4 3 11.5 3 7.36 7.03 4 12 4s9 3.36 9 7.5Z"/>
                </svg>
              </a>
              {/* Mail */}
              <a
                href="mailto:info@grace-patisserie.jp"
                aria-label="メール"
                className="text-brown/50 hover:text-wasabi transition-colors"
                style={{ transitionDuration: '0.8s' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 7 10-7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ボトム */}
        <div
          className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(44,36,33,.08)' }}
        >
          <div className="flex gap-6">
            {LEGAL.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="font-shippori text-[10px] tracking-wide text-brown/40 hover:text-wasabi transition-colors"
                style={{ transitionDuration: '0.8s' }}
              >
                {label}
              </Link>
            ))}
          </div>
          <p className="font-cormorant italic text-[10px] tracking-wide text-brown/40">
            © {new Date().getFullYear()} 株式会社Grace Foods
          </p>
        </div>
      </div>
    </footer>
  )
}
