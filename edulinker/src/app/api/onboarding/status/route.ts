import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'
import Assinatura from '@/models/Assinatura'
import { verifyToken } from '@/lib/auth'

interface LeanSite {
  _id: { toString(): string }
  status: string
}
interface LeanAssinatura {
  plano: string
}

export async function GET(req: NextRequest) {
  await connectToDB()

  const token = req.cookies.get('token')?.value
  if (!token) {
    return NextResponse.json({ erro: 'Não autorizado.' }, { status: 401 })
  }
  const payload = verifyToken(token)
  if (!payload) {
    return NextResponse.json({ erro: 'Token inválido.' }, { status: 401 })
  }

  const site = (await Site
    .findOne({ usuarioId: payload.id })
    .sort({ dataCriacao: -1 })
    .lean()) as LeanSite | null

  const assinatura = (await Assinatura
    .findOne({ usuarioId: payload.id })
    .lean()) as LeanAssinatura | null

  if (!site) {
    return NextResponse.json(
      {
        etapa: 'BASIC_INFO',
        siteId: null,
        plano: assinatura?.plano || 'gratuito'
      },
      { status: 200 }
    )
  }

  return NextResponse.json(
    {
      etapa: site.status,
      siteId: site._id.toString(),
      plano: assinatura?.plano || 'gratuito'
    },
    { status: 200 }
  )
}
