'use client'

import { useRef } from 'react'
import { Eyebrow, DisplayHeading } from '@/components/brand/Typography'
import { useReveal, revealStyle } from '@/components/brand/useReveal'

/**
 * GraceCrumb — 署名セクション（1-5）
 *
 * - brown 背景 / cream 文字
 * - eyebrow「Signature — 香りの設計」
 * - DisplayHeading「Grace Crumb」
 * - リード文
 * - 3アイテム（Vanilla / Citrus / Herb）: 線画 88px + 英名 + 和名 + 説明
 * - 結び（em は gold）
 *
 * コピーは仮実装。代表レビュー調整予定。
 */

// 3アイテム定義
const CRUMB_ITEMS = [
  {
    key: 'vanilla',
    en: 'Vanilla',
    ja: 'バニラ',
    description: 'マダガスカル産ブルボンバニラ。\n温かみのある甘さが余韻を包む。',
    // SVG: バニラ豆のシルエット
    svg: (
      <svg viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M44 78 C44 78 28 60 28 40 C28 22 36 14 44 12 C52 14 60 22 60 40 C60 60 44 78 44 78Z"
          stroke="#B8956A"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M44 12 L44 78"
          stroke="#B8956A"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="2 4"
        />
        <path
          d="M30 38 C36 35 44 34 52 38"
          stroke="#B8956A"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M29 46 C36 43 44 42 53 46"
          stroke="#B8956A"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: 'citrus',
    en: 'Citrus',
    ja: '柑橘',
    description: '国産レモン・ゆず・橙。\n最後の一口に清涼感を。',
    // SVG: 柑橘の断面
    svg: (
      <svg viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="44" cy="44" r="26" stroke="#B8956A" strokeWidth="1.4" fill="none" />
        <circle cx="44" cy="44" r="18" stroke="#B8956A" strokeWidth="0.8" fill="none" />
        {/* 放射状の線（房） */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x1 = 44 + 8 * Math.cos(rad)
          const y1 = 44 + 8 * Math.sin(rad)
          const x2 = 44 + 18 * Math.cos(rad)
          const y2 = 44 + 18 * Math.sin(rad)
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#B8956A"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          )
        })}
        {/* 中央の種 */}
        <circle cx="44" cy="44" r="3" stroke="#B8956A" strokeWidth="0.8" fill="none" />
        {/* へた */}
        <path
          d="M44 18 C41 12 40 8 44 6 C48 8 47 12 44 18"
          stroke="#B8956A"
          strokeWidth="1.0"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: 'herb',
    en: 'Herb',
    ja: 'ハーブ',
    description: '自家栽培のタイム・ラベンダー。\n記憶に静かに残る緑の香り。',
    // SVG: ハーブの葉
    svg: (
      <svg viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M44 80 L44 28"
          stroke="#B8956A"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M44 60 C32 52 20 44 24 32 C28 20 40 32 44 44"
          stroke="#B8956A"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M44 60 C56 52 68 44 64 32 C60 20 48 32 44 44"
          stroke="#B8956A"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M44 44 C34 38 24 28 28 18 C32 8 42 20 44 32"
          stroke="#B8956A"
          strokeWidth="1.0"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M44 44 C54 38 64 28 60 18 C56 8 46 20 44 32"
          stroke="#B8956A"
          strokeWidth="1.0"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M44 32 C40 24 40 16 44 12 C48 16 48 24 44 32"
          stroke="#B8956A"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
] as const

// アイテムカード
interface CrumbItemProps {
  item: typeof CRUMB_ITEMS[number]
  isVisible: boolean
  staggerIndex: number
}

function CrumbItem({ item, isVisible, staggerIndex }: CrumbItemProps) {
  const delay = staggerIndex * 150 + 200 // stagger 0.15s

  return (
    <div
      className="flex flex-col items-center text-center"
      style={revealStyle(isVisible, delay, '0.8s')}
    >
      {/* 線画 88px */}
      <div
        className="mb-5"
        style={{ width: '88px', height: '88px' }}
        aria-hidden="true"
      >
        {item.svg}
      </div>

      {/* 英名（Cormorant italic 24px gold） */}
      <p
        className="font-cormorant italic text-gold mb-1"
        style={{ fontSize: '24px', fontWeight: 300 }}
      >
        {item.en}
      </p>

      {/* 和名 */}
      <p
        className="font-shippori text-cream/70 mb-3"
        style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 400 }}
      >
        {item.ja}
      </p>

      {/* 説明 2行 */}
      <p
        className="font-shippori text-cream/60"
        style={{
          fontSize: '12px',
          lineHeight: 2,
          whiteSpace: 'pre-line',
          fontWeight: 400,
        }}
      >
        {item.description}
      </p>
    </div>
  )
}

export function GraceCrumb() {
  const { ref: revealRef, isVisible } = useReveal()

  return (
    <section
      className="bg-brown py-24 px-6"
      aria-label="Grace Crumb — 香りの設計"
    >
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div
          ref={revealRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-16"
        >
          <div style={revealStyle(isVisible, 0, '0.8s')}>
            {/* eyebrow（cream 色で上書き） */}
            <span
              className="block font-cormorant italic mb-6"
              style={{
                fontSize: '10px',
                letterSpacing: '0.35em',
                fontWeight: 400,
                color: '#B8956A',
              }}
            >
              Signature — 香りの設計
            </span>
          </div>

          <div style={revealStyle(isVisible, 80, '1.2s')}>
            <h2
              className="font-cormorant italic leading-none mb-8"
              style={{
                fontSize: 'clamp(36px,6vw,72px)',
                fontWeight: 300,
                color: '#F7F3EF',
              }}
            >
              Grace Crumb
            </h2>
          </div>

          {/* リード文 */}
          <div style={revealStyle(isVisible, 160, '0.8s')}>
            <p
              className="font-shippori text-cream/75 leading-loose mx-auto"
              style={{
                fontSize: 'clamp(13px,1.5vw,15px)',
                lineHeight: 2.4,
                maxWidth: '520px',
                fontWeight: 400,
              }}
            >
              写真には写らないものを、私たちは一番大切にしています。<br />
              一口の最後にさっと立ち上がる、Grace だけの香り。
            </p>
          </div>
        </div>

        {/* 3アイテム */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {CRUMB_ITEMS.map((item, i) => (
            <CrumbItem
              key={item.key}
              item={item}
              isVisible={isVisible}
              staggerIndex={i}
            />
          ))}
        </div>

        {/* 結び */}
        <div
          className="text-center"
          style={revealStyle(isVisible, 600, '1.2s')}
        >
          <p
            className="font-shippori text-cream/70 leading-loose mx-auto"
            style={{
              fontSize: 'clamp(13px,1.5vw,15px)',
              lineHeight: 2.6,
              maxWidth: '480px',
              fontWeight: 400,
            }}
          >
            福ふくバターを溶かした独自のクラムが、<br />
            <em
              style={{
                fontStyle: 'normal',
                color: '#B8956A',
              }}
            >
              食べ終わったことの記憶
            </em>
            に静かに残ります。
          </p>
        </div>
      </div>
    </section>
  )
}
