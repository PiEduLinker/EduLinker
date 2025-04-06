import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Usuarios from '@/models/Usuarios';
import { hashPassword } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { nome, email, senha } = await req.json();

    await connectToDB();

    const existe = await Usuarios.findOne({ email });
    if (existe) {
      return NextResponse.json({ erro: 'Usuário já cadastrado.' }, { status: 400 });
    }

    const senhaCriptografada = await hashPassword(senha);
    const novoUsuario = await Usuarios.create({ nome, email, senha: senhaCriptografada });

    return NextResponse.json(novoUsuario, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json({ erro: 'Erro interno' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const usuarios = await Usuarios.find().select('-senha');
    return NextResponse.json(usuarios);
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao buscar usuários' }, { status: 500 });
  }
}