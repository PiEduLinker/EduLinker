import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'
import Template from '@/models/Template'
import {
  validarTemplateNome,
  buscarPlanoUsuario,
  validarTemplateDisponibilidade,
} from '@/app/utils/validacoes'

export async function POST(req: NextRequest) {
  const { siteId, templateId, configuracoes: userConfigs } = await req.json()
  if (!siteId || !templateId) {
    return NextResponse.json(
      { erro: 'Campos siteId e templateId são obrigatórios.' },
      { status: 400 }
    )
  }

  await connectToDB()
  const site = await Site.findById(siteId)
  if (!site) {
    return NextResponse.json({ erro: 'Site não encontrado.' }, { status: 404 })
  }

  const template = await Template.findById(templateId)
  validarTemplateNome(template)
  const plano = await buscarPlanoUsuario(site.usuarioId.toString())
  validarTemplateDisponibilidade(template, plano)

  const defaultConfig = JSON.parse(template!.configPadrao || '{}')
  const finalConfig = { ...defaultConfig, ...(userConfigs || {}) }

  site.templateOriginalId = template!._id
  site.configuracoes = finalConfig
  site.status = 'COMPLETED'
  await site.save()

  return NextResponse.json(
    { siteId: site._id, etapa: site.status, linkPublico: site.url },
    { status: 200 }
  )
}
