'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'

interface Props {
  siteId?: string
}

export default function ClientSchoolDescription({ siteId }: Props) {
  const router = useRouter()

  const [schoolName, setSchoolName]   = useState('')
  const [description, setDescription] = useState('')
  const [logoFile, setLogoFile]       = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState('')
  const [error, setError]             = useState<string | null>(null)
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    if (!siteId) {
      setError('ID do site não encontrado.')
      setLoading(false)
      return
    }
    ;(async () => {
      try {
        const res = await fetch(`/api/site/${siteId}`, { credentials: 'include' })
        if (!res.ok) throw new Error('Falha ao carregar dados do site')
        const data = await res.json()

        if (data.configuracoes?.nomeEscola) setSchoolName(data.configuracoes.nomeEscola)
        if (data.descricao)               setDescription(data.descricao)
        if (data.logo)                    setLogoPreview(data.logo)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [siteId])

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload  = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Apenas imagens são permitidas.')
        setLogoFile(null)
        setLogoPreview('')
        return
      }
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    } else {
      setLogoFile(null)
      setLogoPreview('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!siteId) return

    try {
      let logoBase64 = ''
      if (logoFile) {
        logoBase64 = await fileToBase64(logoFile)
      }

      const res = await fetch('/api/onboarding/basic', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId,
          siteNome: schoolName,
          descricao: description,
          logo: logoBase64,
          status: 'PLAN_SELECTION'
        }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.erro || 'Falha ao salvar dados básicos.')

      router.push(`/account/plan_selection?siteId=${siteId}`)
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) return <p className="text-center p-6">Carregando dados da escola...</p>
  if (error)   return <p className="text-center text-red-500">{error}</p>

  return (
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
            required
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            placeholder="Breve descrição"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded resize-none"
          />

          <div className="flex items-center gap-4">
            <label className="w-14 h-14 border rounded-full flex items-center justify-center cursor-pointer hover:border-purple-500 transition">
              <Plus size={24} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Preview do logo"
                className="w-14 h-14 rounded-full object-cover"
              />
            )}
            <p className="text-sm text-gray-700">
              Adicione um logo (opcional)
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
  )
}
