import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { GrainOverlay } from '@/components/brand/GrainOverlay'
import { HeroSignature } from '@/components/sections/HeroSignature'
import { HeroFullMedia } from '@/components/sections/HeroFullMedia'
import { NewsBar } from '@/components/sections/NewsBar'
import { PhilosophyExcerpt } from '@/components/sections/PhilosophyExcerpt'
import { GraceCrumb } from '@/components/sections/GraceCrumb'
import { SeasonalSelectionV2 } from '@/components/sections/SeasonalSelectionV2'
import { ShopInfoV2 } from '@/components/sections/ShopInfoV2'
import { OnlineStoreBanner } from '@/components/sections/OnlineStoreBanner'

/**
 * TOP ページ — signature-v1
 *
 * セクション構成:
 *   1-1. HeroSignature       — 100svh / cream / LogoDrawing stroke アニメ
 *   1-2. HeroFullMedia       — フルブリードメディア（none モード時は非表示）
 *   1-3. NewsBar             — ニュース一行
 *   1-4. PhilosophyExcerpt  — Philosophy 抄
 *   1-5. GraceCrumb          — 署名セクション（brown 背景）
 *   1-6. SeasonalSelectionV2 — 季節商品カード3枚
 *   1-7. ShopInfoV2          — 店舗情報
 *       OnlineStoreBanner    — Online Store 帯（brown 背景）
 *       Footer               — wasabi 上罫線
 *
 * メディアモード（NEXT_PUBLIC_MEDIA_MODE）:
 *   none        → NoMediaFrame 表示（Production デフォルト・〜8月）
 *   placeholder → ストック素材 + PLACEHOLDER ラベル（Preview デフォルト）
 *   live        → 本番アセット（9月以降）
 */

// ISR 1時間
export const revalidate = 3600

export default function HomePage() {
  return (
    <>
      {/* グレインオーバーレイ（fixed・全ページ共通・最前面） */}
      <GrainOverlay />

      <Header variant="transparent" />

      <main>
        {/* 1-1. ヒーロー */}
        <HeroSignature />

        {/* 1-2. フルブリードメディア（none モード時は null） */}
        <HeroFullMedia />

        {/* 1-3. ニュース一行 */}
        <NewsBar />

        {/* 1-4. Philosophy 抄 */}
        <PhilosophyExcerpt />

        {/* 1-5. Grace Crumb（署名セクション） */}
        <GraceCrumb />

        {/* 1-6. Seasonal Selection */}
        <SeasonalSelectionV2 />

        {/* 1-7. Shop Info */}
        <ShopInfoV2 />

        {/* Online Store 帯 */}
        <OnlineStoreBanner />
      </main>

      <Footer />
    </>
  )
}
