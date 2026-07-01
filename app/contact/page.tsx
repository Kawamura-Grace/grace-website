// お問い合わせページ — フォームはクライアントコンポーネントに分離
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ContactForm } from '@/components/forms/ContactForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact - お問い合わせ | Grace',
  description: 'Pâtisserie Graceへのお問い合わせ。取材・法人ギフト・卸・採用など各種お問い合わせはこちらから。',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>

        {/* ─── ページヘッダー ─── */}
        <section
          style={{
            minHeight: '56svh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(70px,10vw,130px) 24px clamp(50px,7vw,90px)',
            textAlign: 'center',
            borderBottom: '1px solid color-mix(in srgb, var(--ink) 10%, var(--bg))',
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '13px',
              letterSpacing: '0.42em',
              color: '#B8956A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            <span style={{ width: '42px', height: '1px', background: '#B8956A', flexShrink: 0, display: 'inline-block' }} />
            Contact
            <span style={{ width: '42px', height: '1px', background: '#B8956A', flexShrink: 0, display: 'inline-block' }} />
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(38px,6vw,64px)',
              letterSpacing: '0.08em',
              marginTop: '24px',
              lineHeight: 1.15,
            }}
          >
            お問い合わせ
          </h1>
          {/* リード文 */}
          <p
            style={{
              marginTop: '28px',
              fontSize: '14px',
              lineHeight: 2.1,
              letterSpacing: '0.1em',
              color: 'color-mix(in srgb, var(--ink) 65%, var(--bg))',
              maxWidth: '440px',
            }}
          >
            取材・採用・卸・法人ギフトのご相談など、<br />
            お気軽にお問い合わせください。
          </p>
        </section>

        {/* ─── フォーム ─── */}
        <section
          style={{
            padding: 'clamp(60px,8vw,100px) clamp(24px,6vw,80px)',
          }}
        >
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            {/* お問い合わせフォーム */}
            <ContactForm />

            {/* 注意書き */}
            <p
              style={{
                marginTop: '36px',
                fontSize: '12px',
                letterSpacing: '0.12em',
                color: 'color-mix(in srgb, var(--ink) 50%, var(--bg))',
                textAlign: 'center',
                lineHeight: 1.9,
              }}
            >
              内容を確認のうえ、3営業日以内にご返信いたします。
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
