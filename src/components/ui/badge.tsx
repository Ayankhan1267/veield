import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-black text-white',
        secondary: 'bg-stone-100 text-stone-800',
        emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        gold: 'bg-amber-50 text-amber-700 border border-amber-200',
        red: 'bg-red-50 text-red-700 border border-red-200',
        blue: 'bg-blue-50 text-blue-700 border border-blue-200',
        outline: 'border border-stone-200 text-stone-700',
        sale: 'bg-red-500 text-white',
        new: 'bg-emerald-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
