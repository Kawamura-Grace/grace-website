// 採用ページ — Server Component（'use client' を付けない）
// 目的: 自社ドメイン内に採用ページを新設し、JobPosting 構造化データ(JSON-LD)を
//       サーバーサイドで初期HTMLに出力する（求人ボックス/スタンバイ/Googleしごと検索のクロール対象化）。
// デザイン: 既存 concept ページのトーン（Label・Cormorant/Shippori・--gold/--ink/--bg）を踏襲。
//           ホバーはクライアントハンドラを使わずスコープCSSで実現し、Server Component を維持する。

import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import {
  JOB_LISTINGS,
  buildJobPostingJsonLd,
  formatSalary,
} from '@/lib/recruit'

export const metadata: Metadata = {
  title: '採用情報｜Grace（グレイス）春日井のパティスリー',
  description:
    '2026年秋オープン、愛知・春日井のパティスリー「Grace」の採用情報。店舗マネージャー候補・製造販売スタッフ（契約社員／パート）を募集しています。',
  alternates: { canonical: 'https://grace-patisserie.jp/recruit' },
  openGraph: {
    title: '採用情報｜Grace（グレイス）春日井のパティスリー',
    description:
      '2026年秋オープン、愛知・春日井のパティスリー「Grace」の採用情報。店舗マネージャー候補・製造販売スタッフを募集中。',
    type: 'website',
    url: 'https://grace-patisserie.jp/recruit',
  },
}

// ============ ラベル（concept/page.tsx と同一設計） ============
function Label({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
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
        justifyContent: center ? 'center' : undefined,
        gap: '16px',
      }}
    >
      <span style={{ width: '42px', height: '1px', background: '#B8956A', flexShrink: 0, display: 'inline-block' }} />
      {children}
      {center && <span style={{ width: '42px', height: '1px', background: '#B8956A', flexShrink: 0, display: 'inline-block' }} />}
    </p>
  )
}

// ============ メインページ（Server Component） ============
export default function RecruitPage() {
  const jsonLd = buildJobPostingJsonLd()

  return (
    <>
      {/* JobPosting 構造化データ（SSRで初期HTMLに出力） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <Header />

      <main>
        {/* ===== 1. HERO ===== */}
        <section
          style={{
            minHeight: '48svh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(90px,11vw,150px) 24px clamp(40px,6vw,80px)',
            textAlign: 'center',
            borderBottom: '1px solid color-mix(in srgb, var(--ink) 10%, var(--bg))',
          }}
        >
          <Label center>RECRUIT</Label>
          <h1
            style={{
              fontFamily: "'Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
              fontWeight: 500,
              fontSize: 'clamp(24px,4vw,40px)',
              letterSpacing: '0.18em',
              lineHeight: 1.7,
              marginTop: '28px',
            }}
          >
            美しい暮らしを、共につくる人へ。
          </h1>
          <p
            style={{
              marginTop: '28px',
              fontSize: '14px',
              lineHeight: 2.2,
              letterSpacing: '0.1em',
              color: 'color-mix(in srgb, var(--ink) 70%, var(--bg))',
              maxWidth: '460px',
            }}
          >
            2026年秋、愛知・春日井にオープンするパティスリー「Grace」。
            <br />
            お菓子づくりと店づくりを、一緒に育ててくれる仲間を募集しています。
          </p>
        </section>

        {/* ===== 2. 求人カード一覧 ===== */}
        <section
          style={{
            padding: 'clamp(56px,8vw,100px) clamp(24px,6vw,80px)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,64px)' }}>
            <Label center>OPEN POSITIONS</Label>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(28px,4vw,48px)',
              maxWidth: '1000px',
              margin: '0 auto',
            }}
          >
            {JOB_LISTINGS.map((job) => (
              <article
                key={job.identifier}
                style={{
                  border: '1px solid color-mix(in srgb, var(--ink) 12%, var(--bg))',
                  padding: 'clamp(28px,3.4vw,40px)',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'color-mix(in srgb, var(--ink) 2%, var(--bg))',
                }}
              >
                {/* 雇用形態バッジ */}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: '12px',
                    letterSpacing: '0.3em',
                    color: '#B8956A',
                    marginBottom: '14px',
                  }}
                >
                  {job.labelEn}
                </p>

                {/* 職種名 */}
                <h2
                  style={{
                    fontFamily: "'Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
                    fontWeight: 500,
                    fontSize: 'clamp(18px,2.2vw,22px)',
                    letterSpacing: '0.1em',
                    lineHeight: 1.7,
                  }}
                >
                  {job.title}
                </h2>

                {/* 雇用形態（日本語） */}
                <p
                  style={{
                    marginTop: '10px',
                    fontSize: '12.5px',
                    letterSpacing: '0.1em',
                    color: 'color-mix(in srgb, var(--ink) 60%, var(--bg))',
                  }}
                >
                  {job.employmentLabelJa}
                </p>

                <div
                  style={{
                    width: '24px',
                    height: '1px',
                    background: '#B8956A',
                    margin: '20px 0',
                  }}
                />

                {/* 給与 */}
                <p
                  style={{
                    fontSize: '14px',
                    letterSpacing: '0.06em',
                    color: 'var(--ink)',
                    marginBottom: '16px',
                  }}
                >
                  {formatSalary(job.baseSalary)}
                </p>

                {/* 概要 */}
                <p
                  style={{
                    fontSize: '13.5px',
                    lineHeight: 2.0,
                    letterSpacing: '0.05em',
                    color: 'color-mix(in srgb, var(--ink) 72%, var(--bg))',
                    flex: '1 1 auto',
                  }}
                >
                  {job.summary}
                </p>

                {/* CTA: Airwork 応募ページへ（外部リンク） */}
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="recruit-cta"
                  style={{
                    marginTop: '28px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    alignSelf: 'flex-start',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: '13.5px',
                    letterSpacing: '0.28em',
                    color: 'inherit',
                    borderBottom: '1px solid #B8956A',
                    padding: '0 2px 7px',
                  }}
                >
                  APPLY
                  <span style={{ fontStyle: 'normal' }}>→</span>
                </a>
              </article>
            ))}
          </div>

          {/* 応募補足 */}
          <p
            style={{
              marginTop: 'clamp(40px,5vw,64px)',
              textAlign: 'center',
              fontSize: '12.5px',
              lineHeight: 2.0,
              letterSpacing: '0.08em',
              color: 'color-mix(in srgb, var(--ink) 60%, var(--bg))',
            }}
          >
            ご応募は各求人の「APPLY」より応募ページ（Airwork）へお進みください。
            <br />
            採用に関するお問い合わせは
            <a
              href="/contact"
              style={{ color: '#B8956A', borderBottom: '1px solid #B8956A', margin: '0 4px' }}
            >
              お問い合わせフォーム
            </a>
            からも承ります。
          </p>
        </section>
      </main>

      <Footer />

      {/* CTA ホバー（Server Component 維持のためスコープCSSで実装） */}
      <style>{`
        .recruit-cta { transition: opacity .3s, gap .3s; }
        .recruit-cta:hover { opacity: .55; gap: 18px; }
      `}</style>
    </>
  )
}
