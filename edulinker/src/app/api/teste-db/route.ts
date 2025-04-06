// SOMENTE PARA TESTE
import { connectToDB } from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET() {
    try {
      await connectToDB()
      return NextResponse.json({ ok: true, message: 'Conexão bem-sucedida com o MongoDB Atlas' })
    } catch (error) {
      console.error(error)
      return NextResponse.json({ ok: false, message: 'Erro ao conectar com o MongoDB Atlas' }, { status: 500 })
    }
  }