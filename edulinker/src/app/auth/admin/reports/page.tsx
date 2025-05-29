'use client'
import React, { useState, useEffect } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { Users, Monitor, Globe } from 'lucide-react'
import { useSite } from '@/contexts/siteContext'

interface ReportsData {
  totalVisits: number
  avgSessionSeconds: number
  devices: Record<string, number>
  browsers: Record<string, number>
}

export default function AdminReportsPage() {
  const { plano, slug } = useSite()
  const [data, setData]       = useState<ReportsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    // Se não for premium, nem tenta buscar
    if (plano !== 'premium') {
      setError('Relatórios disponíveis somente para contas Premium.')
      setLoading(false)
      return
    }

    async function loadReports() {
      try {
        const res = await fetch(`/api/reports/${slug}`, {
          credentials: 'include',
        })
        if (res.status === 403) {
          setError('Relatórios disponíveis somente para contas Premium.')
          return
        }
        if (!res.ok) throw new Error('Falha ao carregar relatórios')
        const json = (await res.json()) as ReportsData
        setData(json)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadReports()
  }, [plano, slug])

  return (
    <AdminLayout>
      {loading ? (
        <p className="p-6 text-center">Carregando relatórios…</p>
      ) : error ? (
        <p className="p-6 text-center text-red-600">{error}</p>
      ) : (
        <div className="space-y-8">
          <h1 className="text-2xl font-bold">Relatórios de Acesso</h1>

          {/* Total de visitas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow p-6 flex items-center">
              <Users className="w-8 h-8 text-pink-500 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Total de visitas</p>
                <p className="text-2xl font-semibold">{data!.totalVisits}</p>
              </div>
            </div>
          </div>

          {/* Dispositivos */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Monitor className="w-6 h-6 text-indigo-500 mr-2"/> Dispositivos
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {Object.entries(data!.devices).map(([device, cnt]) => (
                <li key={device}>
                  <span className="font-medium">{device}</span>: {cnt}
                </li>
              ))}
            </ul>
          </div>

          {/* Navegadores */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Globe className="w-6 h-6 text-blue-500 mr-2"/> Navegadores
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {Object.entries(data!.browsers).map(([browser, cnt]) => (
                <li key={browser}>
                  <span className="font-medium">{browser}</span>: {cnt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
