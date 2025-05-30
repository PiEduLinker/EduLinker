'use client'

import React, { useState, useCallback, useEffect } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { Plus, Trash2, Loader2 } from 'lucide-react'
import { useSite, useIsPremium } from '@/contexts/siteContext'
import { CldUploadWidget } from 'next-cloudinary'
import type { CloudinaryUploadWidgetResults } from 'next-cloudinary'

interface Aula {
  foto: string
  titulo: string
  descricao: string
  nivel: string
  duracao: string
}

export default function AdminGradePage() {
  const { slug: siteId, configuracoes, setConfiguracoes } = useSite()
  const isPremium = useIsPremium()
  const maxAulas = isPremium ? 12 : 4
  const [success, setSuccess] = useState('');

  const initialAulas = (configuracoes.aulas as Aula[]) ?? []
  const [aulas, setAulas] = useState<Aula[]>(initialAulas)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

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

  const handleChange = useCallback((idx: number, field: keyof Aula, v: string) => {
    setAulas(a => a.map((u, i) => i === idx ? { ...u, [field]: v } : u))
  }, [])

  const handleSave = useCallback(async () => {
    if (!siteId) return
    setSaving(true)
    setError('')
    setSuccess('');

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
      setConfiguracoes({
        ...configuracoes,
        aulas,
      })
      setSuccess('Aulas atualizadas!');
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }, [
    siteId,
    aulas,
    configuracoes,
    setConfiguracoes,
  ])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);


  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Gerenciamento de Aulas</h1>

            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-600 text-center font-medium">{error}</p>
              </div>
            )}

            {success && (
              <div className="fixed top-20 z-50 left-1/2 xl:translate-x-[50%]">
                <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-fade-in-down">
                  <span>{success}</span>
                </div>
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
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50 cursor-pointer"
                      aria-label="Remover aula"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Imagem */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Imagem da Aula</label>
                    {u.foto && (
                      <div className="relative group mb-2">
                        <img
                          src={u.foto}
                          alt={`Aula ${idx + 1}`}
                          className="w-full h-auto max-h-64 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          onClick={() => handleRemoveImage(idx)}
                          disabled={saving}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors cursor-pointer"
                          aria-label="Remover imagem"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}

                    <CldUploadWidget
                      uploadPreset="edulinker_unsigned"
                      options={{ folder: 'edulinker/aulas', maxFiles: 1 }}
                      onSuccess={(result: CloudinaryUploadWidgetResults) => {
                        if (result.event !== 'success') return
                        const info = result.info
                        if (typeof info === 'string' || !info) return
                        const url = info.secure_url
                        setAulas(a =>
                          a.map((it, i) => (i === idx ? { ...it, foto: url } : it))
                        )
                      }}
                    >
                      {({ open }) => (
                        <button
                          type="button"
                          onClick={() => open()}
                          className="block w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-600 hover:border-gray-400 transition-colors cursor-pointer"
                          disabled={saving}
                        >
                          <Plus className="inline mr-1" />
                          {u.foto ? 'Alterar imagem' : 'Selecione uma imagem'}
                        </button>
                      )}
                    </CldUploadWidget>
                  </div>

                  {/* Campos textuais */}
                  <div className="grid gap-6 sm:grid-cols-2 mt-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Título</label>
                      <input
                        type="text"
                        value={u.titulo}
                        placeholder='Título da Aula'
                        onChange={e => handleChange(idx, 'titulo', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Nível</label>
                      <input
                        type="text"
                        value={u.nivel}
                        placeholder='Ex: Iniciante, Intermediário, Avançado'
                        onChange={e => handleChange(idx, 'nivel', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Descrição</label>
                      <textarea
                        rows={4}
                        value={u.descricao}
                        placeholder='Descreva o conteúdo da aula...'
                        onChange={e => handleChange(idx, 'descricao', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Duração</label>
                      <input
                        type="text"
                        value={u.duracao}
                        placeholder='Ex: 1h 30min'
                        onChange={e => handleChange(idx, 'duracao', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Adicionar / Limite */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200">
              {aulas.length < maxAulas ? (
                <button
                  onClick={handleAdd}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition w-full sm:w-auto cursor-pointer"
                >
                  <Plus size={18} />
                  <span>Adicionar Aula</span>
                </button>
              ) : (
                !isPremium && (
                  <p className="text-sm text-gray-500">
                    Limite de 4 aulas no plano gratuito. Faça upgrade para até 12.
                  </p>
                )
              )}

              <button
                onClick={handleSave}
                disabled={saving}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-medium transition cursor-pointer ${saving
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                  }`}
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={20} className="animate-spin" />
                    Salvando...
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
