// 特定商取引法表記ページ — 静的コンテンツ
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { buildPageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildPageMetadata({
  path: '/terms',
  title: '特定商取引法表記 | Grace PÂTISSERIE',
  description: '株式会社Grace Foods 特定商取引法に基づく表記。',
})

// 特定商取引法の表示項目
// 文言は legal-agent 確定版「Grace_特定商取引法に基づく表記_v7_20260921」（doc_id 1YUWTFVJxfqiYGFOUEDMxOs9ihQUVhecs4HgKu3uGO9o）の表の原文
const ITEMS = [
  { label: '販売業者', value: '株式会社Grace Foods' },
  { label: '運営統括責任者', value: '河村 大輔' },
  { label: '本店所在地', value: '〒486-0903 愛知県春日井市前並町一丁目13番地17（登記上の本店所在地）' },
  { label: '商品発送拠点所在地', value: '〒486-0846 愛知県春日井市朝宮町一丁目2番地6（Grace店舗。本店所在地とは異なります）' },
  { label: '電話番号', value: 'ご請求をいただいた場合は、遅滞なく電子メールにて電話番号をご案内いたします。お問い合わせは info@grace-foods.com までご連絡ください。' },
  { label: 'メールアドレス', value: 'info@grace-foods.com' },
  { label: 'ウェブサイトURL', value: 'shop.grace-patisserie.jp（Square Online構築時に本稼働予定）' },
  { label: '販売価格', value: '各商品ページに表示する価格（消費税込み）。送料は別途表示（下記参照）' },
  { label: '商品代金以外の必要料金', value: '送料、消費税。上記以外の決済手数料等の請求はありません' },
  { label: '支払方法', value: 'クレジットカード（Visa／Mastercard／American Express／JCB／Diners Club／Discover）、Apple Pay、Google Pay' },
  { label: '支払時期', value: 'クレジットカード決済：ご注文確定時に与信確定（各カード会社の締め日・引落日に準じます）／Apple Pay・Google Pay：ご注文確定時に決済確定' },
  { label: '商品の引渡時期', value: '受注確定後3〜5営業日以内に発送予定。生菓子（要冷蔵・要冷凍商品）は製造の都合上、発送日を指定させていただく場合があります' },
  { label: '送料', value: '全国一律1,500円（クール便料金・消費税込み）。商品合計8,000円（税込）以上のご注文で送料無料' },
  { label: '返品・交換について（特約）', value: '食品の性質上、お客様のご都合による返品・交換はお受けできません。ただし、次のいずれかに該当する場合は、商品到着後7日以内にお問い合わせフォームよりご連絡ください。送料弊社負担にて良品との交換または返金にて対応します。(1) 注文と異なる商品が届いた場合（誤配送）(2) 商品に破損・品質不良があった場合（不良品）上記に該当しない返品・交換（お客様都合によるもの、開封後の商品、賞味期限切れによるもの等）はお受けできませんので、あらかじめご了承ください。' },
  { label: '申込みの有効期限', value: '予約商品・季節限定商品（クリスマス先行予約企画等）は、各商品ページに記載の申込期限によります。期限の定めがない商品は在庫がある限り随時受付します' },
  { label: '動作環境', value: '本ウェブサイトの閲覧には、最新のブラウザ環境（Google Chrome、Safari、Microsoft Edge等の最新版）を推奨します' },
  { label: '販売数量の制限', value: '商品によりお一人様の購入数量を制限する場合があります（各商品ページに記載）' },
  { label: '特別な販売条件', value: '生菓子は要冷蔵・要冷凍での配送となります。配送日当日の受け取りが困難な場合、商品の品質が損なわれるおそれがありますので、確実にお受け取りいただける日時をご指定ください。長期不在・受け取り拒否等により商品が返送された場合の再送料はお客様のご負担となります' },
  { label: 'アレルゲン表示', value: '各商品ページに、食品表示基準に基づく特定原材料等29品目（義務9品目＋推奨20品目。2026-04-01改正後の一括表示DBマスタに準拠）のアレルゲン情報を表示します。食物アレルギーをお持ちのお客様は、ご注文前に必ず各商品ページのアレルゲン表示をご確認ください。ご不明点は上記お問い合わせ窓口までご相談ください' },
  { label: '賞味期限', value: '各商品ページおよび商品に同梱の表示ラベルに記載します。お受け取り後は記載の保存方法（要冷蔵／要冷凍）に従い、できるだけ早くお召し上がりください' },
  { label: 'クーリング・オフの適用について', value: '本サイトでの販売は「通信販売」に該当し、特定商取引法上のクーリング・オフ（法定書面交付による無条件解除権）の対象外です。返品・交換については上記「返品・交換について（特約）」の定めによります' },
  { label: '個人情報の取扱い', value: '「プライバシーポリシー」をご参照ください' },
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
              <p className="font-noto-serif text-lg text-grace-text-secondary leading-loose mb-10 pb-8 border-b border-grace-line">
                特定商取引に関する法律（以下「特定商取引法」といいます）第11条に基づき、以下のとおり表示します。
              </p>

              {/* 表示項目 */}
              <dl className="space-y-0 divide-y divide-grace-line">
                {ITEMS.map(({ label, value }) => (
                  <div key={label} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-5">
                    <dt className="font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary md:pt-0.5 flex-shrink-0">
                      {label}
                    </dt>
                    <dd className="font-noto-serif text-lg text-grace-text-secondary leading-relaxed whitespace-pre-line">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
