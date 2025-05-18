import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'
import Assinatura from '@/models/Assinatura'
import { verifyToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  await connectToDB()

  const token = req.cookies.get('token')?.value
  if (!token) {
    return NextResponse.json({ erro: 'Não autorizado.' }, { status: 401 })
  }
  const payload = verifyToken(token)
  if (!payload) {
    return NextResponse.json({ erro: 'Token inválido.' }, { status: 401 })
  }

  const { plano } = await req.json()
  if (!plano) {
    return NextResponse.json(
      { erro: 'Campo "plano" é obrigatório.' },
      { status: 400 }
    )
  }

  const site = await Site.findOne({ usuarioId: payload.id })
  if (!site) {
    return NextResponse.json({ erro: 'Site não encontrado.' }, { status: 404 })
  }

  const valoresPorPlano: Record<string, { valor: number; duracaoDias: number }> = {
    gratuito: { valor: 0, duracaoDias: 365 },
    premium: { valor: 29, duracaoDias: 30 },
  }
  const cfg = valoresPorPlano[plano]
  if (!cfg) {
    return NextResponse.json(
      { erro: 'Plano inválido.' },
      { status: 400 }
    )
  }

  await Assinatura.findOneAndUpdate(
    { usuarioId: site.usuarioId },
    {
      plano,
      valor: cfg.valor,
      dataExpiracao: new Date(Date.now() + cfg.duracaoDias * 24 * 60 * 60 * 1000),
    }
  )

  site.status = 'TEMPLATE_SELECTION'
  await site.save()

  return NextResponse.json(
    { siteId: site._id.toString(), etapa: site.status },
    { status: 200 }
  )
}
