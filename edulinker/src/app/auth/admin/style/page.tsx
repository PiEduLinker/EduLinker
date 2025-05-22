'use client'

import React, { useState, useEffect } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { Palette, Type, ImageIcon, Upload, Loader2, Save, Eye } from 'lucide-react'


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
    montserrat: 'var(--font-montserrat)',
    geist: 'var(--font-geist-sans)',
    'geist-mono': 'var(--font-geist-mono)',
    roboto: 'var(--font-roboto)',
    poppins: 'var(--font-poppins)',
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
      <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 overflow-x-hidden">
        {/* Cabeçalho */}
        <div className="text-center space-y-2 my-10">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Designer de Identidade Visual
          </h1>
          {error && (
            <div className="mt-3 p-2 sm:p-3 bg-red-50 text-red-600 rounded-lg inline-block mx-auto text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Painel de Controle */}
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700 space-y-6 flex-1 min-w-0">
            {/* Seção de Cores */}
            <div className="space-y-4">
              <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-white">
                <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
                Paleta de Cores
              </h2>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-white">
                    Cor de Fundo
                  </label>
                  <div className="relative">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={e => setBgColor(e.target.value)}
                      className="w-full h-10 sm:h-12 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-600"
                    />
                    <span className="absolute right-2 top-2 text-xs bg-white/90 dark:bg-gray-700/90 px-1.5 py-0.5 text-white rounded">
                      {bgColor}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-white">
                    Cor do Texto
                  </label>
                  <div className="relative">
                    <input
                      type="color"
                      value={textColor}
                      onChange={e => setTextColor(e.target.value)}
                      className="w-full h-10 sm:h-12 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-600"
                    />
                    <span className="absolute right-2 top-2 text-xs bg-white/90 dark:bg-gray-700/90 px-1.5 py-0.5 text-white rounded">
                      {textColor}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção de Tipografia */}
            <div className="space-y-4">
              <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-white">
                <Type className="w-4 h-4 sm:w-5 sm:h-5" />
                Tipografia
              </h2>

              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-white">
                  Fonte Principal
                </label>
                <select
                  value={fonte}
                  onChange={e => setFonte(e.target.value)}
                  className="w-full h-10 sm:h-12 rounded-lg border border-gray-200 dark:border-gray-600 px-3 text-sm sm:text-base bg-white dark:bg-gray-700 text-white"
                >
                  <option value="montserrat">Montserrat</option>
                  <option value="geist">Geist</option>
                  <option value="geist-mono">Geist Mono</option>
                  <option value="roboto">Roboto</option>
                  <option value="poppins">Poppins</option>
                </select>
              </div>
            </div>

            {/* Seção de Logo */}
            <div className="space-y-4">
              <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-white">
                <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                Identidade Visual
              </h2>

              <div className="space-y-3">
                <label className="flex flex-col items-center justify-center w-full h-24 sm:h-28 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition p-4">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-white" />
                    <p className="mb-1 text-xs sm:text-sm text-white text-center">
                      <span className="font-medium">Clique para enviar</span> ou arraste
                    </p>
                    <p className="text-[0.65rem] sm:text-xs text-white">PNG, JPG ou SVG</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>

                {logoPreview && (
                  <div className="flex flex-col items-center">
                    <div>
                      <img
                        src={logoPreview}
                        alt="Preview do logo"
                        className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Botão de Salvar */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2.5 sm:py-3 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all shadow hover:shadow-md flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              {saving ? (
                <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              {saving ? 'Salvando...' : 'Aplicar Alterações'}
            </button>
          </div>

          {/* Visualização */}
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700 flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200 mb-4 sm:mb-6">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              Pré-visualização
            </h2>

            <div
              className="w-full h-64 sm:h-80 md:h-96 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center p-4 sm:p-6"
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
                  className="mb-4 w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
              )}

              <div className="text-center space-y-3 sm:space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold">
                  Bem-vindo à Sua Escola
                </h2>
                <p className="text-sm sm:text-base opacity-90">
                  Esta é uma prévia do seu site
                </p>

              </div>
            </div>

            <p className="mt-3 text-center text-xs sm:text-sm text-white font-bold">
              Alterações em tempo real
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>)
}