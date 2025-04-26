import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Usuarios from '@/models/Usuarios';
import { hashPassword } from '@/lib/auth';
import Assinatura from '@/models/Assinatura';

export async function POST(req: Request) {
    try {
      const body = await req.json()
      const { nome, email, senha } = body
  
      if (!nome || !email || !senha) {
        return NextResponse.json(
          { erro: 'Preencha todos os campos obrigatórios.' },
          { status: 400 }
        )
      }
  
      await connectToDB()
  
      const emailNormalizado = email.trim().toLowerCase()
  
      const existe = await Usuarios.findOne({ email: emailNormalizado })
      if (existe) {
        return NextResponse.json(
          { erro: 'Usuário já cadastrado.' },
          { status: 400 }
        )
      }
  
      const senhaCriptografada = await hashPassword(senha)
  
      const novoUsuario = await Usuarios.create({
        nome,
        email: emailNormalizado,
        senha: senhaCriptografada,
        dataCriacao: new Date()
      })
  
      const { senha: _, ...usuarioSemSenha } = novoUsuario.toObject()
  
      return NextResponse.json(usuarioSemSenha, { status: 201 })
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
      return NextResponse.json({ erro: 'Erro interno' }, { status: 500 })
    }
  }
  
  export async function GET() {
    try {
      await connectToDB()
      const usuarios = await Usuarios.find().select('-senha')
  
      const usuariosComPlano = await Promise.all(
        usuarios.map(async (usuario) => {
          const assinatura = await Assinatura.findOne({ usuarioId: usuario._id })
            .sort({ dataInicio: -1 })

          return {
            ...usuario.toObject(),
            planoAtual: assinatura?.plano || 'gratuito'
          }
        })
      )
  
      return NextResponse.json(usuariosComPlano)
    } catch (error) {
      return NextResponse.json(
        { erro: 'Erro ao buscar usuários' },
        { status: 500 }
      )
    }
  }