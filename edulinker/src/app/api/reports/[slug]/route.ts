// src/app/api/reports/[slug]/route.ts
import { NextResponse } from 'next/server'
import { UAParser, IResult } from 'ua-parser-js'
import { connectToDB } from '@/lib/mongodb'
import PageView from '@/models/PageView'

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params
  await connectToDB()

  const totalVisits = await PageView.countDocuments({ slug })

  const all = await PageView.find({ slug }).select('userAgent').lean()

  const parser = new UAParser()
  const devices: Record<string, number> = {}
  const browsers: Record<string, number> = {}

  all.forEach(({ userAgent }) => {
    parser.setUA(userAgent)
    const result: IResult = parser.getResult()
    const device  = result.device.type ?? 'desktop'
    const browser = result.browser.name   ?? 'Unknown'
    devices[device]   = (devices[device]   || 0) + 1
    browsers[browser] = (browsers[browser] || 0) + 1
  })

  return NextResponse.json({ totalVisits, devices, browsers })
}
