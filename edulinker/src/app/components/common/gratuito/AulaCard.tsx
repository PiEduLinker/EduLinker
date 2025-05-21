import React from 'react';

// Add 'descricao' and 'nivel' props
export default function AulaCard({ foto, titulo, descricao, nivel }: { foto?: string; titulo?: string; descricao?: string; nivel?: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"> {/* Card container */}
      {/* Image */}
      {foto && ( // Render image only if foto prop exists
        <div className="w-full h-48 overflow-hidden"> {/* Image container with fixed height */}
          <img src={foto} alt={titulo || 'Imagem da aula'} className="object-cover w-full h-full" /> {/* Image styling */}
        </div>
      )}

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow"> {/* Content padding and flex-grow to fill space */}
        {/* Level Label */}
        {nivel && ( // Render label only if nivel prop exists
           <span className="inline-block bg-pink-100 text-pink-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 self-start"> {/* Label styling */}
             {nivel} {/* Display level */}
           </span>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{titulo || 'Título da Aula'}</h3> {/* Title styling */}

        {/* Description */}
        {descricao && ( // Render description only if descricao prop exists
          <p className="text-gray-600 text-sm flex-grow">{descricao}</p>
        )}

        {/* Optional: Add button or link here if needed per card */}
        {/* <a href="#" className="mt-4 text-pink-600 hover:underline self-start">Saiba Mais</a> */}
      </div>
    </div>
  );
}