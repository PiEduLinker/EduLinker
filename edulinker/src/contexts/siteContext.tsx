'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export type Plan = 'gratuito' | 'premium'
export interface SiteConfig {
  slug: string
  descricao: string
  configuracoes: any
  status: 'BASIC_INFO' | 'PLAN_SELECTION' | 'TEMPLATE_SELECTION' | 'COMPLETED'
  plano: Plan
  templateOriginalId?: string
}

interface SiteContextValue extends SiteConfig {
  setConfiguracoes: (c: any) => void
  setTemplateOriginalId: (id: string) => void
}

const SiteContext = createContext<SiteContextValue | null>(null)

export function SiteProvider({ site, children }: { site: SiteConfig; children: ReactNode }) {
  const [configuracoes, setConfiguracoes] = useState(site.configuracoes)
  const [templateOriginalId, setTemplateOriginalId] = useState(site.templateOriginalId)

  return (
    <SiteContext.Provider
      value={{
        slug: site.slug,
        descricao: site.descricao,
        configuracoes,
        status: site.status,
        plano: site.plano,
        templateOriginalId,
        setConfiguracoes,
        setTemplateOriginalId,
      }}
    >
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
  const { plano } = useSite()
  return plano === 'premium'
}