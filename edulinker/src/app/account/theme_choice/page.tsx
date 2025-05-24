import CreateAccountLayout from '@/components/Layouts/CreateAccountLayout'
import ClientThemeChoice from './ClientThemeChoice'

interface Props {
  searchParams: { siteId?: string | string[] }
}

export default async function ThemeChoicePage({ searchParams }: Props) {
  // 1. Aguarda os parâmetros
  const params = await searchParams
  const raw    = params.siteId
  const siteId = Array.isArray(raw) ? raw[0] : raw

  return (
    <CreateAccountLayout status="TEMPLATE_SELECTION">
      <ClientThemeChoice siteId={siteId} />
    </CreateAccountLayout>
  )
}
