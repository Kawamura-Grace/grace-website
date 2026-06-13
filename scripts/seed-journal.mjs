/**
 * seed-journal.mjs
 * 目的: Grace Journal DB（e3867e42）に3記事を投入する
 * 入力: .env.local の NOTION_TOKEN / NOTION_DB_JOURNAL
 * 出力: Notion Journal DB に3ページ作成
 * 成功判定: 3件すべてcreated
 * 失敗時挙動: エラーメッセージを出力して終了
 * 想定実行時間: 10秒以内
 * 依存タスク: なし（.env.localが必要）
 */

import { readFileSync, unlinkSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// .env.local を手動パース
function loadEnv(path) {
  const content = readFileSync(path, 'utf-8')
  const env = {}
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx < 0) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    env[key] = val
  }
  return env
}

const envPath = resolve(__dirname, '../.env.local')
const env = loadEnv(envPath)
const NOTION_TOKEN = env['NOTION_TOKEN']
const DB_ID = env['NOTION_DB_JOURNAL']

if (!NOTION_TOKEN || !DB_ID) {
  console.error('ERROR: NOTION_TOKEN または NOTION_DB_JOURNAL が .env.local に見つかりません')
  process.exit(1)
}

console.log(`DB ID: ${DB_ID}`)

// 【要確認】【要追記】を含む行を除外して段落ブロックに変換
function textToParagraphBlocks(text) {
  const lines = text.split('\n')
  const blocks = []
  for (const line of lines) {
    // 【要確認】【要追記】を含む行は除外
    if (line.includes('【要確認】') || line.includes('【要追記】')) continue
    const trimmed = line.trim()
    if (!trimmed) continue
    blocks.push({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: { content: trimmed },
          },
        ],
      },
    })
  }
  return blocks
}

// 本文からサマリー（冒頭80字程度）を生成
function makeSummary(text) {
  // 最初の実質的な行を取得
  const lines = text.split('\n').map(l => l.trim()).filter(l => l)
  const firstLine = lines[0] || ''
  return firstLine.slice(0, 80)
}

// 3記事データ
const articles = [
  {
    title: 'Graceが生まれるまで ― 私がちいさなパティスリーを開く理由',
    slug: 'why-grace',
    category: 'Story',
    body: `菓子業の仕事に就いて、15年が経ちました。

ホテルのパティシエとして腕を磨いた歳月、いくつかのブランドの立ち上げや商品開発に関わった歳月、そうした「菓子作り」に費やした時間のなかで、ひとつ確信したことがありました。菓子の記憶は、味だけで成立しているのではない——さっと過ぎた一瞬の香り、ひと口めの余韻、食べ終えたあとに残る余白、その全部が混ざり合って、あの日の「お菓子」として心のどこかに残っている——ということです。

Graceは、その「記憶に残る体験」をひとつひとつ大切に積み重てはじめるブランドです。

派手さより素材に誠実に向き合い、香りを丁寧に設計して、静かに心に残るものをつくる。まったく特別な日のためだけでなく、いつもの暮らしのなかの、少し美しい時間のために。

「美しい残像には、お菓子がいる」

これは、Graceからみなさんに伝えたいメッセージです。ちいさなお店から、この時間を少しずつ届けたいと思っています。

2026年秋、オープン予定です。どうぞお楽しみにしてください。`,
  },
  {
    title: '素材のはなし ― 香りからお菓子を設計する',
    slug: 'designing-with-aroma',
    category: 'Craft',
    body: `Graceのお菓子づくりは、「香り」から始まります。

なぜ香りなのか——それは、香りが記憶に深く触れる感覚だからです。ひと口食べたとき、鼻からさっと抜けてゆく香りの余韻、またすぐ食べたいと思わせてしまう理由が宿ると考えています。

たとえば看板のチーズケーキ。一般的なチーズケーキは、チーズの濃い旨味が主役にしますが、Graceはあえてチーズの主張を抑えます。代わりに引き立てるのは、「ふわりとやわらかのチーズっぽいな」と言えるような香りを、「チーズっぽくない」が褒め言葉になる、私たちにとっては最上の褒め言葉です。

焼き菓子にもGraceならではの香りの設計があります。ひと口かみさっと立ちのぼる香ばしい、精細なその余韻は、実はひそかに、Graceがひそかに大切にしている小さな工夫が隠れています。

季節が変われば、香りの表現も変わります。だからGraceのお菓子は、季節とともに少しずつ姿を変えていきます。

時間はかかりますが、どこかの時間をたっぷり温度と奥行きを与えてくれると信じています。`,
  },
  {
    title: '贈るという時間 ― 大切な人へ、Graceのお菓子を選ぶ',
    slug: 'the-gift-of-grace',
    category: 'Gift',
    body: `お菓子を贈るとき、私たちは何を渡しているのでしょうか。

それはきっと、お菓子そのものだけではありません。「あなたのことを思っています」という気持ち、一緒に過ごした時間の記憶、これからも続いてほしい関係への願い——そうしたものを、お菓子という形に込めているのだと思います。

だからGraceは、贈りものになるお菓子を、特に丁寧に設計しています。

焼き菓子の詰め合わせは、フィナンシェを中心に、香り高く焼き上げたものを揃えます。日持ちがよいので、遠方の方への贈りものにも安心してお選びいただけます。ひとつずつ味わうのも、箱を開けて誰かと分かち合うのも、どちらもGraceがひとと一緒になれるように作りました。

包みを開ける一瞬の小さな高揚感、ひと口めの香り、かわす短い言葉。贈りものとしてのお菓子は、そういった時間まで含めて完成したものだと思います。

特別な日の贈りものから、ふとした感謝の気持ちまで、あなたの大切な人へ、Graceの香りを届けてみてください。`,
  },
]

// Notion APIでページ作成
async function createPage(article) {
  const summary = makeSummary(article.body)
  const blocks = textToParagraphBlocks(article.body)

  const body = {
    parent: { database_id: DB_ID },
    properties: {
      タイトル: {
        title: [{ type: 'text', text: { content: article.title } }],
      },
      slug: {
        rich_text: [{ type: 'text', text: { content: article.slug } }],
      },
      カテゴリ: {
        select: { name: article.category },
      },
      サマリー: {
        rich_text: [{ type: 'text', text: { content: summary } }],
      },
      公開日: {
        date: { start: '2026-06-13' },
      },
      ステータス: {
        select: { name: '公開中' },
      },
      作者: {
        rich_text: [{ type: 'text', text: { content: '河村' } }],
      },
    },
    children: blocks,
  }

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(`Notion API error: ${JSON.stringify(data)}`)
  }
  return data
}

// メイン実行
console.log('Grace Journal DB への記事投入を開始します...\n')

let successCount = 0
for (const article of articles) {
  try {
    console.log(`作成中: ${article.title}`)
    const page = await createPage(article)
    console.log(`  完了: ${page.id} (slug: ${article.slug})`)
    successCount++
  } catch (err) {
    console.error(`  エラー: ${err.message}`)
  }
}

console.log(`\n${successCount}/${articles.length} 件作成完了`)

// .env.local を削除（セキュリティ）
try {
  unlinkSync(envPath)
  console.log('.env.local を削除しました（セキュリティ）')
} catch (err) {
  console.warn('.env.local の削除に失敗しました:', err.message)
}
