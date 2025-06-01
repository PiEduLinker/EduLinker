import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { connectToDB } from '@/lib/mongodb'
import { verifyToken } from '@/lib/auth'
import Site from '@/models/Site'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ erro: 'Token ausente ou inválido.' }, { status: 401 })
    }
    const payload = verifyToken(token)
    if (!payload || typeof payload.id !== 'string') {
      return NextResponse.json({ erro: 'Token inválido.' }, { status: 401 })
    }

    await connectToDB()

    const siteDoc = await Site.findOne({ usuarioId: payload.id }).lean()
    if (!siteDoc) {
      return NextResponse.json({ erro: 'Site não encontrado para este usuário.' }, { status: 404 })
    }

    const siteNome = siteDoc.slug
    if (!siteNome) {
      return NextResponse.json({ erro: 'Slug do site ausente.' }, { status: 400 })
    }

    // 5) Inicializa o cliente Gemini (Google GenAI)
    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { erro: 'API_KEY não configurada. Verifique variável de ambiente.' },
        { status: 500 }
      )
    }
    const ai = new GoogleGenAI({ apiKey })

    const prompt = `Escreva **somente** uma descrição curta e atrativa para o site de uma escola chamada "${siteNome}". SEM numerar opções. faça uma apresentação e Destaque qualidade, confiança e ambiente acolhedor.`

    // 7) Gera o conteúdo com o modelo Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config:{
      maxOutputTokens: 500,
      temperature: 0.1,
      },
    })

    // 8) Retorna o JSON com o resultado
    return NextResponse.json(
      { descricaoGerada: response.text },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Erro ao gerar descrição IA:', error)
    return NextResponse.json(
      { erro: 'Falha ao gerar descrição de IA.', detalhes: error.message || String(error) },
      { status: 500 }
    )
  }
}
