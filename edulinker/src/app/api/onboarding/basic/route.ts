import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'

function makeSlug(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export async function POST(req: NextRequest) {
  const { siteId, siteNome, descricao, logo } = await req.json()
  if (!siteId || !siteNome) {
    return NextResponse.json(
      { erro: 'Todos os campos são obrigatórios.' },
      { status: 400 }
    )
  }

  await connectToDB()
  const site = await Site.findById(siteId)
  if (!site) {
    return NextResponse.json({ erro: 'Site não encontrado.' }, { status: 404 })
  }

  const slug = makeSlug(siteNome)
  const clash = await Site.findOne({ slug, _id: { $ne: site._id } })
  if (clash) {
    return NextResponse.json(
      { erro: 'Esse nome de site já está em uso. Escolha outro.' },
      { status: 409 }
    )
  }

  site.slug     = slug
  site.descricao= descricao 
   site.configuracoes = {
    ...site.configuracoes,
    descricao,
    logo,           // Base64 data URL ou URL da imagem
  }
  site.status   = 'PLAN_SELECTION'
  await site.save()

  return NextResponse.json(
    { siteId: site._id, etapa: site.status },
    { status: 200 }
  )
}
