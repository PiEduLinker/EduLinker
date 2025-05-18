'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import CreateAccountLayout from '@/components/Layouts/CreateAccountLayout'
import { BadgeCheck, ShieldCheck } from 'lucide-react'

export default function PlanSelectionPage() {
  const router = useRouter()
  const siteId = useSearchParams().get('siteId') // usado só para montar a URL de theme_choice

  const [selectedPlan, setSelectedPlan] = useState<'gratuito' | 'premium' | ''>('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentStatus, setCurrentStatus] = useState<'BASIC_INFO' | 'PLAN_SELECTION' | 'TEMPLATE_SELECTION' | 'COMPLETED'>('PLAN_SELECTION')

  useEffect(() => {
    if (!siteId) {
      setLoading(false)
      return
    }

    async function loadSiteData() {
      try {
        // Busca o status atual do site
        const response = await fetch(`/api/site/${siteId}`, {
          credentials: 'include',
        })
        
        if (!response.ok) throw new Error('Falha ao carregar dados do site')
        
        const siteData = await response.json()
        
        // Preenche o plano selecionado se já existir
        if (siteData.plano) setSelectedPlan(siteData.plano)
        
        // Atualiza o status
        setCurrentStatus(siteData.status || 'PLAN_SELECTION')
      } catch (err) {
        setError('Erro ao carregar dados do site')
      } finally {
        setLoading(false)
      }
    }

    loadSiteData()
  }, [siteId])

  if (!siteId) {
    return (
      <CreateAccountLayout status={currentStatus}>
        <p className="text-center text-red-500">Site ID não encontrado.</p>
      </CreateAccountLayout>
    )
  }

  if (loading) {
    return (
      <CreateAccountLayout status={currentStatus}>
        <p className="text-center p-6">Carregando informações do plano...</p>
      </CreateAccountLayout>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!selectedPlan) {
      setError('Selecione um plano para continuar.')
      return
    }

    try {
      const res = await fetch('/api/onboarding/plan', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId,
          plano: selectedPlan,
          status: 'TEMPLATE_SELECTION' // Atualiza para a próxima etapa
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.erro || 'Falha ao salvar plano.')
        return
      }
      router.push(`/account/theme_choice?siteId=${data.siteId}`)
    } catch {
      setError('Erro de conexão. Tente novamente.')
    }
  }

  return (
    <CreateAccountLayout status={currentStatus}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl flex flex-col items-center justify-center flex-1 pb-12 px-4"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ESCOLHA SEU PLANO
        </h1>

        {error && (
          <p className="text-red-600 font-medium text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* Planos */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gratuito */}
          <label
            className={`border rounded-xl p-6 cursor-pointer transition ${
              selectedPlan === 'gratuito'
                ? 'border-purple-600 bg-purple-50'
                : 'border-gray-300 hover:border-purple-400'
            }`}
          >
            <input
              type="radio"
              name="plan"
              value="gratuito"
              checked={selectedPlan === 'gratuito'}
              onChange={() => setSelectedPlan('gratuito')}
              className="hidden"
            />
            <div className="flex items-center gap-3 mb-3">
              <BadgeCheck className="text-purple-600" size={24} />
              <h2 className="font-semibold text-xl text-gray-800">Plano Gratuito</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Ideal para começar de forma simples e sem custo.
            </p>

            <ul className="text-sm text-gray-700 space-y-1">
              <li>✔ Cadastro de até 5 imóveis</li>
              <li>✔ Tema básico</li>
              <li>✔ Suporte via email</li>
              <li className="line-through text-gray-400">✘ Integração com WhatsApp</li>
              <li className="line-through text-gray-400">✘ Exclusividade de anúncios</li>
              <li className="line-through text-gray-400">✘ Estatísticas avançadas</li>
            </ul>
          </label>

          {/* Premium */}
          <label
            className={`relative border-2 rounded-xl p-6 cursor-pointer transition shadow-md ${
              selectedPlan === 'premium'
                ? 'border-purple-700 bg-purple-50'
                : 'border-purple-400 hover:border-purple-600'
            }`}
          >
            {/* Badge Recomendado */}
            <div className="absolute top-0 right-0 -mt-3 mr-3 bg-purple-700 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
              Recomendado
            </div>

            <input
              type="radio"
              name="plan"
              value="premium"
              checked={selectedPlan === 'premium'}
              onChange={() => setSelectedPlan('premium')}
              className="hidden"
            />

            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="text-purple-700" size={26} />
              <h2 className="font-bold text-xl text-purple-800">Plano Premium</h2>
            </div>
            <p className="text-gray-700 text-sm mb-2">
              Tudo do plano gratuito + recursos profissionais e visibilidade superior.
            </p>

            <div className="text-purple-700 font-bold text-lg mb-4">R$ 29/mês</div>

            <ul className="text-sm text-gray-800 space-y-1">
              <li>✔ Cadastro ilimitado de imóveis</li>
              <li>✔ Temas personalizados</li>
              <li>✔ Integração com WhatsApp</li>
              <li>✔ Estatísticas de visualização</li>
              <li>✔ Destaque nas buscas</li>
              <li>✔ Suporte prioritário</li>
              <li>✔ Exclusividade regional de anúncios</li>
            </ul>
          </label>
        </div>

        <button
          type="submit"
          className="w-full max-w-md mt-8 bg-purple-700 text-white font-semibold py-3 rounded-full hover:bg-purple-800 transition cursor-pointer"
        >
          Continuar
        </button>
      </form>
    </CreateAccountLayout>
  )
}