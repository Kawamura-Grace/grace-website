import Link from 'next/link'

/**
 * コンセプト抜粋セクション — シネマティック案B
 * - 背景: grace-brown（#2C2421）ダークブラウン
 * - テキスト: grace-offwhite、Cormorant Garamond Italic、大きく中央揃え
 * - サブテキスト: grace-gold（#B8956A）
 * - パディングは大きく（220px相当 → py-[220px]）
 */
export function ConceptExcerpt() {
  return (
    <section className="bg-grace-brown text-center px-20 py-[140px] md:py-[220px]">
      {/* メインコピー */}
      <p
        className="font-cormorant italic text-grace-offwhite leading-[1.8] tracking-[2px]"
        style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 300 }}
      >
        静けさのなかに、<br />確かな歓びを。
      </p>

      {/* サブテキスト */}
      <span
        className="block mt-10 font-noto-serif text-grace-gold tracking-[6px]"
        style={{ fontSize: '13px', fontWeight: 300 }}
      >
        ひと皿の余白が、日々を整える
      </span>

      {/* コンセプトページへのリンク */}
      <div className="mt-16">
        <Link
          href="/concept"
          className="font-noto-serif text-[10px] tracking-widest text-grace-offwhite/60 hover:text-grace-gold transition-colors border-b border-grace-offwhite/20 pb-1"
        >
          MORE ABOUT GRACE →
        </Link>
      </div>
    </section>
  )
}
