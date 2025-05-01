import { notFound } from 'next/navigation'

export default async function SiteSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/site/slug/${params.slug}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    return notFound()
  }

  const data = await res.json()

  return <div dangerouslySetInnerHTML={{ __html: data.html }} />
}
