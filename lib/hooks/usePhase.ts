'use client'

import { useState, useEffect } from 'react'

// 時間フェーズの型定義
export type Phase = 'morning' | 'day' | 'dusk' | 'night'

/**
 * 現在時刻から時間フェーズを返すカスタムフック
 * 参照HTML (grace_hp_concept_v1.html) の phaseFromNow() に準拠:
 * - 朝: 6:00-10:59  (360-659分) -> 'morning'
 * - 昼: 11:00-15:59 (660-959分) -> 'day'
 * - 夕: 16:00-19:29 (960-1169分) -> 'dusk'
 * - 夜: 19:30-5:59  -> 'night'
 *
 * SSR安全: サーバーサイドでは 'day' をデフォルト返却
 * 1分間隔でリアルタイム更新
 */
function getPhaseFromTime(hours: number, minutes: number): Phase {
  const t = hours * 60 + minutes
  if (t >= 360 && t < 660)  return 'morning'   // 6:00-10:59
  if (t >= 660 && t < 960)  return 'day'        // 11:00-15:59
  if (t >= 960 && t < 1170) return 'dusk'       // 16:00-19:29
  return 'night'
}

export function usePhase(): { phase: Phase } {
  // SSR時は 'day' を初期値とする（hydrationミスマッチ防止）
  const [phase, setPhase] = useState<Phase>('day')

  useEffect(() => {
    // クライアントサイドのみ実行
    const update = () => {
      const now = new Date()
      setPhase(getPhaseFromTime(now.getHours(), now.getMinutes()))
    }

    update()

    // 1分間隔で更新
    const timer = setInterval(update, 60_000)
    return () => clearInterval(timer)
  }, [])

  return { phase }
}
