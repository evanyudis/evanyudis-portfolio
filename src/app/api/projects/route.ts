import { NextResponse } from 'next/server'

export async function GET() {
  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/projects?select=slug,title,tags,year,cover_image,role,team,context,background,impact`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  )

  if (!res.ok) {
    const text = await res.text()
    return NextResponse.json({ error: text, status: res.status, url: SUPABASE_URL }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
