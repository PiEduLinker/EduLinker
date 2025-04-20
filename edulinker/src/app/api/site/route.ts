import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'
import Template from '@/models/Template'
import { ObjectId } from 'mongodb'
import { gerarHtml } from '@/app/utils/gerarHtml'


export async function POST(req: NextRequest) {
  try {
    await connectToDB()
    const body = await req.json()
    const { usuarioId, siteNome, descricao, tema, logo, templateId } = body

    if (!usuarioId || !siteNome || !templateId) {
      return NextResponse.json({ erro: 'Campos obrigatórios faltando.' }, { status: 400 })
    }

    const template = await Template.findById(templateId)
    if (!template) {
      return NextResponse.json({ erro: 'Template não encontrado.' }, { status: 404 })
    }

    const configPadrao = JSON.parse(template.configPadrao || '{}')
    const configPersonalizada = body.configuracoes || {}

    const configuracoes = {
      ...configPadrao,
      ...configPersonalizada, 
    }


    const htmlContent = gerarHtml(configuracoes)
    const slug = `${siteNome.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 9999)}`
    const vercelToken = process.env.VERCEL_TOKEN

    const response = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: slug,
        files: [
          {
            file: 'index.html',
            data: htmlContent,
          },
        ],
        projectSettings: {
          framework: null,
        },
      }),
    })

    const resultado = await response.json()

    if (!response.ok) {
      console.error('Erro na publicação:', resultado)
      return NextResponse.json({ erro: 'Erro ao publicar no Vercel', detalhes: resultado }, { status: 500 })
    }

    const novoSite = await Site.create({
      usuarioId: new ObjectId(usuarioId),
      siteNome,
      descricao,
      url: resultado.url,
      tema: template.nome,
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

export async function GET(req: NextRequest) {
  try {
    await connectToDB()

    const usuarioId = req.nextUrl.searchParams.get('usuarioId')

    if (!usuarioId) {
      return NextResponse.json({ erro: 'Usuário não informado.' }, { status: 400 })
    }

    const sites = await Site.find({ usuarioId: new ObjectId(usuarioId) }).sort({ dataCriacao: -1 })

    return NextResponse.json(sites, { status: 200 })

  } catch (error) {
    console.error('Erro ao buscar sites do usuário:', error)
    return NextResponse.json({ erro: 'Erro ao buscar sites do usuário.' }, { status: 500 })
  }
}