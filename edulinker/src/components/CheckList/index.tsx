'use client';

import { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const checklist = [
  {
    title: 'Criar o seu site',
    description: 'Seu site já está disponível! Deixe tudo pronto para captar novos alunos!',
    done: true,
    expanded: true,
  },
  {
    title: 'Personalize o estilo do seu site',
    done: true,
  },
  {
    title: 'Adicione os professores da escola',
    done: true,
  },
  {
    title: 'Informe quais as aulas estão disponíveis',
    done: true,
  },
  {
    title: 'Informe o endereço e dados de contato da escola',
    done: true,
  },
];

export default function CheckList() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-xl space-y-2">
      {checklist.map((item, index) => {
        const isExpanded = expandedIndex === index;

        return (
          <div
            key={item.title}
            className="border border-gray-200 rounded-lg p-3 transition hover:bg-gray-50"
          >
            <button
              className="w-full flex justify-between items-center text-left"
              onClick={() => setExpandedIndex(index === expandedIndex ? null : index)}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500 w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {isExpanded && item.description && (
              <p className="text-sm text-gray-600 mt-2 ml-7">{item.description}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
