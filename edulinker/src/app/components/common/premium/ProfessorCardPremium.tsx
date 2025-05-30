import React from 'react'
import { User, BookOpen, Award, GraduationCap } from 'lucide-react'

interface ProfessorCardPremiumProps {
  foto?: string
  nome?: string
  texto?: string
  especialidade?: string
  experiencia?: number
}

export default function ProfessorCardPremium({
  foto,
  nome,
  texto,
  especialidade,
  experiencia
}: ProfessorCardPremiumProps) {
  return (
    <div className="group relative h-full w-full">
      {/* Efeito de fundo glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-all duration-500" />

      {/* Card principal */}
      <div className="relative h-full bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 flex flex-col items-center text-center">
        {/* Ícone decorativo superior */}
        <GraduationCap className="w-8 h-8 text-pink-500 opacity-20 mb-2 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Foto do professor */}
        <div className="relative mb-4">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-800 shadow-lg">
            {foto ? (
              <img 
                src={foto} 
                alt={nome || 'Professor'} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
        </div>
        
        {/* Nome e especialidade */}
        <div className="mb-3 w-full px-2">
          <h3 className="text-lg font-bold text-white mb-1 truncate">{nome || 'Professor'}</h3>
          {especialidade && (
            <div className="flex items-center justify-center text-xs text-pink-400 truncate">
              <Award className="w-3 h-3 mr-1" />
              {especialidade}
            </div>
          )}
        </div>
        
        {/* Descrição com limite de 4 linhas */}
        <div className="w-full px-2 mb-4 flex-grow" style={{
          display: '-webkit-box',
          WebkitLineClamp: 6,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: '1.5',
          maxHeight: '6em'
        }}>
          <p className="text-gray-300 text-sm">
            {texto || 'Especialista com anos de experiência em transformar vidas através do conhecimento.'}
          </p>
        </div>
        
        {/* Experiência */}
        {experiencia && (
          <div className="bg-gray-700 px-3 py-1 rounded-full text-xs text-gray-300">
            {experiencia}+ anos de experiência
          </div>
        )}

        {/* Ícone decorativo inferior */}
        <BookOpen className="w-6 h-6 text-pink-500 opacity-20 mt-4 group-hover:opacity-40 transition-opacity duration-300" />
      </div>
    </div>
  )
}