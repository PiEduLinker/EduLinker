'use client'

import React, { useState, useEffect, useCallback } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { Plus, Trash2 } from 'lucide-react'

interface BannerItem {
  imagem: string // base64 string
}

// Helper to convert file to base64
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Erro ao processar imagem'))
  })
}

export default function AdminBannerPage() {
  const [siteId, setSiteId] = useState<string | null>(null)
  const [banners, setBanners] = useState<BannerItem[]>([])
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
        if (!res.ok) throw new Error('Falha ao carregar banners')
        const { configuracoes } = await res.json()
        setBanners(configuracoes.carrossel ?? [])
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // Adiciona novo slot de banner
  const handleAdd = useCallback(() => {
    if (banners.length < 3) {
      setBanners(b => [...b, { imagem: '' }])
    }
  }, [banners.length])

  // Remove banner pelo índice
  const handleRemove = useCallback((idx: number) => {
    setBanners(b => b.filter((_, i) => i !== idx))
  }, [])

  // Processa upload de imagem
  const handleFile = useCallback(async (idx: number, file: File | null) => {
    if (!file) return
    try {
      const b64 = await fileToBase64(file)
      setBanners(b => b.map((item, i) => i === idx ? { imagem: b64 } : item))
    } catch {
      setError('Erro ao processar imagem')
    }
  }, [])

  // Salva banners
  const handleSave = useCallback(async () => {
    if (!siteId) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/site/${siteId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configuracoes: { carrossel: banners } }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.erro || 'Falha ao salvar')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }, [siteId, banners])

  if (loading) {
    return (
      <AdminLayout>
        <p className="p-6 text-center">Carregando banners…</p>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6 sm:p-6">
        {error && <p className="text-red-600 text-center">{error}</p>}

        {banners.map((item, idx) => (
          <div key={idx} className="border rounded-lg p-4 relative">
            <button
              onClick={() => handleRemove(idx)}
              disabled={saving}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>

            <label className="block mb-2 font-medium">Imagem {idx + 1}</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => handleFile(idx, e.target.files?.[0] ?? null)}
            />
            {item.imagem && (
              <img
                src={item.imagem}
                alt={`Banner ${idx + 1}`}
                className="mt-2 w-full h-auto rounded"
              />
            )}
          </div>
        ))}

        {banners.length < 3 && (
          <button
            onClick={handleAdd}
            disabled={saving}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <Plus size={16} className="mr-1" />
            Adicionar banner
          </button>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className={`w-full py-3 rounded-full text-white transition ${
            saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800'
          }`}
        >
          {saving ? 'Salvando…' : 'Salvar banners'}
        </button>
      </div>
    </AdminLayout>
  )
}
