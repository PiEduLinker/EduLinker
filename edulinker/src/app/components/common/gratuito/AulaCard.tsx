import { Clock, BookOpen } from "lucide-react";
import React from "react";

export default function AulaCard({
  foto,
  titulo,
  descricao,
  nivel,
  duracao,
  whatsapp,
  fg,
}: {
  foto?: string;
  titulo?: string;
  descricao?: string;
  nivel?: string;
  duracao?: string;
  whatsapp?: string;
  fg?: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
      <div className="relative h-60 w-full">
        {foto && foto.trim() !== "" ? (
          <img
            src={foto}
            alt={titulo || "Aula"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300  flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-gray-400 " />
          </div>
        )}

        {nivel && (
          <span className="absolute top-3 right-3 text-white px-3 py-1 rounded-full text-xs font-bold bg-pink-500">
            {nivel}
          </span>
        )}

        {duracao && (
          <span className="absolute bottom-3 left-3 bg-white bg-opacity-75  text-gray-800  px-2 py-1 rounded text-xs flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{duracao}</span>
          </span>
        )}
      </div>

      <div className="p-5">
        <h3
          className="text-xl font-bold mb-2 text-gray-800"
          style={{ color: fg }}
        >
          {titulo || "Título da Aula"}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {descricao || "Descrição da aula..."}
        </p>
        <a
          href={whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, "")}` : "#"}
          className="text-pink-500 font-semibold hover:underline flex items-center"
          style={{ color: fg }}
        >
          Saiba mais
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
