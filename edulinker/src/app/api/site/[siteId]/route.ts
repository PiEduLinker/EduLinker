import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'
import { verifyToken } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

interface LeanSite {
  _id: { toString(): string }
  slug: string
  configuracoes: any
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ siteId: string }> }
) {
  await connectToDB()

  const token = req.cookies.get('token')?.value
  const payload = token && verifyToken(token)
  if (!payload) {
    return NextResponse.json({ erro: 'Não autorizado.' }, { status: 401 })
  }

  const { siteId } = await context.params

  const site = (await Site.findOne({
    usuarioId: payload.id,
    _id: siteId,
  })
    .lean()) as LeanSite | null     

  if (!site) {
    return NextResponse.json({ erro: 'Site não encontrado.' }, { status: 404 })
  }

  return NextResponse.json({
    siteId: site._id.toString(),
    slug: site.slug,
    configuracoes: site.configuracoes,
  })
}

export async function PUT(
  req: NextRequest,
  context: { params: { siteId: string } }
) {
  await connectToDB()

  // 1) Autenticação via JWT
  const token = req.cookies.get('token')?.value
  const payload = token && verifyToken(token)
  if (!payload) {
    return NextResponse.json({ erro: 'Não autorizado.' }, { status: 401 })
  }

  // 2) Body e validações básicas
  const { configuracoes: newConfigs } = await req.json()
  if (!newConfigs) {
    return NextResponse.json({ erro: 'Configurações ausentes.' }, { status: 400 })
  }

  const allowedFonts = ['montserrat', 'geist', 'geist-mono', 'roboto', 'poppins']
  if (newConfigs.fonte && !allowedFonts.includes(newConfigs.fonte)) {
    return NextResponse.json({ erro: 'Fonte inválida.' }, { status: 400 })
  }

  // 3) Identifica o slug (“siteId”) e busca o site do usuário
  const { siteId } = await context.params
  const site = await Site.findOne({
    usuarioId: payload.id,
    slug: siteId,
  })
  if (!site) {
    return NextResponse.json({ erro: 'Site não encontrado.' }, { status: 404 })
  }

  // 4) Atualiza configurações e salva
  site.configuracoes = { ...site.configuracoes, ...newConfigs }
  await site.save()

  // 5) Dispara ISR sob demanda para /site/[slug]
  revalidatePath(`/site/${siteId}`)

  // 6) Retorna sucesso
  return NextResponse.json({ sucesso: true, configuracoes: site.configuracoes })
}