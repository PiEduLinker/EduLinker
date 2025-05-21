import { notFound } from 'next/navigation'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'
import TemplateModel from '@/models/Template'
import GratuitoTemplate from '@/app/components/common/templates/Gratuito'
import PremiumTemplate from '@/app/components/common/templates/Premium'
import { SiteConfig } from '@/types/site'

interface LeanSite {
  templateOriginalId: string
  configuracoes: SiteConfig
}

interface LeanTemplate {
  disponívelPara: string[]
}

export default async function SiteSlugPage(props: { params?: { slug?: string } }) {
  const slug = props.params?.slug
  if (!slug) return notFound()

  await connectToDB()

  const rawSite = await Site.findOne({ slug }).lean()
  const site = rawSite as LeanSite | null
  if (!site) return notFound()

  const rawTpl = await TemplateModel
    .findById(site.templateOriginalId)
    .lean()
  const tpl = rawTpl as LeanTemplate | null
  if (!tpl) return notFound()

  const dispo = tpl.disponívelPara
  const isPremiumTemplate =
    dispo.includes('premium') &&
    !dispo.includes('gratuito')

  const TemplateComponent = isPremiumTemplate
    ? PremiumTemplate
    : GratuitoTemplate

  return (
    <div
      style={
        {
          '--bg': site.configuracoes.corFundo,
          '--fg': site.configuracoes.corTexto,
        } as React.CSSProperties
      }
    >
      <TemplateComponent config={site.configuracoes} />
    </div>
  )
}
