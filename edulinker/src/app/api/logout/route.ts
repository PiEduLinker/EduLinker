import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ ok: true })
  res.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,          
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
  return res
}
