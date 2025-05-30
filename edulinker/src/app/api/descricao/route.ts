export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import { verifyToken } from '@/lib/auth'
import Assinatura from '@/models/Assinatura'
import { HfInference } from '@huggingface/inference'

if (!process.env.HF_API_TOKEN) {
  throw new Error('HF_API_TOKEN não definido em .env.local')
}
const hf = new HfInference(process.env.HF_API_TOKEN)

export async function POST(req: NextRequest) {
  try {
    await connectToDB()

    // Autenticação
    const token = req.cookies.get('token')?.value
    if (!token) return NextResponse.json({ erro: 'Não autenticado.' }, { status: 401 })
    const { id: usuarioId } = verifyToken(token) as { id?: string }
    if (!usuarioId) return NextResponse.json({ erro: 'Token inválido.' }, { status: 401 })

    // Checa Premium
    const assinatura = await Assinatura.findOne({
      usuarioId,
      plano: 'premium',
      status: 'ativa',
      dataExpiracao: { $gte: new Date() },
    })
    if (!assinatura) {
      return NextResponse.json(
        { text: 'Recurso disponível só para Premium. Faça upgrade!' },
        { status: 403 }
      )
    }

    // Prompt de exemplo
    const prompt =
      'Escreva uma descrição curta e atrativa para o site de uma escola de idiomas, enfatizando qualidade e confiança.'

    // Chama o Zephyr 7B Beta (ou substitua por outro acima)
    const result = await hf.textGeneration({
      model: 'HuggingFaceH4/zephyr-7b-beta',
      inputs: prompt,
      parameters: { max_new_tokens: 150, temperature: 0.7 },
    })

    const text = Array.isArray(result) && result[0].generated_text
      ? result[0].generated_text.trim()
      : 'Não foi possível gerar a descrição.'

    return NextResponse.json({ text })
  } catch (err: any) {
    console.error('Erro IA HF SDK:', err)
    return NextResponse.json(
      { erro: 'Erro ao gerar descrição. Tente novamente mais tarde.' },
      { status: 500 }
    )
  }
}
