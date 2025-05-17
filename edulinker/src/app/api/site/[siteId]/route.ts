import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'
import { verifyToken } from '@/lib/auth'

// interface mínima para o TS entender o retorno do .lean()
interface LeanSite {
  _id: { toString(): string }
  configuracoes: any
}

export async function GET(
  req: NextRequest,
  { params }: { params: { siteId: string } }
) {
  await connectToDB()

  const token = req.cookies.get('token')?.value
  const payload = token && verifyToken(token)
  if (!payload) {
    return NextResponse.json({ erro: 'Não autorizado.' }, { status: 401 })
  }

  // 1) Use findOne (retorna um objeto ou null)
  const site = (await Site.findOne({
    usuarioId: payload.id,
    _id: params.siteId,
  })
    // 2) .lean() para POJO e…
    .lean()) as LeanSite | null     // 3) informe ao TS que é desse tipo

  if (!site) {
    return NextResponse.json({ erro: 'Site não encontrado.' }, { status: 404 })
  }

  return NextResponse.json({
    siteId: site._id.toString(),
    configuracoes: site.configuracoes,
  })
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { siteId: string } }
) {
  await connectToDB()

  const token = req.cookies.get('token')?.value
  const payload = token && verifyToken(token)
  if (!payload) {
    return NextResponse.json({ erro: 'Não autorizado.' }, { status: 401 })
  }

  const { configuracoes: newConfigs } = await req.json()
  if (!newConfigs) {
    return NextResponse.json({ erro: 'Configurações ausentes.' }, { status: 400 })
  }

  // Novamente findOne para garantir objeto único
  const site = await Site.findOne({
    usuarioId: payload.id,
    _id: params.siteId,
  })
  if (!site) {
    return NextResponse.json({ erro: 'Site não encontrado.' }, { status: 404 })
  }

  site.configuracoes = { ...site.configuracoes, ...newConfigs }
  await site.save()

  return NextResponse.json({ sucesso: true, configuracoes: site.configuracoes })
}
