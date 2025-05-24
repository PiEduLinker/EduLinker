'use client';

//Imports
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

//Definição de tipos
type Props = {
  onClose?: () => void; //Função para fechar o menu mobile
};

export default function SideBarMenu({ onClose }: Props) {
  // Remove o Token de sessão do LocalStorage
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include'
    })
    router.push('/')
  }

  //Pega o caminho da URL sem o domínio
  const pathname = usePathname();

  // Variável de exemplo - substitua pela sua condição real
  const isProActive = false;

  //Lista de caminhos para as páginas
  const menuItems = [
    { label: "Painel inicial", path: "/auth/admin" },
    { label: "Estilo do site", path: "/auth/admin/style" },
    { label: "Banners rotativos", path: "/auth/admin/banners" },
    { label: "Sobre a escola", path: "/auth/admin/about" },
    { label: "Galeria de Fotos", path: "/auth/admin/gallery" },
    { label: "Grade de aulas", path: "/auth/admin/grade" },
    { label: "Professores", path: "/auth/admin/teachers" },
    { label: "Depoimentos", path: "/auth/admin/testimonials" },
    { label: "Contato", path: "/auth/admin/contact" },
    { label: "Relatórios (pro)", path: "/auth/admin/reports", isPro: true },
  ];

  // Função para lidar com clique em itens Pro
  const handleItemClick = (item: any, e: React.MouseEvent) => {
    if (item.isPro && !isProActive) {
      e.preventDefault();
      alert('Este recurso está disponível apenas na versão Pro!');
      return;
    }
    onClose?.();
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Cabeçalho com botão de fechar */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Escola Konosuba</h2>
        <button
          onClick={onClose}
          className="xl:hidden p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
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
              <li key={item.path} className="relative">
                <Link
                  href={item.path}
                  className={`block px-4 py-3 rounded-lg transition-colors ${isActive
                    ? 'bg-blue-50 text-green-600 font-medium border-l-4 border-green-600'
                    : 'text-gray-700 hover:bg-gray-100'
                    } ${item.isPro ? 'pr-10' : ''}`}
                  onClick={(e) => handleItemClick(item, e)}
                >
                  {item.label}
                  {item.isPro && !isProActive && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      Pro
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
          <li className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              handleLogout(); // Elimina a chave de sessão
              onClose?.(); // Fecha o menu se estiver em modo mobile
            }}>
            Sair
          </li>
        </ul>
      </nav>

      {/* Rodapé */}
      <div className="p-4 border-t border-gray-200 text-sm text-gray-500">
        Versão 1.0.0
      </div>
    </div>
  );
}