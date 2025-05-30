"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  CircleDashed,
} from "lucide-react";
import { useSite } from "@/contexts/siteContext";
import { SiteConfig } from "@/types/site";

interface Step {
  title: string;
  description: string;
  path?: string;
  isDone: (cfg: SiteConfig) => boolean;
}

export default function CheckList() {
  const { slug, configuracoes } = useSite();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const steps: Step[] = [
    {
      title: "Criar o seu site",
      description:
        "Seu site já está disponível! Deixe tudo pronto para captar novos alunos!",
      isDone: () => !!slug,
    },
    {
      title: "Personalize o estilo do seu site",
      description:
        "Escolha cores, fontes e layout que combinam com sua escola.",
      path: "/auth/admin/style",
      isDone: (cfg) => !!cfg.corFundo && !!cfg.fonte,
    },
    {
      title: "Adicione seus banners",
      description: "Defina imagens para os banners rotativos da sua página!",
      path: "/auth/admin/banners",
      isDone: (cfg) => Array.isArray(cfg.carrossel) && cfg.carrossel.length > 0,
    },
    {
      title: "Descreva suas escola",
      description:
        "Escreva um texto que conte a história da sua escola e o que a torna especial.",
      path: "/auth/admin/about",
      isDone: (cfg) => !!cfg.descricao,
    },
    {
      title: "Crie sua galeria de fotos",
      description:
        "Adicione fotos da sua escola, professores e alunos para mostrar o ambiente.",
      path: "/auth/admin/gallery",
      isDone: (cfg) => Array.isArray(cfg.galerias) && cfg.galerias.length > 0,
    },
    {
      title: "Informe quais as aulas estão disponíveis",
      description: "Crie sua grade de aulas com dias, horários e professores.",
      path: "/auth/admin/grade",
      isDone: (cfg) => Array.isArray(cfg.aulas) && cfg.aulas.length > 0,
    },
    {
      title: "Adicione os professores da escola",
      description:
        "Cadastre os professores para que os alunos possam conhecê-los.",
      path: "/auth/admin/teachers",
      isDone: (cfg) =>
        Array.isArray(cfg.professores) && cfg.professores.length > 0,
    },
    {
      title: "Adicione os depoimentos da sua escola",
      description:
        "Exiba depoimentos de alunos e pais para aumentar a credibilidade.",
      path: "/auth/admin/testimonials",
      isDone: (cfg) =>
        Array.isArray(cfg.depoimentos) && cfg.depoimentos.length > 0,
    },

  ];

  return (
    <div className="bg-white rounded-xl p-4 space-y-2">
      {steps.map((step, idx) => {
        const done = step.isDone(configuracoes);
        const isExpanded = expandedIndex === idx;

        return (
          <button
            key={step.title}
            className="w-full text-left border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition flex flex-col"
            onClick={() => setExpandedIndex(isExpanded ? null : idx)}
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-2">
                {done ? (
                  <CheckCircle className="text-green-500 w-5 h-5" />
                ) : (
                  <CircleDashed className="text-gray-400 w-5 h-5" />
                )}
                <span className="font-medium">{step.title}</span>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>

            {isExpanded && (
              <div className="mt-2 ml-7">
                <p className="text-sm text-gray-600">{step.description}</p>
                {step.path && (
                  <Link
                    href={step.path}
                    className="flex items-center gap-1 text-sm text-blue-500 mt-2 hover:text-blue-700"
                    onClick={(e) => e.stopPropagation()}
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
