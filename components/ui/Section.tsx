import { cn } from '@/lib/utils/cn'

interface SectionProps {
  id?: string
  label?: string
  title?: string
  titleJa?: string
  children: React.ReactNode
  className?: string
  dark?: boolean
}

export function Section({ id, label, title, titleJa, children, className, dark }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'section-padding',
        dark ? 'bg-grace-bg-dark text-grace-offwhite' : 'bg-grace-bg-primary',
        className,
      )}
    >
      <div className="container-content">
        {label && (
          <div className={cn('section-label mb-8', dark && '[--grace-line:#4a3f3b] [--grace-text-tertiary:#888780]')}>
            {label}
          </div>
        )}
        {(title || titleJa) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className={cn('font-cormorant text-4xl md:text-5xl italic font-light mb-2', dark && 'text-grace-offwhite')}>
                {title}
              </h2>
            )}
            {titleJa && (
              <p className={cn('font-noto-serif text-base tracking-widest', dark ? 'text-grace-stone' : 'text-grace-text-secondary')}>
                {titleJa}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
