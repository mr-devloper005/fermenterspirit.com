import Link from 'next/link'
import { ContentImage } from '@/components/shared/content-image'
import { buildPostUrl, fetchTaskPosts } from '@/lib/task-data'
import { normalizeCategory } from '@/lib/categories'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const searchTopics = [
  { name: 'Technology', slug: 'technology' },
  { name: 'Business', slug: 'business' },
  { name: 'Finance', slug: 'finance' },
  { name: 'Lifestyle', slug: 'lifestyle' },
  { name: 'Travel', slug: 'travel' },
]

function getImage(post: any) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item: any) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content : {}
  const contentImage = Array.isArray((content as any).images)
    ? (content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  return mediaUrl || contentImage || '/placeholder.svg?height=900&width=1400'
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('article', 18, { allowMockFallback: false, fresh: true })
  const lead = posts[0]
  const sidebarPosts = posts.slice(1, 6)
  const featuredGrid = posts.slice(6, 10)
  const randomPosts = posts.slice(10, 16)

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-[#1e1b18]">
      <NavbarShell />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <section className="relative overflow-hidden rounded-[2.2rem] border border-[#dfd5c8] bg-[radial-gradient(circle_at_20%_20%,#fbe8cf_0%,#f6f3ee_40%,#f6f3ee_100%)] p-6 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#d7a46b]/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-[#8d5a9a]/10 blur-2xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="inline-flex rounded-full border border-[#d7bea3] bg-[#fff8ef] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7d5433]">
                  Today&apos;s Lead Read
                </p>
                <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#21170f] sm:text-5xl lg:text-6xl">
                  {lead?.title || 'In-depth stories and practical analysis for modern readers'}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[#5d4738]">
                  {lead?.summary || 'Fresh editorial coverage across technology, business, culture, and growth-focused stories.'}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={lead ? buildPostUrl('article', lead.slug) : '/articles'} className="rounded-full bg-[#20130c] px-6 py-3 text-sm font-semibold text-[#fff1e2] transition hover:bg-[#3b2418]">
                    Open Feature
                  </Link>
                  <Link href="/articles" className="rounded-full border border-[#d8c5b4] bg-white/80 px-6 py-3 text-sm font-semibold text-[#2f1d16] transition hover:bg-[#f8ecde]">
                    Explore Archive
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[1.6rem] border border-[#e1d5c7] bg-white/90 p-5">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8a6f5e]">Search Topics</h2>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {searchTopics.map((topic) => (
                      <Link key={topic.slug} href={`/articles?category=${topic.slug}`} className="rounded-full border border-[#eadccf] bg-[#fffaf4] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6f5648] transition hover:bg-[#f8ecde]">
                        {topic.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.6rem] border border-[#e1d5c7] bg-[#241710] p-5 text-[#f9ebdc]">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d8bfa8]">Reading Pulse</h2>
                  <p className="mt-3 text-3xl font-semibold leading-none">{posts.length}</p>
                  <p className="mt-2 text-sm text-[#edd9c6]">fresh stories in the current feed</p>
                </div>
              </div>
            </div>

            {lead ? (
              <div className="relative mt-8 overflow-hidden rounded-[1.8rem] border border-[#e2d6c8] bg-white">
                <div className="relative aspect-[16/8]">
                  <ContentImage src={getImage(lead)} alt={lead.title} fill className="object-cover" />
                </div>
              </div>
            ) : null}
          </section>

          <section className="mt-12 grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="rounded-[1.8rem] border border-[#e5d6c7] bg-white p-6">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#24160f]">Recent Dispatches</h2>
              <div className="mt-5 space-y-4">
                {sidebarPosts.map((post) => (
                  <Link key={post.id} href={buildPostUrl('article', post.slug)} className="block rounded-xl border border-[#f0e4d9] px-4 py-3 transition hover:bg-[#fcf4ea]">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#9a7b66]">
                      {normalizeCategory((post as any)?.content?.category || 'news')}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold leading-snug text-[#25180f]">{post.title}</h3>
                  </Link>
                ))}
              </div>
            </aside>

            {featuredGrid.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {featuredGrid.map((post: any, index: number) => (
                  <Link
                    key={post.id}
                    href={buildPostUrl('article', post.slug)}
                    className={index === 0 ? 'group overflow-hidden rounded-[1.8rem] border border-[#e5d6c7] bg-white shadow-[0_15px_35px_rgba(85,53,31,0.1)] sm:col-span-2' : 'group overflow-hidden rounded-[1.8rem] border border-[#e5d6c7] bg-white'}
                  >
                    <div className={index === 0 ? 'relative aspect-[16/7]' : 'relative aspect-[16/10]'}>
                      <ContentImage src={getImage(post)} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                    </div>
                    <div className="p-5">
                      <h3 className={index === 0 ? 'text-3xl font-semibold leading-snug tracking-[-0.02em]' : 'text-xl font-semibold leading-snug'}>{post.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#6f5648]">{post.summary || 'A fresh editorial perspective for modern readers.'}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </section>

          {randomPosts.length > 0 && (
            <section className="mt-12 rounded-[1.8rem] border border-[#e5d6c7] bg-white p-6 sm:p-7">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#efe3d7] pb-4">
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#24160f]">Random Picks</h2>
                <Link href="/articles" className="text-sm font-semibold uppercase tracking-[0.14em] text-[#7d5433] hover:text-[#2f1d16]">
                  View all stories
                </Link>
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {randomPosts.map((post: any) => (
                  <Link key={post.id} href={buildPostUrl('article', post.slug)} className="group overflow-hidden rounded-[1.2rem] border border-[#eee2d6] bg-[#fffdf9] transition hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(77,47,27,0.12)]">
                    <div className="relative aspect-[16/10]">
                      <ContentImage src={getImage(post)} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.04]" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold leading-snug">{post.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#6f5648]">{post.summary || 'Continue exploring carefully selected articles.'}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
