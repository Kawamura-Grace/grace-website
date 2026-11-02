'use client'
// 商品写真のスライド表示（CSS scroll-snap。スマホはスワイプ、PCは矢印・ドットで切り替え）
import { useRef, useState } from 'react'
import Image from 'next/image'

type Props = { photos: readonly { src: string; alt: string }[] }

export function PhotoCarousel({ photos }: Props) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)

  const goTo = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const next = Math.max(0, Math.min(photos.length - 1, i))
    track.scrollTo({ left: track.clientWidth * next, behavior: 'smooth' })
  }

  const onScroll = () => {
    const track = trackRef.current
    if (!track || track.clientWidth === 0) return
    setIndex(Math.round(track.scrollLeft / track.clientWidth))
  }

  const arrow = 'absolute top-1/2 -translate-y-1/2 w-9 h-9 hidden md:flex items-center justify-center bg-grace-offwhite/80 text-grace-brown border border-grace-line hover:bg-grace-offwhite disabled:opacity-0 transition-opacity'

  return (
    <div className="relative" role="group" aria-roledescription="カルーセル">
      <ul
        ref={trackRef}
        onScroll={onScroll}
        className="flex overflow-x-auto snap-x snap-mandatory bg-grace-cream [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ aspectRatio: '3 / 4' }}
      >
        {photos.map((p, i) => (
          <li key={p.src} className="relative shrink-0 w-full h-full snap-center">
            <Image
              src={p.src}
              alt={p.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              loading={i === 0 ? 'eager' : 'lazy'}
              priority={i === 0}
            />
          </li>
        ))}
      </ul>
      <button type="button" aria-label="前の写真" disabled={index === 0} onClick={() => goTo(index - 1)} className={`${arrow} left-2`}>‹</button>
      <button type="button" aria-label="次の写真" disabled={index === photos.length - 1} onClick={() => goTo(index + 1)} className={`${arrow} right-2`}>›</button>
      <div className="flex justify-center gap-2 mt-3">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            aria-label={`${i + 1}枚目の写真を表示`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full border border-grace-gold ${i === index ? 'bg-grace-gold' : 'bg-transparent'}`}
          />
        ))}
      </div>
    </div>
  )
}
