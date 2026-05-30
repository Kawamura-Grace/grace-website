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
        <section className="relative overflow-hidden bg-grace-bg-dark section-padding">
          {/* 背景写真 */}
          <Image
            src="https://images.pexels.com/photos/2128027/pexels-photo-2128027.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            crossOrigin="anonymous"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-grace-bg-dark/78" aria-hidden="true" />
          <div className="relative z-10 container-content text-center">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-6">GET IN TOUCH</p>
            <h1 className="font-cormorant italic text-5xl md:text-7xl text-grace-offwhite leading-none mb-8">
              Contact
            </h1>
            <div className="w-8 h-px bg-grace-gold mx-auto" />
          </div>
        </section>

        {/* ─── リード文 ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content max-w-article mx-auto">
            <p className="font-noto-serif text-lg text-grace-text-secondary leading-loose text-center mb-2">
              取材・法人ギフト・卸売・採用など、各種お問い合わせは<br className="hidden md:block" />
              下記フォームよりお送りください。
            </p>
            <p className="font-noto-serif text-base text-grace-text-tertiary leading-loose text-center mb-16">
              3営業日以内にご返信いたします。
            </p>

            {/* お問い合わせフォーム */}
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
