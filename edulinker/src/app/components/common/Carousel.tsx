import React from 'react'

interface CarouselProps {
  items?: Array<{
    imagem: string
    link?: string
    alt?: string
  }>
}

export default function Carousel({ items = [] }: CarouselProps) {
  if (!items.length) {
    return <p className="text-center italic">Nenhum slide disponível</p>
  }

  return (
    <div className="flex overflow-x-auto gap-4 py-4 px-2">
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.link || '#'}
          target="_blank"
          rel="noreferrer"
          className="flex-shrink-0 w-72 h-40 rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src={item.imagem}
            alt={item.alt || `Slide ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        </a>
      ))}
    </div>
  )
}