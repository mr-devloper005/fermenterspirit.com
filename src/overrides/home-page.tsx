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
  const posts = await fetchTaskPosts('article', 18, { allowMockFallback: true, fresh: true })
  const lead = posts[0]
  const sidebarPosts = posts.slice(1, 6)
  const featuredGrid = posts.slice(6, 10)
  const randomPosts = posts.slice(10, 16)

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#1f130f]">
      <NavbarShell />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-7 lg:grid-cols-[1.8fr_0.9fr]">
            <section className="border border-[#e5d6c7] bg-white p-6 sm:p-8">
              <div className="inline-flex bg-[#d09a52] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                Featured Article
              </div>
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
                {lead?.title || 'In-depth stories and practical analysis for modern readers'}
              </h1>
              <p className="mt-5 text-lg leading-8 text-[#574436]">
                {lead?.summary || 'Fresh editorial coverage across technology, business, culture, and growth-focused stories.'}
              </p>
              {lead ? (
                <div className="mt-7 overflow-hidden border border-[#e5d6c7]">
                  <div className="relative aspect-[16/9]">
                    <ContentImage src={getImage(lead)} alt={lead.title} fill className="object-cover" />
                  </div>
                </div>
              ) : null}
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={lead ? buildPostUrl('article', lead.slug) : '/articles'} className="rounded-full bg-[#2f1d16] px-6 py-3 text-sm font-semibold text-[#fff1e2] hover:bg-[#4a2d22]">
                  Read Full Story
                </Link>
                <Link href="/articles" className="rounded-full border border-[#d8c5b4] px-6 py-3 text-sm font-semibold text-[#2f1d16] hover:bg-[#f8ecde]">
                  Browse All Articles
                </Link>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="border border-[#e5d6c7] bg-white p-5">
                <h2 className="text-xl font-semibold">Search Topics</h2>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {searchTopics.map((topic) => (
                    <Link key={topic.slug} href={`/articles?category=${topic.slug}`} className="rounded-md border border-[#ebdfd3] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6f5648] hover:bg-[#f8ecde]">
                      {topic.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border border-[#e5d6c7] bg-white p-5">
                <h2 className="border-b border-[#eddfd4] pb-2 text-2xl font-semibold">Recent Posts</h2>
                <div className="mt-4 space-y-4">
                  {sidebarPosts.map((post) => (
                    <Link key={post.id} href={buildPostUrl('article', post.slug)} className="block border-b border-[#f2e7dc] pb-4 last:border-0 last:pb-0">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#9a7b66]">
                        {normalizeCategory((post as any)?.content?.category || 'news')}
                      </p>
                      <h3 className="mt-1 text-base font-semibold leading-snug hover:text-[#7d2d3f]">{post.title}</h3>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <section className="mt-12">
            <h2 className="text-4xl font-semibold tracking-[-0.03em]">You Might Also Like</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {featuredGrid.map((post) => (
                <Link key={post.id} href={buildPostUrl('article', post.slug)} className="block border border-[#e5d6c7] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(77,47,27,0.12)]">
                  <div className="relative mb-4 aspect-[16/9] overflow-hidden">
                    <ContentImage src={getImage(post)} alt={post.title} fill className="object-cover" />
                  </div>
                  <h3 className="text-2xl font-semibold leading-snug">{post.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6f5648]">{post.summary || 'A fresh editorial perspective for modern readers.'}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-4xl font-semibold tracking-[-0.03em]">Random Posts</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {randomPosts.map((post) => (
                <Link key={post.id} href={buildPostUrl('article', post.slug)} className="block border border-[#e5d6c7] bg-white p-5">
                  <h3 className="text-2xl font-semibold leading-snug">{post.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6f5648]">{post.summary || 'Continue exploring carefully selected articles.'}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
