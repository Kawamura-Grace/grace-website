// プライバシーポリシーページ — 静的コンテンツ
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { buildPageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildPageMetadata({
  path: '/privacy',
  title: 'プライバシーポリシー | Grace PÂTISSERIE',
  description: '株式会社Grace Foodsのプライバシーポリシー。',
})

// プライバシーポリシーの条文データ
// 文言は legal-agent 確定版「Grace_プライバシーポリシー_v3_20260921」（doc_id 1u-GSJZDdI4VbULHB0TwA3902sZy0IlWLnwZCxBFGLs0）の公開本文の原文（2026-09-21決裁）
const INTRO = '株式会社Grace Foods（以下「当社」といいます）は、当社が運営するオンラインショップ（以下「本サービス」といいます）における、お客様の個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。'

const ARTICLES = [
  {
    title: '第1条（事業者情報）',
    content: `・事業者名：株式会社Grace Foods
・本店所在地：愛知県春日井市前並町一丁目13番地17
・代表者：代表取締役 河村大輔
・お問い合わせ窓口：info@grace-foods.com`,
  },
  {
    title: '第2条（取得する個人情報）',
    content: `当社は、本サービスの提供にあたり、以下の個人情報を取得します。

1. 氏名、住所、電話番号、メールアドレス
2. 生年月日、性別（会員登録時に任意で取得する場合）
3. 決済情報（クレジットカード情報は決済代行会社が取得・管理し、当社は保持しません。決済代行会社：Square株式会社〔東京都港区〕）
4. 注文履歴、購入商品情報
5. お問い合わせ内容（お問い合わせフォーム・メール・電話でいただいた内容）
6. アクセスログ、Cookie、端末情報等（第7条に定めるとおり）
7. 配送に関する情報（宛先情報、不在連絡票の履歴等、配送事業者から提供される情報を含む）
8. ホールケーキ等のご予約に際してお申し出いただくアレルギー情報（安全な製造・お渡しのため取得します）`,
  },
  {
    title: '第3条（個人情報を取得する方法）',
    content: `当社は、次の方法により個人情報を取得します。

1. 本サービスの会員登録フォーム、注文フォーム、お問い合わせフォームへの入力
2. Cookie等の技術を用いた自動取得（第7条参照）
3. 配送事業者・決済代行会社等、業務委託先からの提供`,
  },
  {
    title: '第4条（利用目的）',
    content: `当社は、取得した個人情報を以下の目的で利用します。

1. 商品の受注、製造、発送、代金決済のため
2. 商品の配送状況に関するご連絡（不在連絡、再配達調整を含む）のため
3. アレルゲンを含む商品の誤配合・誤提供を防止し安全に製造・お渡しするため、およびアレルゲン情報・食物アレルギーに関するお問い合わせへの対応のため
4. お客様からのお問い合わせ、アフターサービス対応のため
5. 新商品・キャンペーン等の情報のご案内のため（お客様が配信を希望された場合に限ります）
6. 利用規約に違反する行為への対応、不正注文の防止のため
7. 本サービスの利用状況の分析、品質改善のため
8. 個人を特定できない形に統計処理した上でのマーケティング分析のため
9. 法令に基づく対応（食品衛生法・景品表示法等の法令上必要な範囲での記録保持を含む）のため`,
  },
  {
    title: '第5条（第三者提供）',
    content: `当社は、次の場合を除き、あらかじめお客様の同意を得ることなく、第三者に個人情報を提供しません。

1. 法令に基づく場合
2. 人の生命、身体または財産の保護のために必要がある場合であって、お客様の同意を得ることが困難な場合
3. 商品の配送のために配送事業者に対して必要な範囲で情報を提供する場合
4. 決済処理のために決済代行会社に対して必要な範囲で情報を提供する場合
5. 事業の承継に伴って個人情報が提供される場合
6. その他個人情報保護法その他の法令で認められる場合`,
  },
  {
    title: '第6条（業務委託）',
    content: `当社は、利用目的の達成に必要な範囲内において、個人情報の取扱いの全部または一部を外部に委託することがあります。委託する場合は、委託先に対して必要かつ適切な監督を行います。想定される委託先は次のとおりです。

・決済代行会社（クレジットカード情報の取扱い）：Square株式会社
・配送事業者（宅配便・クール便配送業者）
・ECサイトの構築・保守を行うシステムベンダー：Square株式会社（Square Online）
・メールマガジン配信等：Square株式会社（Squareマーケティング機能）`,
  },
  {
    title: '第7条（Cookie等の外部送信・アクセス解析ツールについて）',
    content: `本サービスでは、お客様の利便性向上、サイト利用状況の分析、広告配信等の目的で、Cookieおよびこれに類する技術（ウェブビーコン等）を使用する場合があります。これらの技術により取得される情報には、お客様のブラウザの種類、アクセス日時、閲覧ページ等が含まれます。

1. 電気通信事業法上の外部送信規律に基づき、当社が本サービスにおいて外部の事業者に送信するCookie等の情報は次のとおりです。Google Analytics（GA4）（サイト利用状況の分析目的。送信先：Google LLC）、Metaピクセル（広告配信の効果測定目的。送信先：Meta Platforms, Inc.）。なお、Square Online内蔵の分析機能も利用しますが、これは外部の第三者への送信を伴わないため本項の列挙対象には含めていません
2. お客様はブラウザの設定によりCookieの受け取りを拒否することができますが、その場合、本サービスの一部機能がご利用いただけなくなることがあります
3. アクセス解析ツールにより取得される情報は、個人を特定するものではなく、各ツール提供事業者のプライバシーポリシーに従い管理されます`,
  },
  {
    title: '第8条（安全管理措置）',
    content: `当社は、取得した個人情報の漏えい、滅失またはき損の防止その他の個人情報の安全管理のために、必要かつ適切な措置を講じます。特にクレジットカード情報については自社で保持せず決済代行会社に委ねることで非保持化を図ります。`,
  },
  {
    title: '第9条（保有個人データの開示等の請求）',
    content: `お客様は、当社に対し、個人情報保護法の定めに基づき、保有個人データの開示、訂正、追加、削除、利用停止、消去および第三者提供の停止（以下「開示等」といいます）を請求することができます。開示等のご請求は、下記お問い合わせ窓口までご連絡ください。当社所定の方法により、ご本人確認の上、法令に従い対応します。

本ポリシーおよび個人情報の取扱いに関するご意見・苦情も、下記お問い合わせ窓口で承ります。

・お問い合わせ窓口：info@grace-foods.com`,
  },
  {
    title: '第10条（未成年者の個人情報）',
    content: `未成年のお客様が本サービスを利用し個人情報を提供する場合は、あらかじめ親権者等法定代理人の同意を得るものとします。`,
  },
  {
    title: '第11条（本ポリシーの変更）',
    content: `当社は、法令の改正や事業内容の変更等に応じて、本ポリシーを変更することがあります。変更後のプライバシーポリシーは、本サービス上に掲示した時点から効力を生じるものとします。重要な変更を行う場合は、本サービス上で分かりやすく告知します。`,
  },
  {
    title: '第12条（お問い合わせ窓口）',
    content: `本ポリシーに関するお問い合わせは、下記までご連絡ください。

・株式会社Grace Foods
・本店所在地：愛知県春日井市前並町一丁目13番地17
・お問い合わせ窓口：info@grace-foods.com`,
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
            <p className="font-noto-serif text-lg text-grace-stone">プライバシーポリシー</p>
            <div className="w-8 h-px bg-grace-gold mx-auto mt-8" />
          </div>
        </section>

        {/* ─── 本文 ─── */}
        <section className="section-padding bg-grace-offwhite">
          <div className="container-content">
            <div className="max-w-article mx-auto">
              {/* イントロ */}
              <div className="mb-12 pb-8 border-b border-grace-line">
                <p className="font-noto-serif text-lg text-grace-text-secondary leading-loose">
                  {INTRO}
                </p>
              </div>

              {/* 条文 */}
              <div className="space-y-10">
                {ARTICLES.map((article) => (
                  <div key={article.title}>
                    <h2 className="font-noto-serif text-lg text-grace-brown mb-4">
                      {article.title}
                    </h2>
                    <div className="font-noto-serif text-lg text-grace-text-secondary leading-loose whitespace-pre-line">
                      {article.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
