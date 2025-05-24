import React from 'react'
import Image from 'next/image'

export default function Gallery({ items = [] }: { items?: Array<{ imagem: string }> }) {
  // Se não houver itens, mostra 6 imagens padrão
  const galleryItems = items.length ? items : Array(6).fill({ imagem: '/templates/free/gallery-placeholder.jpg' })

  return (
    <section id="galeria" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Galeria de Fotos</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <div 
              key={index} 
              className="relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <Image
                src={item.imagem}
                alt={`Foto da galeria ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-medium transition">
            Ver mais fotos
          </button>
        </div>
      </div>
    </section>
  )
}