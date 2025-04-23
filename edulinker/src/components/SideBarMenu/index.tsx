'use client';

//Imports
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X } from 'lucide-react';

//Definição de tipos
type Props = {
  onClose?: () => void; //Função para fechar o menu mobile
};

export default function SideBarMenu({ onClose }: Props) {
  //Pega o caminho da URL sem o domínio
  const pathname = usePathname();

  //Lista de caminhos para as páginas
  const menuItems = [
    { label: "Painel inicial", path: "/auth/admin" },
    { label: "Estilo do site", path: "/auth/admin/style" },
    { label: "Professores", path: "/auth/admin/teachers" },
    { label: "Grade de aulas", path: "/auth/admin/grade" },
    { label: "Sobre a escola", path: "/auth/admin/about" },
    { label: "Depoimentos", path: "/auth/admin/testimonials" },
    { label: "Banners rotativos", path: "/auth/admin/banners" },
    { label: "Relatórios (pro)", path: "/auth/admin/reports" },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Cabeçalho com botão de fechar */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Escola Konosuba</h2>
        <button
          onClick={onClose}
          className="xl:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Fechar menu"
        >
          <X className="w-8 h-8 text-gray-600 mb-1" />
        </button>
      </div>

      {/* Lista de itens do menu */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`block px-4 py-3 rounded-lg transition-colors ${isActive
                      ? 'bg-blue-50 text-green-600 font-medium border-l-4 border-green-600'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Rodapé */}
      <div className="p-4 border-t border-gray-200 text-sm text-gray-500">
        Versão 1.0.0
      </div>
    </div>
  );
}