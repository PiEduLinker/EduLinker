import { NextResponse } from 'next/server'
import { UAParser, IResult } from 'ua-parser-js'
import { connectToDB } from '@/lib/mongodb'
import PageView from '@/models/PageView'
import Site from '@/models/Site'
import { buscarPlanoUsuario } from '@/app/utils/validacoes'

interface LeanSite {
  slug: string
  usuarioId: { toString(): string } | string
}

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params
  await connectToDB()

  // 1) Carrega site tipado
  const site = await Site
    .findOne({ slug })
    .lean<LeanSite>()
  if (!site) {
    return NextResponse.json({ erro: 'Site não encontrado.' }, { status: 404 })
  }

  // 2) Verifica plano do usuário
  const userId =
    typeof site.usuarioId === 'string'
      ? site.usuarioId
      : site.usuarioId.toString()

  const plano = await buscarPlanoUsuario(userId)
  if (plano !== 'premium') {
    return NextResponse.json(
      { erro: 'Relatórios disponíveis apenas para contas Premium.' },
      { status: 403 }
    )
  }

  // 3) Conta visitas
  const totalVisits = await PageView.countDocuments({ slug })

  // 4) Agrupa dispositivos e browsers
  const all = await PageView.find({ slug }).select('userAgent').lean()
  const parser = new UAParser()
  const devices: Record<string, number> = {}
  const browsers: Record<string, number> = {}

  all.forEach(({ userAgent }) => {
    parser.setUA(userAgent)
    const r: IResult = parser.getResult()
    const device  = r.device.type ?? 'desktop'
    const browser = r.browser.name   ?? 'Unknown'
    devices[device]   = (devices[device]   || 0) + 1
    browsers[browser] = (browsers[browser] || 0) + 1
  })

  return NextResponse.json({ totalVisits, devices, browsers })
}
