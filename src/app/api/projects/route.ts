import { NextResponse } from 'next/server'

export async function GET() {
  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/projects?select=slug,title,tags,year,role,team,context,background,impact,thumbnail_url`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  )

  if (!res.ok) {
    return NextResponse.json([], { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
