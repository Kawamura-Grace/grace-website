'use client'

import { useEffect, useState } from 'react'
import { isChristmasReservationOpen, XMAS_RESERVATIONS_OPEN } from '@/lib/christmas'

/**
 * クリスマス予約が受付中かを返す（画面側用）
 * サーバー描画との不一致を避けるため、初回はスイッチの値を使い、日付の判定は表示後に1分間隔で行う
 */
export function useXmasReservationOpen(): boolean {
  const [open, setOpen] = useState(XMAS_RESERVATIONS_OPEN)

  useEffect(() => {
    const check = () => setOpen(isChristmasReservationOpen())
    check()
    const timer = setInterval(check, 60_000)
    return () => clearInterval(timer)
  }, [])

  return open
}
