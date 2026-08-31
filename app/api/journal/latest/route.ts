import { getLatestJournalPosts } from '@/lib/notion/journal'
import { NextResponse } from 'next/server'

export const revalidate = 3600

export async function GET() {
  const posts = await getLatestJournalPosts(3).catch(() => [])
  return NextResponse.json({
    posts: posts.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
    }))
  })
}
