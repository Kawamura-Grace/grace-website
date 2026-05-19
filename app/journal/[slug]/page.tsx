// Journal詳細ページ — Notionブロックをシンプルにレンダリング
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Tag } from '@/components/ui/Tag'
import { getJournalPosts, getJournalBySlug, getJournalBlocks } from '@/lib/notion/journal'
import { getProductBySlug, getProducts } from '@/lib/notion/products'
import { formatDateJa } from '@/lib/utils/date'
import type { BlockObjectResponse, PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export const revalidate = 3600

interface PageProps {
  params: { slug: string }
}

// ─── generateStaticParams ───
export async function generateStaticParams() {
  const posts = await getJournalPosts().catch(() => [])
  return posts.map(p => ({ slug: p.slug }))
}

// ─── メタデータ動的生成 ───
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getJournalBySlug(params.slug).catch(() => null)
  if (!post) return { title: '記事が見つかりません | Grace' }
  return {
    title: `${post.title} | Journal | Grace`,
    description: post.summary,
    openGraph: post.eyecatch ? { images: [{ url: post.eyecatch }] } : undefined,
  }
}

// ─── Notionブロックの型ガード ───
function isBlockResponse(block: BlockObjectResponse | PartialBlockObjectResponse): block is BlockObjectResponse {
  return 'type' in block
}

// ─── Notionブロック → JSX 変換 ───
function renderBlock(block: BlockObjectResponse, index: number): React.ReactNode {
  const { type } = block

  // rich_text配列をプレーンテキストに変換
  function getRichText(richTexts: Array<{ plain_text: string }>): string {
    return richTexts.map(t => t.plain_text).join('')
  }

  switch (type) {
    case 'paragraph': {
      const texts = (block as any).paragraph?.rich_text ?? []
      const text = getRichText(texts)
      if (!text) return <div key={index} className="h-4" />
      return (
        <p key={index} className="font-noto-serif text-lg text-grace-text-secondary leading-loose mb-4">
          {text}
        </p>
      )
    }

    case 'heading_1': {
      const texts = (block as any).heading_1?.rich_text ?? []
      return (
        <h2 key={index} className="font-noto-serif text-xl text-grace-brown mt-12 mb-4 pb-2 border-b border-grace-line">
          {getRichText(texts)}
        </h2>
      )
    }

    case 'heading_2': {
      const texts = (block as any).heading_2?.rich_text ?? []
      return (
        <h3 key={index} className="font-noto-serif text-lg text-grace-brown mt-10 mb-3">
          {getRichText(texts)}
        </h3>
      )
    }

    case 'heading_3': {
      const texts = (block as any).heading_3?.rich_text ?? []
      return (
        <h4 key={index} className="font-noto-serif text-lg text-grace-brown mt-8 mb-2">
          {getRichText(texts)}
        </h4>
      )
    }

    case 'bulleted_list_item': {
      const texts = (block as any).bulleted_list_item?.rich_text ?? []
      return (
        <li key={index} className="font-noto-serif text-lg text-grace-text-secondary leading-loose pl-2">
          {getRichText(texts)}
        </li>
      )
    }

    case 'numbered_list_item': {
      const texts = (block as any).numbered_list_item?.rich_text ?? []
      return (
        <li key={index} className="font-noto-serif text-lg text-grace-text-secondary leading-loose pl-2">
          {getRichText(texts)}
        </li>
      )
    }

    case 'quote': {
      const texts = (block as any).quote?.rich_text ?? []
      return (
        <blockquote key={index} className="border-l-2 border-grace-gold pl-6 my-6">
          <p className="font-noto-serif text-lg text-grace-text-secondary leading-loose italic">
            {getRichText(texts)}
          </p>
        </blockquote>
      )
    }

    case 'divider':
      return <hr key={index} className="border-grace-line my-10" />

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
              alt={caption || 'ジャーナル画像'}
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

// ─── リストブロックをul/olでラップする処理 ───
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
      result.push(
        <ul key={`ul-${index}`} className="list-disc list-outside ml-5 mb-4 space-y-1">
          {bulletItems}
        </ul>
      )
      bulletItems = []
    }

    if (block.type === 'numbered_list_item') {
      numberedItems.push(renderBlock(block, index))
      return
    }
    if (numberedItems.length) {
      result.push(
        <ol key={`ol-${index}`} className="list-decimal list-outside ml-5 mb-4 space-y-1">
          {numberedItems}
        </ol>
      )
      numberedItems = []
    }

    const rendered = renderBlock(block, index)
    if (rendered) result.push(rendered)
  })

  // 末尾に残ったリストを処理
  if (bulletItems.length) {
    result.push(
      <ul key="ul-last" className="list-disc list-outside ml-5 mb-4 space-y-1">
        {bulletItems}
      </ul>
    )
  }
  if (numberedItems.length) {
    result.push(
      <ol key="ol-last" className="list-decimal list-outside ml-5 mb-4 space-y-1">
        {numberedItems}
      </ol>
    )
  }

  return result
}

export default async function JournalDetailPage({ params }: PageProps) {
  const post = await getJournalBySlug(params.slug).catch(() => null)
  if (!post) notFound()

  // ブロック取得（失敗時は空配列）
  const rawBlocks = await getJournalBlocks(post.id).catch(() => [])
  const blocks = rawBlocks.filter(isBlockResponse) as BlockObjectResponse[]

  // 関連商品（最大4件）
  const allProducts = await getProducts().catch(() => [])
  const relatedProducts = post.relatedProductIds?.length
    ? allProducts.filter(p => post.relatedProductIds!.includes(p.id)).slice(0, 4)
    : []

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
              <Link href="/journal" className="hover:text-grace-brown transition-colors">JOURNAL</Link>
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
                <Tag variant="stone">{post.category}</Tag>
                <time
                  dateTime={post.publishedAt}
                  className="font-noto-sans text-[10px] tracking-wide text-grace-text-tertiary"
                >
                  {formatDateJa(post.publishedAt)}
                </time>
                {post.author && (
                  <span className="font-noto-sans text-[10px] tracking-wide text-grace-text-tertiary">
                    by {post.author}
                  </span>
                )}
              </div>
              <h1 className="font-noto-serif text-2xl md:text-3xl text-grace-brown leading-tight mb-6">
                {post.title}
              </h1>
              {post.summary && (
                <p className="font-noto-serif text-lg text-grace-text-secondary leading-loose">
                  {post.summary}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ─── アイキャッチ画像 ─── */}
        {post.eyecatch && (
          <div className="bg-grace-offwhite">
            <div className="container-content">
              <div className="max-w-article mx-auto">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.eyecatch}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── 記事本文 ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            <article className="max-w-article mx-auto">
              {blocks.length > 0 ? (
                groupBlocks(blocks)
              ) : (
                <p className="font-noto-serif text-lg text-grace-text-tertiary text-center py-12">
                  記事の内容を準備中です。
                </p>
              )}
            </article>
          </div>
        </section>

        {/* ─── 関連商品 ─── */}
        {relatedProducts.length > 0 && (
          <section className="section-padding bg-grace-cream">
            <div className="container-content">
              <div className="section-label mb-10">RELATED SWEETS</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/sweets/${product.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-square bg-grace-stone overflow-hidden mb-3">
                      {product.mainImage ? (
                        <Image
                          src={product.mainImage}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary">PHOTO</span>
                        </div>
                      )}
                    </div>
                    <p className="font-noto-serif text-base text-grace-brown group-hover:text-grace-text-secondary transition-colors">
                      {product.name}
                    </p>
                    <p className="font-noto-sans text-[10px] text-grace-text-tertiary">
                      ¥{product.price.toLocaleString()}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── 一覧に戻る ─── */}
        <section className="py-12 bg-grace-offwhite border-t border-grace-line">
          <div className="container-content text-center">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 font-noto-sans text-[10px] tracking-widest text-grace-text-secondary hover:text-grace-brown transition-colors"
            >
              ← BACK TO JOURNAL
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
