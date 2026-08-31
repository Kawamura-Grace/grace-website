// 採用求人データ（正本）
// 求人の増減・内容変更はこのファイルを編集する。
// app/recruit/page.tsx がこのデータを (1) 表示用カード (2) JobPosting JSON-LD の両方に使う。
// Airwork（外部応募ページ）と数値・文面を揃えること。

// 共通の採用組織情報（schema.org Organization）
export const HIRING_ORGANIZATION = {
  '@type': 'Organization',
  name: '株式会社Grace Foods',
  sameAs: 'https://grace-patisserie.jp',
  logo: 'https://grace-patisserie.jp/logo-horizontal.png',
} as const

// 共通の勤務地（schema.org Place）
export const JOB_LOCATION = {
  '@type': 'Place',
  address: {
    '@type': 'PostalAddress',
    postalCode: '486-0846',
    addressRegion: '愛知県',
    addressLocality: '春日井市',
    streetAddress: '朝宮町1-2-6',
    addressCountry: 'JP',
  },
} as const

// 共通の掲載日・有効期限
const DATE_POSTED = '2026-07-01'
const VALID_THROUGH = '2026-12-31'

// 給与の型（時給 or 月給）
export interface BaseSalary {
  minValue: number
  maxValue: number
  unitText: 'HOUR' | 'MONTH'
}

// 求人1件の型
export interface JobListing {
  // 表示用ラベル（英語サブ・日本語）
  labelEn: string
  // 雇用形態の日本語表示
  employmentLabelJa: string
  title: string
  // schema.org employmentType（PART_TIME / CONTRACTOR / FULL_TIME 等）
  employmentType: string
  // JSON-LD 用 description（HTML可）
  description: string
  // カード表示用の要約文（プレーンテキスト）
  summary: string
  baseSalary: BaseSalary
  // Airwork の求人ID（identifier value）
  identifier: string
  // Airwork 応募ページURL
  applyUrl: string
}

// 求人データ（表示順）
export const JOB_LISTINGS: JobListing[] = [
  {
    labelEn: 'Store Manager Candidate',
    employmentLabelJa: '契約社員（正社員登用あり）',
    title: 'パティスリー店舗マネージャー候補',
    employmentType: 'CONTRACTOR',
    description:
      '<p>2026年秋、愛知・春日井にオープンするパティスリー「Grace」の店舗マネージャー候補を募集します。製造・接客・店舗運営全般をリードする責任者候補のポジションです。</p>' +
      '<p>スタッフの育成やシフト管理、品質・衛生管理、売上づくりまで、店づくりの中心を担っていただきます。契約社員としてスタートし、正社員登用の道があります。</p>',
    summary:
      '製造・接客・店舗運営全般をリードする責任者候補。スタッフ育成、品質・衛生管理、売上づくりまで店づくりの中心を担います。契約社員スタート・正社員登用あり。',
    baseSalary: { minValue: 263000, maxValue: 270000, unitText: 'MONTH' },
    identifier: '11631962',
    applyUrl: 'https://arwrk.net/recruit/grace-patisserie/11631962/',
  },
  {
    labelEn: 'Production & Sales Staff',
    employmentLabelJa: '契約社員（正社員登用あり）',
    title: 'パティスリーの製造・販売スタッフ',
    employmentType: 'CONTRACTOR',
    description:
      '<p>2026年秋オープンのパティスリー「Grace」で、お菓子の製造と販売の両方を担う製販一体スタイルのスタッフを募集します。</p>' +
      '<p>焼き菓子・生菓子の仕込みから仕上げ、店頭での接客・ラッピングまで、幅広く経験できます。契約社員としてスタートし、正社員登用の道があります。未経験の方も歓迎します。</p>',
    summary:
      '製造と販売の両方を担う製販一体スタイル。焼き菓子・生菓子の仕込みから接客・ラッピングまで幅広く経験できます。契約社員スタート・正社員登用あり。未経験歓迎。',
    baseSalary: { minValue: 205000, maxValue: 212000, unitText: 'MONTH' },
    identifier: '11633842',
    applyUrl: 'https://arwrk.net/recruit/grace-patisserie/11633842/',
  },
  {
    labelEn: 'Production & Sales Staff (Part-time)',
    employmentLabelJa: 'パート・アルバイト',
    title: 'パティスリーの製造・販売スタッフ',
    employmentType: 'PART_TIME',
    description:
      '<p>2026年秋オープンのパティスリー「Grace」で、お菓子の製造と販売を担うパート・アルバイトスタッフを募集します。</p>' +
      '<p>焼き菓子の仕込みや店頭での接客・ラッピングなど、できることから少しずつお任せします。製販一体のスタイルで、お菓子づくりと接客の両方に携われます。未経験の方も歓迎します。</p>',
    summary:
      'お菓子の製造と販売を担うパート・アルバイト。焼き菓子の仕込みや店頭接客など、できることから少しずつ。未経験の方も歓迎します。',
    baseSalary: { minValue: 1200, maxValue: 1350, unitText: 'HOUR' },
    identifier: '11635423',
    applyUrl: 'https://arwrk.net/recruit/grace-patisserie/11635423/',
  },
]

// JobPosting の JSON-LD オブジェクトを1件生成する
function toJobPosting(job: JobListing) {
  return {
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: DATE_POSTED,
    validThrough: VALID_THROUGH,
    employmentType: job.employmentType,
    hiringOrganization: HIRING_ORGANIZATION,
    jobLocation: JOB_LOCATION,
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'JPY',
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.baseSalary.minValue,
        maxValue: job.baseSalary.maxValue,
        unitText: job.baseSalary.unitText,
      },
    },
    identifier: {
      '@type': 'PropertyValue',
      name: 'Grace Foods',
      value: job.identifier,
    },
    directApply: false,
  }
}

// 全求人を @graph 配列にまとめた JSON-LD 文字列を返す
export function buildJobPostingJsonLd(): string {
  const graph = JOB_LISTINGS.map(toJobPosting)
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  })
}

// 給与の表示用フォーマット（例: 月給 205,000〜212,000円 / 時給 1,200〜1,350円）
export function formatSalary(salary: BaseSalary): string {
  const unit = salary.unitText === 'HOUR' ? '時給' : '月給'
  const suffix = salary.unitText === 'HOUR' ? '円' : '円'
  const min = salary.minValue.toLocaleString('ja-JP')
  const max = salary.maxValue.toLocaleString('ja-JP')
  return `${unit} ${min}〜${max}${suffix}`
}
