'use client'

import { useState, useEffect } from 'react'

// 時間フェーズの型定義
export type Phase = 'morning' | 'day' | 'dusk' | 'night'

/**
 * 現在時刻から時間フェーズを返すカスタムフック
 * - 朝: 5:00-10:59  -> 'morning'
 * - 昼: 11:00-16:59 -> 'day'
 * - 夕: 17:00-19:59 -> 'dusk'
 * - 夜: 20:00- 4:59 -> 'night'
 *
 * SSR安全: サーバーサイドでは 'day' をデフォルト返却
 * 1分間隔でリアルタイム更新
 */
function getPhaseFromHour(hour: number): Phase {
  if (hour >= 5 && hour < 11)  return 'morning'
  if (hour >= 11 && hour < 17) return 'day'
  if (hour >= 17 && hour < 20) return 'dusk'
  return 'night'
}

export function usePhase(): { phase: Phase } {
  // SSR時は 'day' を初期値とする（hydrationミスマッチ防止）
  const [phase, setPhase] = useState<Phase>('day')

  useEffect(() => {
    // クライアントサイドのみ実行
    const update = () => {
      const hour = new Date().getHours()
      setPhase(getPhaseFromHour(hour))
    }

    update()

    // 1分間隔で更新
    const timer = setInterval(update, 60_000)
    return () => clearInterval(timer)
  }, [])

  return { phase }
}
