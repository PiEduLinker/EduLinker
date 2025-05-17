import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Usuario from '@/models/Usuario';
import { hashPassword } from '@/lib/auth';
import Assinatura from '@/models/Assinatura';
import { buscarPlanoUsuario } from '@/app/utils/validacoes'

// Cria conta de usuário
export async function POST(req: NextRequest) {
  try {
    const { nome, email, senha } = await req.json()
    if (!nome || !email || !senha) {
      return NextResponse.json({ erro: 'Campos obrigatórios faltando.' }, { status: 400 })
    }

    await connectToDB()
    const emailNorm = email.trim().toLowerCase()
    if (await Usuario.findOne({ email: emailNorm })) {
      return NextResponse.json({ erro: 'Usuário já cadastrado.' }, { status: 400 })
    }

    const senhaHash = await hashPassword(senha)
    const novoUsuario = await Usuario.create({ nome, email: emailNorm, senha: senhaHash })

    // Cria assinatura gratuita automática
    await Assinatura.create({
      usuarioId: novoUsuario._id,
      plano: 'gratuito',
      valor: 0,
      dataExpiracao: new Date(Date.now() + 365*24*60*60*1000)
    })

    const { senha: _, ...usuarioSemSenha } = novoUsuario.toObject()
    return NextResponse.json(usuarioSemSenha, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ erro: 'Erro interno do servidor.' }, { status: 500 })
  }
}
  
// export async function GET() {
//   try {
//     await connectToDB()
//     const usuarios = await Usuario.find().select('-senha')
//     const usuariosComPlano = await Promise.all(
//       usuarios.map(async user => {
//         const planoAtual = await buscarPlanoUsuario(user._id.toString())
//         return { ...user.toObject(), planoAtual }
//       })
//     )
//     return NextResponse.json(usuariosComPlano)
//   } catch {
//     return NextResponse.json({ erro: 'Erro ao buscar usuários.' }, { status: 500 })
//   }
// }