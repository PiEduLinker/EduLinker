'use client'

import { useState } from 'react'
import { useIsPremium } from '@/contexts/siteContext'

interface Props {
  onGenerated: (text: string) => void
}

export default function GenerateDescriptionButton({ onGenerated }: Props) {
  const isPremium = useIsPremium()
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    try {
      const res = await fetch('/api/descricao-ia/', {
        method: 'POST',
        credentials: 'include',
      })
      const { text } = await res.json()
      onGenerated(text)
    } catch {
      alert('Falha ao gerar descrição.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleGenerate}
      disabled={!isPremium || loading}
      className={`
        mt-4 px-6 py-3 rounded-full font-semibold transition
        ${isPremium
          ? 'bg-purple-600 hover:bg-purple-700 text-white'
          : 'bg-gray-300 cursor-not-allowed text-gray-600'}
      `}
      title={isPremium ? 'Gerar descrição com IA' : 'Disponível só no plano Premium'}
    >
      {loading ? 'Gerando…' : 'Gerar descrição com IA'}
    </button>
  )
}
