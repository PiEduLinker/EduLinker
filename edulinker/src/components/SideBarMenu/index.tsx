"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useSite } from "@/contexts/siteContext";

type MenuItem = {
  label: string;
  path: string;
  isPro?: boolean;
};

export default function SideBarMenu({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();

  const [notice, setNotice] = useState<string>("");
  const { plano } = useSite();

  const handleLogout = useCallback(async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    router.push("/");
  }, [router]);

  const menuItems: MenuItem[] = [
    { label: "Painel inicial", path: "/auth/admin" },
    { label: "Estilo do site", path: "/auth/admin/style" },
    { label: "Banners rotativos", path: "/auth/admin/banners" },
    { label: "Sobre a escola", path: "/auth/admin/about" },
    { label: "Galeria de Fotos", path: "/auth/admin/gallery" },
    { label: "Grade de aulas", path: "/auth/admin/grade" },
    { label: "Professores", path: "/auth/admin/teachers" },
    { label: "Depoimentos", path: "/auth/admin/testimonials" },
    { label: "Contato", path: "/auth/admin/contact" },
    { label: "Relatórios (Pro)", path: "/auth/admin/reports", isPro: true },
    { label: "Alterar template (Pro)", path: "/auth/admin/templateChange" },
    { label: "Configurações", path: "/auth/admin/settings" },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* … cabeçalho … */}
      {notice && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 text-sm">
          {notice}
        </div>
      )}

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const disabled = item.isPro && plano === "gratuito";

            return (
              <li key={item.path}>
                <Link
                  href={disabled ? "#" : item.path}
                  className={`
                                block px-4 py-2 rounded-lg transition
                              ${
                                isActive
                                  ? "bg-[#FFE6F1] text-[#E60076] font-medium"
                                  : "text-gray-700 hover:bg-gray-100"
                              }
                            ${
                              disabled
                                ? "opacity-50 cursor-not-allowed hover:bg-transparent"
                                : ""
                            }
                              `}
                  onClick={(e) => {
                    if (disabled) {
                      e.preventDefault();
                      setNotice("🛑 Recurso disponível somente para Premium.");
                    } else {
                      onClose?.();
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li
            onClick={() => {
              handleLogout();
              onClose?.();
            }}
            className="mt-4 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            Sair
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t text-sm text-gray-500">v1.0.0</div>
    </div>
  );
}
