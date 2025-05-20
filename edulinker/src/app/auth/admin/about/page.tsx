'use client'
import React, { useState, useEffect } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'

export default function AdminAboutPage() {
  const [siteId, setSiteId]         = useState<string | null>(null)
  const [descricao, setDescricao]   = useState('')
  const [fotoSobre, setFotoSobre]   = useState<string>('')
  const [preview, setPreview]       = useState<string>('')
  const [loading, setLoading]       = useState(true)
  const [saving, setSaving]         = useState(false)
  const [error, setError]           = useState('')

  useEffect(() => {
    async function load() {
      try {
        const st = await fetch('/api/onboarding/status', { credentials:'include' })
        const { siteId: id } = await st.json()
        if (!id) throw new Error('Nenhum site em andamento')
        setSiteId(id)

        const res = await fetch(`/api/site/${id}`, { credentials:'include' })
        if (!res.ok) throw new Error('Falha ao carregar')
        const { configuracoes } = await res.json()
        setDescricao(configuracoes.descricao || '')
        setFotoSobre(configuracoes.fotoSobre || '')
        setPreview(configuracoes.fotoSobre || '')
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  function fileToBase64(file: File): Promise<string> {
    return new Promise((res, rej) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => res(reader.result as string)
      reader.onerror = () => rej()
    })
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      setPreview('')
      setFotoSobre('')
      return
    }
    const b64 = await fileToBase64(file)
    setFotoSobre(b64)
    setPreview(URL.createObjectURL(file))
  }

  const handleSave = async () => {
    if (!siteId) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/site/${siteId}`, {
        method:'PUT', credentials:'include',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ configuracoes:{ descricao, fotoSobre } })
      })
      if (!res.ok) throw new Error()
    } catch {
      setError('Erro ao salvar.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <AdminLayout><p>Carregando…</p></AdminLayout>

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6 sm:p-6">
        {error && <p className="text-red-600">{error}</p>}

        <div>
          <label className="block mb-2">Imagem “Quem somos”</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <img src={preview} className="mt-2 w-48 h-auto rounded" />
          )}
        </div>

        <div>
          <label className="block mb-2">Texto “Quem somos”</label>
          <textarea
            rows={6}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-purple-700 text-white px-4 py-2 rounded"
        >
          {saving ? 'Salvando…' : 'Salvar alterações'}
        </button>
      </div>
    </AdminLayout>
  )
}
