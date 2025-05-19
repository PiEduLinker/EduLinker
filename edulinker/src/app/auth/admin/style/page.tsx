'use client'

import React, { useState, useEffect } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'

interface Configs {
  corFundo?: string
  corTexto?: string
  fonte?: string
  logo?: string
}

export default function AdminStylePage() {
  const [siteId, setSiteId] = useState<string | null>(null)
  const [bgColor, setBgColor] = useState('#ffffff')
  const [textColor, setTextColor] = useState('#000000')
  const [fonte, setFonte] = useState('montserrat')
  const [initialLogo, setInitialLogo] = useState<string>('')   // ← logo que veio do servidor
  const [logoFile, setLogoFile] = useState<File | null>(null)   // ← arquivo novo, se o usuário escolher
  const [logoPreview, setLogoPreview] = useState<string>('')    // ← URL ou base64 pra preview
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fontFamilyMap: Record<string, string> = {
    montserrat:   'var(--font-montserrat)',
    geist:        'var(--font-geist-sans)',
    'geist-mono': 'var(--font-geist-mono)',
    roboto:       'var(--font-roboto)',
    poppins:      'var(--font-poppins)',
  }

  // Converte File → base64
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = err => reject(err)
    })
  }

  // Quando o usuário escolhe um novo arquivo, valida e mostra preview
  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError('')
    const f = e.target.files?.[0] ?? null
    if (f) {
      if (!f.type.startsWith('image/')) {
        setError('Apenas imagens são permitidas para o logo.')
        return
      }
      setLogoFile(f)
      // preview rápido via blob URL
      setLogoPreview(URL.createObjectURL(f))
    } else {
      setLogoFile(null)
      setLogoPreview(initialLogo)
    }
  }

  useEffect(() => {
    async function load() {
      try {
        // 1) obtém o siteId do onboarding
        const st = await fetch('/api/onboarding/status', {
          credentials: 'include',
        })
        const { siteId: id } = await st.json()
        if (!id) throw new Error('Nenhum site em andamento')
        setSiteId(id)

        // 2) carrega as configs atuais do site
        const res = await fetch(`/api/site/${id}`, {
          credentials: 'include',
        })
        if (!res.ok) throw new Error('Falha ao carregar configs')
        const { configuracoes } = (await res.json()) as { configuracoes: Configs }

        setBgColor(configuracoes.corFundo || '#ffffff')
        setTextColor(configuracoes.corTexto || '#000000')
        setFonte(configuracoes.fonte || 'montserrat')

        // configura logo inicial e preview
        const logoValue = configuracoes.logo || ''
        setInitialLogo(logoValue)
        setLogoPreview(logoValue)
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
      // 1) prepara o valor final do logo
      let logoData = initialLogo
      if (logoFile) {
        logoData = await fileToBase64(logoFile)
      }

      // 2) envia PUT com todas as configs
      const res = await fetch(`/api/site/${siteId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          configuracoes: {
            corFundo: bgColor,
            corTexto: textColor,
            fonte,
            logo: logoData,
          },
        }),
      })
      if (!res.ok) throw new Error('Falha ao salvar')
      // opcional: atualizar initialLogo após salvar
      setInitialLogo(logoData)
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
          {/* formulário de edição */}
          <div className="bg-white rounded-xl p-6 shadow border space-y-6">
            {/* Cor de fundo */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Cor de fundo
              </label>
              <input
                type="color"
                value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer border shadow-inner"
              />
            </div>

            {/* Cor do texto */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Cor do texto
              </label>
              <input
                type="color"
                value={textColor}
                onChange={e => setTextColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer border shadow-inner"
              />
            </div>

            {/* Fonte do site */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Fonte do site
              </label>
              <select
                value={fonte}
                onChange={e => setFonte(e.target.value)}
                className="w-full h-12 rounded-lg border px-3"
              >
                <option value="montserrat">Montserrat</option>
                <option value="geist">Geist</option>
                <option value="geist-mono">Geist Mono</option>
                <option value="roboto">Roboto</option>
                <option value="poppins">Poppins</option>
              </select>
            </div>

            {/* Logo do site */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Logo do site
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="block w-full text-sm text-gray-600"
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Preview do logo"
                  className="mt-3 w-24 h-24 object-cover rounded-full border"
                />
              )}
            </div>

            {/* Botão salvar */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-purple-700 text-white py-3 rounded-full hover:bg-purple-800 transition"
            >
              {saving ? 'Salvando…' : 'Salvar alterações'}
            </button>
          </div>

          {/* preview geral */}
          <div
            className="flex flex-col items-center justify-center rounded-xl shadow-lg border text-xl font-bold transition-all duration-300 p-6"
            style={{
              backgroundColor: bgColor,
              color: textColor,
              fontFamily: fontFamilyMap[fonte],
            }}
          >
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Logo do site"
                className="mb-4 w-20 h-20 object-cover rounded-full"
              />
            )}
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