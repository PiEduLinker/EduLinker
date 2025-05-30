'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { useSite } from '@/contexts/siteContext'
import {
  User, Mail, Globe, CreditCard, AlertCircle,
  Trash2, Loader2, ShieldAlert
} from 'lucide-react'

type AccountInfo = {
  name: string
  email: string
  domain: string
  plan: string
  subscriptionStatus: string
}

type AccountStatusCardProps = {
  account: AccountInfo
}

const AccountStatusCard = ({ account }: AccountStatusCardProps) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
    <div className="flex items-center space-x-3">
      <div className="p-2 rounded-lg bg-blue-50">
        <User className="w-5 h-5 text-blue-600" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900">Informações da Conta</h2>
    </div>

    <div className="space-y-4">
      <InfoRow icon={<User className="w-4 h-4 text-gray-500" />} label="Nome" value={account.name} />
      <InfoRow icon={<Mail className="w-4 h-4 text-gray-500" />} label="Email" value={account.email} />
      <InfoRow
        icon={<Globe className="w-4 h-4 text-gray-500" />}
        label="Site público"
        value={
          <span className="inline-flex items-center">
            <a
              href={`https://edulinker.okasites.com.br/site/${account.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              <code className="bg-gray-100 px-2 py-1 rounded-md text-sm font-medium text-purple-600">
                edulinker.okasites.com.br/site/{account.domain}
              </code>
            </a>
          </span>
        }
      />
      <InfoRow
        icon={<CreditCard className="w-4 h-4 text-gray-500" />}
        label="Plano"
        value={
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
            {account.plan}
          </span>
        }
      />
      <InfoRow
        icon={<AlertCircle className="w-4 h-4 text-gray-500" />}
        label="Status da Assinatura"
        value={account.subscriptionStatus}
      />
    </div>
  </div>
)

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
  <div className="flex items-start">
    <div className="mr-3 mt-0.5">{icon}</div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between gap-4">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <div className="text-sm text-gray-900 text-right truncate">
          {value}
        </div>
      </div>
    </div>
  </div>
)

export default function AccountSettingsPage() {
  const { slug } = useSite()
  const router = useRouter()

  const [account, setAccount] = useState<AccountInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const res = await fetch('/api/account', { credentials: 'include' })
        if (!res.ok) throw new Error('Falha ao carregar dados da conta.')
        const data: AccountInfo = await res.json()
        setAccount(data)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      }
    }

    fetchAccountData()
  }, [])

  const handleDelete = async () => {
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <header className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Configurações da Conta</h1>
            <p className="text-gray-600">Gerencie as informações e configurações da sua conta</p>
          </header>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
              <div>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {account && <AccountStatusCard account={account} />}

          <div className="border border-red-100 bg-red-50 rounded-xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-red-100">
                <ShieldAlert className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Zona de Perigo</h2>
            </div>

            <p className="text-sm text-gray-600">
              Esta ação não pode ser desfeita. Todos os dados serão permanentemente removidos do
              nosso servidor. Esta operação não pode ser desfeita.
            </p>

            <button
              onClick={handleDelete}
              disabled={loading}
              className={`
                w-full md:w-auto flex justify-center items-center
                px-6 py-3 rounded-lg text-white font-medium
                transition-colors duration-200 cursor-pointer
                ${loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2'}
              `}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Excluindo...
                </>
              ) : (
                <>
                  <Trash2 className="w-5 h-5 mr-2" />
                  Excluir Conta e Site
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}