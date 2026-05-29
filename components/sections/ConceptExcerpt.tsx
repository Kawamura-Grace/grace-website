import Image from 'next/image'
import Link from 'next/link'

/**
 * コンセプト抜粋セクション — 50/50 スプリットレイアウト
 * - 左半分: 食品写真（object-cover・高さいっぱい）
 * - 右半分: オフホワイト背景（#F7F3EF）に縦中央配置のテキスト群
 *   - セクションラベル CONCEPT
 *   - 見出し Philosophy（Cormorant Garamond Italic）
 *   - 本文テキスト（Noto Serif JP）
 *   - キーワードチップ（枠付き）
 *   - MORE ABOUT GRACE リンク
 */
export function ConceptExcerpt() {
  // コンセプトページに関連するキーワードチップ
  const keywords = ['やさしさ', '余白', '季節', '香り', '素材', '手仕事', '豊かさ']

  return (
    <section
      className="flex flex-col md:flex-row min-h-[600px]"
      style={{ backgroundColor: '#F7F3EF' }}
    >
      {/* 左半分: 画像 */}
      <div className="relative w-full md:w-1/2 min-h-[320px] md:min-h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1280&auto=format&fit=crop"
          alt="Pâtisserie Grace のお菓子"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* 右半分: テキストコンテンツ */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center px-10 md:px-16 py-16 md:py-20"
        style={{ backgroundColor: '#F7F3EF' }}
      >
        <div className="max-w-[420px] w-full">

          {/* セクションラベル */}
          <span
            className="block font-noto-serif tracking-[6px] text-grace-brown/50 mb-6"
            style={{ fontSize: '10px', letterSpacing: '0.4em' }}
          >
            CONCEPT
          </span>

          {/* 見出し */}
          <h2
            className="font-cormorant italic text-grace-brown leading-none mb-8"
            style={{ fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 300 }}
          >
            Philosophy
          </h2>

          {/* 本文テキスト */}
          <p
            className="font-noto-serif text-grace-brown/80 leading-[2] mb-10"
            style={{ fontSize: '14px', fontWeight: 300 }}
          >
            厳選した素材と、丁寧な手仕事。<br />
            お菓子は、日常に小さな豊かさを<br />
            もたらすものだと信じています。
          </p>

          {/* キーワードチップ */}
          <div className="flex flex-wrap gap-2 mb-10">
            {keywords.map((word) => (
              <span
                key={word}
                className="font-noto-serif text-grace-brown/70 border border-grace-brown/25 px-3 py-1"
                style={{ fontSize: '11px', letterSpacing: '0.1em' }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* MORE ABOUT GRACE リンク */}
          <Link
            href="/concept"
            className="font-noto-serif text-[10px] tracking-widest text-grace-brown/60 hover:text-grace-brown transition-colors border-b border-grace-brown/30 pb-1"
          >
            MORE ABOUT GRACE →
          </Link>
        </div>
      </div>
    </section>
  )
}
