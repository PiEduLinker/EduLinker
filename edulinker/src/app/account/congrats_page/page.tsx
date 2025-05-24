import CreateAccountLayout from '@/components/Layouts/CreateAccountLayout'
import ClientCongrats from './ClientCongrats'

interface Props {
  searchParams: { siteId?: string | string[] }
}

export default function CongratsPage({ searchParams }: Props) {
  // normalizeia siteId para string
  const raw = searchParams.siteId
  const siteId = Array.isArray(raw) ? raw[0] : raw

  return (
    <CreateAccountLayout status="COMPLETED">
      <ClientCongrats siteId={siteId} />
    </CreateAccountLayout>
  )
}
