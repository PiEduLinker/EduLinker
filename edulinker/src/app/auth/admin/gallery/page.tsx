'use client'

import { useState, useCallback } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { Plus, Trash2, Loader2 } from 'lucide-react'
import { useSite, useIsPremium } from '@/contexts/siteContext'
import { fileToBase64 } from '@/lib/fileUtils'

interface GalleryItem {
  imagem: string // base64 ou URL
}

export default function AdminGalleryPage() {
  const { slug: siteId, configuracoes } = useSite()
  const isPremium = useIsPremium()

  // máximo de slots conforme plano
  const maxSlots = isPremium ? 12 : 3

  const initialGalerias = (configuracoes.galerias as GalleryItem[]) ?? []
  const [galerias, setGalerias] = useState<GalleryItem[]>(initialGalerias)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState('')

  const handleAdd = useCallback(() => {
    if (galerias.length >= maxSlots) return
    setGalerias(g => [...g, { imagem: '' }])
  }, [galerias.length, maxSlots])

  const handleRemove = useCallback((idx: number) => {
    setGalerias(g => g.filter((_, i) => i !== idx))
  }, [])

  const handleRemoveImage = useCallback((idx: number) => {
    setGalerias(g => g.map((it, i) => i === idx ? { imagem: '' } : it))
  }, [])

  const handleFile = useCallback(async (idx: number, file: File | null) => {
    if (!file) return
    try {
      const b64 = await fileToBase64(file)
      setGalerias(g => g.map((it, i) => i === idx ? { imagem: b64 } : it))
    } catch {
      setError('Erro ao processar imagem')
    }
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
                <div key={idx} className="border border-gray-200 rounded-xl p-4 relative transition-all hover:shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-500">Imagem #{idx+1}</span>
                    <button 
                      onClick={() => handleRemove(idx)}
                      disabled={saving}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleFile(idx, e.target.files?.[0] ?? null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id={`gallery-upload-${idx}`}
                      />
                      <label
                        htmlFor={`gallery-upload-${idx}`}
                        className="block px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-gray-400 transition-colors"
                      >
                        <span className="text-gray-600">
                          {item.imagem ? 'Alterar imagem' : 'Selecione uma imagem'}
                        </span>
                      </label>
                    </div>

                    {item.imagem && (
                      <div className="mt-2 space-y-2">
                        <div className="relative group">
                          <img
                            src={item.imagem}
                            alt={`Galeria ${idx+1}`}
                            className="w-full h-40 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            aria-label="Remover imagem"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 text-center">
                          Clique para alterar ou no ícone{' '}
                          <Trash2 className="inline" size={10} /> para remover
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {galerias.length < maxSlots ? (
                <button
                  onClick={handleAdd}
                  disabled={saving}
                  className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-gray-400 transition-colors h-full min-h-[200px]"
                >
                  <Plus size={24} className="text-gray-400 mb-2" />
                  <span className="text-gray-600 font-medium">Adicionar foto</span>
                  {!isPremium && (
                    <span className="text-xs text-gray-500 mt-1">
                      Planos não-Premium limitam a 3 fotos
                    </span>
                  )}
                </button>
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
                className={`w-full py-3.5 px-6 rounded-xl text-white font-medium transition-all ${
                  saving
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
