import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

// concept/page.tsx は 'use client'（IntersectionObserver を使うため）であり、
// クライアントコンポーネントは metadata を export できない。
// そのため canonical / og:url / title / description はこのレイアウトで付与する。
//
// title・description は main ブランチの app/concept/page.tsx に既存の値をそのまま流用した
// （cinematic-b でクライアントコンポーネント化した際に metadata が失われていたため）。
export const metadata: Metadata = buildPageMetadata({
  path: '/concept',
  title: 'Concept | Grace — PATISSERIE',
  description: '美しい暮らしには、お菓子がある。Grace Patisserieのコンセプトをご紹介します。',
})

export default function ConceptLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
