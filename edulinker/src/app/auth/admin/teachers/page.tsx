'use client'

import React, { useState, useCallback } from 'react'
import { Plus, Trash2, X, Loader2, Save, Upload } from 'lucide-react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { useSite, useIsPremium } from '@/contexts/siteContext'
import { CldUploadWidget } from 'next-cloudinary'
import type { CloudinaryUploadWidgetResults } from 'next-cloudinary'

interface Professor {
  nome: string
  descricao: string
  imagem?: string
}

export default function AdminTeachersPage() {
  const { slug: siteId, configuracoes, setConfiguracoes } = useSite()
  const isPremium = useIsPremium()
  const maxProfessores = isPremium ? 12 : 4

  const initial = (configuracoes.professores as Professor[]) ?? []
  const [professores, setProfessores] = useState<Professor[]>(initial)
  const [saving, setSaving]           = useState(false)
  const [error, setError]             = useState<string>('')

  const addProfessor = useCallback(() => {
    if (professores.length >= maxProfessores) return
    setProfessores(p => [...p, { nome: '', descricao: '', imagem: '' }])
  }, [professores.length, maxProfessores])

  const removeProfessor = useCallback((idx: number) => {
    setProfessores(p => p.filter((_, i) => i !== idx))
  }, [])

  const updateField = useCallback((idx: number, field: keyof Professor, value: string) => {
    setProfessores(p =>
      p.map((x, i) => (i === idx ? { ...x, [field]: value } : x))
    )
  }, [])

  const handleSave = useCallback(async () => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/site/${siteId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configuracoes: { professores } }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.erro || 'Falha ao salvar professores.')
      }
      setConfiguracoes({
        ...configuracoes,
        professores,
      })

    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }, [siteId, professores, configuracoes, setConfiguracoes])

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center space-y-2 my-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Cadastro de Professores
          </h1>
          {error && (
            <div className="mt-3 p-2 sm:p-3 bg-red-50 text-red-600 rounded-lg inline-block mx-auto text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Lista de Professores */}
        <div className="space-y-6">
          {professores.map((prof, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 relative transition-all hover:shadow-lg"
            >
              {/* Remover */}
              <button
                onClick={() => removeProfessor(idx)}
                disabled={saving}
                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Remover professor"
              >
                <Trash2 size={18} />
              </button>

              {/* Nome */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  value={prof.nome}
                  onChange={e => updateField(idx, 'nome', e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Nome do professor"
                />
              </div>

              {/* Descrição */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  value={prof.descricao}
                  onChange={e => updateField(idx, 'descricao', e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 transition-all min-h-[100px]"
                  placeholder="Descrição sobre o professor"
                />
              </div>

              {/* Imagem */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagem
                </label>
                {prof.imagem && (
                  <div className="relative group mb-2">
                    <img
                      src={prof.imagem}
                      alt={`Professor ${idx + 1}`}
                      className="w-24 h-24 object-cover rounded-full border-2 border-gray-200"
                    />
                    <button
                      onClick={() => updateField(idx, 'imagem', '')}
                      disabled={saving}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remover imagem"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                <CldUploadWidget
                  uploadPreset="edulinker_unsigned"
                  options={{ folder: 'edulinker/professores', maxFiles: 1 }}
                  onSuccess={(res: CloudinaryUploadWidgetResults) => {
                    if (res.event !== 'success') return
                    const info = res.info
                    if (typeof info !== 'object' || !info.secure_url) return
                    setProfessores(p =>
                      p.map((x, i) =>
                        i === idx ? { ...x, imagem: info.secure_url } : x
                      )
                    )
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      disabled={saving}
                      className="inline-flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors"
                    >
                      <Upload size={16} className="mr-2" />
                      {prof.imagem ? 'Alterar imagem' : 'Selecionar imagem'}
                    </button>
                  )}
                </CldUploadWidget>
              </div>
            </div>
          ))}

          {/* Botão Adicionar */}
          {professores.length < maxProfessores ? (
            <button
              onClick={addProfessor}
              disabled={saving}
              className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all text-gray-600 dark:text-gray-400 font-medium"
            >
              <Plus size={20} />
              Adicionar professor
            </button>
          ) : (
            !isPremium && (
              <p className="text-center text-sm text-gray-500">
                Limite de 4 professores no plano gratuito. Faça upgrade para até 12.
              </p>
            )
          )}

          {/* Botão Salvar */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 text-white py-2.5 px-6 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-70"
            >
              {saving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {saving ? 'Salvando...' : 'Salvar professores'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
