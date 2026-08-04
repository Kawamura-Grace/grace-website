import type { Metadata } from 'next'
import { Cormorant_Garamond, Noto_Serif_JP, Noto_Sans_JP } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo'
import '../styles/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const notoSerif = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-noto-serif',
  display: 'swap',
})

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-noto-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Grace — PATISSERIE',
  description: '美しい暮らしには、お菓子がある。2026年秋、愛知・春日井にオープン。',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Grace — PATISSERIE',
    description: '美しい暮らしには、お菓子がある。2026年秋、愛知・春日井にオープン。',
    type: 'website',
    // 相対パスで指定し metadataBase で解決させる。ここはトップページ自身のURL。
    url: '/',
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grace — PATISSERIE',
    description: '美しい暮らしには、お菓子がある。2026年秋、愛知・春日井にオープン。',
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: [{ url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png' }],
    other: [{ rel: 'icon', url: '/icon-192.png', sizes: '192x192' }],
  },
  verification: {
    google: 'OSsOhnDrzCCf891qRWKkzn3OJ7IZxs754JID1oUS7M8',
  },
  alternates: {
    // ルートレイアウトの canonical はトップページ自身を指す。
    // 各下層ページは buildPageMetadata()（lib/seo.ts）で自ページのパスに上書きする。
    canonical: '/',
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${cormorant.variable} ${notoSerif.variable} ${notoSans.variable}`}
    >
      <body>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        {children}
        <Analytics />
      </body>
    </html>
  )
}
