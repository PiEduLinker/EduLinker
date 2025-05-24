import React from 'react'

export default function AulaCard({ 
  foto, 
  titulo, 
  descricao, 
  nivel 
}: { 
  foto?: string
  titulo?: string
  descricao?: string
  nivel?: string 
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
      <div className="relative h-60 w-full">
        {foto ? (
          <img 
            src={foto} 
            alt={titulo || 'Aula'} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Sem imagem</span>
          </div>
        )}
        {nivel && (
          <span className="absolute top-3 right-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {nivel}
          </span>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-800">
          {titulo || 'Título da Aula'}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {descricao || 'Descrição da aula...'}
        </p>
        <button className="text-pink-500 font-semibold hover:underline flex items-center">
          Saiba mais
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}