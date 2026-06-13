import type { Metadata } from 'next'
import { Cormorant_Garamond, Noto_Serif_JP, Noto_Sans_JP, Shippori_Mincho } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
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

// cinematic-b 本文フォント
const shippori = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-shippori',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Grace｜春日井のパティスリー',
  description: '美しい暮らしには、お菓子がある。2026年秋、愛知・春日井にオープン。',
  metadataBase: new URL('https://www.grace-patisserie.jp'),
  openGraph: {
    title: 'Grace｜春日井のパティスリー',
    description: '美しい暮らしには、お菓子がある。2026年秋、愛知・春日井にオープン。',
    type: 'website',
    url: 'https://www.grace-patisserie.jp',
    siteName: 'Grace Patisserie',
    images: [{ url: '/logo-horizontal.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grace｜春日井のパティスリー',
    description: '美しい暮らしには、お菓子がある。2026年秋、愛知・春日井にオープン。',
    images: ['/logo-horizontal.png'],
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
    canonical: 'https://www.grace-patisserie.jp',
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      data-phase="day"
      className={`${cormorant.variable} ${notoSerif.variable} ${notoSans.variable} ${shippori.variable}`}
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
