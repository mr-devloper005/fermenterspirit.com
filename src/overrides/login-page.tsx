'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export const LOGIN_PAGE_OVERRIDE_ENABLED = true

export function LoginPageOverride() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password.')
      return
    }
    await login(email.trim(), password)
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#1f130f]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className="border border-[#dfcfbf] bg-[#fff7ef] p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[#8a6f5e]">Author Access</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#2f1d16]">Sign in to continue writing</h1>
            <p className="mt-5 text-sm leading-8 text-[#6f5648]">
              Access your article workspace, edit drafts, publish new stories, and manage your profile from one place.
            </p>
          </div>

          <div className="border border-[#dfcfbf] bg-white p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[#8a6f5e]">Welcome back</p>
            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <input value={email} onChange={(event) => setEmail(event.target.value)} className="h-12 rounded-xl border border-[#dbc6b6] bg-transparent px-4 text-sm" placeholder="Email address" />
              <input value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 rounded-xl border border-[#dbc6b6] bg-transparent px-4 text-sm" placeholder="Password" type="password" />
              {error ? <p className="text-sm text-red-700">{error}</p> : null}
              <button type="submit" disabled={isLoading} className="inline-flex h-12 items-center justify-center rounded-full bg-[#241711] px-6 text-sm font-semibold text-[#fff1e2] hover:bg-[#3a241b] disabled:cursor-not-allowed disabled:opacity-70">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign in'}
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between text-sm text-[#6f5648]">
              <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
              <Link href="/register" className="font-semibold hover:underline">Create account</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
