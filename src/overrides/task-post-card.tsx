import Link from 'next/link'
import { ArrowUpRight, Clock3 } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export const TASK_POST_CARD_OVERRIDE_ENABLED = true

function stripHtml(value?: string | null) {
  return (value || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getExcerpt(value?: string | null, maxLength = 150) {
  const text = stripHtml(value)
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}...`
}

function getImage(post: SitePost) {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post.content && typeof post.content === 'object' ? post.content as any : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url: unknown) => typeof url === 'string' && url)
  return mediaUrl || contentImage || '/placeholder.svg?height=900&width=1400'
}

export function TaskPostCardOverride({
  post,
  href,
  taskKey,
}: {
  post: SitePost
  href: string
  taskKey?: TaskKey
  compact?: boolean
}) {
  const fallbackLabel = taskKey ? taskKey.toUpperCase() : 'ARTICLE'
  const category = typeof (post.content as any)?.category === 'string' ? (post.content as any).category : fallbackLabel
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recently published'
  const summary = getExcerpt((post.content as any)?.description || post.summary, 170) || 'Read the full article for practical insight and a complete breakdown.'

  return (
    <Link href={href} className="group block border border-[#e5d6c7] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(77,47,27,0.12)]">
      <div className="relative mb-4 aspect-[16/9] overflow-hidden">
        <ContentImage src={getImage(post)} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#9a7b66]">{category}</p>
      <h3 className="mt-2 text-2xl font-semibold leading-snug text-[#1f130f] group-hover:text-[#7d2d3f]">
        {post.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#6f5648]">{summary}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-[#8a6f5e]">
        <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{publishedDate}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-[#2f1d16]">
          Read
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}
