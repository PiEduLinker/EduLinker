import ClientLogin from './ClientLogin'

interface Props {
  searchParams: { from?: string | string[] }
}

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams
  const raw    = params.from
  const from   = Array.isArray(raw) ? raw[0] : raw

  return <ClientLogin from={from} />
}
