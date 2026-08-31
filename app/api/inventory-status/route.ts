// TOPページ（クライアントコンポーネント）からの在庫状態取得用エンドポイント。
// SQUARE_ACCESS_TOKENをブラウザに露出させないため、Square APIへのアクセスは必ずこのサーバー側経由にする。
//
// 使い方: GET /api/inventory-status?names=商品名1,商品名2,...
// 返り値: { "商品名1": "in_stock" | "sold_out", ... }（未マッチの商品名はキー自体が含まれない）

import { NextRequest, NextResponse } from 'next/server'
import { getInventoryStatusByNames } from '@/lib/square/inventory'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const namesParam = request.nextUrl.searchParams.get('names') ?? ''
  const names = namesParam
    .split(',')
    .map((n) => n.trim())
    .filter(Boolean)

  const statusMap = await getInventoryStatusByNames(names)

  return NextResponse.json(Object.fromEntries(statusMap))
}
