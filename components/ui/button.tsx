import React, { ButtonHTMLAttributes, forwardRef, isValidElement } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'outline' | 'ghost' | 'destructive'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  asChild?: boolean
}

const variantStyles: Record<Variant, string> = {
  default: 'bg-primary text-primary-foreground hover:opacity-90',
  outline: 'border border-input hover:bg-muted',
  ghost: 'hover:bg-muted',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'default', asChild, children, ...props },
  ref,
) {
  const classes = cn(
    'inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition-colors focus:outline-none disabled:opacity-50',
    variantStyles[variant],
    className,
  )

  if (asChild && isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      className: cn(classes, (children as any).props?.className),
    })
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  )
})
