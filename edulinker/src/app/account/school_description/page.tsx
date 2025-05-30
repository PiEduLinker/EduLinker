import CreateAccountLayout from '@/components/Layouts/CreateAccountLayout'
import ClientSchoolDescription from './school_description'

interface Props {
  searchParams: { siteId?: string | string[] }
}

export default async function SchoolDescriptionPage({ searchParams }: Props) {
  const params = await searchParams
  const raw    = params.siteId
  const siteId = Array.isArray(raw) ? raw[0] : raw

  return (
    <CreateAccountLayout status="BASIC_INFO">
      <ClientSchoolDescription siteId={siteId} />
    </CreateAccountLayout>
  )
}
