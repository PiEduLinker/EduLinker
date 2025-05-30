"use client";

import React, { useState, useCallback, useEffect } from "react";
import AdminLayout from "@/components/Layouts/AdminLayout";
import {
  Upload,
  Plus,
  Trash2,
  Save,
  Loader2,
  Image as ImageIcon,
  Text,
  Award,
} from "lucide-react";
import { useSite, useIsPremium } from "@/contexts/siteContext";
import { CldUploadWidget } from "next-cloudinary";
import type { CloudinaryUploadWidgetResults } from "next-cloudinary";


type Destaque = { number: string; label: string }

export default function AdminAboutPage({ initial = '' }: { initial?: string }) {
  const { slug: siteId, configuracoes, setConfiguracoes } = useSite()
  const isPremium = useIsPremium()

  const {
    descricao: initialDescricao = "",
    fotoSobre: initialFoto = "",
    destaques: initialDestaques = [] as Destaque[],
  } = configuracoes;

  const [description, setDescription] = useState(initial)
  const [descricao, setDescricao] = useState(initialDescricao)
  const [fotoSobre, setFotoSobre] = useState(initialFoto)
  const [destaques, setDestaques] = useState<Destaque[]>(initialDestaques)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('');

  // Adiciona destaque apenas se for premium
  const handleAdd = useCallback(() => {
    if (!isPremium) return;
    if (destaques.length < 3) {
      setDestaques((ds) => [...ds, { number: "", label: "" }]);
    }
  }, [destaques.length, isPremium]);

  const handleRemove = useCallback((idx: number) => {
    setDestaques((ds) => ds.filter((_, i) => i !== idx));
  }, []);

  const handleDestaqueChange = useCallback(
    (idx: number, field: keyof Destaque, value: string) => {
      setDestaques((ds) =>
        ds.map((d, i) => (i === idx ? { ...d, [field]: value } : d))
      );
    },
    []
  );

  const handleSave = useCallback(async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/site/${siteId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          configuracoes: { descricao, fotoSobre, destaques },
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.erro || "Falha ao salvar.");

      // atualiza o contexto para refletir a mudança na UI sem reload
      setConfiguracoes({
        ...configuracoes,
        descricao,
        fotoSobre,
        destaques,
      });

      setSuccess("Dados atualizados com sucesso!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }, [
    siteId,
    descricao,
    fotoSobre,
    destaques,
    configuracoes,
    setConfiguracoes,
  ]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8 mt-8">
        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Sobre a Escola
          </h1>
          {error && (
            <div className="mt-4 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-lg inline-block">
              {error}
            </div>
          )}

          {success && (
            <div className="fixed top-20 z-50 left-1/2 xl:translate-x-[50%]">
              <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-fade-in-down">
                <span>{success}</span>
              </div>
            </div>
          )}
        </div>

        {/* Upload da imagem */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-dark mb-4">
            <ImageIcon className="w-5 h-5" /> Imagem da Seção
          </h2>

          <div className="flex flex-col items-center space-y-4">
            {fotoSobre && (
              <div className="relative">
                <img
                  src={fotoSobre}
                  alt="Preview Sobre"
                  className="w-48 h-auto rounded-lg shadow-md border-2 border-white dark:border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setFotoSobre("")}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full text-white shadow-lg cursor-pointer"
                  aria-label="Remover imagem"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            <CldUploadWidget
              uploadPreset="edulinker_unsigned"
              options={{ folder: "edulinker/about", maxFiles: 1 }}
              onSuccess={(result: CloudinaryUploadWidgetResults) => {
                if (result.event !== "success") return;
                const info = result.info;
                if (typeof info === "string" || !info) return;
                setFotoSobre(info.secure_url);
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition cursor-pointer"
                >
                  <Upload />
                  {fotoSobre ? "Alterar imagem" : "Selecionar imagem"}
                </button>
              )}
            </CldUploadWidget>
          </div>
        </div>

        {/* Texto descritivo */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-dark mb-4">
            <Text className="w-5 h-5" /> Texto Descritivo
          </h2>
          <textarea
            rows={6}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#E60076] focus:border-[#E60076] transition-all text-gray-900"
            placeholder="Descreva sua escola, missão, valores e diferenciais..."
          />
        </div>

        {/* Destaques editáveis */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-dark mb-4">
            <Award className="w-5 h-5" /> Destaques
          </h2>
          <div className="space-y-4">
            {destaques.map((d, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
              >
                <input
                  type="text"
                  value={d.number}
                  onChange={(e) =>
                    handleDestaqueChange(idx, "number", e.target.value)
                  }
                  placeholder="Número"
                  className="sm:col-span-3 w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 transition text-gray-900 dark:text-white"
                  disabled={!isPremium}
                />
                <input
                  type="text"
                  value={d.label}
                  onChange={(e) =>
                    handleDestaqueChange(idx, "label", e.target.value)
                  }
                  placeholder="Descrição do destaque"
                  className="sm:col-span-8 w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 transition text-gray-900 dark:text-white"
                  disabled={!isPremium}
                />
                <button
                  onClick={() => handleRemove(idx)}
                  disabled={saving}
                  className="sm:col-span-1 flex justify-end text-red-500 hover:text-red-700 p-2 rounded-full transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            {isPremium ? (
              destaques.length < 3 && (
                <button
                  onClick={handleAdd}
                  disabled={saving}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mt-4 cursor-pointer"
                >
                  <Plus size={18} /> Adicionar Destaque
                </button>
              )
            ) : (
              <p className="mt-4 text-sm text-gray-500">
                Disponível somente para assinantes <strong>Premium</strong>.
              </p>
            )}
          </div>
        </div>

        {/* Botão de salvar */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 text-white py-3 px-8 rounded-lg bg-gradient-to-r from-pink-500 via-[#E60076] to-pink-700 hover:from-pink-600 hover:via-[#E60076] hover:to-pink-800 transition disabled:opacity-50 cursor-pointer"
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save />}
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
