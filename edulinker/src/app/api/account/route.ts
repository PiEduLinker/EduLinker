import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'
import Assinatura from '@/models/Assinatura'
import Usuario from '@/models/Usuario'
import { verifyToken } from '@/lib/auth'

interface IUser {
  _id: string
  nome: string
  email: string
}
interface ISite {
  slug: string
}
interface IAssinatura {
  plano: string
  status: string
}

export async function GET(req: NextRequest) {
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
    const userId = payload.id

    const userDoc = await Usuario
      .findById(userId)
      .lean() as IUser | null

    const siteDoc = await Site
      .findOne({ usuarioId: userId })
      .lean() as ISite | null

    const assinaturaDoc = await Assinatura
      .findOne({
        usuarioId: userId,
        status: 'ativa',
        dataExpiracao: { $gte: new Date() }
      })
      .lean() as IAssinatura | null

    return NextResponse.json({
      name: userDoc?.nome ?? '',
      email: userDoc?.email ?? '',
      domain: siteDoc?.slug ?? '',
      plan: assinaturaDoc?.plano ?? 'gratuito',
      subscriptionStatus: assinaturaDoc?.status ?? 'nenhuma'
    })
  } catch (err) {
    console.error('GET /api/account error:', err)
    return NextResponse.json({ erro: 'Erro interno.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
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

    const userId = payload.id

    await Site.deleteOne({ usuarioId: userId })
    await Assinatura.deleteMany({ usuarioId: userId })
    await Usuario.deleteOne({ _id: userId })

    const res = NextResponse.json({ ok: true })
    res.cookies.set('token', '', { maxAge: 0 })  
    return res

  } catch (err) {
    console.error('Erro ao excluir conta:', err)
    return NextResponse.json({ erro: 'Erro interno.' }, { status: 500 })
  }
}
