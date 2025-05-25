'use client'

import React, { useState, useCallback } from 'react'
import { Plus, Trash2, X, Upload, Loader2, Save } from 'lucide-react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { useSite } from '@/contexts/siteContext'
import { fileToBase64 } from '@/lib/fileUtils' 

interface Professor {
  nome: string
  descricao: string
  imagem?: string   // base64 ou URL
}

export default function AdminTeachersPage() {
  const { configuracoes, slug: siteId } = useSite()
  // inicializa já com o que veio do servidor
  const [professores, setProfessores] = useState<Professor[]>(configuracoes.professores ?? [])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>('')

  // troca apenas o item de índice `idx`
  const handleImageChange = useCallback(async (file: File, idx: number) => {
    if (!file.type.startsWith('image/')) {
      setError('Apenas imagens são permitidas.')
      return
    }
    try {
      const b64 = await fileToBase64(file)
      setProfessores(p => p.map((x, i) => i === idx ? { ...x, imagem: b64 } : x))
    } catch {
      setError('Falha ao processar imagem.')
    }
  }, [])

  const addProfessor = () => {
    setProfessores(p => [...p, { nome: '', descricao: '', imagem: '' }])
  }

  const removeProfessor = (idx: number) => {
    setProfessores(p => p.filter((_, i) => i !== idx))
  }

  const updateField = (idx: number, field: keyof Professor, value: string) => {
    setProfessores(p =>
      p.map((x, i) => i === idx ? { ...x, [field]: value } : x)
    )
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/site/${siteId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configuracoes: { professores } }),
      })
      if (!res.ok) throw new Error()
    } catch {
      setError('Falha ao salvar professores.')
    } finally {
      setSaving(false)
    }
  }

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
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 relative transition-all hover:shadow-lg">
              {/* Botão de Remover */}
              <button
                onClick={() => removeProfessor(idx)}
                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Remover professor"
              >
                <Trash2 size={18} />
              </button>

              {/* Nome */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 text-white mb-2">Nome</label>
                <input
                  type="text"
                  value={prof.nome}
                  onChange={e => updateField(idx, 'nome', e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all  placeholder:text-white text-white"
                  placeholder="Digite o nome do professor"
                />
              </div>

              {/* Descrição */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 text-white mb-2">Descrição</label>
                <textarea
                  value={prof.descricao}
                  onChange={e => updateField(idx, 'descricao', e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all min-h-[100px] placeholder:text-white text-white"
                  placeholder="Descrição sobre o professor"
                />
              </div>

              {/* Imagem */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Imagem</label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors">
                      <Upload size={16} className="mr-2" />
                      {prof.imagem ? 'Alterar imagem' : 'Selecionar imagem'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const f = e.target.files?.[0]
                        if (f) handleImageChange(f, idx)
                      }}
                      className="hidden"
                    />
                  </label>
                  {prof.imagem && (
                    <div className="relative group">
                      <img
                        src={prof.imagem}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-full border-2 border-white dark:border-gray-700 shadow-md"
                      />
                      <button
                        onClick={() => updateField(idx, 'imagem', '')}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Botão Adicionar */}
          <button
            onClick={addProfessor}
            className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all text-gray-600 dark:text-gray-400 font-medium cursor-pointer"
          >
            <Plus size={20} />
            Adicionar professor
          </button>

          {/* Botão Salvar */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 text-white py-2.5 px-6 rounded-lg transition-all shadow hover:shadow-md disabled:opacity-70 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg"
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
    </AdminLayout>)
}
