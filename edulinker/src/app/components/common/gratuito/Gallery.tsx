import React from 'react'

export default function Gallery({ items = [] }: { items?: Array<{ imagem: string }> }) {
  return (
    <div className="py-4 px-2">
      <p className="text-center font-semibold">Gallery Component Placeholder</p>
    </div>
  )
}
