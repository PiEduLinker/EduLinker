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
  const [submitting, setSubmitting] = useState(false);

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

    setSubmitting(true);
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
      setSubmitting(false);
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
              ${
                selected === tpl.id
                  ? "border-[#E60076] ring-4 ring-[#E60076]/30"
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
            <div className="w-full text-center bg-gray-100 py-3 px-2 font-semibold text-lg relative capitalize">
              {tpl.nome}
              {tpl.pro && (
                <span className="absolute top-1 right-3 bg-gradient-to-r from-[#E60076] to-[#B8005D] text-white text-xs font-bold px-2 py-1 rounded-full">
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

      {/* Botão Finalizar direto aqui no mesmo arquivo */}
      <button
        type="submit"
        disabled={!selected || submitting}
        className={`w-[328px] h-[48px] rounded-[8px] text-white text-[16px] font-bold leading-[24px] tracking-wide flex items-center justify-center transition-colors duration-200 ${
          !selected || submitting
            ? "bg-[#E60076] cursor-not-allowed"
            : "bg-[#E60076] hover:bg-[#cc005f] active:bg-[#b30055] cursor-pointer"
        }`}
      >
        {submitting ? "Processando..." : "Finalizar"}
      </button>
    </form>
  );
}
