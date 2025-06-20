import { User } from "lucide-react";
import Image from "next/image";

interface ProfessorCardProps {
  foto?: string;
  nome: string;
  texto: string;
  especialidade?: string;
  fg?: string;
}

// ProfessorCard.tsx
export default function ProfessorCard({
  foto,
  nome = "Professor",
  texto = "Descrição do professor",
  fg,
}: ProfessorCardProps) {
  return (
    <div className="group relative h-full rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 bg-white">
      {/* Container da imagem com efeito hover */}
      <div className="relative h-60 w-full overflow-hidden">
        {foto ? (
          <Image
            src={foto}
            alt={`Foto de ${nome}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            quality={85}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <User className="w-16 h-16 text-gray-400 group-hover:text-black transition-colors duration-300" />
          </div>
        )}
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Informações do professor */}
      <div className="p-5">
        <div className="mb-2">
          <h3 className="text-xl font-bold line-clamp-1" style={{ color: fg }}>{nome}</h3>          
        </div>
        <p className="text-sm line-clamp-3" style={{ color: fg }}>{texto}</p>
        
        {/* Efeito de borda inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}