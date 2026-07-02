// 採用ページ — Server Component（'use client' を付けない）
// 目的: 現本番(teaser/main)の自社ドメイン内に採用ページを先行公開し、
//       JobPosting 構造化データ(JSON-LD)をサーバーサイドで初期HTMLに出力する
//       （求人ボックス/スタンバイ/Googleしごと検索の無料クロール枠に載せる）。
// スタイル方針: teaser のミニマルなトーンを尊重し、ブランド固定色を Tailwind の grace-* トークン
//       （tailwind.config.ts で #7B8B6F/#2C2421/#B8956A/#F7F3EF にハードコード）で自己完結させる。
//       cinematic-b 固有の CSS変数(--ink/--bg/--gold)には一切依存しないため、
//       teaser でも将来 cinematic-b が本番化してもどちらでも正しく表示される。
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import {
  JOB_LISTINGS,
  buildJobPostingJsonLd,
  formatSalary,
} from '@/lib/recruit'

export const revalidate = 86400 // 24時間（concept 等 teaser 静的ページと同じ）

export const metadata: Metadata = {
  title: 'Recruit | Grace — PATISSERIE',
  description:
    '2026年秋オープン、愛知・春日井のパティスリー「Grace」の採用情報。店舗マネージャー候補・製造販売スタッフ（契約社員／パート）を募集しています。',
  alternates: { canonical: 'https://www.grace-patisserie.jp/recruit' },
  openGraph: {
    title: 'Recruit | Grace — PATISSERIE',
    description:
      '2026年秋オープン、愛知・春日井のパティスリー「Grace」の採用情報。店舗マネージャー候補・製造販売スタッフを募集中。',
    type: 'website',
    url: 'https://www.grace-patisserie.jp/recruit',
  },
}

// JobPosting JSON-LD を生成（SSRで初期HTMLに出力）
const jobPostingJsonLd = buildJobPostingJsonLd()

export default function RecruitPage() {
  return (
    <>
      {/* JobPosting 構造化データ（SSRで初期HTMLに出力） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jobPostingJsonLd }}
      />

      <Header />

      <main>
        {/* ─── ヒーロー（concept と同じダーク基調） ─── */}
        <section className="bg-grace-bg-dark section-padding">
          <div className="container-content text-center">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-6">
              JOIN US
            </p>
            <h1 className="font-cormorant italic text-5xl md:text-7xl text-grace-offwhite leading-none mb-8">
              Recruit
            </h1>
            <div className="w-8 h-px bg-grace-gold mx-auto mb-8" />
            <p className="font-noto-serif text-lg text-grace-stone leading-loose tracking-wide max-w-article mx-auto">
              2026年秋、愛知・春日井にオープンするパティスリー「Grace」。<br />
              お菓子づくりと店づくりを、一緒に育ててくれる仲間を募集しています。
            </p>
          </div>
        </section>

        {/* ─── 募集職種一覧 ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            <div className="section-label mb-12 text-center">OPEN POSITIONS</div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {JOB_LISTINGS.map((job) => (
                <article
                  key={job.identifier}
                  className="flex flex-col bg-grace-bg-primary border border-grace-line p-8"
                >
                  {/* 英語サブラベル */}
                  <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-3">
                    {job.labelEn}
                  </p>

                  {/* 職種名 */}
                  <h2 className="font-noto-serif text-xl text-grace-brown leading-relaxed tracking-wide">
                    {job.title}
                  </h2>

                  {/* 雇用形態 */}
                  <p className="font-noto-serif text-sm text-grace-text-tertiary mt-2">
                    {job.employmentLabelJa}
                  </p>

                  <div className="w-6 h-px bg-grace-gold my-6" />

                  {/* 給与 */}
                  <p className="font-noto-serif text-base text-grace-brown mb-4">
                    {formatSalary(job.baseSalary)}
                  </p>

                  {/* 概要 */}
                  <p className="font-noto-serif text-base text-grace-text-secondary leading-loose flex-1">
                    {job.summary}
                  </p>

                  {/* 応募CTA → Airwork 応募ページ（外部リンク） */}
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start mt-8 font-noto-sans text-[10px] tracking-widest text-grace-brown border border-grace-brown px-8 py-4 hover:bg-grace-brown hover:text-grace-offwhite transition-all duration-300"
                  >
                    APPLY →
                  </a>
                </article>
              ))}
            </div>

            {/* 応募補足 */}
            <p className="font-noto-serif text-sm text-grace-text-tertiary leading-loose text-center mt-12">
              ご応募は各求人の「APPLY」より応募ページ（Airwork）へお進みください。<br />
              採用に関するお問い合わせも承っております。
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
