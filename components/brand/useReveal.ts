'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * useReveal — IntersectionObserver によるリバールフック
 * - threshold: 0.15 で要素が 15% 表示されたら発火
 * - 一度発火したら再発火しない (once: true)
 * - prefers-reduced-motion: reduce の場合は即座に表示
 */
export function useReveal(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // アクセシビリティ: reduced-motion ならアニメなしで即表示
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setIsVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.15,
        ...options,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return { ref, isVisible }
}

/**
 * リバールアニメーションの CSS スタイルを返す
 * - opacity 0→1 + translateY(12px→0)
 * - duration / delay は呼び出し側で指定
 */
export function revealStyle(
  isVisible: boolean,
  delay = 0,
  duration: '0.8s' | '1.2s' = '0.8s'
): React.CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
    transition: `opacity ${duration} cubic-bezier(.22,1,.36,1) ${delay}ms, transform ${duration} cubic-bezier(.22,1,.36,1) ${delay}ms`,
    willChange: 'opacity, transform',
  }
}
