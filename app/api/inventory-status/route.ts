// TOPページ（クライアントコンポーネント）からの在庫状態取得用エンドポイント。
// SQUARE_ACCESS_TOKENをブラウザに露出させないため、Square APIへのアクセスは必ずこのサーバー側経由にする。
//
// 使い方: GET /api/inventory-status?names=商品名1,商品名2,...
// 返り値: { "商品名1": "in_stock" | "sold_out", ... }（未マッチの商品名はキー自体が含まれない）

import { NextRequest, NextResponse } from 'next/server'
import { getInventoryStatusByNames } from '@/lib/square/inventory'

export const dynamic = 'force-dynamic'

// 長さはURLデコード後の文字列の長さ（UTF-16コード単位）で数える。
const MAX_NAMES_PARAM_LENGTH = 2048
const MAX_NAME_LENGTH = 100
const MAX_NAMES = 20

export async function GET(request: NextRequest) {
  const namesParam = request.nextUrl.searchParams.get('names') ?? ''
  if (namesParam.length > MAX_NAMES_PARAM_LENGTH) {
    console.warn('[inventory-status] MAX_NAMES_PARAM_LENGTH exceeded')
    return NextResponse.json({})
  }

  const names = namesParam
    .split(',')
    .map((n) => n.trim())
    .filter(Boolean)

  if (names.length > MAX_NAMES) {
    console.warn('[inventory-status] MAX_NAMES exceeded')
    return NextResponse.json({})
  }
  if (names.some((name) => name.length > MAX_NAME_LENGTH)) {
    console.warn('[inventory-status] MAX_NAME_LENGTH exceeded')
    return NextResponse.json({})
  }

  const statusMap = await getInventoryStatusByNames([...new Set(names)])

  return NextResponse.json(Object.fromEntries(statusMap))
}
