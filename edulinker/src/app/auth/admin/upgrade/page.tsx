"use client";

import { useState } from "react";
import AdminLayout from "@/components/Layouts/AdminLayout";
import { useSite } from "@/contexts/siteContext";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Crown,
  Zap,
  Star,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";

export default function UpgradePage() {
  const { plano } = useSite();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  if (plano === "premium") {
    return (
      <AdminLayout>
        <div className="max-w-2xl mx-auto p-6 text-center">
          <div className="bg-gradient-to-r from-[#E60076] to-[#B3006A] text-white rounded-xl p-8 shadow-lg">
            <div className="flex justify-center mb-4">
              <Crown
                className="h-12 w-12 text-yellow-300"
                fill="currentColor"
              />
            </div>
            <h1 className="text-3xl font-bold mb-3">Você é Premium! 🎉</h1>
            <p className="text-purple-100 text-lg mb-6">
              Obrigado por fazer parte dos nossos usuários exclusivos.
            </p>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left max-w-md mx-auto">
              <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
                <BadgeCheck className="text-yellow-300" /> Seus benefícios:
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 text-green-300" />{" "}
                  Diversos templates{" "}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 text-green-300" />{" "}
                  Relatório de acessos{" "}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 text-green-300" />{" "}
                  Mais opções de personalização{" "}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 text-green-300" />{" "}
                  Integração do Google Maps{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  async function handleUpgrade() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/assinaturas", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plano: "premium" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.erro || "Falha ao assinar.");
      setSuccess(true);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#E60076] to-[#B3006A] bg-clip-text text-transparent mb-2">
            Upgrade para Premium
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Desbloqueie todo o potencial da nossa plataforma com recursos
            exclusivos
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-[#E60076] to-[#B3006A] p-4 text-white">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Zap className="text-yellow-300" fill="currentColor" /> Plano
              Premium
            </h2>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-bold">R$24,90</span>
              <span className="text-purple-200 mb-1">/mês</span>
            </div>
          </div>

          <div className="p-6">
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Diversos templates</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Descrição gerada com IA</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Relatório de acessos</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Mais opções de personalização</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Integração do Google Maps</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Suporte prioritário</span>
              </li>
            </ul>

            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-600 text-center font-medium">{error}</p>
              </div>
            )}

            {success ? (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-full">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">
                    Assinatura realizada com sucesso!
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#E60076] to-[#B3006A] hover:from-[#B3006A] hover:to-[#8B005B] text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-80 cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-200"
              >
                {loading ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <Star className="h-5 w-5" fill="currentColor" />
                    Assinar Plano Premium
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-4">
          <ShieldCheck className="inline mr-1 h-4 w-4 text-gray-400" />
          Pagamento seguro • Cancelamento a qualquer momento
        </div>
      </div>
    </AdminLayout>
  );
}
