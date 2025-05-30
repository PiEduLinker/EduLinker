"use client";

import { useState, useCallback, useEffect } from "react";
import AdminLayout from "@/components/Layouts/AdminLayout";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { useSite, useIsPremium } from "@/contexts/siteContext";
import { CldUploadWidget } from "next-cloudinary";
import type {
  CloudinaryUploadWidgetError,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { set } from "mongoose";

interface BannerItem {
  imagem: string;
}

export default function AdminBannerPage() {
  const { slug: siteId, configuracoes, setConfiguracoes } = useSite();
  const isPremium = useIsPremium();

  // carrega o estado inicial
  const initial = (configuracoes.carrossel as BannerItem[]) ?? [];
  const [banners, setBanners] = useState<BannerItem[]>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // limites por plano
  const maxBanners = isPremium ? 3 : 1;

  const handleAdd = useCallback(() => {
    if (banners.length < maxBanners) {
      setBanners((b) => [...b, { imagem: "" }]);
    }
  }, [banners.length, maxBanners]);

  const handleRemove = useCallback((idx: number) => {
    setBanners((b) => b.filter((_, i) => i !== idx));
  }, []);

  // salvar no backend
  const handleSave = useCallback(async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const newCarousel = isPremium ? banners : banners.slice(0, 1);
      const payload = { configuracoes: { carrossel: newCarousel } };
      const res = await fetch(`/api/site/${siteId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.erro || "Falha ao salvar");

      setConfiguracoes({
        ...configuracoes,
        carrossel: newCarousel,
      });

      setSuccess("Banners atualizados com sucesso!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }, [siteId, banners, isPremium, configuracoes, setConfiguracoes]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="p-6 sm:p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Gerenciamento de Banners
            </h1>

            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 mb-6">
                <p className="text-red-600 text-center font-medium">{error}</p>
              </div>
            )}

            {success && (
              <div className="fixed top-20 z-50 left-1/2 xl:translate-x-[50%]">
                <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-fade-in-down">
                  <span>{success}</span>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {banners.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-xl p-6 relative transition-all hover:shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Banner #{idx + 1}
                    </h3>
                    <button
                      onClick={() => handleRemove(idx)}
                      disabled={saving}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                      aria-label="Remover banner"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {item.imagem && (
                      <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={item.imagem}
                          alt={`Banner ${idx + 1}`}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}

                    <CldUploadWidget
                      uploadPreset="edulinker_unsigned"
                      options={{ folder: "edulinker/banners", maxFiles: 1 }}
                      onSuccess={(result: CloudinaryUploadWidgetResults) => {
                        // result.info pode ser string ou objeto, então garantimos que é objeto:
                        const info = result.info;
                        if (typeof info === "string" || !info) return;

                        // agora TS sabe que info é CloudinaryUploadWidgetInfo:
                        const url = info.secure_url;
                        if (!url) return;

                        setBanners((bs) =>
                          bs.map((b, i) => (i === idx ? { imagem: url } : b))
                        );
                      }}
                    >
                      {({ open }) => (
                        <button
                          type="button"
                          onClick={() => open()}
                          className="mt-2 px-4 py-2 border border-dashed rounded text-gray-600 hover:border-gray-400 cursor-pointer"
                        >
                          <Plus className="inline mr-1" />{" "}
                          {item.imagem
                            ? "Alterar imagem"
                            : "Selecione uma imagem"}
                        </button>
                      )}
                    </CldUploadWidget>
                  </div>
                </div>
              ))}
            </div>

            {banners.length < maxBanners && (
              <button
                onClick={handleAdd}
                disabled={saving}
                className="mt-6 flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto cursor-pointer"
              >
                <Plus size={18} />
                <span>Adicionar Banner</span>
              </button>
            )}

            {!isPremium && (
              <p className="mt-4 text-sm text-gray-500">
                No plano gratuito, apenas <strong>1 banner estático</strong>.{" "}
                Faça upgrade para Premium e gerencie até 3 banners rotativos.
              </p>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleSave}
                disabled={saving}
                className={`w-full py-3.5 px-6 rounded-xl text-white font-medium transition-all cursor-pointer ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#E60076] to-[#FF66A3] hover:from-[#cc0066] hover:to-[#ff80b2] shadow-md hover:shadow-lg"
                }`}
              >
                {saving ? (
                  <span className="flex items-center justify-center space-x-2">
                    <Loader2 size={20} className="animate-spin" />
                    <span>Salvando...</span>
                  </span>
                ) : (
                  "Salvar Alterações"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
