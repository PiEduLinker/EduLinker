'use client'
import React, { useState, useEffect } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { Users, Monitor, Globe } from 'lucide-react'
import { useSite } from '@/contexts/siteContext'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Legend
} from 'recharts'

interface ReportsData {
  totalVisits: number
  avgSessionSeconds: number
  devices: Record<string, number>
  browsers: Record<string, number>
}

const COLORS = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

export default function AdminReportsPage() {
  const { plano, slug } = useSite()
  const [data, setData] = useState<ReportsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (plano !== 'premium') {
      setError('Relatórios disponíveis somente para contas Premium.')
      setLoading(false)
      return
    }

    const loadReports = async () => {
      try {
        const res = await fetch(`/api/reports/${slug}`, {
          credentials: 'include',
        })
        
        if (res.status === 403) {
          setError('Relatórios disponíveis somente para contas Premium.')
          return
        }
        
        if (!res.ok) throw new Error('Falha ao carregar relatórios')
        
        const json = await res.json() as ReportsData
        setData(json)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }

    loadReports()
  }, [plano, slug])

  const devicesData = data
    ? Object.entries(data.devices).map(([name, value]) => ({ name, value }))
    : []

  const browsersData = data
    ? Object.entries(data.browsers).map(([name, value]) => ({ name, value }))
    : []

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 bg-indigo-200 rounded-full mb-4"></div>
              <p className="text-gray-600">Carregando relatórios...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="ml-3 text-red-700 font-medium">{error}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-bold text-gray-800">Relatórios de Acesso</h1>
              <div className="mt-2 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  <svg className="-ml-1 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  Premium
                </span>
              </div>
            </div>

            {/* Cards de Métricas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-indigo-50">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total de Visitas</p>
                    <p className="text-2xl font-semibold text-gray-800">{data?.totalVisits.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-emerald-50">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Tempo Médio</p>
                    <p className="text-2xl font-semibold text-gray-800">
                      {data ? `${Math.floor(data.avgSessionSeconds / 60)}m ${data.avgSessionSeconds % 60}s` : '--'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Dispositivos */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                <div className="flex items-center mb-6">
                  <div className="p-2 rounded-lg bg-indigo-50 mr-3">
                    <Monitor className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Distribuição de Dispositivos</h2>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={devicesData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={40}
                        paddingAngle={5}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {devicesData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [value.toLocaleString(), 'Visitas']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Navegadores */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                <div className="flex items-center mb-6">
                  <div className="p-2 rounded-lg bg-blue-50 mr-3">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Distribuição de Navegadores</h2>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={browsersData}>
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#6b7280' }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis 
                        tick={{ fill: '#6b7280' }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <Tooltip 
                        cursor={{ fill: '#f3f4f6' }}
                        formatter={(value: number) => [value.toLocaleString(), 'Visitas']}
                      />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        name="Visitas"
                        radius={[4, 4, 0, 0]}
                        fill="#3b82f6"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}