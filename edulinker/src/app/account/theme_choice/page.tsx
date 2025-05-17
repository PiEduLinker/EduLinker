'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import CreateAccountLayout from '@/components/Layouts/CreateAccountLayout'

export default function ThemeChoicePage() {
  const router = useRouter()
  const params = useSearchParams()
  const siteId = params.get('siteId')

  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [error, setError] = useState('')

  if (!siteId) {
    return (
      <CreateAccountLayout>
        <p className="text-center text-red-500">Site ID não encontrado.</p>
      </CreateAccountLayout>
    )
  }

  const templates = [
    {
      id: '682539f0aee5ffb1774ea93c',
      name: 'Template Gratuito',
      img: '/images/themeImages/Facilita Sites.jpg',
      pro: false,
    },
    {
      id: 'template-2',
      name: 'Template Premium',
      img: '/images/themeImages/Advocacia.jpg',
      pro: true,
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!selectedTemplate) {
      setError('Selecione um tema para continuar.')
      return
    }

    try {
      const res = await fetch('/api/onboarding/template', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId,
          templateId: selectedTemplate,
          configuracoes: {},
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.erro || 'Falha ao salvar template.')
        return
      }

      router.push('/auth/admin')
    } catch {
      setError('Erro de conexão. Tente novamente.')
    }
  }

  return (
    <CreateAccountLayout>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl mx-auto flex flex-col items-center px-4 space-y-8 pb-12"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          ESCOLHA O SEU TEMA
        </h1>

        {error && (
          <p className="text-red-600 font-medium text-sm text-center">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {templates.map((tpl) => (
            <label
              key={tpl.id}
              className={`relative flex flex-col items-center rounded-xl overflow-hidden cursor-pointer transition-shadow duration-300 shadow-md hover:shadow-xl border-2 ${
                selectedTemplate === tpl.id
                  ? 'border-purple-600 ring-4 ring-purple-200'
                  : 'border-transparent'
              }`}
            >
              <input
                type="radio"
                name="template"
                value={tpl.id}
                checked={selectedTemplate === tpl.id}
                onChange={() => setSelectedTemplate(tpl.id)}
                className="hidden"
              />

              <div className="w-full text-center bg-gray-100 py-3 px-2 font-semibold text-lg text-gray-800 relative">
                {tpl.name}
                {tpl.pro && (
                  <span className="absolute top-1 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                    PRO
                  </span>
                )}
              </div>

              <div className="aspect-[4/3] w-full relative">
                <Image
                  src={tpl.img}
                  alt={tpl.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                />
              </div>
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="w-full max-w-md bg-purple-700 text-white font-semibold py-3 rounded-full hover:bg-purple-800 transition cursor-pointer"
        >
          Finalizar e Ir para Painel
        </button>
      </form>
    </CreateAccountLayout>
  )
}