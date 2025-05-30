import React from 'react';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';

export default function AulaCardPremium({ 
  foto, 
  titulo, 
  descricao, 
  nivel,
  duracao,
  whatsapp
}: { 
  foto?: string; 
  titulo?: string; 
  descricao?: string;
  nivel?: string;
  duracao?: string;
  whatsapp?: string;
}) {
  return (
    <div className="group relative h-full">
      {/* Efeito de fundo */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-all duration-500"></div>
      
      {/* Card principal */}
      <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
        {/* Imagem da aula */}
        <div className="relative overflow-hidden h-56">
          {foto ? (
            <img 
              src={foto} 
              alt={titulo || 'Imagem da aula'} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          {/* Overlay e nível */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            {nivel && (
              <span className="inline-block bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {nivel}
              </span>
            )}
          </div>
        </div>

        {/* Conteúdo do card */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Título */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-pink-500 transition-colors duration-300">
            {titulo || 'Aula Premium'}
          </h3>

          {/* Descrição */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
            {descricao || 'Aula cuidadosamente elaborada para proporcionar a melhor experiência de aprendizado.'}
          </p>

          {/* Rodapé com metadados */}
          <div className="flex justify-between items-center mt-4">
            {duracao && (
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                <span>{duracao}</span>
              </div>
            )}
            
            <a href={whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, '')}` : '#'} className="flex items-center text-pink-500 hover:text-pink-600 dark:hover:text-pink-400 font-medium text-sm transition-colors duration-300">
              Saiba mais
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}