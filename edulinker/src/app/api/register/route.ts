import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Usuario from '@/models/Usuario'
import Assinatura from '@/models/Assinatura'
import Site from '@/models/Site'
import { hashPassword, generateToken } from '@/lib/auth'
import { ObjectId } from 'mongodb'

export async function POST(req: NextRequest) {
  const { nome, email, senha } = await req.json()
  if (!nome || !email || !senha) {
    return NextResponse.json({ erro: 'Campos obrigatórios faltando.' }, { status: 400 })
  }

  await connectToDB()
  const emailNorm = email.trim().toLowerCase()
  let user = await Usuario.findOne({ email: emailNorm })
  if (!user) {
    try {
      const senhaHash = await hashPassword(senha)
      user = await Usuario.create({ nome, email: emailNorm, senha: senhaHash })
      await Assinatura.create({
         usuarioId: user._id,
         plano: 'gratuito',
         valor: 0,
         dataExpiracao: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        })
    } catch (err: any) {
      if (err.code === 11000 && err.keyPattern?.email) {
        return NextResponse.json({ erro: 'E-mail já cadastrado.' }, { status: 409 })
      }
      console.error(err)
      return NextResponse.json({ erro: 'Erro interno.' }, { status: 500 })
    }
  }

  let site = await Site.findOne({ usuarioId: user._id })
  if (!site) {
    site = await Site.create({
      usuarioId: new ObjectId(user._id),
      status: 'BASIC_INFO',
      configuracoes: {},
      slug: `pending-${user._id}`,
    })
  }

  const token = generateToken({ id: user._id, email: user.email })
  const payload = {
    usuario: { _id: user._id, nome: user.nome, email: user.email },
    token,
    onboarding: { 
      siteId: site._id,
       etapa: site.status
       },
  }

  const res = NextResponse.json(payload, { status: 200 })
  res.cookies.set('token', token, { httpOnly:true, path:'/',
     maxAge:7*24*60*60,
      sameSite:'lax',
       secure: process.env.NODE_ENV==='production'
       })
  return res
}
