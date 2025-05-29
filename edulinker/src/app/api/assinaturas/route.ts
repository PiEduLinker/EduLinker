import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Assinatura from '@/models/Assinatura'
import { verifyToken } from '@/lib/auth'

interface JWTPayload {
  id: string
  email?: string
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB()

     const token = req.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ erro: 'Token ausente ou inválido.' }, { status: 401 })
    }

    const payload = verifyToken(token) as JWTPayload
    if (!payload?.id) {
      return NextResponse.json({ erro: 'Token inválido.' }, { status: 401 })
    }

    const dados = await req.json()
    const { plano, valor = 0 } = dados

    if (!['gratuito', 'premium'].includes(plano)) {
      return NextResponse.json({ erro: 'Plano de assinatura inválido' }, { status: 400 })
    }

    const assinaturaAtiva = await Assinatura.findOne({
      usuarioId: payload.id,
      status: 'ativa',
      dataExpiracao: { $gte: new Date() }
    })

    if (assinaturaAtiva) {
      if (assinaturaAtiva.plano === 'premium') {
        return NextResponse.json({
          erro: 'Você já possui uma assinatura premium ativa.'
        }, { status: 409 })
      }

      if (assinaturaAtiva.plano === 'gratuito' && plano === 'premium') {
        assinaturaAtiva.status = 'upgrade'
        await assinaturaAtiva.save()
      } else {
        return NextResponse.json({
          erro: 'Você já possui uma assinatura ativa.'
        }, { status: 409 })
      }
    }

    const dataInicio = new Date()
    const dataExpiracao =
      plano === 'premium'
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)

    const novaAssinatura = await Assinatura.create({
      usuarioId: payload.id,
      plano,
      valor: plano === 'gratuito' ? 0 : valor,
      status: 'ativa',
      dataInicio,
      dataExpiracao,
    })

    return NextResponse.json(novaAssinatura, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar assinatura:', error)
    return NextResponse.json({ erro: 'Erro interno ao criar assinatura' }, { status: 500 })
  }
}

export async function GET(req: NextRequest){
  try {
    await connectToDB()
    const token = req.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ erro: 'Token ausente ou inválido.' }, { status: 401 })
    }

    const { id: usuarioId } = verifyToken(token)
    const assinatura = await Assinatura.findOne({ usuarioId }).sort({ dataInicio: -1 })

    if (!assinatura) return NextResponse.json({ erro: 'Assinatura não encontrada' }, { status: 404 })

    return NextResponse.json(assinatura)
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao buscar assinatura' }, { status: 500 })
  }
}
