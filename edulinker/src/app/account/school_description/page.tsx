'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Plus } from 'lucide-react'
import CreateAccountLayout from '@/components/Layouts/CreateAccountLayout'

export default function SchoolInfoPage() {
  const router = useRouter()
  const params = useSearchParams()
  const siteId = params.get('siteId')

  const [schoolName, setSchoolName] = useState('')
  const [description, setDescription] = useState('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [error, setError] = useState('')

  if (!siteId) {
    return <p className="text-center text-red-500">Site ID não encontrado.</p>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const logoUrl = '' 

      const res = await fetch('/api/onboarding/basic', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId,
          siteNome: schoolName,
          descricao: description,
          logo: logoUrl,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.erro || 'Falha ao salvar dados básicos.')
        return
      }

      router.push(`/account/plan_selection?siteId=${siteId}`)
    } catch {
      setError('Erro de conexão. Tente novamente.')
    }
  }

  return (
    <CreateAccountLayout>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg flex flex-col items-center justify-center flex-1 pb-12"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 text-center">
          FALE SOBRE SUA ESCOLA
        </h1>

        {error && (
          <p className="text-red-600 font-medium text-sm text-center mb-4">
            {error}
          </p>
        )}

        <div className="w-full space-y-4">
          <input
            type="text"
            placeholder="Nome da escola"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 outline-none transition"
            required
          />

          <textarea
            placeholder="Breve descrição"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 outline-none transition resize-none"
            required
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-3 pt-2">
            <label className="w-14 h-14 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:border-purple-500 transition mx-auto sm:mx-0">
              <Plus className="text-gray-500" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setLogoFile(e.target.files?.[0] ?? null)
                }
              />
            </label>
            <p className="text-sm text-gray-700 text-center sm:text-left">
              Adicione uma imagem <br className="hidden sm:block" /> para o logo
              (opcional)
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-purple-700 text-white font-semibold py-3 rounded-full hover:bg-purple-800 transition cursor-pointer"
        >
          Continuar
        </button>
      </form>
    </CreateAccountLayout>
  )
}
