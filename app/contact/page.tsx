// お問い合わせページ — フォームはクライアントコンポーネントに分離
import type { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ContactForm } from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Grace — PATISSERIE',
  description: 'Pâtisserie Graceへのお問い合わせ。取材・法人ギフト・卸・採用など各種お問い合わせはこちらから。',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* ─── ページヘッダー ─── */}
        <section className="relative overflow-hidden bg-grace-bg-dark flex items-center justify-center" style={{ minHeight: '480px' }}>
          {/* 背景写真: パティスリーの作業台 */}
          <Image
            src="https://images.pexels.com/photos/2128027/pexels-photo-2128027.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            crossOrigin="anonymous"
            aria-hidden="true"
            priority
          />
          <div className="absolute inset-0 bg-grace-bg-dark/78" aria-hidden="true" />
          <div className="relative z-10 container-content text-center py-24">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-6">GET IN TOUCH</p>
            <h1 className="font-cormorant italic text-5xl md:text-7xl text-grace-offwhite leading-none mb-8">
              Contact
            </h1>
            <div className="w-8 h-px bg-grace-gold mx-auto mb-8" />
            <p className="font-noto-serif text-lg text-grace-stone leading-loose max-w-sm mx-auto">
              取材・採用・卸・法人ギフトのご相談など、<br />
              お気軽にお問い合わせください。
            </p>
          </div>
        </section>

        {/* ─── フォーム ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content max-w-article mx-auto">
            <div className="text-center mb-12">
              <p className="font-noto-serif text-base text-grace-text-tertiary leading-loose">
                3営業日以内にご返信いたします。
              </p>
            </div>

            {/* お問い合わせフォーム */}
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
