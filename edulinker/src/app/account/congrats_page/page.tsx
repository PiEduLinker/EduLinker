'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import CreateAccountLayout from '@/components/Layouts/CreateAccountLayout'

export default function CongratsPage() {
  const router = useRouter()
  const params = useSearchParams()
  const siteId = params.get('siteId')

  const [loading, setLoading] = useState(true)
  const [publicLink, setPublicLink] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!siteId) {
      setError('ID do site não encontrado.')
      setLoading(false)
      return
    }

    async function fetchSite() {
      try {
        const res = await fetch(`/api/site/${siteId}`, {
          credentials: 'include',
        })
        if (!res.ok) throw new Error('Falha ao carregar dados do site')
        const { slug } = await res.json()

        const base = process.env.NEXT_PUBLIC_BASE_URL ?? window.location.origin
        setPublicLink(`${base}/site/${slug}`)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSite()
  }, [siteId])

  const handleContinue = () => {
    router.push('/auth/admin')
  }

  const handleViewSite = () => {
    if (publicLink) {
      window.open(publicLink, '_blank')
    }
  }

  if (loading) {
    return (
      <CreateAccountLayout status="COMPLETED">
        <div className="p-6 text-center">Carregando…</div>
      </CreateAccountLayout>
    )
  }

  return (
    <CreateAccountLayout status="COMPLETED">
      <div className="flex flex-col items-center justify-center gap-6 text-center w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">🎉 Parabéns!</h1>
        <p className="text-gray-600 text-lg">
          Seu site já está disponível.
        </p>

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
            onClick={handleContinue}
            className="flex-1 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-full transition"
          >
            Ir para o Painel
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-sm mt-2">
            {error}
          </p>
        )}

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
    </CreateAccountLayout>
  )
}
