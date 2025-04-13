import { NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'
import Template from '@/models/Template'

export async function POST(req: Request) {
  try {
    await connectToDB()
    const body = await req.json()

    const { usuarioId, siteNome, descricao, url, tema, logo, templateId } = body

    if (!usuarioId || !siteNome || !url || !templateId) {
      return NextResponse.json({ erro: 'Campos obrigatórios faltando.' }, { status: 400 })
    }

    const template = await Template.findById(templateId)

    if (!template) {
      return NextResponse.json({ erro: 'Template não encontrado.' }, { status: 404 })
    }

    const configuracoes = JSON.parse(template.configPadrao)

    const novoSite = await Site.create({
      usuarioId,
      siteNome,
      descricao,
      url,
      tema, 
      logo,
      configuracoes,
      templateOriginalId: template._id
    })

    return NextResponse.json(novoSite, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar site:', error)
    return NextResponse.json({ erro: 'Erro ao criar site' }, { status: 500 })
  }
}
