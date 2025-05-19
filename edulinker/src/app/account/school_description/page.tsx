'use client'

import { useState, useEffect } from 'react'
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
  const [logoPreview, setLogoPreview] = useState<string>('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentStatus, setCurrentStatus] = useState<'BASIC_INFO' | 'PLAN_SELECTION' | 'TEMPLATE_SELECTION' | 'COMPLETED'>('BASIC_INFO')

  useEffect(() => {
    if (!siteId) return

    async function loadSiteData() {
      try {
        // Busca o status atual do site
        const response = await fetch(`/api/site/${siteId}`, {
          credentials: 'include',
        })
        
        if (!response.ok) throw new Error('Falha ao carregar dados do site')
        
        const siteData = await response.json()
        
        // Preenche os campos se já existirem dados
        if (siteData.descricao) setDescription(siteData.descricao)
        if (siteData.configuracoes?.nomeEscola) setSchoolName(siteData.configuracoes.nomeEscola)
        if (siteData.logo) setLogoPreview(siteData.logo)
        
        // Atualiza o status
        setCurrentStatus(siteData.status || 'BASIC_INFO')
      } catch (err) {
        setError('Erro ao carregar dados do site')
      } finally {
        setLoading(false)
      }
    }

    loadSiteData()
  }, [siteId])

  if (!siteId) {
    return <p className="text-center text-red-500">Site ID não encontrado.</p>
  }

  if (loading) {
    return (
      <CreateAccountLayout status={currentStatus}>
        <p className="text-center p-6">Carregando dados da escola...</p>
      </CreateAccountLayout>
    )
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (err) => reject(err)
    })
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null
    if (f) {
      if (!f.type.startsWith('image/')) {
        setError('Apenas imagens são permitidas.')
        setLogoFile(null)
        setLogoPreview('')
        return
      }
      setLogoFile(f)
      const preview = URL.createObjectURL(f)
      setLogoPreview(preview)
    } else {
      setLogoFile(null)
      setLogoPreview('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

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
          status: 'PLAN_SELECTION' // Atualiza o status para a próxima etapa
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
    <CreateAccountLayout status={currentStatus}>
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
    </CreateAccountLayout>
  )
}