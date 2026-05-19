// プライバシーポリシーページ — 静的コンテンツ
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'プライバシーポリシー | Grace — PATISSERIE',
  description: '株式会社Grace Foodsのプライバシーポリシー。',
}

// プライバシーポリシーの条文データ
const ARTICLES = [
  {
    title: '第1条（個人情報の定義）',
    content: `本ポリシーにおいて「個人情報」とは、個人情報保護法に定める個人情報を指し、氏名、住所、電話番号、メールアドレス、その他特定の個人を識別できる情報をいいます。`,
  },
  {
    title: '第2条（個人情報の収集方法）',
    content: `当社は、お客様が以下の場合に個人情報を取得することがあります。

・当サイトのお問い合わせフォームからご連絡いただいた場合
・オンラインストアにてご注文いただいた場合
・メールマガジンに登録いただいた場合
・各種イベント・キャンペーンにご参加いただいた場合`,
  },
  {
    title: '第3条（個人情報の利用目的）',
    content: `当社が収集した個人情報は、以下の目的に利用します。

・ご注文商品の発送および関連連絡
・お問い合わせへの回答
・新商品・サービス情報のご案内（ご同意いただいた場合）
・法令遵守および当社権利の保護`,
  },
  {
    title: '第4条（個人情報の第三者への提供）',
    content: `当社は、以下の場合を除き、お客様の個人情報を第三者に提供・開示しません。

・お客様の同意がある場合
・法令に基づく開示が求められる場合
・人の生命、身体または財産の保護のために必要な場合
・業務委託先への提供（守秘義務を課した上で必要最小限の範囲に限ります）`,
  },
  {
    title: '第5条（個人情報の管理）',
    content: `当社は、収集した個人情報を適切に管理し、漏洩・紛失・改ざんの防止に努めます。不要となった個人情報は速やかに安全な方法で消去します。`,
  },
  {
    title: '第6条（Cookieの使用について）',
    content: `当サイトでは、ユーザー体験の向上および利用状況の分析のためにCookieを使用することがあります。ブラウザの設定によりCookieを無効にすることができますが、一部のサービスが利用できなくなる場合があります。

また、Google Analytics等のアクセス解析ツールを使用しており、これらのツールはCookieを通じて匿名の利用データを収集します。収集されたデータは個人を特定するものではありません。`,
  },
  {
    title: '第7条（個人情報の開示・訂正・削除）',
    content: `お客様は、当社が保有するご自身の個人情報について、開示・訂正・削除を請求する権利を有します。請求される場合は、下記お問い合わせ窓口までご連絡ください。本人確認の上、合理的な期間内に対応いたします。`,
  },
  {
    title: '第8条（お問い合わせ窓口）',
    content: `個人情報の取り扱いに関するお問い合わせは、以下にご連絡ください。

事業者名：株式会社Grace Foods
担当者：代表取締役（公開前に実名記載）
メール：info@grace-patisserie.jp
受付時間：9:30〜19:30`,
  },
  {
    title: '第9条（プライバシーポリシーの改訂）',
    content: `当社は、法令の改正や事業内容の変更に応じて、本ポリシーを改訂することがあります。改訂後のポリシーは、当サイト上に掲載した時点より効力を生じるものとします。`,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        {/* ─── ページヘッダー ─── */}
        <section className="bg-grace-bg-dark section-padding">
          <div className="container-content text-center">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-6">LEGAL</p>
            <h1 className="font-cormorant italic text-5xl md:text-7xl text-grace-offwhite leading-none mb-8">
              Privacy Policy
            </h1>
            <p className="font-noto-serif text-base text-grace-stone">プライバシーポリシー</p>
            <div className="w-8 h-px bg-grace-gold mx-auto mt-8" />
          </div>
        </section>

        {/* ─── 本文 ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            <div className="max-w-article mx-auto">
              {/* イントロ */}
              <div className="mb-12 pb-8 border-b border-grace-line">
                <p className="font-noto-serif text-base text-grace-text-secondary leading-loose">
                  株式会社Grace Foods（以下「当社」）は、当サイト（grace-patisserie.jp）およびオンラインストアの運営において、
                  お客様の個人情報の保護を重要な責務と認識し、以下のとおりプライバシーポリシーを定めます。
                </p>
                <p className="font-noto-serif text-sm text-grace-text-tertiary mt-4">
                  制定日：2026年10月1日
                </p>
              </div>

              {/* 条文 */}
              <div className="space-y-10">
                {ARTICLES.map((article) => (
                  <div key={article.title}>
                    <h2 className="font-noto-serif text-base text-grace-brown mb-4">
                      {article.title}
                    </h2>
                    <div className="font-noto-serif text-base text-grace-text-secondary leading-loose whitespace-pre-line">
                      {article.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* 制定情報 */}
              <div className="mt-16 pt-8 border-t border-grace-line text-right">
                <p className="font-noto-serif text-sm text-grace-text-tertiary">
                  制定：2026年10月1日<br />
                  株式会社Grace Foods
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
