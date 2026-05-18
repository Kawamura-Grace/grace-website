import { cn } from '@/lib/utils/cn'

type Variant = 'primary' | 'ghost' | 'text'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  external?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-grace-brown text-grace-offwhite hover:bg-grace-text-secondary border border-grace-brown',
  ghost:   'bg-transparent text-grace-brown border border-grace-brown hover:bg-grace-brown hover:text-grace-offwhite',
  text:    'bg-transparent text-grace-brown hover:text-grace-wasabi underline-offset-4 hover:underline p-0',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs tracking-widest',
  md: 'px-6 py-3 text-xs tracking-widest',
  lg: 'px-8 py-4 text-sm tracking-widest',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-noto-sans transition-all duration-300 cursor-pointer',
    variantStyles[variant],
    variant !== 'text' && sizeStyles[size],
    className,
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
