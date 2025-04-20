import { NextRequest, NextResponse } from 'next/server'
import { config } from 'dotenv'
config()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { siteNome, slug, html } = body

    if (!siteNome || !slug || !html) {
      return NextResponse.json({ erro: 'Campos obrigatórios ausentes.' }, { status: 400 })
    }

    const files = [
      {
        file: 'index.html',
        data: html,
      },
    ]

    const vercelToken = process.env.VERCEL_TOKEN

    const response = await fetch(`https://api.vercel.com/v13/deployments${vercelToken ? `?vercelToken=${vercelToken}` : ''}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: slug,
        files,
        projectSettings: {
          framework: null,
        },
      }),
    })

    const resultado = await response.json()

    if (!response.ok) {
      return NextResponse.json({ erro: resultado }, { status: 500 })
    }

    return NextResponse.json({ url: resultado.url, vercelId: resultado.id }, { status: 201 })
  } catch (error) {
    console.error('Erro ao publicar:', error)
    return NextResponse.json({ erro: 'Erro interno ao publicar o site.' }, { status: 500 })
  }
}
