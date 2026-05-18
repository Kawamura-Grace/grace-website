export function EcInvitation() {
  return (
    <section className="bg-grace-bg-dark py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-8">
          ━ ONLINE STORE ━
        </p>
        <h2 className="font-cormorant italic text-4xl md:text-5xl text-grace-offwhite mb-6 leading-tight">
          Order Online
        </h2>
        <p className="font-noto-serif text-grace-stone text-sm leading-loose tracking-wide mb-10">
          ご自宅でも、贈り物にも。<br />
          オンラインストアでお取り寄せいただけます。
        </p>
        <a
          href="https://square.site"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 font-noto-sans text-xs tracking-widest text-grace-offwhite border border-grace-gold px-8 py-4 hover:bg-grace-gold hover:text-grace-brown transition-all duration-500"
        >
          ONLINE STORE
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </a>
      </div>
    </section>
  )
}
