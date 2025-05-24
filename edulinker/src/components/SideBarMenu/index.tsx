'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { X } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

type MenuItem = {
  label: string
  path: string
  isPro?: boolean
}

export default function SideBarMenu({ onClose }: { onClose?: () => void }) {
  const router = useRouter()
  const pathname = usePathname()

  const [plan, setPlan] = useState<'gratuito'|'premium'>('gratuito')
  const [loadingPlan, setLoadingPlan] = useState(true)
  const [notice, setNotice] = useState<string>('')

  useEffect(() => {
    async function fetchPlan() {
      try {
        const res = await fetch('/api/onboarding/status', { credentials: 'include' })
        if (!res.ok) throw new Error()
        const json = await res.json() as { plano: 'gratuito'|'premium' }
        setPlan(json.plano)
      } catch {
        setPlan('gratuito')
      } finally {
        setLoadingPlan(false)
      }
    }
    fetchPlan()
  }, [])

  const handleLogout = useCallback(async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' })
    router.push('/')
  }, [router])

  const menuItems: MenuItem[] = [
    { label: "Painel inicial",   path: "/auth/admin" },
    { label: "Estilo do site",   path: "/auth/admin/style" },
    { label: "Banners rotativos",path: "/auth/admin/banners" },
    { label: "Sobre a escola",   path: "/auth/admin/about" },
    { label: "Galeria de Fotos", path: "/auth/admin/gallery" },
    { label: "Grade de aulas",   path: "/auth/admin/grade" },
    { label: "Professores",      path: "/auth/admin/teachers" },
    { label: "Depoimentos",      path: "/auth/admin/testimonials" },
    { label: "Contato",          path: "/auth/admin/contact" },
    { label: "Relatórios (Pro)", path: "/auth/admin/reports", isPro: true },
  ]

  const handleClick = (item: MenuItem, e: React.MouseEvent) => {
    if (item.isPro && plan === 'gratuito') {
      e.preventDefault()
      setNotice('🛑 Este recurso está disponível apenas na versão Premium.')
      return
    }
    onClose?.()
  }

  if (loadingPlan) {
    return <div className="p-6 text-center">Carregando menu…</div>
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-bold">Painel</h2>
        <button onClick={onClose} className="xl:hidden p-2">
          <X className="w-6 h-6" />
        </button>
      </div>

      {notice && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 text-sm">
          {notice}
        </div>
      )}

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map(item => {
            const isActive = pathname === item.path
            const disabled = item.isPro && plan === 'gratuito'

            return (
              <li key={item.path}>
                <Link
                  href={disabled ? '#' : item.path}
                  className={`
                    block px-4 py-2 rounded-lg transition
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                    ${disabled 
                      ? 'opacity-50 cursor-not-allowed hover:bg-transparent'
                      : ''
                    }
                  `}
                  onClick={e => handleClick(item, e)}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}

          <li
            onClick={() => { handleLogout(); onClose?.() }}
            className="mt-4 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            Sair
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t text-sm text-gray-500">v1.0.0</div>
    </div>
  )
}
