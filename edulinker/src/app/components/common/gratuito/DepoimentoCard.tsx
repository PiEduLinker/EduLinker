import React from 'react'

export default function DepoimentoCard({
  foto,
  nome,
  texto
}: {
  foto?: string
  nome?: string
  texto?: string
}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          {foto ? (
            <img src={foto} alt={nome} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Foto</span>
            </div>
          )}
        </div>
        <h4 className="text-lg font-bold text-gray-800">
          {nome || 'Cliente'}
        </h4>
      </div>
      
      <p className="text-gray-600 italic relative pl-6">
        <span className="absolute left-0 top-0 text-3xl text-pink-300 leading-none">"</span>
        {texto || 'Depoimento sobre o serviço...'}
      </p>
      
      <div className="mt-4 flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  )
}