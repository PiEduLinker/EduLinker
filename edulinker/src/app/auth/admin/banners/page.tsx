'use client'

import React, { useState, useEffect, useCallback } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { Plus, Trash2, Loader2 } from 'lucide-react'

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
    ; (async () => {
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
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Gerenciamento de Banners</h1>

            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-600 text-center font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {banners.map((item, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-6 relative transition-all hover:shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Banner #{idx + 1}</h3>
                    <button
                      onClick={() => handleRemove(idx)}
                      disabled={saving}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                      aria-label="Remover banner"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <label className="text-sm font-medium text-gray-700">Upload da Imagem</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => handleFile(idx, e.target.files?.[0] ?? null)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          id={`banner-upload-${idx}`}
                        />
                        <label
                          htmlFor={`banner-upload-${idx}`}
                          className="block px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-gray-400 transition-colors"
                        >
                          <span className="text-gray-600">
                            {item.imagem ? 'Alterar imagem' : 'Selecione uma imagem'}
                          </span>
                        </label>
                      </div>
                    </div>

                    {item.imagem && (
                      <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={item.imagem}
                          alt={`Banner ${idx + 1}`}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {banners.length < 3 && (
              <button
                onClick={handleAdd}
                disabled={saving}
                className="mt-6 flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto"
              >
                <Plus size={18} />
                <span>Adicionar Banner</span>
              </button>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleSave}
                disabled={saving}
                className={`w-full py-3.5 px-6 rounded-xl text-white font-medium transition-all ${saving
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg'
                  }`}
              >
                {saving ? (
                  <span className="flex items-center justify-center space-x-2">
                    <Loader2 size={20} className="animate-spin" />
                    <span>Salvando...</span>
                  </span>
                ) : (
                  'Salvar Alterações'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
    )
}
