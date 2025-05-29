'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface CarouselProps {
  items?: Array<{ imagem: string; link?: string }>
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

  const handleImageError = useCallback(
    (index: number) => () => {
      setImageErrors(prev => ({ ...prev, [index]: (prev[index] || 0) + 1 }))
    },
    []
  )

  // Auto-play
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev === items.length - 1 ? 0 : prev + 1))
    }, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, items.length])

  const prev = () => setCurrentIndex(i => (i === 0 ? items.length - 1 : i - 1))
  const next = () => setCurrentIndex(i => (i === items.length - 1 ? 0 : i + 1))

  // Se não houver slides, exibe apenas um fallback
  if (!items.length) {
    return (
      <div className="relative w-full h-[500px] bg-gray-100 rounded-lg">
        <Image
          src={fallbackImages[0]}
          alt="Banner padrão"
          fill
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl">
      {/* Slides */}
      <div className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, idx) => {
          const errCount = imageErrors[idx] || 0
          const src = errCount < fallbackImages.length 
            ? fallbackImages[errCount] 
            : '/default-banner.jpg'

          return (
            <div key={idx} className="w-full flex-shrink-0 relative h-full">
              <Image
                src={src}
                alt={`Slide ${idx + 1}`}
                fill
                className="object-cover"
                onError={handleImageError(idx)}
              />
            </div>
          )
        })}
      </div>

      {/* Controles */}
      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition z-10"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition z-10"
          >
            ›
          </button>
        </>
      )}
    </div>
  )
}
