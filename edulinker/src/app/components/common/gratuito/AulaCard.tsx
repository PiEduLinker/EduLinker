import { Clock, BookOpen, ArrowRight } from "lucide-react";

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
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all h-full flex flex-col">
      {/* Imagem */}
      <div className="relative h-40 w-full">
        {foto && foto.trim() !== "" ? (
          <img
            src={foto}
            alt={titulo || "Aula"}
            className="w-full h-full object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-50 flex items-center justify-center rounded-t-lg">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
        )}
        
        {/* Badge de nível */}
        {nivel && (
          <span className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-xs">
            {nivel}
          </span>
        )}
        
        {/* Duração */}
        {duracao && (
          <span className="absolute bottom-2 left-2 bg-white text-gray-700 px-2 py-1 rounded text-xs flex items-center gap-1 border border-gray-200">
            <Clock className="w-3 h-3" />
            <span>{duracao}</span>
          </span>
        )}
      </div>

      {/* Conteúdo do card */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ color: fg }}>
          {titulo || "Título da Aula"}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {descricao || "Descrição da aula..."}
        </p>
        
        <a
          href={whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, "")}` : "#"}
          className="text-gray-700 hover:text-gray-900 transition-colors inline-flex items-center text-sm mt-auto"
        >
          Saiba mais
          <ArrowRight className="w-3 h-3 ml-1" />
        </a>
      </div>
    </div>
  );
}