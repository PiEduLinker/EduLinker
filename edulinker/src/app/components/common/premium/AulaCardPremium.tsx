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
    <div className="group relative h-full w-full">
      {/* Efeito de fundo glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-all duration-500"></div>
      
      {/* Card principal */}
      <div className="relative h-full bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 overflow-hidden flex flex-col">
        {/* Imagem da aula */}
        <div className="relative overflow-hidden h-48">
          {foto ? (
            <img 
              src={foto} 
              alt={titulo || 'Imagem da aula'} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-gray-500" />
            </div>
          )}
          {/* Overlay e nível */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
            {nivel && (
              <span className="inline-block bg-pink-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {nivel}
              </span>
            )}
          </div>
        </div>

        {/* Conteúdo do card */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Título limitado a 2 linhas */}
          <h3 
            className="text-lg font-bold text-white mb-2 group-hover:text-pink-500 transition-colors duration-300"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: '1.3',
              maxHeight: '2.6em'
            }}
          >
            {titulo || 'Aula Premium'}
          </h3>

          {/* Descrição limitada a 3 linhas */}
          <div 
            className="text-gray-300 mb-3 flex-grow text-sm"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: '1.5',
              maxHeight: '4.5em'
            }}
          >
            {descricao || 'Aula cuidadosamente elaborada para proporcionar a melhor experiência de aprendizado.'}
          </div>

          {/* Rodapé com metadados */}
          <div className="flex justify-between items-center mt-auto pt-2">
            {duracao && (
              <div className="flex items-center text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5 mr-1.5" />
                <span>{duracao}</span>
              </div>
            )}
            
            <a 
              href={whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, '')}` : '#'} 
              className="flex items-center text-pink-500 hover:text-pink-400 font-medium text-xs transition-colors duration-300"
              onClick={(e) => !whatsapp && e.preventDefault()}
            >
              Saiba mais
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}