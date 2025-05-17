import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Usuario from '@/models/Usuario'
import { comparePassword, generateToken } from '@/lib/auth'
import { buscarPlanoUsuario } from '@/app/utils/validacoes'

export async function POST(req: NextRequest) {
  try {
    const { email, senha } = await req.json()

    if (!email || !senha) {
      return NextResponse.json(
        { erro: 'E-mail e senha são obrigatórios.' },
        { status: 400 }
      )
    }

    await connectToDB()

    const emailNormalizado = email.trim().toLowerCase()
    const user = await Usuario.findOne({ email: emailNormalizado })

    const senhaCorreta = user && (await comparePassword(senha, user.senha))
    if (!user || !senhaCorreta) {
      return NextResponse.json(
        { erro: 'Usuário ou senha inválidos.' },
        { status: 401 }
      )
    }

    const token = generateToken({ id: user._id, email: user.email })
    const planoAtual = await buscarPlanoUsuario(user._id.toString())

    const response = NextResponse.json(
      {
        token,
        usuario: {
          _id: user._id,
          nome: user.nome,
          email: user.email,
          planoAtual,
        },
      },
      { status: 200 }
    )

    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 7 * 24 * 60 * 60, 
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    return response
  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { erro: 'Erro interno no login.' },
      { status: 500 }
    )
  }
}