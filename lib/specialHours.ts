// 日付指定の特別営業時間（トップの営業中表示用）。ここに無い日は通常営業（9:30〜19:30）。
// 判定は端末の設定に関わらず日本時間で行う。
// 根拠：2026-11-25 河村決裁（12/31は16時閉店・ケーキがなくなり次第早く終了／1/1休業／1/2は11時〜18時／1/3から通常営業）

// open・close は 0:00 からの分。null は終日休業
type SpecialDay = {
  hours: { open: number; close: number } | null
  before: string  // 開店前の案内
  during: string  // 営業中の案内
  after: string   // 閉店後の案内（終日休業の日はこの文を一日中出す）
}

const SPECIAL_DAYS: Record<string, SpecialDay> = {
  '2026-12-31': {
    hours: { open: 9 * 60 + 30, close: 16 * 60 },
    before: '本日は9:30から16:00まで営業します。ケーキがなくなり次第、16:00より前でも営業を終了いたします。',
    during: '本日の営業は16:00までです。ケーキがなくなり次第、16:00より前でも営業を終了いたします。',
    after:  '本日は閉店いたしました。1月1日は休業、1月2日は11:00から営業します。',
  },
  '2027-01-01': {
    hours: null,
    before: '',
    during: '',
    after:  '本日は休業いたします。1月2日は11:00から18:00まで営業します。',
  },
  '2027-01-02': {
    hours: { open: 11 * 60, close: 18 * 60 },
    before: '本日は11:00から18:00まで営業します。',
    during: '本日の営業は18:00までです。',
    after:  '本日は閉店いたしました。また明日、9:30にお会いしましょう。',
  },
}

export type SpecialStatus = {
  state: 'before' | 'open' | 'closed' | 'holiday'
  t: 'MORNING' | 'MIDDAY' | 'EVENING' | 'CLOSED'
  msg: string
}

/** 特別営業日なら今の状態を返す。通常営業の日は null */
export function getSpecialStatus(now: Date = new Date()): SpecialStatus | null {
  // 日本時間（UTC+9・夏時間なし）に直してから日付と時刻を読む
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000)
  const day = SPECIAL_DAYS[jst.toISOString().slice(0, 10)]
  if (!day) return null

  if (!day.hours) return { state: 'holiday', t: 'CLOSED', msg: day.after }

  const minutes = jst.getUTCHours() * 60 + jst.getUTCMinutes()
  if (minutes >= day.hours.close) return { state: 'closed', t: 'CLOSED', msg: day.after }
  // 時間帯の見出しは通常日の区切り（6:00 / 11:00 / 16:00）に合わせる
  const t = minutes < 360 ? 'CLOSED' : minutes < 660 ? 'MORNING' : minutes < 960 ? 'MIDDAY' : 'EVENING'
  if (minutes < day.hours.open) return { state: 'before', t, msg: day.before }
  return { state: 'open', t, msg: day.during }
}
