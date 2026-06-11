'use client'

import { useRef } from 'react'
import { Eyebrow, DisplayHeading, MoreLink } from '@/components/brand/Typography'
import { useReveal, revealStyle } from '@/components/brand/useReveal'

/**
 * PhilosophyExcerpt — Philosophy 抄（1-4）
 * - eyebrow「Concept」
 * - DisplayHeading「Philosophy」
 * - 和文3行
 * - 7キーワード（gold 3px ドット区切り）
 * - MoreLink「More about Grace」
 */

const KEYWORDS = ['やさしさ', '余白', '季節', '香り', '素材', '手仕事', '豊かさ']

export function PhilosophyExcerpt() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ref: revealRef, isVisible } = useReveal()

  return (
    <section
      ref={sectionRef}
      className="bg-cream py-24 px-6"
      aria-label="Philosophy"
    >
      <div
        ref={revealRef as React.RefObject<HTMLDivElement>}
        className="max-w-xl mx-auto text-center"
      >
        {/* eyebrow */}
        <div style={revealStyle(isVisible, 0, '0.8s')}>
          <Eyebrow className="mb-6 text-center">Concept</Eyebrow>
        </div>

        {/* 見出し */}
        <div style={revealStyle(isVisible, 80, '1.2s')}>
          <DisplayHeading as="h2" weight={300} className="mb-8">
            Philosophy
          </DisplayHeading>
        </div>

        {/* 本文3行 */}
        <div style={revealStyle(isVisible, 160, '0.8s')}>
          <p
            className="font-shippori text-brown/80 leading-loose mb-10"
            style={{
              fontSize: 'clamp(13px,1.6vw,15px)',
              fontWeight: 400,
              lineHeight: 2.2,
            }}
          >
            厳選した素材と、丁寧な手仕事。<br />
            お菓子は、日常に小さな豊かさを<br />
            もたらすものだと信じています。
          </p>
        </div>

        {/* 7キーワード（gold 3px ドット区切り） */}
        <div
          className="flex flex-wrap justify-center items-center gap-y-2 mb-10"
          style={revealStyle(isVisible, 240, '0.8s')}
        >
          {KEYWORDS.map((word, i) => (
            <span key={word} className="flex items-center">
              <span
                className="font-shippori text-brown"
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                }}
              >
                {word}
              </span>
              {/* gold ドット区切り（最後は不要） */}
              {i < KEYWORDS.length - 1 && (
                <span
                  className="mx-3 rounded-full bg-gold"
                  style={{ width: '3px', height: '3px', display: 'inline-block' }}
                  aria-hidden="true"
                />
              )}
            </span>
          ))}
        </div>

        {/* MoreLink */}
        <div style={revealStyle(isVisible, 320, '0.8s')}>
          <MoreLink href="/concept">More about Grace</MoreLink>
        </div>
      </div>
    </section>
  )
}
