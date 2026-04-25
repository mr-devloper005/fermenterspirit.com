'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, PenSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'

export const NAVBAR_OVERRIDE_ENABLED = true

const utilityLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Submit a Guest Post', href: '/dashboard/articles/new' },
  { name: 'Write for Us', href: '/register' },
  { name: 'Contact Us', href: '/contact' },
]

const categoryLinks = [
  { name: 'News', href: '/articles?category=news' },
  { name: 'Technology', href: '/articles?category=technology' },
  { name: 'Business', href: '/articles?category=business' },
  { name: 'Finance', href: '/articles?category=finance' },
  { name: 'Lifestyle', href: '/articles?category=lifestyle' },
  { name: 'Travel', href: '/articles?category=travel' },
]

export function NavbarOverride() {
  const router = useRouter()
  const { isAuthenticated, logout } = useAuth()

  const handleSignOut = () => {
    logout()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e3d4c6] bg-[#fffaf3]/95 backdrop-blur">
      <div className="mx-auto hidden max-w-7xl items-center justify-center gap-7 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-[#8a6f5e] lg:flex">
        {utilityLinks.map((item) => (
          <Link key={item.href} href={item.href} className="transition hover:text-[#2f1d16]">
            {item.name}
          </Link>
        ))}
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e3d4c6] bg-white p-1.5">
            <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="44" height="44" className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-[0.24em] text-[#8a6f5e]">Article Network</p>
            <h1 className="text-2xl font-bold tracking-[0.02em] text-[#1f130f]">{SITE_CONFIG.name}</h1>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="hidden rounded-full border-[#d9c6b5] bg-transparent text-[#2f1d16] hover:bg-[#f9ecde] sm:inline-flex">
            <Link href="/dashboard/articles/new">
              <PenSquare className="mr-2 h-4 w-4" />
              New Article
            </Link>
          </Button>

          {isAuthenticated ? (
            <>
              <Button asChild variant="outline" className="rounded-full border-[#d9c6b5] bg-transparent text-[#2f1d16] hover:bg-[#f9ecde]">
                <Link href="/dashboard/articles">Author Account</Link>
              </Button>
              <Button type="button" onClick={handleSignOut} className="rounded-full bg-[#2f1d16] text-[#fff1e2] hover:bg-[#462b21]">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="outline" className="rounded-full border-[#d9c6b5] bg-transparent text-[#2f1d16] hover:bg-[#f9ecde]">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="rounded-full bg-[#2f1d16] text-[#fff1e2] hover:bg-[#462b21]">
                <Link href="/register">Create Account</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-[#e9ddd2] bg-white/90">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8">
          {categoryLinks.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#6f5648] transition hover:bg-[#f5e7d8]"
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}
