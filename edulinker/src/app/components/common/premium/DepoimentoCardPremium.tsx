import React from 'react'
import { Quote, User, Star } from 'lucide-react'

export default function DepoimentoCardPremium({
  foto,
  nome,
  texto,
  role,
  estrelas = 5
}: {
  foto?: string
  nome?: string
  texto?: string
  role?: string
  estrelas?: number
}) {
  return (
    <div className="group relative h-full w-full">
      {/* Efeito de fundo glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-all duration-500" />

      {/* Card principal */}
      <div className="relative h-full bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 flex flex-col">
        {/* Ícone de citação */}
        <Quote className="w-7 h-7 text-pink-500 opacity-20 mb-4" />

        {/* Texto do depoimento limitado a 4 linhas */}
        <div 
          className="text-gray-300 italic mb-4 flex-grow text-base"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '1.5',
            maxHeight: '6em' // 4 linhas × 1.5 line-height
          }}
        >
          {texto || '"A experiência foi transformadora e superou todas as minhas expectativas."'}
        </div>

        {/* Avaliação por estrelas */}
        <div className="flex mb-4">
          {[1,2,3,4,5].map(n => (
            <Star
              key={n}
              size={18}
              className={n <= estrelas ? 'text-yellow-400' : 'text-gray-500'}
              fill={n <= estrelas ? 'currentColor' : 'none'}
            />
          ))}
        </div>

        {/* Rodapé com informações do autor */}
        <div className="flex items-center mt-auto">
          <div className="relative mr-3">
            {/* Efeito de hover na foto */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Container da foto */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-800 shadow-md">
              {foto ? (
                <img 
                  src={foto} 
                  alt={nome || 'Depoente'} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                  loading="lazy" 
                />
              ) : (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>
          </div>
          
          {/* Nome e cargo */}
          <div className="min-w-0">
            <p className="font-semibold text-white truncate">{nome || 'Aluno'}</p>
            {role && (
              <p className="text-sm text-gray-400 truncate">
                {role}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}