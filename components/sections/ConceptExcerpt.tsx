import Link from 'next/link'
import { Section } from '@/components/ui/Section'

const KEYWORDS = ['やさしさ', '余白', '季節', '香り', '素材', '手仕事', '豊かさ']

export function ConceptExcerpt() {
  return (
    <Section label="CONCEPT" className="bg-grace-offwhite">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-cormorant italic text-4xl md:text-5xl text-grace-brown mb-8 leading-tight">
          Philosophy
        </h2>
        <p className="font-noto-serif text-grace-text-secondary text-sm md:text-base leading-loose tracking-wide mb-10">
          厳選した素材と、丁寧な手仕事。<br />
          お菓子は、日常に小さな豊かさをもたらすものだと私たちは信じています。
        </p>

        {/* キーワード */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {KEYWORDS.map(word => (
            <span
              key={word}
              className="font-noto-serif text-xs text-grace-wasabi border border-grace-wasabi/30 px-4 py-2"
            >
              {word}
            </span>
          ))}
        </div>

        <Link
          href="/concept"
          className="font-noto-sans text-[10px] tracking-widest text-grace-text-secondary hover:text-grace-brown transition-colors border-b border-grace-line pb-1"
        >
          MORE ABOUT GRACE →
        </Link>
      </div>
    </Section>
  )
}
