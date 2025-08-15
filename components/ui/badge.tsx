import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-input bg-muted px-2 py-0.5 text-xs',
        className,
      )}
      {...props}
    />
  )
}

