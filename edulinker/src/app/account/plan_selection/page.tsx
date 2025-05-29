import CreateAccountLayout from '@/components/Layouts/CreateAccountLayout'
import ClientPlanSelection from './ClientPlanSelection'

interface Props {
  searchParams: { siteId?: string | string[] }
}

export default async function PlanSelectionPage({ searchParams }: Props) {
  const params = await searchParams
  const raw = params.siteId
  const siteId = Array.isArray(raw) ? raw[0] : raw

  return (
    <CreateAccountLayout status="PLAN_SELECTION">
      <ClientPlanSelection siteId={siteId} initialStatus="PLAN_SELECTION" />
    </CreateAccountLayout>
  )
}
