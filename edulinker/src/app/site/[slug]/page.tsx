import { notFound } from 'next/navigation'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'
import GratuitoTemplate from '@/app/components/common/templates/Gratuito'
import PremiumTemplate from '@/app/components/common/templates/Premium'
import { SiteConfig } from '@/types/site'

export default async function SiteSlugPage({ params }: { params: { slug: string } }) {
  await connectToDB()
  const site = await Site.findOne({ slug: params.slug })
  if (!site) return notFound()

  const config = site.configuracoes as SiteConfig
  const Template = site.tema === 'premium' ? PremiumTemplate : GratuitoTemplate

  return (
    // injeta cores dinâmicas via CSS variables
    <div style={{
      ['--bg' as any]: config.corFundo,
      ['--fg' as any]: config.corTexto
    }}>
      <Template config={config} />
    </div>
  )
}