'use client'

import { useState } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { useSite } from '@/contexts/siteContext'
import { useRouter } from 'next/navigation'

export default function UpgradePage() {
    const { plano } = useSite()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const router = useRouter()


    if (plano === 'premium') {
        return (
            <AdminLayout>
                <div className="max-w-xl mx-auto p-6 text-center">
                    <h1 className="text-2xl font-bold mb-4">Você já é Premium! 🎉</h1>
                    <p className="text-gray-700">Obrigado por apoiar o EduLinker.</p>
                </div>
            </AdminLayout>
        )
    }

    async function handleUpgrade() {
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/assinaturas', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plano: 'premium' }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.erro || 'Falha ao assinar.')
            setSuccess(true)

            router.refresh()

        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto p-6 space-y-8">
                <h1 className="text-3xl font-bold">Upgrade para Premium</h1>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-semibold mb-2">Plano Premium — R$ 29/mês</h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 mb-6">
                        <li>✔ Cadastro ilimitado de imóveis</li>
                        <li>✔ Temas personalizados</li>
                        <li>✔ Integração com WhatsApp</li>
                        <li>✔ Estatísticas avançadas</li>
                        <li>✔ Suporte prioritário</li>
                        <li>✔ Exclusividade regional de anúncios</li>
                    </ul>

                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    {success ? (
                        <p className="text-green-600 font-medium">Assinatura realizada com sucesso!</p>
                    ) : (
                        <button
                            onClick={handleUpgrade}
                            disabled={loading}
                            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-full transition disabled:opacity-60"
                        >
                            {loading ? 'Carregando…' : 'Assinar Premium'}
                        </button>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}
