'use client'

import React, { useState, useEffect, useCallback } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { Plus, Trash2, Star } from 'lucide-react'

type Testimonial = {
  foto: string
  nome: string
  texto: string
  estrelas: number
}

// helper para converter arquivo em base64
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

  // carrega do banco
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
    return <AdminLayout><p className="p-6 text-center">Carregando depoimentos…</p></AdminLayout>
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6 sm:p-6">
        {error && <p className="text-red-600 text-center">{error}</p>}

        {items.map((item, idx) => (
          <div key={idx} className="border rounded-lg p-4 relative">
            <button
              onClick={() => handleRemove(idx)}
              disabled={saving}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>

            <label className="block mb-2 font-medium">Foto {idx+1}</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => handleFile(idx, e.target.files?.[0] ?? null)}
            />
            {item.foto && (
              <img src={item.foto} alt={`Foto ${idx+1}`} className="mt-2 w-24 h-24 object-cover rounded-full" />
            )}

            <label className="block mt-4 mb-1 font-medium">Nome</label>
            <input
              type="text"
              value={item.nome}
              onChange={e => handleChange(idx, 'nome', e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Nome do depoente"
            />

            <label className="block mt-4 mb-1 font-medium">Depoimento</label>
            <textarea
              value={item.texto}
              onChange={e => handleChange(idx, 'texto', e.target.value)}
              className="w-full border rounded p-2"
              rows={3}
              placeholder="Texto do depoimento"
            />

            <label className="block mt-4 mb-1 font-medium">Estrelas</label>
            <div className="flex items-center">
              {[1,2,3,4,5].map(n => (
                <Star
                  key={n}
                  size={20}
                  className={`cursor-pointer ${n <= item.estrelas ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => handleChange(idx, 'estrelas', n)}
                />
              ))}
            </div>
          </div>
        ))}

        {items.length < 4 && (
          <button
            onClick={handleAdd}
            disabled={saving}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <Plus size={16} className="mr-1" /> Adicionar depoimento
          </button>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className={`w-full py-3 rounded-full text-white transition ${
            saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800'
          }`}
        >
          {saving ? 'Salvando…' : 'Salvar depoimentos'}
        </button>
      </div>
    </AdminLayout>
  )
}