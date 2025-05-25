import { IAssinatura } from '@/models/Assinatura'
import Assinatura from '@/models/Assinatura'
import Site from '@/models/Site'
import TemplateModel from '@/models/Template'
import { SiteProvider, Plan } from '@/contexts/siteContext'
import GratuitoTemplate from '@/app/components/common/templates/Gratuito'
import PremiumTemplate from '@/app/components/common/templates/Premium'
import PageTracker from '@/components/pageTracker'
import { connectToDB } from '@/lib/mongodb'
import { notFound } from 'next/navigation'

interface LeanSite {
  usuarioId: string
  slug: string
  descricao?: string
  status: 'BASIC_INFO' | 'PLAN_SELECTION' | 'TEMPLATE_SELECTION' | 'COMPLETED'
  configuracoes: any
  templateOriginalId: string
}

export default async function SiteSlugPage(
  { params }: { params: Promise<{ slug?: string }> }
) {
  const { slug } = await params
  if (!slug) return notFound()

  await connectToDB()

  const rawSite = await Site.findOne({ slug }).lean()
  const site = rawSite as LeanSite | null
  if (!site) return notFound()

  // 1) Buscando assinatura com findOne + lean()
  const rawAssinatura = await Assinatura
  .findOne({
    usuarioId: site.usuarioId,
    status: 'ativa'           
  })
  .sort({ dataInicio: -1 })  
  .lean()

const assinatura = rawAssinatura as IAssinatura | null

  // 2) Determina premium por conteúdo da assinatura
  const isPremiumUser = assinatura?.plano === 'premium'

  // 3) Escolhe template certo
  const TemplateComponent = isPremiumUser
    ? PremiumTemplate
    : GratuitoTemplate

  // 4) Monta o valor de contexto forçando 'plano' a ser do tipo Plan
  const contextValue = {
    slug: site.slug,
    descricao: site.descricao ?? '',
    configuracoes: site.configuracoes,
    status: site.status,
    plano: (isPremiumUser ? 'premium' : 'gratuito') as Plan,
  }

  return (
    <SiteProvider site={contextValue}>
      <PageTracker slug={slug} />
      <div style={{
        '--bg': site.configuracoes.corFundo,
        '--fg': site.configuracoes.corTexto,
      } as React.CSSProperties}>
        <TemplateComponent config={site.configuracoes} />
      </div>
    </SiteProvider>
  )
}
