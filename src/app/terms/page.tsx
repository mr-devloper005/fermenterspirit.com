import { PageShell } from "@/components/shared/page-shell";

const sections = [
  {
    title: "1. Account Responsibility",
    body: "You are responsible for the activity under your account, including maintaining credential security and ensuring submitted information is accurate.",
  },
  {
    title: "2. Publishing Standards",
    body: "Content must be lawful, original (or properly credited), and non-deceptive. We reserve the right to remove harmful or misleading material.",
  },
  {
    title: "3. Intellectual Property",
    body: "Authors retain ownership of their content. By publishing, you grant us a non-exclusive license to host, display, and distribute that content on this platform.",
  },
  {
    title: "4. Platform Integrity",
    body: "Spam, abuse, automated scraping, account manipulation, or attempts to disrupt service are prohibited.",
  },
  {
    title: "5. Service Changes",
    body: "We may update features, policies, and operational workflows over time. Continued use after updates indicates acceptance of revised terms.",
  },
];

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description="These terms define how the platform can be used and how we protect both readers and contributors."
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
  );
}
