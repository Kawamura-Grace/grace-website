// 商品詳細ページ
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Tag } from '@/components/ui/Tag'
import { Button } from '@/components/ui/Button'
import { getProducts, getProductBySlug } from '@/lib/notion/products'

export const revalidate = 3600 // 1時間

interface PageProps {
  params: { slug: string }
}

// ─── generateStaticParams: スラッグ一覧を静的生成 ───
export async function generateStaticParams() {
  const products = await getProducts().catch(() => [])
  return products.map(p => ({ slug: p.slug }))
}

// ─── メタデータ動的生成 ───
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug).catch(() => null)
  if (!product) return { title: '商品が見つかりません | Grace' }
  return {
    title: `${product.name} | Grace — PATISSERIE`,
    description: product.scentDescription || `Grace Patisserieの${product.name}`,
    openGraph: product.mainImage ? { images: [{ url: product.mainImage }] } : undefined,
  }
}

export default async function SweetDetailPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug).catch(() => null)

  if (!product) notFound()

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
              <Link href="/sweets" className="hover:text-grace-brown transition-colors">SWEETS</Link>
              <span>/</span>
              <span className="text-grace-text-secondary">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* ─── メインコンテンツ ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

              {/* 左: 商品画像 */}
              <div className="space-y-4">
                {/* メイン画像 */}
                <div className="relative aspect-square bg-grace-cream overflow-hidden">
                  {product.mainImage ? (
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary">PHOTO</span>
                    </div>
                  )}
                </div>
                {/* サブ画像グリッド */}
                {product.subImages && product.subImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.subImages.slice(0, 4).map((src, i) => (
                      <div key={i} className="relative aspect-square bg-grace-cream overflow-hidden">
                        <Image
                          src={src}
                          alt={`${product.name} ${i + 2}`}
                          fill
                          className="object-cover"
                          sizes="25vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 右: 商品情報 */}
              <div>
                {/* カテゴリ・シーズン */}
                <div className="flex items-center gap-3 mb-4">
                  <Tag variant="stone">{product.category}</Tag>
                  {product.season && product.season !== '通年' && (
                    <Tag variant="gold">{product.season}</Tag>
                  )}
                </div>

                {/* 商品名 */}
                <h1 className="font-noto-serif text-2xl md:text-3xl text-grace-brown mb-2 leading-tight">
                  {product.name}
                </h1>

                {/* 価格 */}
                <p className="font-noto-sans text-xl text-grace-brown mb-1">
                  ¥{product.price.toLocaleString()}
                  <span className="text-xs text-grace-text-tertiary ml-1">（税込）</span>
                </p>
                {product.size && (
                  <p className="font-noto-sans text-xs text-grace-text-tertiary mb-8">{product.size}</p>
                )}

                <div className="w-8 h-px bg-grace-line my-8" />

                {/* 説明文 (香り・食感・余韻) */}
                <div className="space-y-6 mb-8">
                  {[
                    { label: '香り',     text: product.scentDescription },
                    { label: '食感',     text: product.textureDescription },
                    { label: '余韻',     text: product.aftertasteDescription },
                  ].filter(({ text }) => text).map(({ label, text }) => (
                    <div key={label}>
                      <p className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-1">{label}</p>
                      <p className="font-noto-serif text-base text-grace-text-secondary leading-loose">{text}</p>
                    </div>
                  ))}
                </div>

                {/* 購入ボタン */}
                {product.squareUrl ? (
                  <Button href={product.squareUrl} external variant="primary" size="lg" className="w-full justify-center mb-3">
                    ONLINE STORE で購入
                  </Button>
                ) : (
                  <div className="bg-grace-cream border border-grace-line p-4 text-center mb-3">
                    <p className="font-noto-serif text-sm text-grace-text-secondary">
                      この商品は店頭でのみご購入いただけます
                    </p>
                  </div>
                )}

                <div className="w-8 h-px bg-grace-line my-8" />

                {/* 素材・アレルゲン・賞味期限 */}
                <dl className="space-y-4">
                  {product.ingredients && product.ingredients.length > 0 && (
                    <div>
                      <dt className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-1">使用素材</dt>
                      <dd className="font-noto-serif text-sm text-grace-text-secondary leading-relaxed">
                        {product.ingredients.join('・')}
                      </dd>
                    </div>
                  )}
                  {product.allergens.length > 0 && (
                    <div>
                      <dt className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-1">アレルゲン</dt>
                      <dd className="font-noto-serif text-sm text-grace-text-secondary leading-relaxed">
                        {product.allergens.join('・')}
                      </dd>
                    </div>
                  )}
                  {product.expiryDate && (
                    <div>
                      <dt className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-1">賞味期限</dt>
                      <dd className="font-noto-serif text-sm text-grace-text-secondary">{product.expiryDate}</dd>
                    </div>
                  )}
                  {product.storageMethod && (
                    <div>
                      <dt className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-1">保存方法</dt>
                      <dd className="font-noto-serif text-sm text-grace-text-secondary">{product.storageMethod}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 一覧に戻る ─── */}
        <section className="py-12 bg-grace-offwhite border-t border-grace-line">
          <div className="container-content text-center">
            <Link
              href="/sweets"
              className="inline-flex items-center gap-2 font-noto-sans text-[10px] tracking-widest text-grace-text-secondary hover:text-grace-brown transition-colors"
            >
              ← BACK TO SWEETS
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
