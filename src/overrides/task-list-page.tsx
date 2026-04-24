import Link from 'next/link'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { fetchTaskPosts } from '@/lib/task-data'
import { normalizeCategory } from '@/lib/categories'
import type { TaskKey } from '@/lib/site-config'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

export async function TaskListPageOverride({ task, category }: { task: TaskKey; category?: string }) {
  if (task !== 'article') {
    return (
      <div className="min-h-screen bg-[#f2f2f2] text-[#1f130f]">
        <NavbarShell />
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#dfcfbf] bg-[#fffaf3] p-8 text-center text-[#41291f]">
            <h1 className="text-3xl font-semibold">This section is currently unavailable</h1>
            <p className="mt-3 text-sm text-[#6f5648]">The website now focuses on article publishing only.</p>
            <Link href="/articles" className="mt-6 inline-flex rounded-full bg-[#2f1d16] px-5 py-2.5 text-sm font-semibold text-[#fff1e2]">
              Go to Articles
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const posts = await fetchTaskPosts('article', 24, { allowMockFallback: true, fresh: true })
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const filtered = normalizedCategory === 'all'
    ? posts
    : posts.filter((post) => normalizeCategory(String((post as any)?.content?.category || '')) === normalizedCategory)

  const lead = filtered[0]
  const featured = filtered.slice(1, 5)
  const feed = filtered.slice(5)

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#1f130f]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <section className="grid gap-6 border border-[#dfcfbf] bg-white p-6 sm:p-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8a6f5e]">Article Archive</p>
              <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] text-[#221611]">Latest stories and fresh perspectives</h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-[#6f5648]">
                Explore new writing from our editorial desk. Every piece is designed for clarity, usefulness, and strong reading flow.
              </p>
            </div>
            <div className="border border-[#eadccf] bg-[#fff7ef] p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#8a6f5e]">Current filter</p>
              <p className="mt-2 text-xl font-semibold capitalize text-[#2f1d16]">{normalizedCategory === 'all' ? 'All topics' : normalizedCategory.replaceAll('-', ' ')}</p>
              <Link href="/articles" className="mt-4 inline-flex rounded-full border border-[#d6c2b0] px-4 py-2 text-sm font-semibold text-[#2f1d16] hover:bg-[#f6e9db]">
                Reset filter
              </Link>
            </div>
          </section>

          {lead ? (
            <section className="border border-[#dfcfbf] bg-white p-6 sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8a6f5e]">Lead article</p>
              <Link href={`/articles/${lead.slug}`} className="mt-2 block text-4xl font-semibold leading-tight text-[#20140f] hover:text-[#7d2d3f]">
                {lead.title}
              </Link>
              <p className="mt-4 max-w-4xl text-sm leading-8 text-[#6f5648]">{lead.summary || 'Start with today’s most-read editorial feature.'}</p>
            </section>
          ) : null}

          <section className="grid gap-6 md:grid-cols-2">
            {featured.map((post) => (
              <TaskPostCard key={post.id} post={post} href={`/articles/${post.slug}`} taskKey="article" />
            ))}
          </section>

          <section>
            <h2 className="mb-5 text-3xl font-semibold text-[#2f1d16]">More Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {feed.map((post) => (
                <TaskPostCard key={post.id} post={post} href={`/articles/${post.slug}`} taskKey="article" />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
