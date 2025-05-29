import CreateAccountLayout from '@/components/Layouts/CreateAccountLayout'
import ClientCongrats from './ClientCongrats'

interface Props {
  searchParams: { siteId?: string | string[] }
}

export default async function CongratsPage({ searchParams }: Props) {
  const params = await searchParams
  const raw = params.siteId
  const siteId = Array.isArray(raw) ? raw[0] : raw

  return (
    <CreateAccountLayout status="COMPLETED">
      <ClientCongrats siteId={siteId} />
    </CreateAccountLayout>
  )
}
