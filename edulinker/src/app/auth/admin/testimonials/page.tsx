'use client'

import React, { useState, useEffect, useCallback } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { Plus, Trash2, Star, Loader2 } from 'lucide-react'

type Testimonial = {
  foto: string
  nome: string
  texto: string
  estrelas: number
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Erro ao processar imagem'))
  })
}

export default function AdminTestimonialsPage() {
  const [siteId, setSiteId] = useState<string | null>(null)
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const st = await fetch('/api/onboarding/status', { credentials: 'include' })
        const { siteId: id } = await st.json()
        if (!id) throw new Error('Nenhum site em andamento')
        setSiteId(id)

        const res = await fetch(`/api/site/${id}`, { credentials: 'include' })
        if (!res.ok) throw new Error('Falha ao carregar depoimentos')
        const { configuracoes } = await res.json()
        setItems(configuracoes.depoimentos ?? [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleAdd = useCallback(() => {
    if (items.length < 4) {
      setItems(i => [
        ...i,
        { foto: '', nome: '', texto: '', estrelas: 5 }
      ])
    }
  }, [items.length])

  const handleRemove = useCallback((idx: number) => {
    setItems(i => i.filter((_, j) => j !== idx))
  }, [])

  const handleRemoveImage = useCallback((idx: number) => {
    setItems(i => i.map((it, j) => j === idx ? { ...it, foto: '' } : it))
  }, [])

  const handleFile = useCallback(async (idx: number, file: File | null) => {
    if (!file) return
    try {
      const b64 = await fileToBase64(file)
      setItems(i => i.map((it, j) =>
        j === idx ? { ...it, foto: b64 } : it
      ))
    } catch {
      setError('Erro ao processar imagem')
    }
  }, [])

  const handleChange = useCallback((idx: number, field: keyof Testimonial, value: string | number) => {
    setItems(i => i.map((it, j) =>
      j === idx ? { ...it, [field]: value } : it
    ))
  }, [])

  const handleSave = useCallback(async () => {
    if (!siteId) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/site/${siteId}`, {
        method: 'PUT', credentials: 'include',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ configuracoes:{ depoimentos: items } })
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.erro||'Falha ao salvar')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }, [siteId, items])

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Gerenciamento de Depoimentos</h1>

            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-600 text-center font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {items.map((item, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-6 relative transition-all hover:shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Depoimento #{idx + 1}</h3>
                    <button
                      onClick={() => handleRemove(idx)}
                      disabled={saving}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Seção de Foto */}
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">Foto do Depoente</label>
                      
                      <div className="flex flex-col sm:flex-row gap-6 items-start">
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleFile(idx, e.target.files?.[0] ?? null)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            id={`testimonial-upload-${idx}`}
                          />
                          <label
                            htmlFor={`testimonial-upload-${idx}`}
                            className="block px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <span className="text-gray-600">
                              {item.foto ? 'Alterar foto' : 'Selecione uma foto'}
                            </span>
                          </label>
                        </div>

                        {item.foto && (
                          <div className="relative group">
                            <img 
                              src={item.foto} 
                              alt={`Foto ${idx+1}`} 
                              className="w-24 h-24 object-cover rounded-full border-2 border-gray-200"
                            />
                            <button
                              onClick={() => handleRemoveImage(idx)}
                              className="absolute top-0 right-0 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                              aria-label="Remover foto"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Campos do formulário */}
                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                          type="text"
                          value={item.nome}
                          onChange={e => handleChange(idx, 'nome', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="Nome completo"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Depoimento</label>
                        <textarea
                          rows={4}
                          value={item.texto}
                          onChange={e => handleChange(idx, 'texto', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="Texto do depoimento"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Avaliação</label>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map(n => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => handleChange(idx, 'estrelas', n)}
                              className="focus:outline-none"
                            >
                              <Star
                                size={24}
                                className={`${n <= item.estrelas ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} transition-colors`}
                              />
                            </button>
                          ))}
                          <span className="ml-2 text-sm text-gray-500">
                            {item.estrelas} {item.estrelas === 1 ? 'estrela' : 'estrelas'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200">
              {items.length < 4 && (
                <button
                  onClick={handleAdd}
                  disabled={saving}
                  className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto"
                >
                  <Plus size={18} />
                  <span>Adicionar Depoimento</span>
                </button>
              )}

              <button
                onClick={handleSave}
                disabled={saving}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-medium transition-all ${
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
                  'Salvar Depoimentos'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}