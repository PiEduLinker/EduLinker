'use client'

import { createContext, useContext, ReactNode } from 'react'

export type Plan = 'gratuito' | 'premium'

export interface SiteConfig {
  slug: string
  descricao: string
  configuracoes: any
  status: 'BASIC_INFO' | 'PLAN_SELECTION' | 'TEMPLATE_SELECTION' | 'COMPLETED'
  plano: Plan
}

const SiteContext = createContext<SiteConfig | null>(null)

export function SiteProvider({
  site,
  children,
}: {
  site: SiteConfig
  children: ReactNode
}) {
  return (
    <SiteContext.Provider value={site}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) {
    throw new Error('useSite precisa estar dentro de SiteProvider')
  }
  return ctx
}

export function useIsPremium() {
  const { plano } = useSite();
  return plano === 'premium';
}