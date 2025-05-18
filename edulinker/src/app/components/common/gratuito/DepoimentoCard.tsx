import React from 'react';

export default function DepoimentoCard({ foto, nome, texto }: { foto?: string; nome?: string; texto?: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center h-full"> {/* Card container styles */}
      {/* Photo/Avatar */}
      {foto && ( // Render photo only if the foto prop exists
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4 overflow-hidden"> {/* Circular photo container */}
          <img src={foto} alt={nome || 'Foto do depoente'} className="object-cover w-full h-full" /> {/* Photo styling */}
        </div>
      )}
      {/* Depoimento Text */}
      <p className="text-gray-700 italic mb-4 flex-grow"> {/* Text styling, flex-grow to push name down */}
        "{texto || 'Depoimento placeholder...'}" {/* Display text or placeholder */}
      </p>
      {/* Name */}
      {nome && ( // Render name only if the nome prop exists
        <p className="font-semibold text-gray-800 mt-auto"> {/* Name styling, mt-auto pushes it to bottom */}
          - {nome} {/* Display name */}
        </p>
      )}
    </div>
  );
}