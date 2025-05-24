'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import CreateAccountLayout from '@/components/Layouts/CreateAccountLayout'

type Plan = 'gratuito' | 'premium'

interface Template {
  id: string
  nome: string
  pro: boolean
}

export default function ThemeChoicePage() {
  const router = useRouter()
  const siteId = useSearchParams().get('siteId')

  const [plan, setPlan] = useState<Plan>('gratuito')
  const [templates, setTemplates] = useState<Template[]>([])
  const [filtered, setFiltered] = useState<Template[]>([])
  const [selected, setSelected] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [currentStatus, setCurrentStatus] = useState<'BASIC_INFO' | 'PLAN_SELECTION' | 'TEMPLATE_SELECTION' | 'COMPLETED'>('TEMPLATE_SELECTION')


  // Mapeamento estático das thumbnails
  const IMAGE_MAP: Record<string,string> = {
    '682953cfeacbea36d53508b9': '/images/themeImages/Facilita Sites.jpg',   // gratuito
    '682a30fc7e6132facb3e70cc':'/images/themeImages/Advocacia.jpg',         // premium
  }

  useEffect(() => {
    if (!siteId) return

    async function loadData() {
      try {
        // busca plano
        const stRes = await fetch('/api/onboarding/status', {
          credentials: 'include',
        })
        if (!stRes.ok) throw new Error('Falha ao obter status')
        const { plano } = await stRes.json() as { plano: Plan }
        setPlan(plano)

        // busca só os IDs e flags pro do template (sem imagem)
        const tplRes = await fetch('/api/templates')
        if (!tplRes.ok) throw new Error('Falha ao obter templates')
        const tplList = await tplRes.json() as Array<{ id: string; nome: string; pro: boolean }>

        setTemplates(tplList)
        setFiltered(
          plano === 'premium'
            ? tplList
            : tplList.filter((t) => !t.pro)
        )
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar dados.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [siteId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!selected) {
      setError('Selecione um tema para continuar.')
      return
    }
    try {
      const res = await fetch('/api/onboarding/template', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId, templateId: selected, configuracoes: {} }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.erro || 'Falha ao salvar template.')
        return
      }
      router.push('/account/congrats_page')
    } catch {
      setError('Erro de conexão. Tente novamente.')
    }
  }

  if (!siteId) {
    return (
      <CreateAccountLayout status="BASIC_INFO">
        <p className="text-center text-red-500">Site ID não encontrado.</p>
      </CreateAccountLayout>
    )
  }

  if (loading) {
    return (
      <CreateAccountLayout>
        <p className="p-6 text-center">Carregando templates…</p>
      </CreateAccountLayout>
    )
  }

  return (
    <CreateAccountLayout status={currentStatus}>
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
          {filtered.map((tpl) => (
            <label
              key={tpl.id}
              className={`relative flex flex-col items-center rounded-xl overflow-hidden cursor-pointer transition-shadow duration-300 shadow-md hover:shadow-xl border-2 ${
                selected === tpl.id
                  ? 'border-purple-600 ring-4 ring-purple-200'
                  : 'border-transparent'
              }`}
            >
              <input
                type="radio"
                name="template"
                value={tpl.id}
                checked={selected === tpl.id}
                onChange={() => setSelected(tpl.id)}
                className="hidden"
              />

              <div className="w-full text-center bg-gray-100 py-3 px-2 font-semibold text-lg text-gray-800 relative">
                {tpl.nome}
                {tpl.pro && (
                  <span className="absolute top-1 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                    PRO
                  </span>
                )}
              </div>

              <div className="aspect-[4/3] w-full relative">
                <Image
                  src={IMAGE_MAP[tpl.id]}
                  alt={tpl.nome}
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
          Finalizar
        </button>
      </form>
    </CreateAccountLayout>
  )
}