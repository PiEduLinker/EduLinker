import React from 'react';
import { Quote, User } from 'lucide-react';

export default function DepoimentoCardPremium({ 
  foto, 
  nome, 
  texto, 
  role 
}: { 
  foto?: string; 
  nome?: string; 
  texto?: string;
  role?: string;
}) {
  return (
    <div className="group relative h-full">
      {/* Efeito de fundo */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-all duration-500"></div>
      
      {/* Card principal */}
      <div className="relative h-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col">
        {/* Ícone de citação do Lucide */}
        <Quote className="w-8 h-8 text-pink-500 opacity-20 mb-6" />
        
        {/* Texto do depoimento */}
        <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-8 flex-grow relative z-10">
          {texto || '"A experiência foi transformadora e superou todas as minhas expectativas."'}
        </p>
        
        {/* Rodapé com foto e nome */}
        <div className="flex items-center mt-auto">
          {/* Foto circular com efeito */}
          <div className="relative mr-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-md">
              {foto ? (
                <img 
                  src={foto} 
                  alt={nome || 'Depoente'} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
          </div>
          
          {/* Nome e cargo */}
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{nome || 'Aluno'}</p>
            {role && <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}