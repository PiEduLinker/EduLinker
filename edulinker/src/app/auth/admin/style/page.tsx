'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'

interface Configs {
  corFundo?: string
  corTexto?: string
}

export default function AdminStylePage() {
  const [siteId, setSiteId] = useState<string | null>(null)
  const [bgColor, setBgColor] = useState('#ffffff')
  const [textColor, setTextColor] = useState('#000000')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        // 1) pega o siteId e a etapa do onboarding
        const st = await fetch('/api/onboarding/status', {
          credentials: 'include',
        })
        const { siteId: id, etapa } = await st.json()
        if (!id) throw new Error('Nenhum site em andamento')
        setSiteId(id)

        // 2) busca as configs desse site
        const res = await fetch(`/api/site/${id}`, {
          credentials: 'include',
        })
        if (!res.ok) throw new Error('Falha ao carregar configs')
        const { configuracoes } = await res.json() as { configuracoes: Configs }
        setBgColor(configuracoes.corFundo || '#ffffff')
        setTextColor(configuracoes.corTexto || '#000000')
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar dados.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSave = async () => {
    if (!siteId) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/site/${siteId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          configuracoes: {
            corFundo: bgColor,
            corTexto: textColor,
          },
        }),
      })
      if (!res.ok) throw new Error('Falha ao salvar')
      // opcional: notificar sucesso
    } catch {
      setError('Erro ao salvar configurações.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <p className="p-6 text-center">Carregando configurações…</p>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="sm:p-6 max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">Estilize seu site</h1>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow border space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Cor de fundo
              </label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer border shadow-inner"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Cor do texto
              </label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer border shadow-inner"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-purple-700 text-white py-3 rounded-full hover:bg-purple-800 transition"
            >
              {saving ? 'Salvando…' : 'Salvar alterações'}
            </button>
          </div>

           <div
            className="flex flex-col items-center justify-center rounded-xl shadow-lg border text-xl font-bold transition-all duration-300 p-6"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <div className="w-full h-48 flex items-center justify-center rounded-md border bg-opacity-70 backdrop-blur-sm">
              Visualização
            </div>
            <p className="mt-4 text-sm font-medium text-center opacity-70">
              Essa é a aparência que seu site terá
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}