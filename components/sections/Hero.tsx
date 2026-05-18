import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden bg-grace-brown">

      {/* 背景画像プレースホルダー（撮影後に差し替え） */}
      <div className="absolute inset-0 bg-gradient-to-b from-grace-brown/20 via-transparent to-grace-brown/60" />

      {/* コンテンツ */}
      <div className="relative z-10 text-center px-6">
        <Image
          src="/logo-vertical.png"
          alt="Grace Patisserie"
          width={200}
          height={140}
          className="mx-auto mb-8 brightness-0 invert opacity-90"
          priority
        />
        <p className="font-noto-serif text-grace-offwhite/90 text-sm md:text-base tracking-[0.2em] leading-loose">
          美しい暮らしには、お菓子がある。
        </p>
      </div>

      {/* スクロールインジケーター */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-grace-offwhite/50">
        <span className="font-noto-sans text-[9px] tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-grace-gold/50 animate-pulse" />
      </div>
    </section>
  )
}
