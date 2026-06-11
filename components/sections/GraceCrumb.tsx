'use client'

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
  },
  {
    key: 'citrus',
    en: 'Citrus',
    ja: '柑橘',
    description: '国産レモン・ゆず・橙。\n最後の一口に清涼感を。',
  },
  {
    key: 'herb',
    en: 'Herb',
    ja: 'ハーブ',
    description: '自家栽培のタイム・ラベンダー。\n記憶に静かに残る緑の香り。',
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
              ひと口の最後にふわりと立ちのぼる、Graceだけの香り。
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
            焦がしバターを纏わせた独自のクラムが、<br />
            <em
              style={{
                fontStyle: 'normal',
                color: '#B8956A',
              }}
            >
              食べ終えたあとの記憶
            </em>
            に、静かに残ります。
          </p>
        </div>
      </div>
    </section>
  )
}
