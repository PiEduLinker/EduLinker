import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'
import Assinatura from '@/models/Assinatura'

export async function POST(req: NextRequest) {
  const { siteId, plano } = await req.json()
  if (!siteId || !plano) {
    return NextResponse.json(
      { erro: 'Campos siteId e plano são obrigatórios.' },
      { status: 400 }
    )
  }

  await connectToDB()
  const site = await Site.findById(siteId)
  if (!site) {
    return NextResponse.json({ erro: 'Site não encontrado.' }, { status: 404 })
  }

  await Assinatura.findOneAndUpdate(
    { usuarioId: site.usuarioId },
    { plano, }
  )

  site.status = 'TEMPLATE_SELECTION'
  await site.save()

  return NextResponse.json(
    { siteId: site._id, etapa: site.status },
    { status: 200 }
  )
}
