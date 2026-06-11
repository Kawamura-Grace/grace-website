'use client'

import Image from 'next/image'
import { NoMediaFrame } from './NoMediaFrame'
import { PLACEHOLDER_ASSETS } from './placeholderAssets'

// メディアモード: 環境変数 NEXT_PUBLIC_MEDIA_MODE で切り替え
// - 'placeholder': ストック素材 + PLACEHOLDERラベル（Vercel Preview）
// - 'none':        NoMediaFrame 表示（Production デフォルト・〜8月）
// - 'live':        本番アセット（9月以降）
//
// Production（none モード）でも placeholderAssets.ts はバンドルに含まれるが、
// NEXT_PUBLIC_MEDIA_MODE=none では参照されないため実害なし。
// 動的 require() によるレンダリングタイミング問題を避けるため静的 import を使用。
type MediaMode = 'placeholder' | 'none' | 'live'

function getMediaMode(): MediaMode {
  const mode = process.env.NEXT_PUBLIC_MEDIA_MODE as MediaMode | undefined
  if (mode === 'placeholder' || mode === 'live') return mode
  return 'none' // デフォルト
}

interface BrandMediaProps {
  /** メディアスロット識別子 */
  slot: string
  /** フルブリード表示（hero-full など） */
  fill?: boolean
  /** フォールバック: カスタムの高さクラス */
  className?: string
  /** 本番アセットURL（live モード用） */
  liveUrl?: string
  /** アクセシビリティラベル */
  alt?: string
  priority?: boolean
}

/**
 * BrandMedia — メディアモード分岐を一元化するコンポーネント
 * - none:        NoMediaFrame を表示（本番・写真なし期間）
 * - placeholder: ストック素材 + PLACEHOLDER ラベル（PLACEHOLDER_ASSETS から取得）
 * - live:        本番アセット（liveUrl prop が必要。未指定なら NoMediaFrame）
 */
export function BrandMedia({
  slot,
  fill = false,
  className = '',
  liveUrl,
  alt,
  priority = false,
}: BrandMediaProps) {
  const mode = getMediaMode()

  // none モード: NoMediaFrame のみ
  if (mode === 'none') {
    return <NoMediaFrame className={className} />
  }

  // live モード: liveUrl 未指定の場合は NoMediaFrame（finding #3 対応）
  if (mode === 'live') {
    if (!liveUrl) {
      return <NoMediaFrame className={className} />
    }
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={liveUrl}
          alt={alt ?? slot}
          fill={fill}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
        />
      </div>
    )
  }

  // placeholder モード: 静的 import した PLACEHOLDER_ASSETS を使用
  const asset = PLACEHOLDER_ASSETS[slot]
  if (!asset) {
    return <NoMediaFrame className={className} label={slot} />
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {fill ? (
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority={priority}
        />
      ) : (
        <Image
          src={asset.src}
          alt={asset.alt}
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          priority={priority}
        />
      )}
      {/* PLACEHOLDER ラベル: Cormorant italic 10px / opacity 0.5 */}
      <span
        className="absolute bottom-2 right-3 font-cormorant italic pointer-events-none select-none"
        style={{
          fontSize: '10px',
          opacity: 0.5,
          color: '#2C2421',
          letterSpacing: '0.05em',
        }}
        aria-hidden="true"
      >
        PLACEHOLDER
      </span>
    </div>
  )
}
