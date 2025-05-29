import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { connectToDB } from '@/lib/mongodb';
import Usuario from '@/models/Usuario';
import Assinatura from '@/models/Assinatura';
import Site from '@/models/Site';
import { generateToken, hashPassword } from '@/lib/auth';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    if (!code) {
      return NextResponse.redirect(new URL('/login?error=missing_code', req.url));
    }

    // 1) troca o code por tokens
    const { tokens } = await client.getToken({
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    });
    client.setCredentials(tokens);

    // 2) verifica o ID token
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.email) {
      return NextResponse.redirect(new URL('/login?error=invalid_token', req.url));
    }

    // 3) normaliza e-mail
    const email = payload.email.trim().toLowerCase();

    // 4) upsert no Mongo
    await connectToDB();
    let user = await Usuario.findOne({ email });
    if (!user) {
      user = await Usuario.create({
        nome: payload.name || email.split('@')[0],
        email,
        senha: await hashPassword(payload.sub!),  // sub só para preencher o schema
      });
      await Assinatura.create({
        usuarioId: user._id,
        plano: 'gratuito',
        valor: 0,
        dataExpiracao: new Date(Date.now() + 365*24*60*60*1000),
      });
    }

    // 5) busca ou cria site
    let site = await Site.findOne({ usuarioId: user._id });
    if (!site) {
      site = await Site.create({
        usuarioId: user._id,
        status: 'BASIC_INFO',
        configuracoes: {},
        slug: `pending-${user._id}`,
      });
    }

    // 6) gera JWT
    const token = generateToken({ id: user._id.toString(), email: user.email });

    // 7) decide para onde redirecionar
    let redirectPath: string;
    switch (site.status) {
      case 'BASIC_INFO':
        redirectPath = '/account/school_description';
        break;
      case 'PLAN_SELECTION':
        redirectPath = '/account/plan_selection';
        break;
      case 'TEMPLATE_SELECTION':
        redirectPath = '/account/template_selection';
        break;
      case 'COMPLETED':
      default:
        redirectPath = '/auth/admin';
        break;
    }

    // monta URL absoluta e adiciona query se precisar do idSite
    const redirectUrl = new URL(redirectPath, req.url);
    if (site.status !== 'COMPLETED') {
      redirectUrl.searchParams.set('siteId', site._id.toString());
    }

    // 8) faz o redirect e seta cookie
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 7*24*60*60,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;

  } catch (err) {
    console.error('Google OAuth callback error:', err);
    return NextResponse.json(
      { erro: 'Erro interno no callback do Google.' },
      { status: 500 }
    );
  }
}
