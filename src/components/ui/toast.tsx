import * as React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

const toastStyles = {
  success: {
    icon: CheckCircle,
    containerClass:
      'border-emerald-200 bg-emerald-50 text-emerald-900',
    iconClass: 'text-emerald-500',
  },
  error: {
    icon: AlertCircle,
    containerClass:
      'border-red-200 bg-red-50 text-red-900',
    iconClass: 'text-red-500',
  },
  warning: {
    icon: AlertTriangle,
    containerClass:
      'border-amber-200 bg-amber-50 text-amber-900',
    iconClass: 'text-amber-500',
  },
  custom: {
    icon: Info,
    containerClass:
      'border-neutral-200 bg-white text-neutral-900',
    iconClass: 'text-neutral-500',
  },
}

interface ToastProps {
  t: { id: string; visible: boolean; type?: keyof typeof toastStyles }
  children?: React.ReactNode
}

const ToastBar: React.FC<ToastProps> = ({ t, children }) => {
  const style = toastStyles[t.type ?? 'custom']
  const Icon = style.icon

  return (
    <AnimatePresence>
      {t.visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={cn(
            'pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md',
            style.containerClass
          )}
        >
          <Icon className={cn('h-5 w-5 shrink-0', style.iconClass)} />
          <div className="flex-1 text-sm font-medium">{children}</div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="rounded-lg p-1 opacity-60 transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const ToastProvider: React.FC = () => <Toaster position="top-right" gutter={12} containerClassName="pointer-events-none" />

const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  warning: (message: string) => toast(message),
  info: (message: string) => toast(message),
}

export { ToastProvider, showToast, ToastBar }
export default toast
