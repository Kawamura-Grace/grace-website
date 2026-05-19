import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <p className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-6">404</p>
        <h1 className="font-cormorant italic text-4xl md:text-5xl text-grace-brown mb-4">
          Page Not Found
        </h1>
        <p className="font-noto-serif text-lg text-grace-text-secondary mb-12 leading-relaxed">
          お探しのページは移動または削除されました。
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="font-noto-sans text-xs tracking-widest px-8 py-3 border border-grace-brown text-grace-brown hover:bg-grace-brown hover:text-grace-offwhite transition-all duration-300"
          >
            TOPへ戻る
          </Link>
          <Link
            href="/sweets"
            className="font-noto-sans text-xs tracking-widest px-8 py-3 border border-grace-line text-grace-text-secondary hover:border-grace-brown hover:text-grace-brown transition-all duration-300"
          >
            Sweetsを見る
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
