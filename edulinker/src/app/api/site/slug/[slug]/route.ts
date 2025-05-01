import { gerarHtml } from '@/app/utils/gerarHtml'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'
import Template from '@/models/Template'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: Request,
    { params }: { params: { slug: string } }
  ) {
    try {
      await connectToDB()
  
      const site = await Site.findOne({ slug: params.slug })
  
      if (!site) {
        return NextResponse.json({ erro: 'Site não encontrado.' }, { status: 404 })
      }
  
      const html = site.configuracoes?.html || ''
       return NextResponse.json({ html }, { status: 200 })

  
      return NextResponse.json({ html }, { status: 200 })
    } catch (error) {
      console.error('Erro na API /api/site/slug/[slug]:', error)
      return NextResponse.json({ erro: 'Erro interno.' }, { status: 500 })
    }
  }
