'use client'

import React, { useState, useEffect } from 'react';

interface CarouselProps {
  items?: Array<{
    imagem: string;
    link?: string;
    alt?: string;
  }>;
  autoPlay?: boolean;
  interval?: number;
  fallbackImages?: string[];
}

export default function Carousel({
  items = [],
  autoPlay = true,
  interval = 5000,
  fallbackImages = [
    '/templates/free/woman.jpg',
    '/templates/free/woman2.jpg'
  ],
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, number>>({});
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);

  // Initialize loaded images state
  useEffect(() => {
    if (items.length !== loadedImages.length) {
      setLoadedImages(items.map(() => false));
    }
  }, [items, loadedImages.length]);


  // Handle image loading errors with multiple fallbacks
  const handleImageError = (index: number) => (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    const errorCount = imageErrors[index] || 0;

    if (errorCount < fallbackImages.length) {
      target.src = fallbackImages[errorCount];
      setImageErrors(prev => ({ ...prev, [index]: errorCount + 1 }));
    } else {
      target.src = '/default-carousel.jpg'; // Imagem de fallback final
      target.alt = 'Imagem padrão';
    }
  };

  // Handle successful image load
  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, autoPlay, interval, currentIndex]); // Removido currentIndex das dependências para evitar reset do timer a cada mudança manual

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!items.length) {
    return (
      <div className="w-full bg-gray-200 flex items-center justify-center rounded-xl">
        <img
          src={fallbackImages[0]}
          alt="Nenhum slide disponível"
          className="h-full w-full object-cover" // h-full fará a imagem preencher o contêiner pai
          onError={handleImageError(-1)} // Usar -1 ou um índice especial para este caso
        />
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          // Modificado: Adicionado min-h-[50vh] para cada slide
          <div key={index} className="w-full flex-shrink-0 relative min-h-[60vh]">
            {/* Main image */}
            <a
              href={item.link || '#'}
              target="_blank"
              rel="noreferrer"
              // Modificado: Adicionado h-full para o link preencher a altura do slide
              className="block h-full"
            >
              <img
                src={item.imagem}
                alt={item.alt || `Slide ${index + 1}`}
                // Modificado: Removido max-h-96 e h-auto, adicionado h-full
                className={`w-full h-full object-cover ${!loadedImages[index] ? 'opacity-0 absolute' : 'opacity-100 transition-opacity duration-300'}`}
                onError={handleImageError(index)}
                onLoad={() => handleImageLoad(index)}
              />
            </a>

            {/* Fallback image (shown while loading or if main image fails) */}
            {/* Este placeholder deve cobrir a área do slide se a imagem principal não carregou */}
            {!loadedImages[index] && (
              // Modificado: Usar absolute inset-0 e h-full para cobrir o slide
              // O pai (slide div) já é relative e tem min-h-[50vh]
              <div className="absolute inset-0 w-full h-full bg-gray-100 flex items-center justify-center">
                <img
                  src={fallbackImages[0]} // Ou um loader específico
                  alt="Carregando..."
                  className="w-full h-full object-cover" // Para preencher o placeholder div
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation arrows (only show if more than one slide) */}
      {items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition cursor-pointer z-10"
            aria-label="Slide anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition cursor-pointer z-10"
            aria-label="Próximo slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Indicators (only show if more than one slide) */}
      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition ${index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}