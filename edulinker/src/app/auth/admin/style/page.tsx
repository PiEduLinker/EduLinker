'use client'

import React, { useState, useCallback } from 'react'
import { Palette, Type, Image as ImageIcon, Upload, Loader2, Save, Eye } from 'lucide-react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { useSite } from '@/contexts/siteContext'
import { CldUploadWidget } from 'next-cloudinary'
import type { CloudinaryUploadWidgetResults } from 'next-cloudinary'

export default function AdminStylePage() {
  const { slug: siteId, configuracoes } = useSite()

  const [bgColor, setBgColor]         = useState(configuracoes.corFundo  ?? '#ffffff')
  const [textColor, setTextColor]     = useState(configuracoes.corTexto  ?? '#000000')
  const [fonte, setFonte]             = useState(configuracoes.fonte      ?? 'montserrat')
  const [logo, setLogo]               = useState<string>(configuracoes.logo ?? '')
  const [saving, setSaving]           = useState(false)
  const [error, setError]             = useState('')

  const fontFamilyMap: Record<string,string> = {
    montserrat: 'var(--font-montserrat)',
    geist:      'var(--font-geist-sans)',
    'geist-mono':'var(--font-geist-mono)',
    roboto:     'var(--font-roboto)',
    poppins:    'var(--font-poppins)',
  }

  const handleSave = useCallback(async () => {
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
            fonte,
            logo,
          },
        }),
      })
      if (!res.ok) throw new Error('Falha ao salvar')
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar configurações.')
    } finally {
      setSaving(false)
    }
  }, [siteId, bgColor, textColor, fonte, logo])

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
        {/* Cabeçalho */}
        <div className="text-center space-y-2 my-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Designer de Identidade Visual
          </h1>
          {error && (
            <div className="mt-3 p-2 sm:p-3 bg-red-50 text-red-600 rounded-lg inline-block mx-auto text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Painel de Controle */}
          <div className="space-y-6">
            {/* Cores */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 space-y-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Palette /> Paleta de Cores
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm">Cor de Fundo</label>
                  <div className="relative">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={e => setBgColor(e.target.value)}
                      className="w-full h-10 rounded-lg cursor-pointer border"
                    />
                    <span className="absolute top-1 right-2 text-xs bg-white px-1 rounded">
                      {bgColor}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-sm">Cor do Texto</label>
                  <div className="relative">
                    <input
                      type="color"
                      value={textColor}
                      onChange={e => setTextColor(e.target.value)}
                      className="w-full h-10 rounded-lg cursor-pointer border"
                    />
                    <span className="absolute top-1 right-2 text-xs bg-white px-1 rounded">
                      {textColor}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tipografia */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 space-y-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Type /> Tipografia
              </h2>
              <div>
                <label className="block mb-1 text-sm">Fonte Principal</label>
                <select
                  value={fonte}
                  onChange={e => setFonte(e.target.value)}
                  className="w-full h-10 rounded-lg border px-3"
                >
                  <option value="montserrat">Montserrat</option>
                  <option value="geist">Geist</option>
                  <option value="geist-mono">Geist Mono</option>
                  <option value="roboto">Roboto</option>
                  <option value="poppins">Poppins</option>
                </select>
              </div>
            </div>

            {/* Logo */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 space-y-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <ImageIcon /> Logo
              </h2>
              {logo && (
                <div className="mb-4">
                  <img
                    src={logo}
                    alt="Logo atual"
                    className="w-24 h-24 object-contain rounded-lg border"
                  />
                </div>
              )}
              <CldUploadWidget
                uploadPreset="edulinker_unsigned"
                options={{ folder: 'edulinker/logo', maxFiles: 1 }}
                onSuccess={(res: CloudinaryUploadWidgetResults) => {
                  if (res.event !== 'success') return
                  const info = res.info
                  if (typeof info === 'string' || !info) return
                  const url = info.secure_url
                  {
                    setLogo(url)
                  }
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <Upload /> {logo ? 'Alterar logo' : 'Selecionar logo'}
                  </button>
                )}
              </CldUploadWidget>
            </div>

            {/* Botão Salvar */}
            <button
              onClick={handleSave}
              disabled={saving}
              className={`w-full py-3 rounded-lg text-white font-medium transition ${
                saving
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
              }`}
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" /> Salvando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Save /> Salvar Alterações
                </span>
              )}
            </button>
          </div>

          {/* Pré-visualização */}
          <div
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex flex-col items-center justify-center"
            style={{
              backgroundColor: bgColor,
              color: textColor,
              fontFamily: fontFamilyMap[fonte],
            }}
          >
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Eye /> Pré-visualização
            </h2>
            {logo && (
              <img
                src={logo}
                alt="Logo do site"
                className="w-16 h-16 object-contain mb-4"
              />
            )}
            <h3 className="text-xl font-bold">Bem-vindo à Sua Escola</h3>
            <p className="opacity-80">Esta é uma prévia do seu site.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
