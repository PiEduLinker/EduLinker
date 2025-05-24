import React from 'react'
import Image from 'next/image'

export default function ProfessorCard({
  foto,
  nome,
  descricao
}: {
  foto?: string
  nome?: string
  descricao?: string
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all text-center">
      <div className="relative h-64 w-full">
        <Image
          src={foto || '/default-professor.jpg'}
          alt={nome || 'Professor'}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{nome || 'Professor'}</h3>
        <p className="text-gray-600 mb-4">{descricao || 'Especialista em sua área'}</p>
        
        <div className="flex justify-center space-x-3">
          {['facebook', 'twitter', 'instagram'].map((social) => (
            <a 
              key={social} 
              href="#" 
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-100 transition"
            >
              <span className="sr-only">{social}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}