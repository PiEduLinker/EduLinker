'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BadgeCheck, ShieldCheck, Star } from 'lucide-react'

interface Props {
  siteId?: string
  initialStatus: 'BASIC_INFO' | 'PLAN_SELECTION' | 'TEMPLATE_SELECTION' | 'COMPLETED'
}

export default function ClientPlanSelection({ siteId, initialStatus }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const id = siteId ?? params.get('siteId')

  const [selectedPlan, setSelectedPlan] = useState<'gratuito' | 'premium' | ''>('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true) // Loading inicial
  const [isSubmitting, setIsSubmitting] = useState(false) // Loading do submit
  const [status, setStatus] = useState(initialStatus)

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      return
    }
    (async () => {
      try {
        const res = await fetch(`/api/site/${id}`, { credentials: 'include' })
        if (!res.ok) throw new Error('Falha ao carregar dados do site')
        const data = await res.json()
        if (data.plano) setSelectedPlan(data.plano)
        setStatus(data.status || 'PLAN_SELECTION')
      } catch {
        setError('Erro ao carregar dados do site')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [id])

  if (!id) {
    return <p className="text-center text-red-500">Site ID não encontrado.</p>
  }
  if (isLoading) {
    return <p className="text-center p-6">Carregando informações do plano...</p>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!selectedPlan) {
      setError('Selecione um plano para continuar.')
      return
    }

    setIsSubmitting(true) // Ativa o loading do submit
    try {
      const res = await fetch('/api/onboarding/plan', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId: id,
          plano: selectedPlan,
          status: 'TEMPLATE_SELECTION',
        }),
      })
      const body = await res.json()
      if (!res.ok) {
        setError(body.erro || 'Falha ao salvar plano.')
        return
      }
      router.push(`/account/theme_choice?siteId=${body.siteId}`)
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setIsSubmitting(false) // Desativa o loading do submit
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl flex flex-col items-center pb-12 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Escolha seu plano</h1>
      <p className="text-gray-600 mb-6 text-center">Selecione a opção que melhor atende suas necessidades</p>

      {error && <p className="text-red-600 font-medium text-sm text-center mb-4">{error}</p>}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gratuito */}
        <label className={`border rounded-lg p-6 cursor-pointer transition-all bg-white ${selectedPlan === 'gratuito'
          ? 'border-purple-500 ring-2 ring-purple-200'
          : 'border-gray-200 hover:border-purple-300'
          }`}>
          <input
            type="radio"
            name="plan"
            value="gratuito"
            checked={selectedPlan === 'gratuito'}
            onChange={() => setSelectedPlan('gratuito')}
            className="hidden"
          />
          <div className="flex items-center gap-3 mb-3">
            <BadgeCheck className="text-purple-500" size={20} />
            <h2 className="font-semibold text-lg text-gray-800">Gratuito</h2>
          </div>
          <p className="text-gray-600 text-sm mb-4">Para começar sem custos</p>
          <ul className="text-sm text-gray-700 space-y-2 mb-2">
            <li className="flex items-start gap-2">✔ <span>Site Próprio</span></li>
            <li className="flex items-start gap-2">✔ <span>Tema Personalizável</span></li>
            <li className="flex items-start gap-2">✔ <span>Suporte por email</span></li>
            <li className="flex items-start gap-2">✔ <span>0 Custos</span></li>
          </ul>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <span className="text-gray-700 font-medium">Grátis</span>
          </div>
        </label>

        {/* Premium */}
        <label className={`border rounded-lg p-6 cursor-pointer transition-all bg-white relative ${selectedPlan === 'premium'
          ? 'border-purple-600 ring-2 ring-purple-200'
          : 'border-gray-200 hover:border-purple-500'
          }`}>
          <div className="absolute top-0 right-0 -mt-3 -mr-1">
            <div className="bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
              <Star className="mr-1" size={12} />
              <span>Recomendado</span>
            </div>
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
            <ShieldCheck className="text-purple-600" size={20} />
            <h2 className="font-semibold text-lg text-purple-800">Premium</h2>
          </div>

          <p className="text-gray-700 text-sm mb-4">Recursos completos para melhores resultados</p>

          <ul className="text-sm text-gray-800 space-y-2 mb-2">
            <li className="flex items-start gap-2">✔ <span>Diversos templates</span></li>
            <li className="flex items-start gap-2">✔ <span>Relatório de acessos</span></li>
            <li className="flex items-start gap-2">✔ <span>Mais opções de personalização </span></li>
            <li className="flex items-start gap-2">✔ <span>Integração do Google Maps </span></li>
            <li className="flex items-start gap-2">✔ <span>Suporte prioritário</span></li>
          </ul>

          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="text-purple-700 font-bold">R$ 29/mês</span>
            <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
              Mais escolhido
            </span>
          </div>
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !selectedPlan}
        className={`w-full max-w-md mt-8 bg-purple-600 text-white font-medium py-3 rounded-lg hover:bg-purple-700 transition-all cursor-pointer
          ${isSubmitting ? "opacity-70 cursor-not-allowed hover:bg-purple-600" : ""}
          ${!selectedPlan ? "opacity-50 cursor-not-allowed hover:bg-purple-600" : ""}`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processando...
          </div>
        ) : (
          "Continuar"
        )}
      </button>
    </form>
  )
}