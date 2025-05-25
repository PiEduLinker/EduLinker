'use client'

import React, { useState, useCallback } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { Plus, Trash2, Loader2 } from 'lucide-react'
import { useSite, useIsPremium } from '@/contexts/siteContext'
import { fileToBase64 } from '@/lib/fileUtils'

interface Aula {
  foto: string
  titulo: string
  descricao: string
  nivel: string
  duracao: string
}

export default function AdminGradePage() {
  const { slug: siteId, configuracoes } = useSite()
  const isPremium = useIsPremium()
  const maxAulas = isPremium ? 12 : 4

  const initialAulas = (configuracoes.aulas as Aula[]) ?? []
  const [aulas, setAulas]   = useState<Aula[]>(initialAulas)
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')

  const handleAdd = useCallback(() => {
    if (aulas.length >= maxAulas) return
    setAulas(a => [
      ...a,
      { foto: '', titulo: '', descricao: '', nivel: '', duracao: '' }
    ])
  }, [aulas.length, maxAulas])

  const handleRemove = useCallback((idx: number) => {
    setAulas(a => a.filter((_, i) => i !== idx))
  }, [])

  const handleRemoveImage = useCallback((idx: number) => {
    setAulas(a => a.map((u, i) => i === idx ? { ...u, foto: '' } : u))
  }, [])

  const handleFile = useCallback(async (idx: number, file: File | null) => {
    if (!file) return
    try {
      const b64 = await fileToBase64(file)
      setAulas(a => a.map((u, i) => i === idx ? { ...u, foto: b64 } : u))
    } catch {
      setError('Erro ao processar imagem')
    }
  }, [])

  const handleChange = useCallback((idx: number, field: keyof Aula, v: string) => {
    setAulas(a => a.map((u, i) => i === idx ? { ...u, [field]: v } : u))
  }, [])

  const handleSave = useCallback(async () => {
    if (!siteId) return
    setSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/site/${siteId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configuracoes: { aulas } })
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
  }, [siteId, aulas])

return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Gerenciamento de Aulas</h1>

            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-600 text-center font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {aulas.map((u, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-6 relative transition-all hover:shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Aula #{idx + 1}</h3>
                    <button
                      onClick={() => handleRemove(idx)}
                      disabled={saving}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                      aria-label="Remover aula"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">Imagem da Aula</label>

                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => handleFile(idx, e.target.files?.[0] ?? null)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          id={`aula-upload-${idx}`}
                        />
                        <label
                          htmlFor={`aula-upload-${idx}`}
                          className="block px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-gray-400 transition-colors"
                        >
                          <span className="text-gray-600">
                            {u.foto ? 'Alterar imagem' : 'Selecione uma imagem'}
                          </span>
                        </label>
                      </div>

                      {u.foto && (
                        <div className="mt-4 space-y-2">
                          <div className="relative group">
                            <img
                              src={u.foto}
                              alt={`Imagem da aula ${idx + 1}`}
                              className="w-full h-auto max-h-64 object-contain rounded-lg border border-gray-200"
                            />
                            <button
                              onClick={() => handleRemoveImage(idx)}
                              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                              aria-label="Remover imagem"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 text-center">
                            Clique em "Alterar imagem" para substituir ou no ícone <Trash2 className="inline" size={12} /> para remover
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <input
                          type="text"
                          value={u.titulo}
                          onChange={e => handleChange(idx, 'titulo', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Nível</label>
                        <input
                          type="text"
                          value={u.nivel}
                          onChange={e => handleChange(idx, 'nivel', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <textarea
                          rows={4}
                          value={u.descricao}
                          onChange={e => handleChange(idx, 'descricao', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Duração</label>
                        <input
                          type="text"
                          value={u.duracao}
                          onChange={e => handleChange(idx, 'duracao', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                 </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200">
              {aulas.length < maxAulas ? (
                <button
                  onClick={handleAdd}
                  disabled={saving}
                  className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto"
                >
                  <Plus size={18} />
                  <span>Adicionar Aula</span>
                </button>
              ) : (
                !isPremium && (
                  <p className="text-sm text-gray-500">
                    Você atingiu o limite de 4 aulas. Faça upgrade para adicionar até 12.
                  </p>
                )
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
                  'Salvar Aulas'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
