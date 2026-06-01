'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * コンセプト抜粋セクション — 50/50 スプリットレイアウト
 * - 左半分: 製菓系スライドショー（4秒自動・opacityトランジション・ドットナビ）
 *   - 上・左に余白（absolute inset + pt-8 pl-8）を設けて浮いているような見せ方
 * - 右半分: オフホワイト背景（#F7F3EF）に縦中央配置のテキスト群
 */

const SLIDE_IMAGES = [
  {
    src: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'ショートケーキ',
  },
  {
    src: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'チョコレートケーキ',
  },
  {
    src: 'https://images.pexels.com/photos/3992131/pexels-photo-3992131.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'マカロン',
  },
  {
    src: 'https://images.pexels.com/photos/2144200/pexels-photo-2144200.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: '焼き菓子',
  },
]

const SLIDE_INTERVAL_MS = 4000

export function ConceptExcerpt() {
  const keywords = ['やさしさ', '余白', '季節', '香り', '素材', '手仕事', '豊かさ']

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goToNext = useCallback((targetIndex?: number) => {
    setVisible(false)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) =>
        targetIndex !== undefined ? targetIndex : (prev + 1) % SLIDE_IMAGES.length
      )
      setVisible(true)
    }, 350)
  }, [])

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => goToNext(), SLIDE_INTERVAL_MS)
  }, [goToNext])

  useEffect(() => {
    resetInterval()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [resetInterval])

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return
    goToNext(index)
    resetInterval()
  }

  return (
    <section
      className="flex flex-col md:flex-row md:h-[600px]"
      style={{ backgroundColor: '#F7F3EF' }}
    >
      {/* 左半分: スライドショー — h-full で高さ確立、pt-8 pl-8 で余白 */}
      <div className="relative w-full md:w-1/2 h-[320px] md:h-full">
        <div className="absolute inset-0 pt-8 pl-8">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={SLIDE_IMAGES[currentIndex].src}
              alt={SLIDE_IMAGES[currentIndex].alt}
              fill
              className={`object-cover transition-opacity duration-700 ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={currentIndex === 0}
            />
            {/* ドットインジケーター */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {SLIDE_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  aria-label={`スライド ${index + 1} へ移動`}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 右半分: テキストコンテンツ */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center px-10 md:px-16 py-16 md:py-20"
        style={{ backgroundColor: '#F7F3EF' }}
      >
        <div className="max-w-[420px] w-full">
          <span
            className="block font-noto-serif tracking-[6px] text-grace-brown/50 mb-6"
            style={{ fontSize: '10px', letterSpacing: '0.4em' }}
          >
            CONCEPT
          </span>
          <h2
            className="font-cormorant italic text-grace-brown leading-none mb-8"
            style={{ fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 300 }}
          >
            Philosophy
          </h2>
          <p
            className="font-noto-serif text-grace-brown/80 leading-[2] mb-10"
            style={{ fontSize: '14px', fontWeight: 300 }}
          >
            厳選した素材と、丁寧な手仕事。<br />
            お菓子は、日常に小さな豊かさを<br />
            もたらすものだと信じています。
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {keywords.map((word) => (
              <span
                key={word}
                className="font-noto-serif text-grace-brown/70 border border-grace-brown/25 px-3 py-1"
                style={{ fontSize: '11px', letterSpacing: '0.1em' }}
              >
                {word}
              </span>
            ))}
          </div>
          <Link
            href="/concept"
            className="font-noto-serif text-[10px] tracking-widest text-grace-brown/60 hover:text-grace-brown transition-colors border-b border-grace-brown/30 pb-1"
          >
            MORE ABOUT GRACE →
          </Link>
        </div>
      </div>
    </section>
  )
}
