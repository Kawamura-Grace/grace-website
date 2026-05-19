import { format, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'

export function formatDate(dateStr: string, pattern = 'yyyy.MM.dd'): string {
  try {
    return format(parseISO(dateStr), pattern, { locale: ja })
  } catch {
    return dateStr
  }
}

export function formatDateJa(dateStr: string): string {
  return formatDate(dateStr, 'yyyy年M月d日')
}
