'use client'

import React, { useState, useEffect, useCallback } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { Edit2, Save, Mail, Phone, MapPin, FacebookIcon, Instagram, Youtube } from 'lucide-react'

type ContactConfig = {
  email?: string
  telefone?: string
  endereco?: string
  cidade?: string
  descricaoBreve?: string
  socialMedia?: {
    facebook?: string
    instagram?: string
    youtube?: string
  }
}


export default function AdminContactPage() {
  const [siteId, setSiteId] = useState<string | null>(null)
  const [config, setConfig] = useState<ContactConfig>({})
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    ; (async () => {
      try {
        const st = await fetch('/api/onboarding/status', { credentials: 'include' })
        const { siteId: id } = await st.json()
        if (!id) throw new Error('Nenhum site em andamento')
        setSiteId(id)

        const res = await fetch(`/api/site/${id}`, { credentials: 'include' })
        if (!res.ok) throw new Error('Falha ao carregar')
        const { configuracoes } = await res.json()
        setConfig(configuracoes.contato || {})
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.startsWith('socialMedia.')) {
      const key = name.replace('socialMedia.', '')
      setConfig(c => ({
        ...c,
        socialMedia: {
          ...c.socialMedia,
          [key]: value
        }
      }))
    } else {
      setConfig(c => ({ ...c, [name]: value }))
    }
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!siteId) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/site/${siteId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configuracoes: { contato: config } })
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.erro || 'Falha ao salvar')
      }
      setIsEditing(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }, [siteId, config])

  if (loading) {
    return <AdminLayout><p className="p-6 text-center">Carregando…</p></AdminLayout>
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6 sm:p-6">
        {error && <p className="text-red-600">{error}</p>}

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Informações de Contato</h1>
          {!isEditing
            ? <button onClick={() => setIsEditing(true)} className="btn-primary">
              <Edit2 className="mr-1" /> Editar
            </button>
            : <button onClick={() => setIsEditing(false)} className="btn-secondary">
              Cancelar
            </button>
          }
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl p-6 shadow">
          {/* Descrição Breve */}
          <div className="flex items-center gap-4">
            <Edit2 className="w-6 h-6 text-yellow-500" />
            {isEditing
              ? <input
                name="descricaoBreve"
                type="text"
                value={config.descricaoBreve || ''}
                onChange={handleChange}
                className="flex-1 border rounded p-2"
                placeholder="Descrição breve do site"
              />
              : <p>{config.descricaoBreve || '—'}</p>
            }
          </div>


          {/* Email */}
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-blue-500" />
            {isEditing
              ? <input
                name="email"
                type="email"
                value={config.email || ''}
                onChange={handleChange}
                className="flex-1 border rounded p-2"
                placeholder="seu@exemplo.com"
              />
              : <p>{config.email || '—'}</p>
            }
          </div>

          {/* Telefone */}
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-green-500" />
            {isEditing
              ? <input
                name="telefone"
                type="tel"
                value={config.telefone || ''}
                onChange={handleChange}
                className="flex-1 border rounded p-2"
                placeholder="+55 (11) 9XXXX-XXXX"
              />
              : <p>{config.telefone || '—'}</p>
            }
          </div>

          {/* Endereço */}
          <div className="flex items-center gap-4">
            <MapPin className="w-6 h-6 text-purple-500" />
            {isEditing
              ? <input
                name="endereco"
                type="text"
                value={config.endereco || ''}
                onChange={handleChange}
                className="flex-1 border rounded p-2"
                placeholder="Rua, número"
              />
              : <p>{config.endereco || '—'}</p>
            }
          </div>

          {/* Cidade */}
          <div className="flex items-center gap-4">
            <MapPin className="w-6 h-6 text-purple-500" />
            {isEditing
              ? <input
                name="cidade"
                type="text"
                value={config.cidade || ''}
                onChange={handleChange}
                className="flex-1 border rounded p-2"
                placeholder="Cidade - UF"
              />
              : <p>{config.cidade || '—'}</p>
            }
          </div>

          {/* Redes Sociais */}
          <div className="pt-4 border-t space-y-4">
            <h2 className="font-semibold">Redes Sociais (opcional)</h2>

            {/* Facebook */}
            <div className="flex items-center gap-4">
              <FacebookIcon className="w-6 h-6 text-blue-600" />
              {isEditing
                ? <input
                  name="socialMedia.facebook"
                  type="url"
                  value={config.socialMedia?.facebook || ''}
                  onChange={handleChange}
                  className="flex-1 border rounded p-2"
                  placeholder="https://facebook.com/usuario"
                />
                : config.socialMedia?.facebook
                  ? <a href={config.socialMedia.facebook} target="_blank" className="underline">
                    {config.socialMedia.facebook}
                  </a>
                  : <p className="text-gray-500">—</p>
              }
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-4">
              <Instagram className="w-6 h-6 text-pink-500" />
              {isEditing
                ? <input
                  name="socialMedia.instagram"
                  type="url"
                  value={config.socialMedia?.instagram || ''}
                  onChange={handleChange}
                  className="flex-1 border rounded p-2"
                  placeholder="https://instagram.com/usuario"
                />
                : config.socialMedia?.instagram
                  ? <a href={config.socialMedia.instagram} target="_blank" className="underline">
                    {config.socialMedia.instagram}
                  </a>
                  : <p className="text-gray-500">—</p>
              }
            </div>

            {/* YouTube */}
            <div className="flex items-center gap-4">
              <Youtube className="w-6 h-6 text-red-600" />
              {isEditing
                ? <input
                  name="socialMedia.youtube"
                  type="url"
                  value={config.socialMedia?.youtube || ''}
                  onChange={handleChange}
                  className="flex-1 border rounded p-2"
                  placeholder="https://youtube.com/c/usuario"
                />
                : config.socialMedia?.youtube
                  ? <a href={config.socialMedia.youtube} target="_blank" className="underline">
                    {config.socialMedia.youtube}
                  </a>
                  : <p className="text-gray-500">—</p>
              }
            </div>
          </div>

          {isEditing && (
            <div className="text-right">
              <button type="submit" disabled={saving} className="btn-primary">
                <Save className="mr-1" /> {saving ? 'Salvando…' : 'Salvar'}
              </button>
            </div>
          )}
        </form>
      </div>
    </AdminLayout>
  )
}
