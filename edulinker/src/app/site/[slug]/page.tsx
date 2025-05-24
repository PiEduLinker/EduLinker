// src/app/site/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'
import TemplateModel from '@/models/Template'
import GratuitoTemplate from '@/app/components/common/templates/Gratuito'
import PremiumTemplate from '@/app/components/common/templates/Premium'
import PageTracker from '@/components/pageTracker'    
import { SiteConfig } from '@/types/site'

interface LeanSite {
  slug: string
  templateOriginalId: string
  configuracoes: SiteConfig
}

export default async function SiteSlugPage({ params }: { params: { slug?: string } }) {
  const slug = params.slug
  if (!slug) return notFound()

  await connectToDB()

  const rawSite = await Site.findOne({ slug }).lean()
  const site = rawSite as LeanSite | null
  if (!site) return notFound()

  const rawTpl = await TemplateModel.findById(site.templateOriginalId).lean()
  const tpl = rawTpl as { disponívelPara: string[] } | null
  if (!tpl) return notFound()

  const isPremium = tpl.disponívelPara.includes('premium') && !tpl.disponívelPara.includes('gratuito')
  const TemplateComponent = isPremium ? PremiumTemplate : GratuitoTemplate

  return (
    <>
      {/* dispara o POST /api/page-view */}
      <PageTracker slug={slug} />

      <div
        style={{
          '--bg': site.configuracoes.corFundo,
          '--fg': site.configuracoes.corTexto,
        } as React.CSSProperties}
      >
        <TemplateComponent config={site.configuracoes} />
      </div>
    </>
  )
}
