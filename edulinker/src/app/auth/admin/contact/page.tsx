'use client'

import { useState, useEffect, useCallback, JSX } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import {
  Edit2,
  Save,
  Mail,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Loader2,
} from 'lucide-react'
import { useIsPremium, useSite } from '@/contexts/siteContext'
import { useJsApiLoader, Autocomplete, GoogleMap, Marker } from '@react-google-maps/api'

// Tipagem para as configurações de contato
type ContactConfig = {
  descricaoBreve?: string
  horarioSemana?: string
  horarioSabado?: string
  email?: string
  telefone?: string
  whatsapp?: string
  endereco?: string
  cidade?: string
  socialMedia?: {
    facebook?: string
    instagram?: string
    youtube?: string
  }
}

export default function AdminContactPage(): JSX.Element {
  const { slug: siteId, configuracoes, setConfiguracoes } = useSite()
  const isPremium = useIsPremium()

  // Estado local com dados iniciais
  const initialConfig = (configuracoes.contato as ContactConfig) ?? {}
  const [config, setConfig] = useState<ContactConfig>(initialConfig)
  const [isEditing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Loader do Google Maps + Places
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  })
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const [markerPos, setMarkerPos] = useState<google.maps.LatLngLiteral>()

  // Quando Autocomplete carrega
  const onLoadAuto = useCallback((auto: google.maps.places.Autocomplete) => {
    setAutocomplete(auto)
  }, [])

  // Ao escolher lugar
  const onPlaceChanged = useCallback(() => {
    if (!autocomplete) return
    const place = autocomplete.getPlace()
    const endereco = place.formatted_address || ''
    const cidade =
      place.address_components?.find(c =>
        c.types.includes('administrative_area_level_1') ||
        c.types.includes('locality')
      )?.long_name || ''
    setConfig(c => ({ ...c, endereco, cidade }))
    if (place.geometry?.location) {
      setMarkerPos({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      })
    }
  }, [autocomplete])

  // Atualiza campos do form
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.startsWith('socialMedia.')) {
      const key = name.split('.')[1] as keyof ContactConfig['socialMedia']
      setConfig(c => ({
        ...c,
        socialMedia: {
          ...c.socialMedia,
          [key]: value,
        },
      }))
    } else {
      setConfig(c => ({ ...c, [name]: value }))
    }
  }, [])

  // Submete ao back-end
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch(`/api/site/${siteId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configuracoes: { ...configuracoes, contato: config } }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.erro || 'Falha ao salvar')
      setConfiguracoes({ ...configuracoes, contato: config })
      setSuccess('Contato atualizado com sucesso!')
      setEditing(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }, [siteId, config, configuracoes, setConfiguracoes])

  // Limpa mensagem de sucesso após 3s
  useEffect(() => {
    if (!success) return
    const t = setTimeout(() => setSuccess(''), 3000)
    return () => clearTimeout(t)
  }, [success])

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Configurações de Contato</h1>
              {!isEditing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <Edit2 size={18} />
                  <span>Editar</span>
                </button>
              ) : (
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
              )}
            </div>
            <div className='text-center'>
              {error && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-600 text-center font-medium">{error}</p>
                </div>
              )}

              {success && (
                <div className="fixed top-20 z-50 left-1/2 xl:translate-x-[50%]">
                  <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-fade-in-down">
                    <span>{success}</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informações Básicas */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 pb-2 border-b border-gray-200">Informações Básicas</h2>

                {/* Horários */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-pink-50 rounded-lg text-pink-600">
                      <Clock size={20} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Horário Semana</label>
                      {isEditing ? (
                        <input
                          name="horarioSemana"
                          type="text"
                          value={config.horarioSemana || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="Seg a Sex: 09h - 12h | 13h - 21h"
                        />
                      ) : (
                        <p className="text-gray-700">{config.horarioSemana || 'Seg a Sex: 09h - 12h | 13h - 21h'}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-pink-50 rounded-lg text-pink-600">
                      <Clock size={20} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Horário Fim de Semana</label>
                      {isEditing ? (
                        <input
                          name="horarioSabado"
                          type="text"
                          value={config.horarioSabado || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="Sábado: 09h - 14h"
                        />
                      ) : (
                        <p className="text-gray-700">{config.horarioSabado || 'Sábado: 09h - 14h'}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contatos */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 pb-2 border-b border-gray-200">Contatos</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* E-mail */}
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <Mail size={20} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                      {isEditing ? (
                        <input
                          name="email"
                          type="email"
                          value={config.email || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="contato@seudominio.com"
                        />
                      ) : (
                        <p className="text-gray-700">{config.email || 'contato@seudominio.com'}</p>
                      )}
                    </div>
                  </div>

                  {/* Telefone */}
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-50 rounded-lg text-green-600">
                      <Phone size={20} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                      {isEditing ? (
                        <input
                          name="telefone"
                          type="tel"
                          value={config.telefone || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="(11) 99999-0000"
                        />
                      ) : (
                        <p className="text-gray-700">{config.telefone || '(11) 99999-0000'}</p>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-50 rounded-lg text-green-600">
                      <MessageCircle size={20} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                      {isEditing ? (
                        <input
                          name="whatsapp"
                          type="tel"
                          value={config.whatsapp || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="(11) 98888-1111"
                        />
                      ) : (
                        <p className="text-gray-700">{config.whatsapp || '(11) 98888-1111'}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Localização */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Localização</h2>
              <div className="flex items-start gap-2">
                <MapPin className="text-purple-600 mt-2"/>
                <div className="flex-1">
                  <label className="text-sm font-medium">Endereço</label>
                  {isEditing ? (
                    isPremium ? (
                      isLoaded && !loadError ? (
                        <Autocomplete onLoad={onLoadAuto} onPlaceChanged={onPlaceChanged}>
                          <input
                            name="endereco"
                            value={config.endereco||''}
                            onChange={handleChange}
                            placeholder="Digite para buscar"
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </Autocomplete>
                      ) : <p>Carregando mapa…</p>
                    ) : (
                      <input
                        disabled
                        placeholder="Somente Premium"
                        className="w-full px-3 py-2 border bg-gray-100 rounded-lg cursor-not-allowed"
                      />
                    )
                  ) : <p>{config.endereco||'—'}</p>}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="text-purple-600 mt-2"/>
                <div className="flex-1">
                  <label className="text-sm font-medium">Cidade/UF</label>
                  {isEditing ? (
                    <input
                      name="cidade"
                      value={config.cidade||''}
                      readOnly
                      className="w-full px-3 py-2 border bg-gray-50 rounded-lg cursor-not-allowed"
                    />
                  ) : <p>{config.cidade||'—'}</p>}
                </div>
              </div>
              
              {/* Mapa */}
              {config.endereco && isLoaded && !loadError && markerPos && (
                <div className="w-full h-64 rounded overflow-hidden border">
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={markerPos}
                    zoom={15}
                  >
                    <Marker position={markerPos} />
                  </GoogleMap>
                </div>
              )}
              {loadError && <p className="text-red-600">Não foi possível carregar o mapa.</p>}
            </div>

              {/* Redes Sociais */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 pb-2 border-b border-gray-200">Redes Sociais</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Facebook */}
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <Facebook size={20} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                      {isEditing ? (
                        <input
                          name="socialMedia.facebook"
                          type="url"
                          value={config.socialMedia?.facebook || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="https://facebook.com/usuario"
                        />
                      ) : config.socialMedia?.facebook ? (
                        <a
                          href={config.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline break-all"
                        >
                          {config.socialMedia.facebook}
                        </a>
                      ) : (
                        <p className="text-gray-500">—</p>
                      )}
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-pink-50 rounded-lg text-pink-600">
                      <Instagram size={20} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                      {isEditing ? (
                        <input
                          name="socialMedia.instagram"
                          type="url"
                          value={config.socialMedia?.instagram || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="https://instagram.com/usuario"
                        />
                      ) : config.socialMedia?.instagram ? (
                        <a
                          href={config.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline break-all"
                        >
                          {config.socialMedia.instagram}
                        </a>
                      ) : (
                        <p className="text-gray-500">—</p>
                      )}
                    </div>
                  </div>

                  {/* YouTube */}
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-50 rounded-lg text-red-600">
                      <Youtube size={20} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
                      {isEditing ? (
                        <input
                          name="socialMedia.youtube"
                          type="url"
                          value={config.socialMedia?.youtube || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="https://youtube.com/c/usuario"
                        />
                      ) : config.socialMedia?.youtube ? (
                        <a
                          href={config.socialMedia.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline break-all"
                        >
                          {config.socialMedia.youtube}
                        </a>
                      ) : (
                        <p className="text-gray-500">—</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Botão salvar */}
              {isEditing && (
                <div className="pt-6 border-t border-gray-200 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className={`px-6 py-3 rounded-xl text-white font-medium transition-all cursor-pointer ${saving
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg'
                      }`}
                  >
                    {saving ? (
                      <span className="flex items-center justify-center space-x-2">
                        <Loader2 size={20} className="animate-spin" />
                        <span>Salvando...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <Save size={20} />
                        <span>Salvar Alterações</span>
                      </span>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}