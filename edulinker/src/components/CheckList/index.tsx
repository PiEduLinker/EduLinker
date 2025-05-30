'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  CircleDashed
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
    path: "/auth/admin/style",
    done: true,
  },
  {
    title: 'Adicione seus banners',
    description:
      'Defina imagens para os banners rotativos da sua página!',
    path: "/auth/admin/banners",
    done: true,
  },
  {
    title: 'Descreva suas escola',
    description:
      'Escreva um texto que conte a história da sua escola e o que a torna especial.',
    path: "/auth/admin/about",
    done: true,
  },
  {
    title: 'Crie sua galeria de fotos',
    description:
      'Adicione fotos da sua escola, professores e alunos para mostrar o ambiente.',
    path: "/auth/admin/gallery",
    done: true,
  },
  {
    title: 'Informe quais as aulas estão disponíveis',
    description: 'Crie sua grade de aulas com dias, horários e professores.',
    path: "/auth/admin/grade",
    done: false,
  },
  {
    title: 'Adicione os professores da escola',
    description: 'Cadastre os professores para que os alunos possam conhecê-los.',
    path: "/auth/admin/teachers",
    done: false,
  },
  {
    title: 'Adicione os depoimentos da sua escola',
    description: 'Exiba depoimentos de alunos e pais para aumentar a credibilidade.',
    path: "/auth/admin/testimonials",
    done: false,
  },
  {
    title: 'Informe o endereço e dados de contato da escola',
    description: 'Inclua telefone, WhatsApp, e localização no mapa.',
    path: "/auth/admin/contact",
    done: false,
  },
];

export default function CheckList() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="bg-white rounded-xl p-4 space-y-2">
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
              <div className="mt-2 ml-7">
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
                {item.path && (
                  <Link
                    href={item.path}
                    className="flex items-center gap-1 text-sm text-blue-500 mt-2 hover:text-blue-700"
                    onClick={(e) => e.stopPropagation()} // Impede que o evento de clique propague para o botão pai
                  >
                    Acessar página <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
