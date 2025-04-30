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

    if (!user) {
      return NextResponse.json(
        { erro: 'Usuário não encontrado.' },
        { status: 404 }
      )
    }

    const senhaCorreta = await comparePassword(senha, user.senha)
    if (!senhaCorreta) {
      return NextResponse.json(
        { erro: 'Senha incorreta.' },
        { status: 401 }
      )
    }

    const token = generateToken({ id: user._id, email: user.email })
    const planoAtual = await buscarPlanoUsuario(user._id.toString())

    return NextResponse.json({
      token,
      usuario: {
        _id: user._id,
        nome: user.nome,
        email: user.email,
        planoAtual
      }
    })
  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { erro: 'Erro interno no login.' },
      { status: 500 }
    )
  }
}
