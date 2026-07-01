# Grace Website

パティスリー **Grace**（愛知・春日井／2026年秋頃オープン）のコーポレートサイト。

- 本番: https://www.grace-patisserie.jp
- デザイン: cinematic-b（時間フェーズで配色が変化するシネマティックデザイン）

## 技術スタック

- **Next.js 14**（App Router）
- **TypeScript**
- **Tailwind CSS**（デザイントークンは `tailwind.config.ts` + `styles/globals.css` が正本）
- **Vercel**（ホスティング・自動デプロイ）
- **Notion API**（Journal / News / Products などのコンテンツ管理）
- Resend（メール送信）/ Square（メール登録→顧客作成）/ reCAPTCHA v3

## ローカル開発

```bash
# 1. 依存インストール
npm ci

# 2. 環境変数を用意（テンプレートをコピーして値を設定）
cp .env.example .env.local
#   → .env.local に各キーの値を入力（詳細は .env.example のコメント参照）

# 3. 開発サーバー起動（http://localhost:3000）
npm run dev

# 本番ビルド / 型チェック / Lint
npm run build       # next build
npm run typecheck   # tsc --noEmit（エラー0が正常）
npm run lint        # next lint
```

## ディレクトリ構成（要点）

```
app/                 App Router
  page.tsx           TOP（cinematic-b・自己完結型 'use client'・時間フェーズ連動）
  concept/ contact/ gift/ journal/ news/ shop/ sweets/ privacy/ terms/
  api/               contact / subscribe / revalidate / journal/latest
components/
  layout/            Header / Footer / MobileMenu
  ui/                Button / Section / Tag
  forms/             ContactForm / SubscribeForm
lib/
  notion/            client(DB_IDS) / journal / news / products / types
  hooks/             usePhase（時刻→朝昼夕夜フェーズ）/ useRise
  utils/             cn / date
styles/globals.css   CSS変数・時間フェーズ・アニメーション
tailwind.config.ts   デザイントークン正本（色・フォント・keyframes・spacing）
public/              logo / photos / icons
.github/workflows/revalidate.yml   ISR revalidate（5分cron）
```

デザイントークンの一覧は別途スタイルガイド（`Grace_HP_スタイルガイド_v1.html`）を参照。乖離時はコード（`tailwind.config.ts` + `styles/globals.css`）が正。

## Notion 連携

- コンテンツ（Journal / News / Products）は Notion DB から取得。DB ID は環境変数（`.env.example` 参照）。
- 主なプロパティ（日本語名）: `タイトル` / `カテゴリ` / `アイキャッチ` / `サマリー` / `公開日` / `ステータス` / `作者` / `slug`
- 公開判定: `ステータス == '公開中'` のレコードのみ表示。

## デプロイ & ISR

- `main` への push/マージで **Vercel が本番を自動デプロイ**。
- Notion 更新の反映は **ISR revalidate**（`.github/workflows/revalidate.yml`・**5分間隔 cron**）が `${SITE_URL}/api/revalidate?secret=${REVALIDATE_SECRET}` を POST して行う（GitHub Secrets: `SITE_URL`, `REVALIDATE_SECRET`）。

## 厳守事項

- **本番デプロイ前に、必ず PR のプレビュー環境で代表（河村）確認を取る。** 無確認の本番反映は禁止。
- HP上の開業表記は **「2026年秋頃」**（具体日は内部管理用・対外表記しない）。
- 認証情報・APIキーは平文コミット禁止（`.env*` は `.gitignore` で除外済み。値は `.env.local` / Vercel env / GitHub Secrets へ）。
- `git push --force` は原則禁止（公開PRブランチの履歴を壊さない）。
