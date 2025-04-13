import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Assinatura from '@/models/Assinatura'
import { verifyToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    await connectToDB()

    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ erro: 'Token ausente ou inválido' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const payload = verifyToken(token) as { id: string }

    if (!payload?.id) {
      return NextResponse.json({ erro: 'Token inválido' }, { status: 401 })
    }

    const dados = await req.json()
    const { plano, valor, status } = dados

    if (!['gratuito', 'premium'].includes(plano)) {
      return NextResponse.json({ erro: 'Plano de assinatura inválido' }, { status: 400 })
    }

    const dataExpiracao = plano === 'premium'
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) 
      : new Date('9999-12-31T23:59:59Z') 

    const novaAssinatura = await Assinatura.create({
      plano,
      valor,
      status,
      usuarioId: payload.id,
      dataInicio: new Date(),
      dataExpiracao,
    })

    return NextResponse.json(novaAssinatura, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar assinatura:', error)
    return NextResponse.json({ erro: 'Erro interno' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    await connectToDB()
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ erro: 'Token ausente' }, { status: 401 })

    const { id: usuarioId } = verifyToken(token)
    const assinatura = await Assinatura.findOne({ usuarioId }).sort({ dataInicio: -1 })

    if (!assinatura) return NextResponse.json({ erro: 'Assinatura não encontrada' }, { status: 404 })

    return NextResponse.json(assinatura)
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao buscar assinatura' }, { status: 500 })
  }
}
