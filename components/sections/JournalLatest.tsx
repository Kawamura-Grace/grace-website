import Link from 'next/link'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { Tag } from '@/components/ui/Tag'
import { formatDate } from '@/lib/utils/date'
import type { JournalPost } from '@/lib/notion/types'

interface JournalLatestProps {
  posts: JournalPost[]
}

export function JournalLatest({ posts }: JournalLatestProps) {
  if (!posts.length) return null

  return (
    <Section label="JOURNAL" title="Journal" titleJa="スタッフの話" className="bg-grace-offwhite">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {posts.map(post => (
          <Link key={post.id} href={`/journal/${post.slug}`} className="group block">
            {/* アイキャッチ */}
            <div className="relative aspect-[4/3] bg-grace-cream mb-4 overflow-hidden">
              {post.eyecatch ? (
                <Image
                  src={post.eyecatch}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-cormorant italic text-3xl text-grace-stone">G</span>
                </div>
              )}
            </div>

            <Tag variant="wasabi" className="mb-2">{post.category}</Tag>
            <h3 className="font-noto-serif text-base text-grace-brown leading-relaxed mb-2 group-hover:text-grace-wasabi transition-colors">
              {post.title}
            </h3>
            <p className="font-noto-sans text-[10px] text-grace-text-tertiary tracking-wide">
              {formatDate(post.publishedAt)}
            </p>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/journal"
          className="font-noto-sans text-[10px] tracking-widest text-grace-text-secondary hover:text-grace-brown transition-colors border-b border-grace-line pb-1"
        >
          ALL JOURNAL →
        </Link>
      </div>
    </Section>
  )
}
