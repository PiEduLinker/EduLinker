'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface CarouselProps {
  items?: Array<{ imagem: string }>
  autoPlay?: boolean
  interval?: number
  fallbackImages?: string[]
}

export default function Carousel({
  items = [],
  autoPlay = true,
  interval = 5000,
  fallbackImages = ['/templates/free/woman.jpg', '/templates/free/woman2.jpg'],
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<Record<number, number>>({})
  const [loadedImages, setLoadedImages] = useState<boolean[]>([])

  // Inicializa o estado de carregamento de cada imagem
  useEffect(() => {
    if (items.length !== loadedImages.length) {
      setLoadedImages(items.map(() => false))
    }
  }, [items, loadedImages.length])

  const handleImageError = useCallback(
    (index: number) => () => {
      setImageErrors(prev => {
        const errorCount = prev[index] || 0
        return { ...prev, [index]: errorCount + 1 }
      })
    },
    []
  )

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => {
      const arr = [...prev]
      arr[index] = true
      return arr
    })
  }, [])

  // Auto-play
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return
    const timer = setInterval(
      () =>
        setCurrentIndex(i =>
          i === items.length - 1 ? 0 : i + 1
        ),
      interval
    )
    return () => clearInterval(timer)
  }, [autoPlay, interval, items.length])

  const prev = useCallback(
    () => setCurrentIndex(i => (i === 0 ? items.length - 1 : i - 1)),
    [items.length]
  )
  const next = useCallback(
    () => setCurrentIndex(i => (i === items.length - 1 ? 0 : i + 1)),
    [items.length]
  )
  const goTo = useCallback((i: number) => setCurrentIndex(i), [])

  // Se não houver slides, exibe apenas um fallback
  if (!items.length) {
    return (
      <div className="w-full bg-gray-200 flex items-center justify-center rounded-xl h-[300px] max-w-[800px] mx-auto">
        <Image
          src={fallbackImages[0]}
          alt="Nenhum slide disponível"
          fill
          unoptimized
          loader={({ src }) => src}
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, idx) => {
           const errCount = imageErrors[idx] || 0
          const src = errCount === 0
            ? item.imagem
            : (fallbackImages[errCount - 1] ?? '/default-carousel.jpg')
          return (
             <div
                 key={idx}
                 className="
                   w-full flex-shrink-0 relative 
                   h-48       /* 12rem (192px) em tela móvel */
                   sm:h-64    /* 16rem (256px) acima de 640px */
                   md:h-80    /* 20rem (320px) acima de 768px */
                   lg:h-200    /* 24rem (384px) acima de 1024px */
                 "
               >
              <Image
                src={src}
                alt={`Slide ${idx + 1}`}
                fill
                unoptimized
                loader={({ src }) => src}
                className="object-cover"
                onError={handleImageError(idx)}
              />
            </div>
          )
        })}
      </div>

      {/* Controles (só se >1 slide) */}
      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition z-10"
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition z-10"
            aria-label="Próximo"
          >
            ›
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-3 h-3 rounded-full transition ${i === currentIndex
                    ? 'bg-white'
                    : 'bg-white/50 hover:bg-white/75'
                  }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
