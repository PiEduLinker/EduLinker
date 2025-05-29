'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'
import type {
  CloudinaryUploadWidgetError,
  CloudinaryUploadWidgetResults
} from 'next-cloudinary'

interface Props {
  siteId?: string
}

export default function ClientSchoolDescription({ siteId }: Props) {
  const router = useRouter()

  const [schoolName, setSchoolName] = useState('')
  const [description, setDescription] = useState('')
  const [logoPreview, setLogoPreview] = useState('')  
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

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
        if (data.descricao) setDescription(data.descricao)
        if (data.logo) setLogoPreview(data.logo)  
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [siteId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!siteId) return

    try {
      const payload = {
        siteId,
        siteNome: schoolName,
        descricao: description,
        logo: logoPreview,     
        status: 'PLAN_SELECTION',
      }

      const res = await fetch('/api/onboarding/basic', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.erro || 'Falha ao salvar dados básicos.')
        return
      }

      router.push(`/account/plan_selection?siteId=${siteId}`)
    } catch (err: any) {
      setError(err.message || 'Erro inesperado. Tente novamente.')
    }
  }

  if (loading) return <p className="text-center p-6">Carregando dados da escola...</p>

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
          <CldUploadWidget
            uploadPreset="edulinker_unsigned"
            options={{ folder: 'edulinker/logos', maxFiles: 1 }}
            onError={(err: CloudinaryUploadWidgetError) => {
              console.error(err)
              setError('Falha ao enviar logo.')
            }}
            onSuccess={(result: CloudinaryUploadWidgetResults) => {
              const info = result.info
              if (typeof info !== 'string' && info) {
                setLogoPreview(info.secure_url)
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="w-14 h-14 border rounded-full flex items-center justify-center cursor-pointer hover:border-purple-500 transition"
              >
                {logoPreview
                  ? <img src={logoPreview} alt="Logo atual" className="w-full h-full rounded-full object-cover" />
                  : <Plus size={24} />}
              </button>
            )}
          </CldUploadWidget>

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
