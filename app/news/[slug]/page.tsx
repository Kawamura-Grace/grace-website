// News詳細ページ — Notionブロックシンプルレンダリング
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Tag } from '@/components/ui/Tag'
import { getNewsPosts, getNewsBySlug, getNewsBlocks } from '@/lib/notion/news'
import { formatDateJa } from '@/lib/utils/date'
import type { BlockObjectResponse, PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { NewsCategory } from '@/lib/notion/types'

export const revalidate = 1800

interface PageProps {
  params: { slug: string }
}

// カテゴリのバッジスタイル
const CATEGORY_VARIANTS: Record<NewsCategory, 'wasabi' | 'gold' | 'stone'> = {
  'お知らせ':   'stone',
  '催事':       'gold',
  'メディア掲載': 'wasabi',
  '臨時定休':   'stone',
}

// ─── generateStaticParams ───
export async function generateStaticParams() {
  const posts = await getNewsPosts().catch(() => [])
  return posts.map(p => ({ slug: p.slug }))
}

// ─── メタデータ ───
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getNewsBySlug(params.slug).catch(() => null)
  if (!post) return { title: 'お知らせが見つかりません | Grace' }
  return {
    title: `${post.title} | News | Grace`,
    description: `Grace Patisserieのお知らせ: ${post.title}`,
  }
}

// ─── 型ガード ───
function isBlockResponse(block: BlockObjectResponse | PartialBlockObjectResponse): block is BlockObjectResponse {
  return 'type' in block
}

// ─── Notionブロック → JSX ───
function renderBlock(block: BlockObjectResponse, index: number): React.ReactNode {
  function getRichText(richTexts: Array<{ plain_text: string }>): string {
    return richTexts.map(t => t.plain_text).join('')
  }

  switch (block.type) {
    case 'paragraph': {
      const text = getRichText((block as any).paragraph?.rich_text ?? [])
      if (!text) return <div key={index} className="h-4" />
      return (
        <p key={index} className="font-noto-serif text-base text-grace-text-secondary leading-loose mb-4">
          {text}
        </p>
      )
    }

    case 'heading_1': {
      return (
        <h2 key={index} className="font-noto-serif text-xl text-grace-brown mt-10 mb-4 pb-2 border-b border-grace-line">
          {getRichText((block as any).heading_1?.rich_text ?? [])}
        </h2>
      )
    }

    case 'heading_2': {
      return (
        <h3 key={index} className="font-noto-serif text-lg text-grace-brown mt-8 mb-3">
          {getRichText((block as any).heading_2?.rich_text ?? [])}
        </h3>
      )
    }

    case 'heading_3': {
      return (
        <h4 key={index} className="font-noto-serif text-base text-grace-brown mt-6 mb-2">
          {getRichText((block as any).heading_3?.rich_text ?? [])}
        </h4>
      )
    }

    case 'bulleted_list_item': {
      const text = getRichText((block as any).bulleted_list_item?.rich_text ?? [])
      return (
        <li key={index} className="font-noto-serif text-base text-grace-text-secondary leading-loose pl-2">
          {text}
        </li>
      )
    }

    case 'numbered_list_item': {
      const text = getRichText((block as any).numbered_list_item?.rich_text ?? [])
      return (
        <li key={index} className="font-noto-serif text-base text-grace-text-secondary leading-loose pl-2">
          {text}
        </li>
      )
    }

    case 'quote': {
      const text = getRichText((block as any).quote?.rich_text ?? [])
      return (
        <blockquote key={index} className="border-l-2 border-grace-gold pl-6 my-6">
          <p className="font-noto-serif text-base text-grace-text-secondary leading-loose italic">{text}</p>
        </blockquote>
      )
    }

    case 'divider':
      return <hr key={index} className="border-grace-line my-8" />

    case 'image': {
      const image = (block as any).image
      const src = image?.file?.url ?? image?.external?.url ?? ''
      const caption = image?.caption?.[0]?.plain_text ?? ''
      if (!src) return null
      return (
        <figure key={index} className="my-8">
          <div className="relative aspect-video bg-grace-cream overflow-hidden">
            <Image
              src={src}
              alt={caption || 'ニュース画像'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
          {caption && (
            <figcaption className="font-noto-sans text-[10px] tracking-wide text-grace-text-tertiary mt-2 text-center">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    }

    default:
      return null
  }
}

// ─── リストをul/olでラップ ───
function groupBlocks(blocks: BlockObjectResponse[]): React.ReactNode[] {
  const result: React.ReactNode[] = []
  let bulletItems: React.ReactNode[] = []
  let numberedItems: React.ReactNode[] = []

  blocks.forEach((block, index) => {
    if (block.type === 'bulleted_list_item') {
      bulletItems.push(renderBlock(block, index))
      return
    }
    if (bulletItems.length) {
      result.push(<ul key={`ul-${index}`} className="list-disc list-outside ml-5 mb-4 space-y-1">{bulletItems}</ul>)
      bulletItems = []
    }
    if (block.type === 'numbered_list_item') {
      numberedItems.push(renderBlock(block, index))
      return
    }
    if (numberedItems.length) {
      result.push(<ol key={`ol-${index}`} className="list-decimal list-outside ml-5 mb-4 space-y-1">{numberedItems}</ol>)
      numberedItems = []
    }
    const rendered = renderBlock(block, index)
    if (rendered) result.push(rendered)
  })

  if (bulletItems.length) result.push(<ul key="ul-last" className="list-disc list-outside ml-5 mb-4 space-y-1">{bulletItems}</ul>)
  if (numberedItems.length) result.push(<ol key="ol-last" className="list-decimal list-outside ml-5 mb-4 space-y-1">{numberedItems}</ol>)

  return result
}

export default async function NewsDetailPage({ params }: PageProps) {
  const post = await getNewsBySlug(params.slug).catch(() => null)
  if (!post) notFound()

  const rawBlocks = await getNewsBlocks(post.id).catch(() => [])
  const blocks = rawBlocks.filter(isBlockResponse) as BlockObjectResponse[]

  return (
    <>
      <Header />
      <main>
        {/* ─── パンくず ─── */}
        <div className="bg-grace-offwhite border-b border-grace-line">
          <div className="container-content py-3">
            <nav aria-label="パンくず" className="flex items-center gap-2 font-noto-sans text-[10px] tracking-wide text-grace-text-tertiary">
              <Link href="/" className="hover:text-grace-brown transition-colors">HOME</Link>
              <span>/</span>
              <Link href="/news" className="hover:text-grace-brown transition-colors">NEWS</Link>
              <span>/</span>
              <span className="text-grace-text-secondary line-clamp-1">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* ─── 記事ヘッダー ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            <div className="max-w-article mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Tag variant={CATEGORY_VARIANTS[post.category]}>{post.category}</Tag>
                <time
                  dateTime={post.publishedAt}
                  className="font-noto-sans text-[10px] tracking-wide text-grace-text-tertiary"
                >
                  {formatDateJa(post.publishedAt)}
                </time>
              </div>
              <h1 className="font-noto-serif text-2xl md:text-3xl text-grace-brown leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        {/* ─── 記事本文 ─── */}
        <section className="pb-16 md:pb-24 bg-grace-offwhite">
          <div className="container-content">
            <article className="max-w-article mx-auto">
              {blocks.length > 0 ? (
                groupBlocks(blocks)
              ) : (
                <p className="font-noto-serif text-base text-grace-text-tertiary text-center py-12">
                  詳細情報は準備中です。
                </p>
              )}
            </article>
          </div>
        </section>

        {/* ─── 一覧に戻る ─── */}
        <section className="py-12 bg-grace-offwhite border-t border-grace-line">
          <div className="container-content text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 font-noto-sans text-[10px] tracking-widest text-grace-text-secondary hover:text-grace-brown transition-colors"
            >
              ← BACK TO NEWS
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
