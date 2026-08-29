import type { Metadata } from 'next'
import { Cormorant_Garamond, Noto_Serif_JP, Noto_Sans_JP, Shippori_Mincho } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo'
import '../styles/globals.css'

// パフォーマンス最適化（2026-08-29）：
// これら4書体はいずれも実際の描画では next/font のCSS変数(var(--font-*))ではなく
// tailwind.config.ts の literal font-family名（"Cormorant Garamond"等）が使われており、
// next/fontが生成する@font-face（obfuscatedな内部名）は現状どのCSSからも参照されていない
// （grep実測・getComputedStyle実測で確認済み・デザイン上の見た目に影響なし）。
// それにもかかわらず preload:true（デフォルト）により <link rel="preload"> が
// 全ウェイト×サブセット分（実測126件のwoff2）を初回アクセスで強制ダウンロードさせており、
// Lighthouse Performance低下の主因になっていた。
// 書体・ウェイト構成・見た目は変更せず、不要なプリロードのみ止める（preload:false）。
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: false,
})

const notoSerif = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-noto-serif',
  display: 'swap',
  preload: false,
})

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-noto-sans',
  display: 'swap',
  preload: false,
})

// cinematic-b 本文フォント
const shippori = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-shippori',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: 'Grace｜春日井のパティスリー',
  description: '美しい暮らしには、お菓子がある。2026年秋、愛知・春日井にオープン。',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Grace｜春日井のパティスリー',
    description: '美しい暮らしには、お菓子がある。2026年秋、愛知・春日井にオープン。',
    type: 'website',
    // 相対パスで指定し metadataBase で解決させる。ここはトップページ自身のURL。
    url: '/',
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grace｜春日井のパティスリー',
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
    // 各下層ページは buildPageMetadata() で自ページのパスに上書きする。
    canonical: '/',
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
