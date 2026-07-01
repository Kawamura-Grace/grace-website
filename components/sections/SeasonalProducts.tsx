import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/notion/types'

interface SeasonalProductsProps {
  products: Product[]
}

/**
 * 季節商品グリッド — シネマティック案B
 * 非対称グリッドレイアウト:
 * - 左 60%: 大カード1枚（最初の商品）
 * - 右 40%: 小カード2枚縦積み（2・3番目の商品）
 * - 商品写真 + 商品名（Cormorant Garamond）+ 日本語名（わさび色）+ 価格（ゴールド）
 * - productsが0件の場合はnull返却（既存と同じ）
 */
export function SeasonalProducts({ products }: SeasonalProductsProps) {
  if (!products.length) return null

  // 表示用商品: 最大3件（大1 + 小2）
  const [large, ...smalls] = products.slice(0, 3)

  return (
    <section className="bg-grace-offwhite px-16 py-[120px]">
      {/* セクションラベル */}
      <div className="section-label mb-16">SWEETS</div>

      {/* 非対称グリッド */}
      <div className="flex gap-7">
        {/* 左: 大カード (60%) */}
        <div className="flex-[0_0_58%]">
          {large && (
            <Link href={`/sweets/${large.slug}`} className="group block">
              {/* 商品写真 */}
              <div
                className="relative w-full overflow-hidden bg-grace-cream"
                style={{ height: '720px' }}
              >
                {large.mainImage ? (
                  <Image
                    src={large.mainImage}
                    alt={large.name}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-cormorant italic text-4xl text-grace-stone">G</span>
                  </div>
                )}
              </div>

              {/* 商品情報 */}
              <div className="pt-5 flex items-baseline justify-between">
                <div>
                  <p
                    className="font-cormorant italic text-grace-brown tracking-[2px]"
                    style={{ fontSize: '24px', fontWeight: 300 }}
                  >
                    {large.name}
                  </p>
                  {/* 日本語名があれば表示（現在のProduct型では未定義のため省略） */}
                </div>
                <p
                  className="font-cormorant italic text-grace-gold tracking-[1px]"
                  style={{ fontSize: '18px' }}
                >
                  ¥{large.price.toLocaleString()}
                </p>
              </div>
            </Link>
          )}
        </div>

        {/* 右: 小カード2枚縦積み (40%) */}
        <div className="flex-1 flex flex-col gap-7">
          {smalls.map(product => (
            <Link key={product.id} href={`/sweets/${product.slug}`} className="group block">
              {/* 商品写真 */}
              <div
                className="relative w-full overflow-hidden bg-grace-cream"
                style={{ height: '346px' }}
              >
                {product.mainImage ? (
                  <Image
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-cormorant italic text-3xl text-grace-stone">G</span>
                  </div>
                )}
              </div>

              {/* 商品情報 */}
              <div className="pt-5 flex items-baseline justify-between">
                <div>
                  <p
                    className="font-cormorant italic text-grace-brown tracking-[2px]"
                    style={{ fontSize: '20px', fontWeight: 300 }}
                  >
                    {product.name}
                  </p>
                  {/* 日本語名があれば表示（現在のProduct型では未定義のため省略） */}
                </div>
                <p
                  className="font-cormorant italic text-grace-gold tracking-[1px]"
                  style={{ fontSize: '18px' }}
                >
                  ¥{product.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 全商品へのリンク */}
      <div className="text-center mt-16">
        <Link
          href="/sweets"
          className="font-noto-serif text-[10px] tracking-widest text-grace-text-secondary hover:text-grace-brown transition-colors border-b border-grace-line pb-1"
        >
          ALL SWEETS →
        </Link>
      </div>
    </section>
  )
}
