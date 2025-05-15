import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDB()

    const { slug } = await params

    const site = await Site.findOne({ slug })
    if (!site) {
      return NextResponse.json({ erro: 'Site não encontrado.' }, { status: 404 })
    }

    const html = site.configuracoes?.html ?? ''
    return NextResponse.json({ html }, { status: 200 })
  } catch (error) {
    console.error('Erro na API /api/site/slug/[slug]:', error)
    return NextResponse.json({ erro: 'Erro interno.' }, { status: 500 })
  }
}
