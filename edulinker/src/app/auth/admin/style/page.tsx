'use client'

import { useState, useCallback } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { Palette, Type, ImageIcon, Upload, Loader2, Save, Eye } from 'lucide-react'
import { useSite } from '@/contexts/siteContext'
import { fileToBase64 } from '@/lib/fileUtils'

export default function AdminStylePage() {
  // 1) Pegue slug (siteId) e configuracoes do contexto
  const { slug: siteId, configuracoes } = useSite()

  // 2) Estados iniciais baseados em configuracoes vindas do layout (server)
  const [bgColor, setBgColor]         = useState(configuracoes.corFundo  ?? '#ffffff')
  const [textColor, setTextColor]     = useState(configuracoes.corTexto  ?? '#000000')
  const [fonte, setFonte]             = useState(configuracoes.fonte      ?? 'montserrat')
  const [initialLogo]                 = useState(configuracoes.logo       ?? '')
  const [logoFile, setLogoFile]       = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState(configuracoes.logo       ?? '')

  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')

  const fontFamilyMap: Record<string,string> = {
    montserrat: 'var(--font-montserrat)',
    geist:      'var(--font-geist-sans)',
    'geist-mono':'var(--font-geist-mono)',
    roboto:     'var(--font-roboto)',
    poppins:    'var(--font-poppins)',
  }

  // 3) Atualiza preview quando o usuário escolhe um arquivo
  const handleLogoChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    const file = e.target.files?.[0] ?? null
    if (!file) {
      setLogoFile(null)
      setLogoPreview(initialLogo)
      return
    }
    if (!file.type.startsWith('image/')) {
      setError('Apenas imagens são permitidas para o logo.')
      return
    }
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
  }, [initialLogo])

  // 4) Grava todas as configs de uma vez
  const handleSave = useCallback(async () => {
    setSaving(true)
    setError('')
    try {
      // prepara logo (base64) apenas se mudou
      let logoData = initialLogo
      if (logoFile) {
        logoData = await fileToBase64(logoFile)
      }

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
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar configurações.')
    } finally {
      setSaving(false)
    }
  }, [siteId, bgColor, textColor, fonte, logoFile, initialLogo])

  return (
    <AdminLayout>
  <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 overflow-x-hidden">
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
              className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg text-white py-2.5 sm:py-3 rounded-lg transition-all shadow hover:shadow-md flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
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
    </AdminLayout>
  )
}