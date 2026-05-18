import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Notion更新をHPに反映するISR revalidateエンドポイント
// GitHub Actions cronとNotion webhookから呼ばれる
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  revalidatePath('/', 'layout');
  revalidatePath('/sweets', 'layout');
  revalidatePath('/journal', 'layout');
  revalidatePath('/news', 'layout');

  return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() });
}
