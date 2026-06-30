import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children?: React.ReactNode
}

interface SheetContentProps {
  children: React.ReactNode
  className?: string
  side?: 'left' | 'right'
}

const SheetContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
} | null>(null)

const useSheetContext = () => {
  const ctx = React.useContext(SheetContext)
  if (!ctx) throw new Error('Sheet components must be used within a Sheet')
  return ctx
}

const Sheet: React.FC<SheetProps> = ({ open, onOpenChange, children }) => (
  <SheetContext.Provider value={{ open, onOpenChange }}>
    {children}
  </SheetContext.Provider>
)
Sheet.displayName = 'Sheet'

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { onOpenChange } = useSheetContext()
  return (
    <button
      ref={ref}
      onClick={(e) => {
        onOpenChange(true)
        onClick?.(e)
      }}
      className={className}
      {...props}
    />
  )
})
SheetTrigger.displayName = 'SheetTrigger'

const SheetClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { onOpenChange } = useSheetContext()
  return (
    <button
      ref={ref}
      onClick={(e) => {
        onOpenChange(false)
        onClick?.(e)
      }}
      className={className}
      {...props}
    />
  )
})
SheetClose.displayName = 'SheetClose'

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} as const

const sheetVariants = {
  hidden: (side: 'left' | 'right') => ({
    x: side === 'right' ? '100%' : '-100%',
    opacity: 0.95,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
  exit: (side: 'left' | 'right') => ({
    x: side === 'right' ? '100%' : '-100%',
    opacity: 0.95,
    transition: { duration: 0.2 },
  }),
} as const

const SheetContent: React.FC<SheetContentProps> = ({
  children,
  className,
  side = 'right',
}) => {
  const { open, onOpenChange } = useSheetContext()

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            custom={side}
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'fixed top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-neutral-200/60 bg-white/95 backdrop-blur-md shadow-xl',
              side === 'right' ? 'right-0' : 'left-0',
              className
            )}
          >
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
              <span className="sr-only">Sheet</span>
              <button
                onClick={() => onOpenChange(false)}
                className="ml-auto rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
SheetContent.displayName = 'SheetContent'

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 border-b border-neutral-100 pb-4 mb-4',
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = 'SheetHeader'

const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'font-serif text-xl font-semibold leading-tight tracking-tight text-neutral-900',
      className
    )}
    {...props}
  />
))
SheetTitle.displayName = 'SheetTitle'

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-neutral-500', className)}
    {...props}
  />
))
SheetDescription.displayName = 'SheetDescription'

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 border-t border-neutral-100 pt-4 mt-4',
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = 'SheetFooter'

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
}
