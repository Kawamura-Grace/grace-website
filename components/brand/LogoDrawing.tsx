'use client'

import { useEffect, useRef } from 'react'

/**
 * LogoDrawing — ロゴ線画 stroke-drawing アニメーション
 *
 * 構成:
 * - ボタニカルパターン（葉・草）: 0.3s〜
 * - 柑橘パターン（丸み）: 1.2s〜
 * - ハーブパターン（細葉）: 1.5s〜
 * - 合計 2.2s
 *
 * 設計方針:
 * - パス定義（SVG paths）とアニメ定義（CSS）を分離
 * - HarukDesign 正式 SVG 入稿後: このファイルの SVG パス部分のみ差し替え可能
 * - strokeWidth: 1.6 / stroke: brown (#2C2421)
 *
 * アクセシビリティ: prefers-reduced-motion: reduce で即表示
 */

interface LogoDrawingProps {
  className?: string
  /** SVG の幅（px）。高さは viewBox 比率で自動 */
  width?: number
}

export function LogoDrawing({ className = '', width = 240 }: LogoDrawingProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll<SVGPathElement>('[data-draw]')

    paths.forEach((path) => {
      const length = path.getTotalLength()
      const delay = parseFloat(path.dataset.delay ?? '0')
      const duration = parseFloat(path.dataset.duration ?? '0.8')

      if (prefersReduced) {
        // reduced-motion: 即全表示
        path.style.strokeDasharray = `${length}`
        path.style.strokeDashoffset = '0'
        return
      }

      // 初期状態: 非表示
      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length}`
      path.style.transition = `stroke-dashoffset ${duration}s cubic-bezier(.22,1,.36,1) ${delay}s`

      // 次フレームでアニメ開始
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          path.style.strokeDashoffset = '0'
        })
      })
    })
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 240 280"
      width={width}
      height={Math.round(width * (280 / 240))}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Grace Patisserie ロゴ線画"
      role="img"
    >
      {/*
        ─── パス定義セクション ───────────────────────────────────────────
        HarukDesign 正式 SVG 入稿後はここのパスを差し替える。
        現在は仮線画（ボタニカル風の草花モチーフ）。

        data-draw: stroke-drawing アニメ対象マーカー
        data-delay: アニメ開始遅延（秒）
        data-duration: アニメ継続時間（秒）
      ─────────────────────────────────────────────────────────────────── */}

      {/* === グループ1: ボタニカル（葉・草）0.3s〜 === */}
      {/* 中央縦茎 */}
      <path
        data-draw
        data-delay="0.3"
        data-duration="0.6"
        d="M120 260 L120 80"
        stroke="#2C2421"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      {/* 左大葉 */}
      <path
        data-draw
        data-delay="0.5"
        data-duration="0.6"
        d="M120 200 C95 188 68 170 74 148 C80 126 105 144 120 162"
        stroke="#2C2421"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      {/* 右大葉 */}
      <path
        data-draw
        data-delay="0.6"
        data-duration="0.6"
        d="M120 200 C145 188 172 170 166 148 C160 126 135 144 120 162"
        stroke="#2C2421"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      {/* 左中葉 */}
      <path
        data-draw
        data-delay="0.7"
        data-duration="0.55"
        d="M120 170 C92 158 72 136 80 114 C88 92 114 114 120 132"
        stroke="#2C2421"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* 右中葉 */}
      <path
        data-draw
        data-delay="0.75"
        data-duration="0.55"
        d="M120 170 C148 158 168 136 160 114 C152 92 126 114 120 132"
        stroke="#2C2421"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />

      {/* === グループ2: 柑橘（丸み・ベリー）1.2s〜 === */}
      {/* 柑橘の実（左） */}
      <circle
        data-draw
        data-delay="1.2"
        data-duration="0.5"
        cx="94"
        cy="230"
        r="10"
        stroke="#2C2421"
        strokeWidth="1.6"
        fill="none"
      />
      {/* 柑橘のへた */}
      <path
        data-draw
        data-delay="1.35"
        data-duration="0.25"
        d="M94 220 L94 215 C90 212 88 208 92 207"
        stroke="#2C2421"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* 柑橘の実（右） */}
      <circle
        data-draw
        data-delay="1.2"
        data-duration="0.5"
        cx="146"
        cy="225"
        r="8"
        stroke="#2C2421"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        data-draw
        data-delay="1.35"
        data-duration="0.25"
        d="M146 217 L146 212 C142 209 140 205 144 204"
        stroke="#2C2421"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* === グループ3: ハーブ（細葉）1.5s〜 === */}
      {/* 先端の細葉 */}
      <path
        data-draw
        data-delay="1.5"
        data-duration="0.4"
        d="M120 130 C110 115 108 96 120 90 C132 96 130 115 120 130"
        stroke="#2C2421"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* 左ハーブ細葉1 */}
      <path
        data-draw
        data-delay="1.6"
        data-duration="0.35"
        d="M120 148 C106 138 98 122 105 110 C112 98 120 116 120 130"
        stroke="#2C2421"
        strokeWidth="1.0"
        fill="none"
        strokeLinecap="round"
      />
      {/* 右ハーブ細葉1 */}
      <path
        data-draw
        data-delay="1.65"
        data-duration="0.35"
        d="M120 148 C134 138 142 122 135 110 C128 98 120 116 120 130"
        stroke="#2C2421"
        strokeWidth="1.0"
        fill="none"
        strokeLinecap="round"
      />
      {/* 左ハーブ細葉2（最小） */}
      <path
        data-draw
        data-delay="1.75"
        data-duration="0.3"
        d="M120 108 C114 100 113 90 120 86"
        stroke="#2C2421"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      />
      {/* 右ハーブ細葉2（最小） */}
      <path
        data-draw
        data-delay="1.8"
        data-duration="0.3"
        d="M120 108 C126 100 127 90 120 86"
        stroke="#2C2421"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}
