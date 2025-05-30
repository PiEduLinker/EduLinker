'use client'

import { Lock } from 'lucide-react'
import { useIsPremium } from '@/contexts/siteContext'
import { JSX } from 'react'

interface ApplyThemeButtonProps {
  loading: boolean
  onClick: () => void
}

export default function ApplyThemeButton({
  loading,
  onClick,
}: ApplyThemeButtonProps): JSX.Element {
  const isPremium = useIsPremium()

  return (
    <button
      onClick={onClick}
      disabled={loading || !isPremium}
      className={`
        mt-6 flex items-center justify-center w-full
        py-3 rounded-full text-white font-semibold transition
        ${isPremium
          ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:opacity-90'
          : 'bg-gray-300 cursor-not-allowed'}
      `}
    >
      {!isPremium && <Lock className="mr-2 w-5 h-5 text-gray-600" />}
      {loading
        ? 'Salvando…'
        : isPremium
        ? 'Aplicar Tema'
        : 'Somente Premium'}
    </button>
  )
}
