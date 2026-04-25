import { Mail, Phone, Clock3, PenSquare } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'

const supportLanes = [
  {
    title: 'Editorial Pitches',
    description: 'Share article ideas, proposed outlines, and topic angles for publication review.',
    icon: PenSquare,
  },
  {
    title: 'General Support',
    description: 'Ask questions about your account, publishing flow, and article management.',
    icon: Mail,
  },
  {
    title: 'Partnerships',
    description: 'Discuss sponsorship opportunities, collaborations, and media partnerships.',
    icon: Phone,
  },
]

export default function ContactPage() {
  return (
    <PageShell
      title="Contact Us"
      description="Get in touch with our editorial and support team. We usually respond within one business day."
    >
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          {supportLanes.map((lane) => (
            <article key={lane.title} className="border border-[#dfcfbf] bg-white p-6">
              <lane.icon className="h-5 w-5 text-[#7f6454]" />
              <h2 className="mt-3 text-xl font-semibold text-[#2f1d16]">{lane.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[#6f5648]">{lane.description}</p>
            </article>
          ))}

          <article className="border border-[#dfcfbf] bg-[#fff7ef] p-6">
            <h2 className="text-xl font-semibold text-[#2f1d16]">Support Hours</h2>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-[#6f5648]">
              <Clock3 className="h-4 w-4" />
              Monday to Friday, 9:00 AM to 6:00 PM (IST)
            </p>
          </article>
        </div>

        <div className="border border-[#dfcfbf] bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-[#2f1d16]">Send a Message</h2>
          <p className="mt-2 text-sm text-[#6f5648]">
            Include as much detail as possible so we can respond quickly and accurately.
          </p>
          <form className="mt-6 grid gap-4">
            <input className="h-12 rounded-xl border border-[#dbc6b6] bg-transparent px-4 text-sm" placeholder="Full name" />
            <input className="h-12 rounded-xl border border-[#dbc6b6] bg-transparent px-4 text-sm" placeholder="Email address" />
            <input className="h-12 rounded-xl border border-[#dbc6b6] bg-transparent px-4 text-sm" placeholder="Subject" />
            <textarea className="min-h-[180px] rounded-2xl border border-[#dbc6b6] bg-transparent px-4 py-3 text-sm" placeholder="Your message" />
            <button type="submit" className="inline-flex h-12 items-center justify-center rounded-full bg-[#2f1d16] px-6 text-sm font-semibold text-[#fff1e2] hover:bg-[#43291f]">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  )
}
