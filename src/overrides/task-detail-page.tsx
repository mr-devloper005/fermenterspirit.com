import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock3, User2 } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { ArticleComments } from '@/components/tasks/article-comments'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

function resolveImage(post: any) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item: any) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content : {}
  const contentImage = Array.isArray((content as any).images)
    ? (content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  return mediaUrl || contentImage || '/placeholder.svg?height=900&width=1400'
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  if (task !== 'article') {
    notFound()
  }

  const post = await fetchTaskPostBySlug('article', slug)
  if (!post) {
    notFound()
  }

  const content = post.content && typeof post.content === 'object' ? post.content as any : {}
  const author = typeof content.author === 'string' && content.author ? content.author : (post.authorName || 'Editorial Desk')
  const published = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Recently updated'
  const html = formatRichHtml(
    typeof content.body === 'string' && content.body.trim()
      ? content.body
      : (post.summary || 'Article content will appear here shortly.'),
    'Article content will appear here shortly.'
  )
  const related = (await fetchTaskPosts('article', 8, { allowMockFallback: true }))
    .filter((item) => item.slug !== slug)
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#1f130f]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-[1.8fr_0.9fr]">
          <article className="border border-[#dfcfbf] bg-white p-6 sm:p-8">
            <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-semibold text-[#7a5e4f] hover:text-[#2f1d16]">
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Link>

            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#1f130f] sm:text-5xl">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-[#71584b]">
              <span className="inline-flex items-center gap-2"><User2 className="h-4 w-4" />{author}</span>
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{published}</span>
            </div>

            <div className="mt-6 overflow-hidden border border-[#ebdfd3]">
              <div className="relative aspect-[16/9]">
                <ContentImage src={resolveImage(post)} alt={post.title} fill className="object-cover" />
              </div>
            </div>

            {post.summary ? (
              <p className="mt-6 text-lg leading-8 text-[#574436]">{post.summary}</p>
            ) : null}

            <RichContent html={html} className="article-content mt-8 max-w-none text-[17px] leading-9 text-[#231812]" />
            <ArticleComments slug={post.slug} />
          </article>

          <aside className="space-y-6">
            <section className="border border-[#dfcfbf] bg-white p-5">
              <h2 className="border-b border-[#eddfd4] pb-2 text-2xl font-semibold text-[#2f1d16]">Recent Posts</h2>
              <div className="mt-4 space-y-4">
                {related.map((item) => (
                  <Link key={item.id} href={`/articles/${item.slug}`} className="block border-b border-[#f2e7dc] pb-4 last:border-0 last:pb-0">
                    <h3 className="text-base font-semibold leading-snug text-[#1f130f] hover:text-[#7d2d3f]">{item.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-[#7a5e4f]">{item.summary || 'Read the full article for details.'}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="border border-[#dfcfbf] bg-white p-5">
              <h2 className="border-b border-[#eddfd4] pb-2 text-2xl font-semibold text-[#2f1d16]">Categories</h2>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {['News', 'Technology', 'Business', 'Finance', 'Lifestyle', 'Travel'].map((name) => (
                  <Link key={name} href={`/articles?category=${name.toLowerCase()}`} className="rounded-md border border-[#ebdfd3] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6f5648] hover:bg-[#f8ecde]">
                    {name}
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}
