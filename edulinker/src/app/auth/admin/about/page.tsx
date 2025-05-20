'use client'
import React, { useState, useEffect, useCallback } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'

// Helper para converter arquivo em base64
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Falha ao processar imagem.'))
  })
}

type Destaque = { number: string; label: string }

export default function AdminAboutPage() {
  const [siteId, setSiteId] = useState<string | null>(null)
  const [descricao, setDescricao] = useState('')
  const [fotoSobre, setFotoSobre] = useState('')
  const [preview, setPreview] = useState('')
  const [destaques, setDestaques] = useState<Destaque[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Carrega dados iniciais
  useEffect(() => {
    ;(async () => {
      try {
        const st = await fetch('/api/onboarding/status', { credentials: 'include' })
        const { siteId: id } = await st.json()
        if (!id) throw new Error('Nenhum site em andamento')
        setSiteId(id)

        const res = await fetch(`/api/site/${id}`, { credentials: 'include' })
        if (!res.ok) throw new Error('Falha ao carregar dados do site')
        const { configuracoes } = await res.json()

        setDescricao(configuracoes.descricao ?? '')
        setFotoSobre(configuracoes.fotoSobre ?? '')
        setPreview(configuracoes.fotoSobre ?? '')
        if (configuracoes.destaques?.length) {
          setDestaques(configuracoes.destaques)
        }
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // Adiciona um novo destaque
  const handleAdd = useCallback(() => {
    if (destaques.length < 3) {
      setDestaques(ds => [...ds, { number: '', label: '' }])
    }
  }, [destaques.length])

  // Remove destaque pelo índice
  const handleRemove = useCallback((idx: number) => {
    setDestaques(ds => ds.filter((_, i) => i !== idx))
  }, [])

  // Evento para alterar um campo de destaque
  const handleDestaqueChange = useCallback(
    (idx: number, field: keyof Destaque, value: string) => {
      setDestaques(ds =>
        ds.map((d, i) => (i === idx ? { ...d, [field]: value } : d))
      )
    },
    []
  )

  // Upload de imagem
  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setFotoSobre('')
      setPreview('')
      return
    }
    try {
      const b64 = await fileToBase64(file)
      setFotoSobre(b64)
      setPreview(URL.createObjectURL(file))
    } catch {
      setError('Não foi possível processar a imagem.')
    }
  }, [])

  // Salvar tudo
  const handleSave = useCallback(async () => {
    if (!siteId) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/site/${siteId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configuracoes: { descricao, fotoSobre, destaques } }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.erro || 'Falha ao salvar')
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar.')
    } finally {
      setSaving(false)
    }
  }, [siteId, descricao, fotoSobre, destaques])

  if (loading) {
    return (
      <AdminLayout>
        <p className="p-6 text-center">Carregando configurações…</p>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6 sm:p-6">
        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Upload da imagem */}
        <div>
          <label className="block mb-2 font-medium">Imagem “Quem somos”</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <img src={preview} className="mt-2 w-48 h-auto rounded-md shadow" alt="Preview" />
          )}
        </div>

        {/* Texto descritivo */}
        <div>
          <label className="block mb-2 font-medium">Texto “Quem somos”</label>
          <textarea
            rows={6}
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            className="w-full border rounded-md p-3 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Destaques editáveis */}
        <div className="mt-6">
          <h2 className="mb-2 font-medium">Destaques</h2>
          {destaques.map((d, idx) => (
            <div key={idx} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                value={d.number}
                onChange={e => handleDestaqueChange(idx, 'number', e.target.value)}
                placeholder="Número"
                className="w-1/3 border rounded p-2"
              />
              <input
                type="text"
                value={d.label}
                onChange={e => handleDestaqueChange(idx, 'label', e.target.value)}
                placeholder="Texto"
                className="flex-1 border rounded p-2"
              />
              <button
                onClick={() => handleRemove(idx)}
                disabled={saving}
                className="text-red-500 hover:text-red-700"
              >
                Remover
              </button>
            </div>
          ))}
          {destaques.length < 3 && (
            <button
              onClick={handleAdd}
              disabled={saving}
              className="mt-2 text-blue-500 hover:text-blue-700"
            >
              + Adicionar destaque
            </button>
          )}
        </div>

        {/* Botão de salvar */}
        <button
          onClick={handleSave}
          disabled={saving}
          className={`w-full py-3 rounded-full text-white transition ${
            saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800'
          }`}
        >
          {saving ? 'Salvando…' : 'Salvar alterações'}
        </button>
      </div>
    </AdminLayout>
  )
}
