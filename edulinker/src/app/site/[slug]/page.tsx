import { IAssinatura } from '@/models/Assinatura'
import Assinatura from '@/models/Assinatura'
import Site from '@/models/Site'
import TemplateModel, { ITemplate } from '@/models/Template'
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

// ========================
// 1) GERAÇÃO ESTÁTICA (SSG)
// ========================
export async function generateStaticParams() {
  await connectToDB()
  // Busca todos os slugs de sites no banco
  const sites = await Site.find({}, 'slug').lean()
  return sites.map((site) => ({
    slug: site.slug!,
  }))
}

// ========================
// 2) ISR (REVALIDATE)
// ========================
// A cada 60 segundos, o Next.js irá revalidar esta página em background.
export const revalidate = 60

// ========================
// 3) COMPONENTE DA PÁGINA
// ========================
export default async function SiteSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = await params
  if (!slug) return notFound()

  await connectToDB()

  // 1) Busca o site pelo slug
  const rawSite = await Site.findOne({ slug }).lean()
  const site = rawSite as LeanSite | null
  if (!site) return notFound()

  // 2) Busca a assinatura mais recente e ativa
  const rawAssinatura = await Assinatura
    .findOne({ usuarioId: site.usuarioId, status: 'ativa' })
    .sort({ dataInicio: -1 })
    .lean()
  const assinatura = rawAssinatura as IAssinatura | null
  const isPremiumUser = assinatura?.plano === 'premium'

  // 3) Carrega o template escolhido
  const rawTpl = await TemplateModel.findById(site.templateOriginalId).lean()
  const tpl = rawTpl as ITemplate | null
  if (!tpl) return notFound()

  // 4) Verifica se o plano do usuário permite este template
  const planoAtual = (isPremiumUser ? 'premium' : 'gratuito') as Plan
  if (!tpl.disponívelPara.includes(planoAtual)) {
    return notFound()
  }

  // 5) Escolhe o componente de template (Premium ou Gratuito)
  const TemplateComponent =
    tpl.nome.toLowerCase().includes('premium')
      ? PremiumTemplate
      : GratuitoTemplate

  // 6) Prepara o contexto com valores do site
  const contextValue = {
    slug: site.slug,
    descricao: site.descricao ?? '',
    configuracoes: site.configuracoes,
    status: site.status,
    plano: planoAtual,
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
