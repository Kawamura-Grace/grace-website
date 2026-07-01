'use client'

import { useState, useEffect } from 'react'

// 時間フェーズの型定義
export type Phase = 'morning' | 'day' | 'dusk' | 'night'

/**
 * 現在時刻から時間フェーズを返す
 * 参照HTML (grace_hp_concept_v1.html) の phaseFromNow() に準拠:
 * - 朝: 6:00-10:59  (360-659分) -> 'morning'
 * - 昼: 11:00-15:59 (660-959分) -> 'day'
 * - 夕: 16:00-19:29 (960-1169分) -> 'dusk'
 * - 夜: 19:30-5:59  -> 'night'
 */
function getPhaseFromTime(hours: number, minutes: number): Phase {
  const t = hours * 60 + minutes
  if (t >= 360 && t < 660)  return 'morning'   // 6:00-10:59
  if (t >= 660 && t < 960)  return 'day'        // 11:00-15:59
  if (t >= 960 && t < 1170) return 'dusk'       // 16:00-19:29
  return 'night'
}

/**
 * 現在時刻から自動算出したフェーズを返す
 */
function calcAutoPhase(): Phase {
  const now = new Date()
  return getPhaseFromTime(now.getHours(), now.getMinutes())
}

export function usePhase(): { phase: Phase; setDemoPhase: (p: Phase | 'auto') => void } {
  // SSR時は 'day' を初期値とする（hydrationミスマッチ防止）
  const [phase, setPhase] = useState<Phase>('day')

  useEffect(() => {
    // クライアント初回: 現在時刻で更新
    setPhase(calcAutoPhase())

    // 1分間隔でリアルタイム更新（autoモード時のみ上書き）
    const timer = setInterval(() => {
      // DEMOで固定中はタイマーを無視するためイベント経由で状態を確認せず、
      // 自動更新はdispatchせず直接setPhaseする（上書きは意図的）
      setPhase(calcAutoPhase())
    }, 60_000)

    // DEMOスイッチャーからのフェーズ変更イベントを受け取る
    const onDemoChange = (e: Event) => {
      const p = (e as CustomEvent<Phase>).detail
      setPhase(p)
      document.documentElement.dataset.phase = p
    }
    window.addEventListener('gracephasechange', onDemoChange)

    return () => {
      clearInterval(timer)
      window.removeEventListener('gracephasechange', onDemoChange)
    }
  }, [])

  // html[data-phase] をReact stateと同期（CSS変数切り替えに必要）
  useEffect(() => {
    document.documentElement.dataset.phase = phase
  }, [phase])

  /**
   * DEMOスイッチャー用: フェーズを手動で切り替える
   * 'auto' を渡すと現在時刻から自動算出して戻す
   */
  const setDemoPhase = (p: Phase | 'auto') => {
    const target = p === 'auto' ? calcAutoPhase() : p
    setPhase(target)
    document.documentElement.dataset.phase = target
    // 同じusePhaseを使う他のコンポーネント（Header等）にも伝播させる
    window.dispatchEvent(new CustomEvent<Phase>('gracephasechange', { detail: target }))
  }

  return { phase, setDemoPhase }
}
