// お問い合わせページ — フォームはクライアントコンポーネントに分離
import type { Metadata } from 'next'
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
        <section className="bg-grace-bg-dark section-padding">
          <div className="container-content text-center">
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
            <p className="font-noto-serif text-sm text-grace-text-secondary leading-loose text-center mb-2">
              取材・法人ギフト・卸売・採用など、各種お問い合わせは<br className="hidden md:block" />
              下記フォームよりお送りください。
            </p>
            <p className="font-noto-serif text-xs text-grace-text-tertiary leading-loose text-center mb-16">
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
