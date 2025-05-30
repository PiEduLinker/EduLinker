import React from 'react';
import { ChevronRight, ZoomIn } from 'lucide-react';

export default function Gallery({ items = [] }: { items?: Array<{ imagem: string }> }) {
  return (
    <div className="relative">
      {/* Grid da Galeria */}
      <div className="flex justify-center px-4">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-[1800px]">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 aspect-square w-[300px]"
            >
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800">
                <img
                  src={item.imagem}
                  alt={`Imagem da galeria ${index + 1}`}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center">
                  <ZoomIn className="w-8 h-8 mb-2" />
                  <p className="text-sm font-medium">Visualizar</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botão Ver Mais (opcional) */}
      {items.length > 8 && (
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
            Ver Mais Fotos
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      )}
    </div>
  );
}