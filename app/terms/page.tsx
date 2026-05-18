// 特定商取引法表記ページ — 静的コンテンツ
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const revalidate = 86400

export const metadata: Metadata = {
  title: '特定商取引法表記 | Grace — PATISSERIE',
  description: '株式会社Grace Foods 特定商取引法に基づく表記。',
}

// 特定商取引法の表示項目
const ITEMS = [
  { label: '販売業者',         value: '株式会社Grace Foods' },
  { label: '運営責任者',       value: '河村 大輔' },
  { label: '所在地',           value: '〒486-0844 愛知県春日井市（詳細住所は開業時に公開予定）' },
  { label: '電話番号',         value: 'お問い合わせフォームよりご連絡ください（電話対応時間：9:30〜18:00、火曜定休）' },
  { label: 'メールアドレス',   value: 'info@grace-patisserie.jp' },
  { label: 'ウェブサイト',     value: 'https://grace-patisserie.jp' },
  {
    label: '販売価格',
    value: '各商品ページに税込価格を表示しています。',
  },
  {
    label: '商品代金以外の費用',
    value: '送料：全国一律（商品・数量により異なります。オンラインストアのカート画面にてご確認ください）\nその他：振込手数料はお客様のご負担となります。',
  },
  {
    label: '代金のお支払い方法',
    value: 'クレジットカード決済（Visa / Mastercard / JCB / American Express）\n電子マネー決済（PayPay / LINE Pay 等）\n店頭現金払い（店舗のみ）',
  },
  {
    label: 'お支払い時期',
    value: 'ご注文確認後、決済画面にてお支払いいただきます。',
  },
  {
    label: '商品の引き渡し時期',
    value: '通常、ご注文確認後3〜5営業日以内に発送いたします（繁忙期・焼き菓子以外の一部商品は異なる場合があります）。',
  },
  {
    label: '返品・交換について',
    value: '食品の性質上、開封後の返品・交換はお受けできません。\n商品に不備・破損があった場合は、お受け取り後3日以内にご連絡ください。写真確認の上、代品または返金にて対応いたします。\nお客様都合による返品はお受けできません。',
  },
  {
    label: '販売数量の制限',
    value: '一部の商品は販売数量を制限しております。品切れの際はご容赦ください。',
  },
  {
    label: '賞味期限・消費期限',
    value: '各商品ページをご参照ください。生菓子は製造日を含め3〜5日程度が目安です。',
  },
  {
    label: 'アレルギー情報',
    value: '各商品ページにアレルゲン情報を記載しています。アレルギーをお持ちのお客様は必ずご確認ください。製造工場では、小麦・卵・乳・ナッツ類等を使用した製品も製造しています。',
  },
]

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        {/* ─── ページヘッダー ─── */}
        <section className="bg-grace-bg-dark section-padding">
          <div className="container-content text-center">
            <p className="font-noto-sans text-[10px] tracking-widest text-grace-gold mb-6">LEGAL</p>
            <h1 className="font-cormorant italic text-4xl md:text-6xl text-grace-offwhite leading-tight mb-6">
              特定商取引法に基づく<br className="hidden md:block" />表記
            </h1>
            <div className="w-8 h-px bg-grace-gold mx-auto" />
          </div>
        </section>

        {/* ─── 本文 ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            <div className="max-w-article mx-auto">
              {/* イントロ */}
              <p className="font-noto-serif text-sm text-grace-text-secondary leading-loose mb-10 pb-8 border-b border-grace-line">
                特定商取引に関する法律第11条（通信販売についての広告）に基づき、以下の通り表示いたします。
              </p>

              {/* 表示項目 */}
              <dl className="space-y-0 divide-y divide-grace-line">
                {ITEMS.map(({ label, value }) => (
                  <div key={label} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-5">
                    <dt className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary md:pt-0.5 flex-shrink-0">
                      {label}
                    </dt>
                    <dd className="font-noto-serif text-sm text-grace-text-secondary leading-relaxed whitespace-pre-line">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* 備考 */}
              <div className="mt-12 pt-8 border-t border-grace-line">
                <p className="font-noto-serif text-xs text-grace-text-tertiary leading-loose">
                  ※ 上記の内容は予告なく変更される場合があります。最新情報は本ページをご確認ください。<br />
                  ※ 事業者情報の詳細（電話番号・住所等）は、開業後に更新いたします。
                </p>
                <p className="font-noto-serif text-xs text-grace-text-tertiary mt-4 text-right">
                  最終更新：2026年10月1日<br />
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
