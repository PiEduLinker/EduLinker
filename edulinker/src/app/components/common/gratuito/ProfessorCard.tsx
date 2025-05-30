import { User } from "lucide-react";

export default function ProfessorCard({
  foto,
  nome,
  descricao,
}: {
  foto?: string;
  nome?: string;
  descricao?: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all text-center">
      <div className="relative h-64 w-full">
        {foto && foto.trim() !== "" ? (
          <img
            src={foto}
            alt={nome || "Professor"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <User className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{nome || "Professor"}</h3>
        <p className="text-gray-600 mb-4">
          {descricao || "Especialista em sua área"}
        </p>
      </div>
    </div>
  );
}
