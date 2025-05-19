import React from 'react'

interface Props {
  foto?: string
  nome?: string
  descricao?: string
}

export default function ProfessorCard({
  foto,
  nome,
  descricao,
}: Props) {
  return (
    <div className="border p-4 rounded shadow-sm text-center">
      {foto && (
        <img
          src={foto}
          alt={nome}
          className="mx-auto mb-4 w-24 h-24 object-cover rounded-full"
        />
      )}
      {nome && <h3 className="font-semibold text-lg mb-2">{nome}</h3>}
      {descricao && <p className="text-gray-600 text-sm">{descricao}</p>}
    </div>
  )
}
