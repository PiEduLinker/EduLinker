import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Usuario from '@/models/Usuario'
import Assinatura from '@/models/Assinatura'
import Site from '@/models/Site'
import { hashPassword, generateToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { nome, email, senha } = await req.json()
  if (!nome || !email || !senha) {
    return NextResponse.json(
      { erro: 'Campos obrigatórios faltando.' },
      { status: 400 }
    )
  }

  await connectToDB()
  const emailNorm = email.trim().toLowerCase()

  // Se já existe um usuário com esse e-mail, retorna erro para fazer login
  const existente = await Usuario.findOne({ email: emailNorm })
  if (existente) {
    return NextResponse.json(
      { erro: 'E-mail já cadastrado. Por favor, faça login.' },
      { status: 409 }
    )
  }

  // Cria novo usuário
  let user
  try {
    const senhaHash = await hashPassword(senha)
    user = await Usuario.create({
      nome,
      email: emailNorm,
      senha: senhaHash,
    })

    // Cria assinatura gratuita
    await Assinatura.create({
      usuarioId: user._id,
      plano: 'gratuito',
      valor: 0,
      dataExpiracao: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ),
    })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json(
      { erro: 'Erro interno ao criar usuário.' },
      { status: 500 }
    )
  }

  // Garante criação de um único site por usuário
  let site
  try {
    site = await Site.create({
      usuarioId: user._id,
      status: 'BASIC_INFO',
      configuracoes: {},
      slug: `pending-${user._id}`,
    })
  } catch (err: any) {
    // Se houver corrida e o índice único impedir duplicação, busca o que já existe
    if (err.code === 11000 && err.keyPattern?.usuarioId) {
      site = await Site.findOne({ usuarioId: user._id })!
    } else {
      console.error(err)
      return NextResponse.json(
        { erro: 'Erro interno ao criar site.' },
        { status: 500 }
      )
    }
  }

  // Gera token e devolve payload de onboarding
  const token = generateToken({ id: user._id, email: user.email })
  const payload = {
    usuario: { _id: user._id, nome: user.nome, email: user.email },
    token,
    onboarding: {
      siteId: site._id,
      etapa: site.status,
    },
  }

  const res = NextResponse.json(payload, { status: 201 })
  res.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
  return res
}
