import React, { useState } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryPremium({ items = [] }: { items?: Array<{ imagem: string }> }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const openImage = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedIndex(null);
    setIsZoomed(false);
    document.body.style.overflow = 'auto';
  };

  const navigate = (direction: 'prev' | 'next') => {
    if (selectedIndex === null) return;
    
    const newIndex = direction === 'prev' 
      ? (selectedIndex === 0 ? items.length - 1 : selectedIndex - 1)
      : (selectedIndex === items.length - 1 ? 0 : selectedIndex + 1);
    
    setSelectedIndex(newIndex);
    setIsZoomed(false);
  };

  return (
    <div className="relative">
      {/* Grid da Galeria */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, index) => (
          <div 
            key={index}
            className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 aspect-square"
            onClick={() => openImage(index)}
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

      {/* Lightbox Premium */}
      {selectedIndex !== null && (
        <div className={`fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
          <button 
            onClick={closeImage}
            className="absolute top-6 right-6 text-white hover:text-pink-400 transition-colors duration-300 z-10"
            aria-label="Fechar"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-6xl h-full max-h-[90vh]">
            <img
              src={items[selectedIndex].imagem}
              alt={`Imagem ampliada ${selectedIndex + 1}`}
              className={`object-contain w-full h-full ${isZoomed ? 'object-scale-down cursor-zoom-out' : 'cursor-zoom-in'}`}
              onClick={() => setIsZoomed(!isZoomed)}
            />

            {items.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate('next'); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="absolute bottom-6 left-0 right-0 text-center text-white text-sm opacity-70">
            {selectedIndex + 1} / {items.length}
          </div>
        </div>
      )}

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