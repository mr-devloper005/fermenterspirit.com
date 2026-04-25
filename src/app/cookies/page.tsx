import { PageShell } from '@/components/shared/page-shell'

const sections = [
  {
    title: '1. Essential Cookies',
    body: 'Required for login, session continuity, and secure access to publishing features. These cannot be disabled while using the platform.',
  },
  {
    title: '2. Performance Cookies',
    body: 'Help us understand reading behavior, page performance, and technical improvements so the site stays fast and stable.',
  },
  {
    title: '3. Preference Cookies',
    body: 'Remember settings such as your language, saved filters, and UI preferences for a smoother return experience.',
  },
  {
    title: '4. Managing Cookies',
    body: 'You can manage or delete cookies from your browser settings. Some site functionality may degrade when essential cookies are blocked.',
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookie Policy"
      description="Information about how cookies are used to keep your experience secure, functional, and personalized."
    >
      <section className="border border-[#dfcfbf] bg-white p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[#8a6f5e]">Last updated: April 24, 2026</p>
        <div className="mt-6 space-y-4">
          {sections.map((section) => (
            <article key={section.title} className="border border-[#eadccf] bg-[#fff7ef] p-5">
              <h2 className="text-lg font-semibold text-[#2f1d16]">{section.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[#6f5648]">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
