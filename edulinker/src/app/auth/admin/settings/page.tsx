'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { useSite } from '@/contexts/siteContext'

interface AccountInfo {
  name: string
  email: string
  domain: string
  plan: string
  subscriptionStatus: string
}

export default function AccountSettingsPage() {
  const { slug } = useSite()
  const router = useRouter()

  const [account, setAccount] = useState<AccountInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Busca os dados de conta ao montar o componente
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/account', { credentials: 'include' })
        if (!res.ok) throw new Error('Falha ao carregar dados da conta.')
        const data: AccountInfo = await res.json()
        setAccount(data)
      } catch (err: any) {
        setError(err.message)
      }
    })()
  }, [])

  async function handleDelete() {
    if (!confirm('⚠️ Tem certeza? Isso excluirá sua conta e todo o site permanentemente.')) {
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/account', {
        method: 'DELETE',
        credentials: 'include'
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.erro || 'Falha ao excluir conta.')
      }
      router.push('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Configurações da Conta</h1>

        {error && <p className="text-red-600 font-medium">{error}</p>}

        {account && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <p><strong>Nome:</strong> {account.name}</p>
            <p><strong>Email:</strong> {account.email}</p>
            <p>
              <strong>Site público:</strong>{' '}
              <code>edulinker.okasites.com.br/site/{account.domain}</code>
            </p>
            <p><strong>Plano:</strong> {account.plan}</p>
            <p><strong>Status da Assinatura:</strong> {account.subscriptionStatus}</p>
          </div>
        )}

        <button
          onClick={handleDelete}
          disabled={loading}
          className={`
            mt-4 flex items-center justify-center w-full
            py-3 rounded-full text-white font-semibold transition
            ${loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'}
          `}
        >
          {loading ? 'Excluindo…' : 'Excluir Conta e Site'}
        </button>
      </div>
    </AdminLayout>
  )
}
