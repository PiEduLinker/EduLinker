'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import CreateAccountLayout from '@/components/Layouts/CreateAccountLayout'

export default function PlanSelectionPage() {
  const router = useRouter()
  const params = useSearchParams()
  const siteId = params.get('siteId')

  const [selectedPlan, setSelectedPlan] = useState<'gratuito' | 'premium' | ''>('')
  const [error, setError] = useState('')

  if (!siteId) {
    return (
      <CreateAccountLayout>
        <p className="text-center text-red-500">Site ID não encontrado.</p>
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
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.erro || 'Falha ao salvar plano.')
        return
      }
      router.push(`/account/theme_choice?siteId=${siteId}`)
    } catch {
      setError('Erro de conexão. Tente novamente.')
    }
  }

  return (
    <CreateAccountLayout>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Escolha seu Plano
        </h1>

        {error && (
          <p className="text-red-600 font-medium text-sm text-center">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label
            className={`border rounded-lg p-6 cursor-pointer hover:border-purple-500 transition ${
              selectedPlan === 'gratuito'
                ? 'border-purple-600 bg-purple-50'
                : 'border-gray-300'
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
            <h2 className="font-semibold text-lg">Plano Gratuito</h2>
            <p className="mt-2 text-gray-600">Acesso básico sem custos.</p>
          </label>

          <label
            className={`border rounded-lg p-6 cursor-pointer hover:border-purple-500 transition ${
              selectedPlan === 'premium'
                ? 'border-purple-600 bg-purple-50'
                : 'border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="plan"
              value="premium"
              checked={selectedPlan === 'premium'}
              onChange={() => setSelectedPlan('premium')}
              className="hidden"
            />
            <h2 className="font-semibold text-lg">Plano Premium</h2>
            <p className="mt-2 text-gray-600">
              Recursos avançados e suporte prioritário.
            </p>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 text-white font-semibold py-3 rounded-full hover:bg-purple-800 transition"
        >
          Continuar
        </button>
      </form>
    </CreateAccountLayout>
  )
}
