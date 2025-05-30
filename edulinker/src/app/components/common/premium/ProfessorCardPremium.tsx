import React from 'react'
import { User, BookOpen } from 'lucide-react'

interface ProfessorCardPremiumProps {
  foto?: string
  nome?: string
  texto?: string
}

export default function ProfessorCardPremium({
  foto,
  nome,
  texto,
}: ProfessorCardPremiumProps) {
  return (
    <div className="group relative">
      {/* Efeito de fundo */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-all duration-500"></div>
      
      {/* Card principal */}
      <div className="relative h-full bg-white  p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100  flex flex-col items-center text-center">
        {/* Foto do professor */}
        <div className="relative mb-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
            {foto ? (
              <img 
                src={foto} 
                alt={nome || 'Professor'} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-200  flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
        </div>
        
        {/* Nome */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900  mb-1">{nome || 'Professor'}</h3>
        </div>
        
        {/* Descrição */}
        <p className="text-gray-600  mb-6 flex-grow">
          {texto || 'Especialista com anos de experiência em transformar vidas através do conhecimento.'}
        </p>
        
        {/* Ícone decorativo */}
        <div className="text-pink-500 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <BookOpen className="w-8 h-8" />
        </div>
      </div>
    </div>
  )
}
