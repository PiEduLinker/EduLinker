'use client'

import React, { useState, useCallback } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { Plus, Trash2, Loader2 } from 'lucide-react'
import { useSite, useIsPremium } from '@/contexts/siteContext'
import { CldUploadWidget } from 'next-cloudinary'
import type { CloudinaryUploadWidgetResults } from 'next-cloudinary'

interface GalleryItem {
  imagem: string
}

export default function AdminGalleryPage() {
  const { slug: siteId, configuracoes } = useSite()
  const isPremium = useIsPremium()

  const maxSlots = isPremium ? 12 : 3
  const initialGalerias = (configuracoes.galerias as GalleryItem[]) ?? []
  const [galerias, setGalerias] = useState<GalleryItem[]>(initialGalerias)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState('')

  const handleAdd = useCallback(() => {
    if (galerias.length < maxSlots) {
      setGalerias(g => [...g, { imagem: '' }])
    }
  }, [galerias.length, maxSlots])

  const handleRemove = useCallback((idx: number) => {
    setGalerias(g => g.filter((_, i) => i !== idx))
  }, [])

  const handleRemoveImage = useCallback((idx: number) => {
    setGalerias(g => g.map((it, i) => i === idx ? { imagem: '' } : it))
  }, [])

  const handleSave = useCallback(async () => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/site/${siteId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configuracoes: { galerias } }),
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
  }, [siteId, galerias])

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Gerenciamento da Galeria</h1>

            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-600 text-center font-medium">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galerias.map((item, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-4 relative hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-500">Imagem #{idx + 1}</span>
                    <button
                      onClick={() => handleRemove(idx)}
                      disabled={saving}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-full transition hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {item.imagem && (
                    <div className="mb-3">
                      <img
                        src={item.imagem}
                        alt={`Galeria ${idx + 1}`}
                        className="w-full h-40 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  )}

                  <CldUploadWidget
                    uploadPreset="edulinker_unsigned"
                    options={{ folder: 'edulinker/gallery', maxFiles: 1 }}
                    onSuccess={(result: CloudinaryUploadWidgetResults) => {
                      if (result.event !== 'success') return
                      const info = result.info
                      if (typeof info === 'string' || !info) return
                      const url = info.secure_url
                      setGalerias(g =>
                        g.map((gItem, i) => i === idx ? { imagem: url } : gItem)
                      )
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition"
                        disabled={saving}
                      >
                        <Plus className="inline mr-1" />{' '}
                        {item.imagem ? 'Alterar imagem' : 'Selecione uma imagem'}
                      </button>
                    )}
                  </CldUploadWidget>

                  {item.imagem && (
                    <button
                      onClick={() => handleRemoveImage(idx)}
                      disabled={saving}
                      className="mt-2 flex items-center gap-1 text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={14} /> Remover Imagem
                    </button>
                  )}
                </div>
              ))}

              {galerias.length < maxSlots ? (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-gray-400 transition h-full">
                  <button
                    onClick={handleAdd}
                    disabled={saving}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <Plus size={24} /> Adicionar Foto
                  </button>
                  {!isPremium && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Até 3 fotos no plano gratuito.
                      <br />
                      Faça upgrade para adicionar até 12.
                    </p>
                  )}
                </div>
              ) : (
                !isPremium && (
                  <p className="col-span-full text-center text-sm text-gray-500 mt-4">
                    Você atingiu o limite de 3 fotos. Faça upgrade para adicionar mais.
                  </p>
                )
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleSave}
                disabled={saving}
                className={`w-full py-3.5 px-6 rounded-xl text-white font-medium transition ${
                  saving
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                }`}
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={20} className="animate-spin" />
                    <span>Salvando...</span>
                  </span>
                ) : (
                  'Salvar Galeria'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
