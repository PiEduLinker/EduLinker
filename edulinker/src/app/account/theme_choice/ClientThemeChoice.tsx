"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

type Plan = "gratuito" | "premium";
interface Template {
  id: string;
  nome: string;
  pro: boolean;
}

interface Props {
  siteId?: string;
}

export default function ClientThemeChoice({ siteId }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const id = siteId ?? params.get("siteId");

  const [plan, setPlan] = useState<Plan>("gratuito");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filtered, setFiltered] = useState<Template[]>([]);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // Novo estado para o submit

  // Mapeamento estático das thumbnails
  const IMAGE_MAP: Record<string, string> = {
    "682953cfeacbea36d53508b9": "/ThemeImages/Facilita Sites.jpg",
    "682a30fc7e6132facb3e70cc": "/ThemeImages/Advocacia.jpg",
  };

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const stRes = await fetch("/api/onboarding/status", {
          credentials: "include",
        });
        if (!stRes.ok) throw new Error("Falha ao obter status");
        const { plano } = (await stRes.json()) as { plano: Plan };
        setPlan(plano);

        const tplRes = await fetch("/api/templates");
        if (!tplRes.ok) throw new Error("Falha ao obter templates");
        const tplList = (await tplRes.json()) as Template[];

        setTemplates(tplList);
        setFiltered(
          plano === "premium" ? tplList : tplList.filter((t) => !t.pro)
        );
      } catch (err: any) {
        setError(err.message || "Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!selected) {
      setError("Selecione um tema para continuar.");
      return;
    }

    setSubmitting(true); // Usando o novo estado para o submit
    try {
      const res = await fetch("/api/onboarding/template", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId: id,
          templateId: selected,
          configuracoes: {},
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.erro || "Falha ao salvar template.");
      }
      router.push(`/account/congrats_page?siteId=${id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false); // Desativa o loading do botão
    }
  };

  if (!id) {
    return <p className="text-center text-red-500">Site ID não encontrado.</p>;
  }
  if (loading) {
    return <p className="p-6 text-center">Carregando templates…</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl mx-auto flex flex-col items-center px-4 space-y-8 pb-12"
    >
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        ESCOLHA O SEU TEMA
      </h1>
      {error && (
        <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
      )}
      <div className={`grid ${filtered.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-1 md:grid-cols-2'} gap-10 w-full`}>
        {filtered.map((tpl) => (
          <label
            key={tpl.id}
            className={`relative flex flex-col items-center rounded-xl overflow-hidden cursor-pointer
                  border-2 transition-shadow duration-300 shadow-md hover:shadow-xl
                  ${selected === tpl.id
                ? "border-purple-600 ring-4 ring-purple-200"
                : "border-transparent"
              }`}
          >
            <input
              type="radio"
              name="template"
              value={tpl.id}
              checked={selected === tpl.id}
              onChange={() => setSelected(tpl.id)}
              className="hidden"
            />
            <div className="w-full text-center bg-gray-100 py-3 px-2 font-semibold text-lg relative">
              {tpl.nome}
              {tpl.pro && (
                <span className="absolute top-1 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  PRO
                </span>
              )}
            </div>
            <div className="aspect-[4/3] w-full relative">
              <Image
                src={IMAGE_MAP[tpl.id] ?? "/default.jpg"}
                alt={tpl.nome}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </label>
        ))}
      </div>
      <button
        type="submit"
        disabled={submitting || !selected} // Desabilita se estiver submetendo ou nenhum tema selecionado
        className={`w-full max-w-md bg-purple-700 text-white py-3 rounded-full hover:bg-purple-800 transition cursor-pointer
          ${submitting
            ? "opacity-70 cursor-not-allowed hover:bg-purple-700"
            : ""
          }
          ${!selected ? "opacity-50 cursor-not-allowed hover:bg-purple-700" : ""
          }`}
      >
        {submitting ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processando...
          </div>
        ) : (
          "Finalizar"
        )}
      </button>
    </form>
  );
}
