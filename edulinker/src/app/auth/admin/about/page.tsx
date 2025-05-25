'use client'

import React, { useState, useCallback } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import {Upload, Plus, Trash2, Save, Loader2, Image as ImageIcon, Text, Award,} from 'lucide-react'
import { useSite } from '@/contexts/siteContext'
import { fileToBase64 } from '@/lib/fileUtils'

type Destaque = { number: string; label: string }

export default function AdminAboutPage() {
  const { slug: siteId, configuracoes } = useSite()
  const {
    descricao: initialDescricao = '',
    fotoSobre: initialFoto = '',
    destaques: initialDestaques = [] as Destaque[],
  } = configuracoes

  const [descricao, setDescricao] = useState(initialDescricao)
  const [fotoSobre, setFotoSobre] = useState(initialFoto)
  const [preview, setPreview] = useState(initialFoto)
  const [destaques, setDestaques] = useState<Destaque[]>(initialDestaques)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleAdd = useCallback(() => {
    if (destaques.length < 3) {
      setDestaques(ds => [...ds, { number: '', label: '' }])
    }
  }, [destaques.length])

  const handleRemove = useCallback((idx: number) => {
    setDestaques(ds => ds.filter((_, i) => i !== idx))
  }, [])

  const handleDestaqueChange = useCallback(
    (idx: number, field: keyof Destaque, value: string) => {
      setDestaques(ds =>
        ds.map((d, i) => (i === idx ? { ...d, [field]: value } : d))
      )
    },
    []
  )

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) {
        setFotoSobre('')
        setPreview('')
        return
      }
      if (!file.type.startsWith('image/')) {
        setError('Apenas imagens são permitidas.')
        return
      }
      try {
        const b64 = await fileToBase64(file)
        setFotoSobre(b64)
        setPreview(URL.createObjectURL(file))
      } catch {
        setError('Não foi possível processar a imagem.')
      }
    },
    []
  )

  const handleSave = useCallback(async () => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/site/${siteId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          configuracoes: { descricao, fotoSobre, destaques },
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.erro || 'Falha ao salvar.')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }, [siteId, descricao, fotoSobre, destaques])

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8 mt-8">
        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Sobre a Escola
          </h1>
          {error && (
            <div className="mt-4 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-lg inline-block">
              {error}
            </div>
          )}
        </div>

        {/* Upload da imagem */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-white mb-4">
            <ImageIcon className="w-5 h-5" /> Imagem da Seção
          </h2>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition p-4">
            <Upload className="w-8 h-8 mb-2 text-white" />
            <p className="mb-1 text-sm text-white text-center">
              <span className="font-medium">Clique para enviar</span> ou arraste
            </p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {preview && (
            <div className="mt-4 flex justify-center">
              <div className="relative group">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-48 h-auto rounded-lg shadow-md border-2 border-white dark:border-gray-700"
                />
                <button
                  onClick={() => {
                    setFotoSobre('')
                    setPreview('')
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Texto descritivo */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-white mb-4">
            <Text className="w-5 h-5" /> Texto Descritivo
          </h2>
          <textarea
            rows={6}
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            placeholder="Descreva sua escola, missão, valores e diferenciais..."
          />
        </div>

        {/* Destaques editáveis */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-white mb-4">
            <Award className="w-5 h-5" /> 
            Destaques
          </h2>
          <div className="space-y-4">
            {destaques.map((d, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-3">
                  <input
                    type="text"
                    value={d.number}
                    onChange={e =>
                      handleDestaqueChange(idx, 'number', e.target.value)
                    }
                    placeholder="Número"
                    className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-300 text-white"
                  />
                </div>
                <div className="sm:col-span-8">
                  <input
                    type="text"
                    value={d.label}
                    onChange={e =>
                      handleDestaqueChange(idx, 'label', e.target.value)
                    }
                    placeholder="Ex: Anos de experiência"
                    className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-300 text-white"
                  />
                </div>
                <div className="sm:col-span-1 flex justify-end">
                  <button
                    onClick={() => handleRemove(idx)}
                    disabled={saving}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            {destaques.length < 3 && (
              <button
                onClick={handleAdd}
                disabled={saving}
                className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 mt-4 cursor-pointer"
              >
                <Plus size={18} /> Adicionar Destaque
              </button>
            )}
          </div>
        </div>

        {/* Botão de salvar */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 text-white py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-70 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg"
          >
            {saving ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
