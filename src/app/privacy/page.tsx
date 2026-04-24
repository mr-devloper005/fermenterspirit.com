import { PageShell } from '@/components/shared/page-shell'

const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect profile details you provide, article content you publish, and basic usage data to operate and improve the platform.',
  },
  {
    title: '2. How We Use Information',
    body: 'Your data helps us provide account access, support editorial publishing, enhance reading experience, and maintain platform security.',
  },
  {
    title: '3. Data Sharing',
    body: 'We do not sell personal data. Limited sharing may occur with trusted service providers that help us run hosting, analytics, and support workflows.',
  },
  {
    title: '4. Your Privacy Controls',
    body: 'You can update profile details, remove published content, and request account deletion through support channels.',
  },
  {
    title: '5. Policy Updates',
    body: 'When privacy practices change, we update this page and revise the effective date so readers and contributors stay informed.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="How we collect, use, and protect personal data across reader and contributor experiences."
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
