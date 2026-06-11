'use client'

import Image from 'next/image'
import { NoMediaFrame } from './NoMediaFrame'

// メディアモード: 環境変数 NEXT_PUBLIC_MEDIA_MODE で切り替え
// - 'placeholder': ストック素材 + PLACEHOLDERラベル（Vercel Preview デフォルト）
// - 'none':        NoMediaFrame 表示（Production デフォルト・〜8月）
// - 'live':        本番アセット（9月以降）
type MediaMode = 'placeholder' | 'none' | 'live'

function getMediaMode(): MediaMode {
  const mode = process.env.NEXT_PUBLIC_MEDIA_MODE as MediaMode | undefined
  if (mode === 'placeholder' || mode === 'live') return mode
  return 'none' // デフォルト
}

// スロット別ストック素材定義（placeholder モード用）
// 本番ビルド（none モード）では一切参照されない
const PLACEHOLDER_ASSETS: Record<string, { src: string; alt: string }> = {
  'hero-full': {
    src: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'パティスリーの焼き菓子（プレースホルダー）',
  },
  'product-cheesecake': {
    src: 'https://images.pexels.com/photos/3992131/pexels-photo-3992131.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'チーズケーキ（プレースホルダー）',
  },
  'product-tart': {
    src: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: '季節のタルト（プレースホルダー）',
  },
  'product-financier': {
    src: 'https://images.pexels.com/photos/2144200/pexels-photo-2144200.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'フィナンシェ（プレースホルダー）',
  },
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
 * - placeholder: ストック素材 + PLACEHOLDER ラベル
 * - live:        本番アセット（liveUrl prop が必要）
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

  // live モード: 本番アセット
  if (mode === 'live' && liveUrl) {
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

  // placeholder モード（live かつ liveUrl 未設定も含む）
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
