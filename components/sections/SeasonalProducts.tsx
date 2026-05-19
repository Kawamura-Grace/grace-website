import Link from 'next/link'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { Tag } from '@/components/ui/Tag'
import type { Product } from '@/lib/notion/types'

interface SeasonalProductsProps {
  products: Product[]
}

export function SeasonalProducts({ products }: SeasonalProductsProps) {
  if (!products.length) return null

  return (
    <Section label="SWEETS" title="Seasonal" titleJa="季節のおすすめ">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {products.map(product => (
          <Link
            key={product.id}
            href={`/sweets/${product.slug}`}
            className="group block"
          >
            {/* 商品画像 */}
            <div className="relative aspect-square bg-grace-cream mb-3 overflow-hidden">
              {product.mainImage ? (
                <Image
                  src={product.mainImage}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-cormorant italic text-2xl text-grace-stone">G</span>
                </div>
              )}
              {product.season && product.season !== '通年' && (
                <div className="absolute top-2 left-2">
                  <Tag variant="gold">{product.season}</Tag>
                </div>
              )}
            </div>

            {/* 商品情報 */}
            <p className="font-noto-serif text-base text-grace-brown mb-1 group-hover:text-grace-wasabi transition-colors">
              {product.name}
            </p>
            <p className="font-noto-sans text-xs text-grace-text-tertiary">
              ¥{product.price.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/sweets"
          className="font-noto-sans text-[10px] tracking-widest text-grace-text-secondary hover:text-grace-brown transition-colors border-b border-grace-line pb-1"
        >
          ALL SWEETS →
        </Link>
      </div>
    </Section>
  )
}
