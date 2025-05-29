'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export type Plan = 'gratuito' | 'premium'
export interface SiteConfig {
  slug: string
  descricao: string
  configuracoes: any
  status: 'BASIC_INFO' | 'PLAN_SELECTION' | 'TEMPLATE_SELECTION' | 'COMPLETED'
  plano: Plan
}

interface SiteContextValue extends SiteConfig {
  setConfiguracoes: (c: any) => void
}

const SiteContext = createContext<SiteContextValue | null>(null)

export function SiteProvider({ site, children }: { site: SiteConfig; children: ReactNode }) {
  const [configuracoes, setConfiguracoes] = useState(site.configuracoes)

  return (
    <SiteContext.Provider value={{ ...site, configuracoes, setConfiguracoes }}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite precisa estar dentro de SiteProvider')
  return ctx
}

export function useIsPremium() {
  const { plano } = useSite();
  return plano === 'premium';
}
