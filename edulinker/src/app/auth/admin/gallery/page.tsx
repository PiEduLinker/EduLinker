'use client'

import React, { useState, useEffect, useCallback } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { Plus, Trash2 } from 'lucide-react'

interface GalleryItem {
  imagem: string // base64 ou URL
}

// helper para converter File → base64
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
  })
}

export default function AdminGalleryPage() {
  const [siteId, setSiteId] = useState<string|null>(null)
  const [galerias, setGalerias] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')

  // carrega configs iniciais
  useEffect(() => {
    ;(async () => {
      try {
        const st = await fetch('/api/onboarding/status', { credentials:'include' })
        const { siteId: id } = await st.json()
        if (!id) throw new Error('Nenhum site em andamento')
        setSiteId(id)

        const res = await fetch(`/api/site/${id}`, { credentials:'include' })
        if (!res.ok) throw new Error('Falha ao carregar galeria')
        const { configuracoes } = await res.json()
        setGalerias(configuracoes.galerias ?? [])
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // adicionar slot
  const handleAdd = useCallback(() => {
    if (galerias.length < 12) {
      setGalerias(g => [...g, { imagem: '' }])
    }
  }, [galerias.length])

  // remover
  const handleRemove = useCallback((idx: number) => {
    setGalerias(g => g.filter((_,i) => i!==idx))
  }, [])

  // upload de imagem
  const handleFile = useCallback(async (idx: number, file: File|null) => {
    if (!file) return
    try {
      const b64 = await fileToBase64(file)
      setGalerias(g => g.map((it,i)=> i===idx ? { imagem: b64 } : it))
    } catch {
      setError('Erro ao processar imagem')
    }
  }, [])

  // salvar no backend
  const handleSave = useCallback(async () => {
    if (!siteId) return
    setSaving(true); setError('')
    try {
      const res = await fetch(`/api/site/${siteId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ configuracoes: { galerias } })
      })
      if (!res.ok) {
        const body = await res.json().catch(()=>({}))
        throw new Error(body.erro||'Falha ao salvar')
      }
    } catch(err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }, [siteId, galerias])

  if (loading) {
    return <AdminLayout><p className="p-6 text-center">Carregando galeria…</p></AdminLayout>
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6 sm:p-6">
        {error && <p className="text-red-600 text-center">{error}</p>}

        {galerias.map((item, idx) => (
          <div key={idx} className="border rounded-lg p-4 relative">
            <button onClick={()=>handleRemove(idx)} disabled={saving}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700">
              <Trash2 size={16}/>
            </button>

            <label className="block mb-2 font-medium">Imagem {idx+1}</label>
            <input type="file" accept="image/*"
              onChange={e=>handleFile(idx, e.target.files?.[0] ?? null)}
            />
            {item.imagem && (
              <img src={item.imagem} alt={`Galeria ${idx+1}`}
                   className="mt-2 w-full h-auto rounded-lg" />
            )}
          </div>
        ))}

        {galerias.length < 12 && (
          <button onClick={handleAdd}
            disabled={saving}
            className="flex items-center text-blue-500 hover:text-blue-700">
            <Plus size={16} className="mr-1"/> Adicionar foto
          </button>
        )}

        <button onClick={handleSave}
          disabled={saving}
          className={`w-full py-3 rounded-full text-white transition ${
            saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800'
          }`}
        >
          {saving ? 'Salvando…' : 'Salvar galeria'}
        </button>
      </div>
    </AdminLayout>
  )
}
