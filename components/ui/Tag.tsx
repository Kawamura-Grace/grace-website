import { cn } from '@/lib/utils/cn'

interface TagProps {
  children: React.ReactNode
  variant?: 'wasabi' | 'gold' | 'stone'
  className?: string
}

const styles = {
  wasabi: 'bg-grace-wasabi/10 text-grace-wasabi',
  gold:   'bg-grace-gold/10 text-grace-gold',
  stone:  'bg-grace-stone text-grace-text-secondary',
}

export function Tag({ children, variant = 'stone', className }: TagProps) {
  return (
    <span className={cn(
      'inline-block font-noto-sans text-[10px] tracking-widest px-2 py-1',
      styles[variant],
      className,
    )}>
      {children}
    </span>
  )
}
