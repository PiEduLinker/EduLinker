import { NextResponse } from 'next/server'
import { connectToDB }     from '@/lib/mongodb'
import PageView            from '@/models/PageView'

export async function POST(req: Request) {
  const { slug, userAgent } = await req.json()
  if (!slug) {
    return NextResponse.json({ error: 'slug obrigatório' }, { status: 400 })
  }
  await connectToDB()
  await PageView.create({ slug, userAgent, createdAt: new Date() })
  return NextResponse.json({ ok: true }, { status: 201 })
}
