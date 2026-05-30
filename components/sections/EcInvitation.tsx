import Image from 'next/image'

export function EcInvitation() {
  return (
    <section className="relative overflow-hidden bg-grace-bg-dark py-20 px-6">
      {/* 背景写真: スマートフォン・SNSアイコン（暗いトーン） */}
      <Image
        src="https://images.pexels.com/photos/5678243/pexels-photo-5678243.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt=""
        fill
        className="object-cover opacity-20"
        sizes="100vw"
        crossOrigin="anonymous"
        aria-hidden="true"
      />
      {/* ダークブラウンオーバーレイ */}
      <div className="absolute inset-0 bg-grace-bg-dark/75" aria-hidden="true" />

      {/* コンテンツ */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-8">
          ━ FOLLOW US ━
        </p>
        <h2 className="font-cormorant italic text-4xl md:text-5xl text-grace-offwhite mb-6 leading-tight">
          Instagram
        </h2>
        <p className="font-noto-serif text-grace-stone text-sm leading-loose tracking-wide mb-10">
          開業までの舞台裏、季節の素材、お菓子の記録。<br />
          Instagramで先行公開しています。
        </p>
        <a
          href="https://www.instagram.com/patisserie_grace_/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 font-noto-sans text-xs tracking-widest text-grace-offwhite border border-grace-gold px-8 py-4 hover:bg-grace-gold hover:text-grace-brown transition-all duration-500"
        >
          @patisserie_grace_
          <svg width="14" height="14" className="block flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="5"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
        </a>
      </div>
    </section>
  )
}
