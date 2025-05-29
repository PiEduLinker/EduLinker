import { NextResponse } from 'next/server';

const params = new URLSearchParams({
  client_id: process.env.GOOGLE_CLIENT_ID!,
  redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
  response_type: 'code',
  scope: 'openid email profile',
  prompt: 'select_account',
});

export function GET() {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  return NextResponse.redirect(googleAuthUrl);
}
