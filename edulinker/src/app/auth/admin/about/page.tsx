'use client'
import React, { useState, useEffect } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'

export default function AdminAboutPage() {
    const [siteId, setSiteId] = useState<string | null>(null)
    const [descricao, setDescricao] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [generating, setGenerating] = useState(false)


    useEffect(() => {
        async function load() {
            try {
                // 1) busca siteId
                const st = await fetch('/api/onboarding/status', { credentials: 'include' })
                const { siteId: id } = await st.json()
                if (!id) throw new Error('Nenhum site em andamento')
                setSiteId(id)

                // 2) busca configuracoes
                const res = await fetch(`/api/site/${id}`, { credentials: 'include' })
                if (!res.ok) throw new Error('Falha ao carregar dados do site')
                const { configuracoes } = await res.json()
                setDescricao(configuracoes.descricao || '')
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
                    configuracoes: { descricao }
                }),
            })
            if (!res.ok) throw new Error('Falha ao salvar')
        } catch {
            setError('Erro ao salvar descrição.')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <AdminLayout>
                <p className="p-6 text-center">Carregando dados…</p>
            </AdminLayout>
        )
    }

        // IA
//      const handleGenerate = async () => {
//     if (!siteId) return
//     setGenerating(true)
//     setError('')

//     try {
//       const res = await fetch('/api/descricao-ia', {
//         method: 'POST',
//         credentials: 'include',
//         headers: {'Content-Type':'application/json'},
//         body: JSON.stringify({ siteId })
//       })
//       if (!res.ok) throw new Error()
//       const { descricao: gen } = await res.json()
//       setDescricao(gen)
//     } catch {
//       setError('Não foi possível gerar o texto.')
//     } finally {
//       setGenerating(false)
//     }
//   }

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto space-y-6 sm:p-6">
                <h1 className="text-2xl font-bold text-center">Editar “Quem somos”</h1>
                {error && <p className="text-red-600 text-center">{error}</p>}

                {/* I.a */}
                {/* <div className="flex justify-end mb-2">
                    <button
                        onClick={handleGenerate}
                        disabled={generating}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        {generating ? 'Gerando…' : 'Gerar com IA'}
                    </button>
                </div> */}

                <div>
                    <label className="block mb-2 font-medium">Texto “Quem somos”</label>
                    <textarea
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        rows={6}
                        className="w-full border rounded p-3 resize-none focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-purple-700 text-white py-3 rounded-full hover:bg-purple-800 transition"
                >
                    {saving ? 'Salvando…' : 'Salvar descrição'}
                </button>
            </div>
        </AdminLayout>
    )
}
