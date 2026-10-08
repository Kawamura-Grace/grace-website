'use client'

import { useEffect, useRef } from 'react'

/**
 * IntersectionObserver で .rise 要素を監視し、
 * 画面内に入ったら .in クラスを付与するカスタムフック
 * @param threshold - 要素が何割見えたら発火するか（デフォルト0.12）
 */
export function useRise(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.rise')
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [threshold])

  return ref
}
