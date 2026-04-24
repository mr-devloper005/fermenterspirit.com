import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  return (
    <footer className="border-t border-[#e3d4c6] bg-[#fff6ec] text-[#2f1d16]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#8a6f5e]">Editorial Platform</p>
          <h3 className="mt-3 text-2xl font-semibold">{SITE_CONFIG.name}</h3>
          <p className="mt-4 text-sm leading-7 text-[#6f5648]">
            Independent articles, long-form analysis, and practical ideas for readers who value useful writing over noise.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#8a6f5e]">Explore</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/articles" className="hover:underline">Latest Articles</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#8a6f5e]">Legal</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/cookies" className="hover:underline">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#e3d4c6] px-4 py-4 text-center text-xs uppercase tracking-[0.2em] text-[#8a6f5e]">
        Copyright {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
