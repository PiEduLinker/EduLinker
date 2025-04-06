import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/Usuarios';
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, senha } = await req.json();

    await connectToDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ erro: 'Usuário não encontrado' }, { status: 404 });
    }

    const senhaCorreta = await comparePassword(senha, user.senha);
    if (!senhaCorreta) {
      return NextResponse.json({ erro: 'Senha incorreta' }, { status: 401 });
    }

    const token = generateToken({ id: user._id, email: user.email });

    return NextResponse.json({ token, usuario: { nome: user.nome, email: user.email } });
  } catch (error) {
    return NextResponse.json({ erro: 'Erro interno no login' }, { status: 500 });
  }
}
