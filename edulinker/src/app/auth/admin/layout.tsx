import { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken, getUserIdFromToken } from '@/lib/auth'
import { connectToDB } from '@/lib/mongodb'
import Site, { ISite } from '@/models/Site'
import Assinatura, { IAssinatura } from '@/models/Assinatura'
import { SiteProvider, SiteConfig, Plan } from '@/contexts/siteContext'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const token = (await cookies()).get('token')?.value
  if (!token || !verifyToken(token)) redirect('/login?from=/auth/admin')

  const userId = getUserIdFromToken(token)
  if (!userId) redirect('/login?from=/auth/admin')

  await connectToDB()

  const siteDoc = await Site.findOne({ usuarioId: userId }).lean<ISite | null>()
  if (!siteDoc) {
    return redirect(`/account/school_description`)
  }

  const assinDoc = await Assinatura
    .findOne({ usuarioId: userId, status: 'ativa' })
    .lean<IAssinatura | null>()

  const plano: Plan = assinDoc && new Date(assinDoc.dataExpiracao) > new Date()
    ? (assinDoc.plano as Plan)
    : 'gratuito'

  const site: SiteConfig = {
    slug: siteDoc.slug || '',
    descricao: siteDoc.descricao || '',
    configuracoes: siteDoc.configuracoes || {},
    status: siteDoc.status,
    plano,   
  }

  return (
    <SiteProvider site={site}>
      {children}
    </SiteProvider>
  )
}
