// src/app/auth/admin/layout.tsx
import { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken, getUserIdFromToken } from '@/lib/auth'
import { connectToDB } from '@/lib/mongodb'
import Site, { ISite } from '@/models/Site'
import Assinatura, { IAssinatura } from '@/models/Assinatura'
import { SiteProvider, SiteConfig, Plan } from '@/contexts/siteContext'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // 1️⃣ Autenticação
  const token = (await cookies()).get('token')?.value
  if (!token || !verifyToken(token)) redirect('/login?from=/auth/admin')

  const userId = getUserIdFromToken(token)
  if (!userId) redirect('/login?from=/auth/admin')

  // 2️⃣ Conecta no Mongo
  await connectToDB()

  // 3️⃣ Busca o Site do usuário
  const siteDoc = await Site.findOne({ usuarioId: userId }).lean<ISite | null>()
  if (!siteDoc) {
    return redirect(`/account/school_description`)
  }

  // 4️⃣ Busca a assinatura ativa
  const assinDoc = await Assinatura
    .findOne({ usuarioId: userId, status: 'ativa' })
    .lean<IAssinatura | null>()

  // 5️⃣ Decide o plano
  const plano: Plan = assinDoc && new Date(assinDoc.dataExpiracao) > new Date()
    ? (assinDoc.plano as Plan)
    : 'gratuito'

  // 6️⃣ Monte o objeto SiteConfig para o Context
  const site: SiteConfig = {
    slug: siteDoc.slug || '',
    descricao: siteDoc.descricao || '',
    configuracoes: siteDoc.configuracoes || {},
    status: siteDoc.status,
    plano,   // aqui o plano “gratuito” ou “premium”
  }

  // 7️⃣ Envolva os filhos no Provider
  return (
    <SiteProvider site={site}>
      {children}
    </SiteProvider>
  )
}
