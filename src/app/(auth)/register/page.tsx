'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        return
      }

      toast.success('Account created! Please sign in.')
      router.push('/login')
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block flex-1 bg-gradient-to-br from-emerald-900 to-stone-900 relative">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center max-w-md"><h2 className="text-4xl font-serif text-white mb-4">Join Veiled</h2><p className="text-emerald-100/70">Create an account to enjoy exclusive benefits, track orders, and earn rewards.</p></div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link href="/" className="font-serif text-2xl text-stone-900 mb-8 block">Veiled</Link>
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">Create account</h1>
          <p className="text-stone-500 mb-8">Join our community of elegant women</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <Input label="Full Name" placeholder="John Doe" icon={<User className="h-4 w-4" />} value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label="Email" type="email" placeholder="john@example.com" icon={<Mail className="h-4 w-4" />} value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div className="relative">
              <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Create a strong password" icon={<Lock className="h-4 w-4" />} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-stone-400 hover:text-stone-600">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <label className="flex items-start gap-2 mb-8 cursor-pointer">
              <input type="checkbox" className="accent-black mt-0.5" required />
              <span className="text-xs text-stone-500">I agree to the <Link href="/pages/terms" className="underline">Terms of Service</Link> and <Link href="/pages/privacy" className="underline">Privacy Policy</Link></span>
            </label>
            <Button type="submit" size="lg" className="w-full rounded-xl h-13 text-base" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <Separator className="bg-stone-200 my-8" />
          <p className="text-center text-sm text-stone-500 mt-8">Already have an account? <Link href="/login" className="text-emerald-600 hover:underline font-medium">Sign in</Link></p>
        </motion.div>
      </div>
    </div>
  )
}
