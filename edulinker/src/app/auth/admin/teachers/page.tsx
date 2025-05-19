'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import AdminLayout from '@/components/Layouts/AdminLayout'

interface Professor {
  nome: string
  descricao: string
  imagem?: string   // base64 ou URL
}

export default function AdminTeachersPage() {
  const [siteId, setSiteId] = useState<string>()
  const [professores, setProfessores] = useState<Professor[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>()

  // 1) Carrega siteId e professores
  useEffect(() => {
    async function load() {
      try {
        // siteId do onboarding
        const st = await fetch('/api/onboarding/status', { credentials: 'include' })
        const { siteId: id } = await st.json()
        setSiteId(id)

        // dados do site
        const res = await fetch(`/api/site/${id}`, { credentials: 'include' })
        const { configuracoes } = await res.json()
        setProfessores(configuracoes.professores || [])
      } catch (err: any) {
        setError('Não foi possível carregar professores.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // 2) Lida com mudança de imagem
  const handleImageChange = async (file: File, index: number) => {
    if (!file.type.startsWith('image/')) {
      setError('Apenas imagens são permitidas.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const copy = [...professores]
      copy[index].imagem = reader.result as string
      setProfessores(copy)
    }
    reader.readAsDataURL(file)
  }

  // 3) Adicionar novo professor
  const addProfessor = () => {
    setProfessores([
      ...professores,
      { nome: '', descricao: '', imagem: '' }
    ])
  }

  // 4) Remover professor
  const removeProfessor = (idx: number) => {
    setProfessores(professores.filter((_, i) => i !== idx))
  }

  // 5) Atualizar campos texto
  const updateField = (idx: number, field: keyof Professor, value: string) => {
    const copy = [...professores]
    // @ts-ignore
    copy[idx][field] = value
    setProfessores(copy)
  }

  // 6) Salvar tudo
  const handleSave = async () => {
    if (!siteId) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/site/${siteId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({
          configuracoes: { professores }
        })
      })
      if (!res.ok) throw new Error()
    } catch {
      setError('Falha ao salvar professores.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <AdminLayout><p>Carregando…</p></AdminLayout>

  return (
    <AdminLayout>
      <div className="sm:p-6">
        <h1 className="text-2xl font-bold mb-4">Professores</h1>
        {error && <p className="text-red-600">{error}</p>}

        <div className="space-y-6">
          {professores.map((prof, idx) => (
            <div key={idx} className="border p-4 rounded relative">
              <button
                onClick={() => removeProfessor(idx)}
                className="absolute top-2 right-2 text-red-500"
              >
                <Trash2 size={16}/>
              </button>

              <div className="mb-2">
                <label className="block text-sm font-medium">Nome</label>
                <input
                  type="text"
                  value={prof.nome}
                  onChange={e => updateField(idx, 'nome', e.target.value)}
                  className="w-full border rounded p-1"
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">Descrição</label>
                <textarea
                  value={prof.descricao}
                  onChange={e => updateField(idx, 'descricao', e.target.value)}
                  className="w-full border rounded p-1"
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">Imagem</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const f = e.target.files?.[0]
                    if (f) handleImageChange(f, idx)
                  }}
                />
                {prof.imagem && (
                  <img
                    src={prof.imagem}
                    alt="Preview"
                    className="mt-2 w-20 h-20 object-cover rounded-full"
                  />
                )}
              </div>
            </div>
          ))}

          <button
            onClick={addProfessor}
            className="flex items-center gap-2 text-green-600"
          >
            <Plus size={18}/> Adicionar professor
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-4 bg-purple-700 text-white py-2 px-6 rounded"
          >
            {saving ? 'Salvando…' : 'Salvar professores'}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
