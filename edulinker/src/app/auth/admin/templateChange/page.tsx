'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { useIsPremium, useSite } from '@/contexts/siteContext'
import { Paintbrush, Sparkles, AlertCircle, Loader2, Lock, Check, Palette } from 'lucide-react'

type Template = {
    id: string
    nome: string
    imgPreview: string
    pro: boolean
    categoria?: string
}

const TemplateCard = ({
    template,
    selected,
    isPremium,
    onSelect
}: {
    template: Template
    selected: boolean
    isPremium: boolean
    onSelect: (id: string) => void
}) => {
    const isLocked = !isPremium && template.pro

    return (
        <div
            onClick={() => !isLocked && onSelect(template.id)}
            className={`
        relative group cursor-pointer rounded-2xl overflow-hidden
        border-2 transition-all duration-300
        w-full max-w-[300px]
        ${selected ?
                    'border-purple-500 shadow-lg shadow-purple-500/20 scale-[1.02]' :
                    'border-transparent hover:border-purple-300'
                }
        ${isLocked ? 'opacity-80 grayscale-[30%]' : ''}
      `}
        >
            {/* Overlay effects */}
            <div className={`
        absolute inset-0 z-10 rounded-2xl
        ${selected ?
                    'bg-purple-500/20' :
                    'group-hover:bg-purple-500/5'
                }
        ${isLocked ? 'bg-gray-900/40' : ''}
        transition-all duration-300
      `} />

            {/* PRO badge */}
            {template.pro && (
                <div className={`
          absolute top-3 right-3 z-20 
          bg-gradient-to-r from-purple-600 to-indigo-600 
          text-white text-xs font-bold px-3 py-1 rounded-full 
          flex items-center shadow-lg
          ${isLocked ? 'from-gray-600 to-gray-700' : ''}
        `}>
                    <Sparkles className="w-3 h-3 mr-1" />
                    PRO
                </div>
            )}

            {/* Active badge */}
            {selected && (
                <div className="absolute top-3 left-3 z-20">
                    <div className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-lg">
                        <Check className="w-3 h-3 mr-1" />
                    </div>
                </div>
            )}

            {/* Lock icon for locked templates */}
            {isLocked && !selected && (
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="bg-white p-3 rounded-full shadow-xl">
                        <Lock className="w-6 h-6 text-gray-700" />
                    </div>
                </div>
            )}

            {/* Template image */}
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img
                    src={template.imgPreview}
                    alt={template.nome}
                    className={`
            w-full h-full object-cover transition-transform duration-500
            ${selected ? 'scale-105' : 'group-hover:scale-110'}
          `}
                />
            </div>

            {/* Template info */}
            <div className={`
        absolute bottom-0 left-0 right-0 z-20 p-4
        bg-gradient-to-t from-black/80 to-transparent
        text-white
      `}>
                <h3 className="font-medium text-lg truncate">{template.nome}</h3>
                {template.categoria && (
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {template.categoria}
                    </span>
                )}
            </div>
        </div>
    )
}

const ThemeActionPanel = ({
    selectedTemplate,
    loading,
    onClick,
    isPremium
}: {
    selectedTemplate?: Template
    loading: boolean
    onClick: () => void
    isPremium: boolean
}) => (
    <div className={`
    fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200
    shadow-lg transition-all duration-300
    ${selectedTemplate ? 'translate-y-0' : 'translate-y-full'}
  `}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
                <div className="hidden md:block p-2 rounded-lg bg-purple-100">
                    <Palette className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Tema selecionado</p>
                    <h4 className="font-medium text-gray-900">
                        {selectedTemplate?.nome || 'Nenhum'}
                    </h4>
                </div>
            </div>

            <button
                onClick={onClick}
                disabled={loading || !selectedTemplate || (selectedTemplate.pro && !isPremium)}
                className={`
          w-full md:w-auto flex items-center justify-center
          px-6 py-3 rounded-xl font-medium text-white
          transition-all duration-200 shadow-lg
          relative overflow-hidden cursor-pointer
          ${loading || !selectedTemplate || (selectedTemplate.pro && !isPremium)
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'}
        `}
            >
                <span className={`relative z-10 flex items-center ${loading ? 'opacity-0' : 'opacity-100'}`}>
                    <Paintbrush className="mr-2 h-5 w-5" />
                    {selectedTemplate?.pro && !isPremium ? 'Atualize para PRO' : 'Aplicar Tema'}
                </span>

                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <Loader2 className="animate-spin h-5 w-5" />
                    </div>
                )}

                {/* Animated background for enabled state */}
                {!loading && selectedTemplate && (!selectedTemplate.pro || isPremium) && (
                    <div className="absolute inset-0 z-0 opacity-20 bg-[length:400%_400%] animate-gradient-shift bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400" />
                )}
            </button>
        </div>
    </div>
)

export default function ThemeSwitcher() {
    const { templateOriginalId, setTemplateOriginalId } = useSite()
    const isPremium = useIsPremium()

    const [templates, setTemplates] = useState<Template[]>([])
    const [selected, setSelected] = useState<string | undefined>(templateOriginalId)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const res = await fetch('/api/templates')
                if (!res.ok) throw new Error('Failed to load templates')
                const data: Template[] = await res.json()
                setTemplates(data)
            } catch (err) {
                setError('Falha ao carregar templates')
            }
        }

        fetchTemplates()
    }, [])

    const handleChangeTheme = async () => {
        if (!selected) return
        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/site/theme', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ templateId: selected }),
            })

            if (!res.ok) {
                const body = await res.json()
                throw new Error(body.erro || 'Erro ao trocar tema')
            }

            setTemplateOriginalId(selected)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const selectedTemplate = templates.find(t => t.id === selected)

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                {/* Header */}
                <div className="text-center mb-12 pt-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Escolha seu Tema
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Selecione um design que combine com sua marca e personalidade
                    </p>
                </div>

                {/* Error message */}
                {error && (
                    <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start max-w-2xl mx-auto">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <div>
                            <p className="text-red-700 font-medium">{error}</p>
                        </div>
                    </div>
                )}

                {/* Template Flex Container */}
                <div className="flex flex-wrap justify-center gap-6">
                    {templates.map(template => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            selected={selected === template.id}
                            isPremium={isPremium}
                            onSelect={setSelected}
                        />
                    ))}
                </div>

                {/* Floating action panel */}
                <ThemeActionPanel
                    selectedTemplate={selectedTemplate}
                    loading={loading}
                    onClick={handleChangeTheme}
                    isPremium={isPremium}
                />
            </div>
        </AdminLayout>
    )
}