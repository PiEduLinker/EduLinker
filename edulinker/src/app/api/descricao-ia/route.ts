import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { verifyToken } from '@/lib/auth'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const user = token && verifyToken(token)
  if (!user) {
    return NextResponse.json({ erro: 'Não autorizado.' }, { status: 401 })
  }

  const { siteId } = await req.json()
  if (!siteId) {
    return NextResponse.json({ erro: 'siteId ausente.' }, { status: 400 })
  }

  await connectToDB()
  const site = await Site.findById(siteId)
  if (!site || site.usuarioId.toString() !== user.id) {
    return NextResponse.json({ erro: 'Site não encontrado.' }, { status: 404 })
  }

  const prompt = `
Gere um texto para a seção "Quem somos" de um site de escola.
Nome: ${site.configuracoes.titulo || 'Nossa Escola'}.
Descrição atual: ${site.configuracoes.descricao || ''}.
Tom: amigável, profissional e convidativo.
Formato: 2-3 parágrafos.
  `.trim()

  // 5) Chama o modelo gpt-3.5-turbo
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 300,
  })

  const generated = completion.choices[0].message?.content?.trim()
  if (!generated) {
    return NextResponse.json({ erro: 'Não foi possível gerar o texto.' }, { status: 500 })
  }

  site.configuracoes.descricao = generated
  await site.save()

  return NextResponse.json({ descricao: generated })
}
