import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";

const editorialPrinciples = [
  {
    title: "Useful First",
    description:
      "Every article must help a reader make a better decision, not just take up feed space.",
  },
  {
    title: "Clarity Over Noise",
    description:
      "We prefer direct language, clear structure, and practical insight over trend-heavy filler.",
  },
  {
    title: "Respectful Publishing",
    description:
      "Writers keep their voice and readers get transparent context, sources, and balanced framing.",
  },
];

const impactStats = [
  { label: "Monthly readers", value: "48k+" },
  { label: "Published articles", value: "2,100+" },
  { label: "Returning visitors", value: "67%" },
];

export default function AboutPage() {
  return (
    <PageShell
      title="About Us"
      description="An article-focused publication built for readers who want practical, trustworthy, and easy-to-scan writing."
      actions={
        <>
          <Link
            href="/articles"
            className="rounded-full border border-[#d7c4b5] bg-white px-5 py-2.5 text-sm font-semibold text-[#2f1d16] hover:bg-[#f7ebdf]"
          >
            Latest Articles
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-[#2f1d16] px-5 py-2.5 text-sm font-semibold text-[#fff1e2] hover:bg-[#43291f]"
          >
            Contact Editorial Team
          </Link>
        </>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="border border-[#dfcfbf] bg-white p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8a6f5e]">Our Story</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#2f1d16]">
            Built as a clean reading destination, not a mixed-content marketplace.
          </h2>
          <p className="mt-4 text-sm leading-8 text-[#6f5648]">
            We started with one goal: make web publishing feel readable again. Our editorial model focuses on depth,
            clear structure, and strong practical value. Instead of mixing unrelated content types, we keep the
            platform focused on high-quality articles.
          </p>
          <p className="mt-4 text-sm leading-8 text-[#6f5648]">
            Writers on our platform cover business, technology, finance, lifestyle, and culture with a research-first
            approach. Readers get fresh perspectives without overwhelming navigation or visual clutter.
          </p>
        </article>

        <aside className="space-y-5">
          {impactStats.map((item) => (
            <div key={item.label} className="border border-[#dfcfbf] bg-[#fff7ef] p-5">
              <p className="text-3xl font-semibold text-[#2f1d16]">{item.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#8a6f5e]">{item.label}</p>
            </div>
          ))}
        </aside>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        {editorialPrinciples.map((item) => (
          <article key={item.title} className="border border-[#dfcfbf] bg-white p-6">
            <h3 className="text-xl font-semibold text-[#2f1d16]">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#6f5648]">{item.description}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
