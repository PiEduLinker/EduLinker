'use client';

import { useState } from 'react';
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  CircleDashed,
} from 'lucide-react';

const checklist = [
  {
    title: 'Criar o seu site',
    description:
      'Seu site já está disponível! Deixe tudo pronto para captar novos alunos!',
    done: true,
  },
  {
    title: 'Personalize o estilo do seu site',
    description: 'Escolha cores, fontes e layout que combinam com sua escola.',
    done: false,
  },
  {
    title: 'Adicione os professores da escola',
    description: 'Cadastre os professores para que os alunos possam conhecê-los.',
    done: false,
  },
  {
    title: 'Informe quais as aulas estão disponíveis',
    description: 'Crie sua grade de aulas com dias, horários e professores.',
    done: false,
  },
  {
    title: 'Informe o endereço e dados de contato da escola',
    description: 'Inclua telefone, WhatsApp, e localização no mapa.',
    done: false,
  },
];

export default function CheckList() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="bg-white rounded-xl p-4 w-full max-w-xl space-y-2">
      {checklist.map((item, index) => {
        const isExpanded = expandedIndex === index;

        return (
          <button
            key={item.title}
            className="w-full text-left border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition flex flex-col"
            onClick={() =>
              setExpandedIndex(isExpanded ? null : index)
            }
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-2">
                {item.done ? (
                  <CheckCircle className="text-green-500 w-5 h-5" />
                ) : (
                  <CircleDashed className="text-gray-400 w-5 h-5" />
                )}
                <span className="font-medium">{item.title}</span>
              </div>

              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>

            {isExpanded && (
              <p className="text-sm text-gray-600 mt-2 ml-7">
                {item.description}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}