'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { useIsPremium, useSite } from '@/contexts/siteContext'
import ApplyThemeButton from '@/components/ApplyThemeButton'


export default function ThemeSwitcher() {
    const { templateOriginalId, setTemplateOriginalId, plano } = useSite()
    const isPremium = useIsPremium()


    type Template = {
        id: string
        nome: string
        imgPreview: string
        pro: boolean
    }

    const [templates, setTemplates] = useState<Template[]>([])
    const [selected, setSelected] = useState<string | undefined>(templateOriginalId)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    useEffect(() => {
        fetch('/api/templates')
            .then(r => r.json())
            .then((data: Template[]) => {
                setTemplates(data)
            })
            .catch(() => setError('Falha ao carregar templates'))
    }, [])

    async function handleChangeTheme() {
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
            const body = await res.json()
            if (!res.ok) throw new Error(body.erro || 'Erro ao trocar tema')

            setTemplateOriginalId(selected)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto p-6 space-y-6">
                <h1 className="text-2xl font-bold mb-4">Trocar Tema do Site</h1>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    {templates.map(t => (
                        <label
                            key={t.id}
                            className={`cursor-pointer border rounded-lg overflow-hidden ${selected === t.id ? 'ring-2 ring-purple-500' : ''
                                }`}
                        >
                            <input
                                type="radio"
                                name="template"
                                value={t.id}
                                checked={selected === t.id}
                                onChange={() => setSelected(t.id)}
                                className="sr-only"
                            />
                            <img src={t.imgPreview} alt={t.nome} className="w-full h-32 object-cover" />
                            <p className="p-2 text-center">{t.nome}</p>
                        </label>
                    ))}
                </div>

                <ApplyThemeButton loading={loading} onClick={handleChangeTheme} />

                {error && <p className="text-red-600 mt-2">{error}</p>}
            </div>
        </AdminLayout>
    )
}