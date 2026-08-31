// Square在庫連携：商品名からSquareカタログの在庫状態（在庫あり/完売）を取得する。
//
// 設計正本: Grace_顧客窓口設計_#8_W3詳細設計_v1.md §6「在庫表示・取り置きの実装仕様」
// - 開業時は「在庫あり／完売」の二値表示のみ（個数までの表示はPhase 2判断・今回は実装しない）
// - 店頭・EC・取り置きはSquare側で在庫1本を共有する設計のため、HP側はSquareの
//   InventoryCounts（IN_STOCK state・quantity>0か否か）を見るだけでよい
//
// 【重要な設計判断・制約】
// Notion商品マスタDBにSquareカタログIDを持たせるスキーマ変更は行わず、
// 「Notion商品名 === Squareカタログのアイテム名」の完全一致でひも付ける（名前一致方式）。
// 理由: 本番DBのスキーマ変更は事前バックアップ・確認が要る重い操作のため、まずは
// スキーマ変更なしで動く最小実装とする。デメリットは商品名の変更・表記ゆれで
// 自動的に連携が外れること（＝安全側に倒れる。誤った在庫表示にはならない）。
//
// Square未設定（環境変数なし）・API障害時は必ず空のMapを返す（例外を投げない）。
// 呼び出し側は「該当なし＝バッジを表示しない」で処理し、ページを絶対に壊さないこと。

export type InventoryStatus = 'in_stock' | 'sold_out'

// 2026-08-31 Square公式リファレンス（developer.squareup.com）で一次確認済みのバージョン
const SQUARE_VERSION = '2026-08-19'

interface SquareEnv {
  accessToken: string
  locationId: string
  baseUrl: string
}

function getSquareEnv(): SquareEnv | null {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN
  const locationId = process.env.SQUARE_LOCATION_ID
  if (!accessToken || !locationId) return null
  const isSandbox = process.env.SQUARE_ENVIRONMENT === 'sandbox'
  const baseUrl = isSandbox
    ? 'https://connect.squareupsandbox.com'
    : 'https://connect.squareup.com'
  return { accessToken, locationId, baseUrl }
}

// ─── Square APIレスポンス型（必要なフィールドのみ最小定義） ───

interface SquareCatalogItemVariation {
  id: string
}

interface SquareCatalogItemData {
  name?: string
  variations?: SquareCatalogItemVariation[]
}

interface SquareCatalogObject {
  type: string
  id: string
  item_data?: SquareCatalogItemData
}

interface SquareListCatalogResponse {
  objects?: SquareCatalogObject[]
  cursor?: string
}

interface SquareInventoryCount {
  catalog_object_id?: string
  quantity?: string
  state?: string
}

interface SquareBatchRetrieveInventoryCountsResponse {
  counts?: SquareInventoryCount[]
  cursor?: string
}

// ─── カタログ取得（アイテム名 → バリエーションID） ───
// GET /v2/catalog/list?types=ITEM をカーソルが尽きるまで取得（1商品1バリエーション想定で先頭のみ使用）

async function fetchCatalogNameToVariationId(env: SquareEnv): Promise<Map<string, string>> {
  const map = new Map<string, string>()
  let cursor: string | undefined

  do {
    const url = new URL('/v2/catalog/list', env.baseUrl)
    url.searchParams.set('types', 'ITEM')
    if (cursor) url.searchParams.set('cursor', cursor)

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${env.accessToken}`,
        'Square-Version': SQUARE_VERSION,
      },
      // カタログ構成の変更頻度は低いため60秒キャッシュ（Webhook受信時はrevalidatePathで即時更新）
      next: { revalidate: 60 },
    })
    if (!res.ok) {
      throw new Error(`Square /v2/catalog/list failed: ${res.status}`)
    }
    const json = (await res.json()) as SquareListCatalogResponse
    for (const obj of json.objects ?? []) {
      const name = obj.item_data?.name?.trim()
      const variationId = obj.item_data?.variations?.[0]?.id
      if (name && variationId) map.set(name, variationId)
    }
    cursor = json.cursor
  } while (cursor)

  return map
}

// ─── 在庫数取得（バリエーションID → 数量） ───
// POST /v2/inventory/counts/batch-retrieve（IN_STOCK stateのみ、対象ロケーション限定）

async function fetchInventoryCounts(
  env: SquareEnv,
  variationIds: string[]
): Promise<Map<string, number>> {
  const counts = new Map<string, number>()
  if (variationIds.length === 0) return counts

  // Grace規模（数十SKU）では1回（上限1000件/回）で足りる想定
  const res = await fetch(`${env.baseUrl}/v2/inventory/counts/batch-retrieve`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.accessToken}`,
      'Square-Version': SQUARE_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      catalog_object_ids: variationIds,
      location_ids: [env.locationId],
      states: ['IN_STOCK'],
    }),
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    throw new Error(`Square /v2/inventory/counts/batch-retrieve failed: ${res.status}`)
  }
  const json = (await res.json()) as SquareBatchRetrieveInventoryCountsResponse
  for (const c of json.counts ?? []) {
    if (c.catalog_object_id) counts.set(c.catalog_object_id, Number(c.quantity ?? '0'))
  }
  return counts
}

// ─── 純粋関数（ネットワーク非依存・テスト容易） ───

/** 在庫数量から二値状態へ変換。IN_STOCKのレコードが無い商品はquantity未定義として扱う */
export function quantityToStatus(quantity: number | undefined): InventoryStatus {
  return quantity !== undefined && quantity > 0 ? 'in_stock' : 'sold_out'
}

/**
 * 商品名リスト・カタログ名→ID・ID→在庫数 の3つから 商品名→状態 のMapを組み立てる。
 * マッチしない商品名（カタログ未登録・在庫レコードなし）は結果に含めない＝呼び出し側は非表示にする。
 */
export function buildStatusMap(
  productNames: string[],
  nameToVariationId: Map<string, string>,
  variationIdToQuantity: Map<string, number>
): Map<string, InventoryStatus> {
  const result = new Map<string, InventoryStatus>()
  for (const rawName of productNames) {
    const name = rawName.trim()
    const variationId = nameToVariationId.get(name)
    if (!variationId) continue
    const quantity = variationIdToQuantity.get(variationId)
    if (quantity === undefined) continue
    result.set(rawName, quantityToStatus(quantity))
  }
  return result
}

// ─── 公開関数 ───

/**
 * 商品名リストを受け取り、Squareと連携できたものだけの Map<商品名, 状態> を返す。
 * Square未設定・API障害時は必ず空のMapを返す（例外を投げない・呼び出し側は表示しないだけでよい）。
 */
export async function getInventoryStatusByNames(
  productNames: string[]
): Promise<Map<string, InventoryStatus>> {
  const env = getSquareEnv()
  if (!env || productNames.length === 0) return new Map()

  try {
    const nameToVariationId = await fetchCatalogNameToVariationId(env)
    const variationIds = productNames
      .map((n) => nameToVariationId.get(n.trim()))
      .filter((id): id is string => Boolean(id))
    const variationIdToQuantity = await fetchInventoryCounts(env, variationIds)
    return buildStatusMap(productNames, nameToVariationId, variationIdToQuantity)
  } catch (err) {
    console.error('[square/inventory] 在庫取得に失敗。フォールバック（表示なし）で継続します:', err)
    return new Map()
  }
}
