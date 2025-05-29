import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'
import { verifyToken } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import Assinatura from '@/models/Assinatura'

export async function POST(req: NextRequest) {
  try {
    await connectToDB()

    const token = req.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ erro: 'Não autenticado.' }, { status: 401 })
    }
    const payload = verifyToken(token) as { id: string }
    if (!payload?.id) {
      return NextResponse.json({ erro: 'Token inválido.' }, { status: 401 })
    }

    const { templateId } = await req.json()
    if (!templateId) {
      return NextResponse.json({ erro: 'templateId é obrigatório.' }, { status: 400 })
    }

    const assinatura = await Assinatura.findOne({
      usuarioId: payload.id,
      plano: 'premium',
      status: 'ativa',
      dataExpiracao: { $gte: new Date() },
    })

    if (!assinatura) {
  return NextResponse.json(
    { erro: 'Recurso disponível somente para assinantes premium.' },
    { status: 403 }
  )
}

    const site = await Site.findOne({ usuarioId: payload.id })
    if (!site) {
      return NextResponse.json({ erro: 'Site não encontrado.' }, { status: 404 })
    }

    site.templateOriginalId = templateId
    await site.save()

    revalidatePath(`/site/${site.slug}`)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ erro: 'Erro ao trocar tema.' }, { status: 500 })
  }
}