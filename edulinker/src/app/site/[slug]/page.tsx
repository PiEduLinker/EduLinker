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

export default async function SiteSlugPage(
  { params }: { params: Promise<{ slug?: string }> }
) {
  const { slug } = await params
  if (!slug) return notFound()

  await connectToDB()

  // 1) Busca o site
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
  const planoAtual = isPremiumUser ? 'premium' : 'gratuito'
  if (!tpl.disponívelPara.includes(planoAtual)) {
    return notFound() // ou redirecionar para upgrade
  }

  // 5) Escolhe o componente pelo nome do template armazenado
  const TemplateComponent =
    tpl.nome.toLowerCase().includes('premium')
      ? PremiumTemplate
      : GratuitoTemplate

  // 6) Prepara o contexto com o plano real do usuário
  const contextValue = {
    slug: site.slug,
    descricao: site.descricao ?? '',
    configuracoes: site.configuracoes,
    status: site.status,
    plano: planoAtual as Plan,
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