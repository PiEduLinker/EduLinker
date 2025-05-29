'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image' 

interface Props { siteId?: string }

export default function ClientCongrats({ siteId }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const id = siteId ?? params.get('siteId')  // fallback, se precisar

  const [loading, setLoading]   = useState(true)
  const [publicLink, setPublicLink] = useState('')
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('ID do site não encontrado.')
      setLoading(false)
      return
    }

    ;(async () => {
      try {
        const res = await fetch(`/api/site/${id}`, { credentials: 'include' })
        if (!res.ok) throw new Error('Falha ao carregar dados do site')
        const { slug } = await res.json()
        const base = process.env.NEXT_PUBLIC_BASE_URL ?? window.location.origin
        setPublicLink(`${base}/site/${slug}`)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) {
    return <div className="p-6 text-center">Carregando…</div>
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">🎉 Parabéns!</h1>
      <p className="text-gray-600 text-lg">Seu site já está disponível.</p>
      {/* imagem, botões, mensagem de erro e publicLink */}
      <div className="w-64 aspect-[4/5] relative">
        <Image
          src="/Backgrounds/happySmartPhone.png"
          alt="Celular comemorando"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 50vw, 256px"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <button
          onClick={() => router.push('/auth/admin')}
          className="flex-1 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-full transition cursor-pointer"
        >
          Ir para o Painel
        </button>
      </div>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      {publicLink && (
        <p className="text-sm text-gray-600 mt-4">
          Link público:{' '}
          <a
            href={publicLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline break-all"
          >
            {publicLink}
          </a>
        </p>
      )}
    </div>
  )
}
