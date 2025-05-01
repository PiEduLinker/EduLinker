import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'
import Template from '@/models/Template'
import { ObjectId } from 'mongodb'
import { buscarPlanoUsuario, validarTemplateNome, validarTemplateDisponibilidade } from '@/app/utils/validacoes'

export async function POST(req: NextRequest) {
  try {
    await connectToDB()
    const { usuarioId, siteNome, descricao, logo, templateId, configuracoes } = await req.json()

    if (!usuarioId || !siteNome || !templateId) {
      return NextResponse.json({ erro: 'Campos obrigatórios faltando.' }, { status: 400 })
    }

    const slug = siteNome
      .toLowerCase()
      .normalize('NFD')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    const existente = await Site.findOne({ slug })
    if (existente) {
      return NextResponse.json({ erro: 'Esse nome de site já está em uso. Escolha outro.' }, { status: 409 })
    }

    const template = await Template.findById(templateId)
    try {
      validarTemplateNome(template)
      const plano = await buscarPlanoUsuario(usuarioId)
      validarTemplateDisponibilidade(template, plano)
    } catch (err: any) {
      return NextResponse.json({ erro: err.message }, { status: 400 })
    }

    const padrao = JSON.parse(template!.configPadrao || '{}')
    const finalConfig = { ...padrao, ...configuracoes }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.headers.get('origin') || 'http://localhost:3000'

    const novoSite = await Site.create({
      usuarioId: new ObjectId(usuarioId),
      siteNome,
      slug,
      descricao,
      url: `/site/${slug}`,
      deploymentId: '',
      tema: template!.nome,
      logo,
      configuracoes: finalConfig,
      templateOriginalId: template!._id,
    })

    return NextResponse.json({
      ...novoSite.toObject(),
      linkPublico: `${baseUrl}/site/${slug}`.replace(/([^:]\/)\/+/, '$1'),
    }, { status: 201 })
  } catch (error: any) {
    console.error('Erro ao criar site:', error)
    return NextResponse.json({ erro: 'Erro ao criar site', detalhes: error?.message || error }, { status: 500 })
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
    console.error('Erro ao buscar sites:', error)
    return NextResponse.json({ erro: 'Erro interno ao buscar sites.' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDB()
    const { usuarioId, siteId, configuracoes } = await req.json()

    if (!usuarioId || !siteId || !configuracoes) {
      return NextResponse.json({ erro: 'Campos obrigatórios faltando.' }, { status: 400 })
    }

    const site = await Site.findById(siteId)
    if (!site) {
      return NextResponse.json({ erro: 'Site não encontrado.' }, { status: 404 })
    }
    if (String(site.usuarioId) !== String(usuarioId)) {
      return NextResponse.json({ erro: 'Usuário não autorizado.' }, { status: 403 })
    }

    const template = await Template.findById(site.templateOriginalId)
    try {
      validarTemplateNome(template)
      const plano = await buscarPlanoUsuario(usuarioId)
      validarTemplateDisponibilidade(template, plano)
    } catch (err: any) {
      return NextResponse.json({ erro: err.message }, { status: 400 })
    }

    const finalConfig = { ...site.configuracoes, ...configuracoes }
    site.configuracoes = finalConfig
    site.url = `/site/${site.slug}`
    site.deploymentId = ''
    await site.save()

    return NextResponse.json(site, { status: 200 })
  } catch (error) {
    console.error('Erro ao atualizar site:', error)
    return NextResponse.json({ erro: 'Erro interno ao atualizar site.' }, { status: 500 })
  }
}
