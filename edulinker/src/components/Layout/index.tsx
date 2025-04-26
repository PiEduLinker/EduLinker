'use client';

//Imports
import NavBar from '../NavBar';
import SideBarMenu from '../SideBarMenu';
import { ReactNode, useState } from 'react';

//Define os tipos dos parâmetros passados no componente
type Props = {
  children: ReactNode; //Conteúdo que será renderizado dentro do Layout
};

//Passa uma página como parâmetro para o Layout
export default function AdminLayout({ children }: Props) {

  //Variável de estado para o menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* NavBar */}
      <NavBar
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)} //Abre e fecha menu
        isMenuOpen={isMenuOpen} //Controle de estado do menu
      />

      {/* Container sidebar e página */}
      <div className="flex flex-1">

        {/* Sidebar desktop até 1280px */}
        <aside className="hidden xl:block w-85 border-r border-gray-300 p-4">
          <SideBarMenu />
        </aside>

        {/* Overlay e Sidebar mobile */}
        <div className={`fixed inset-0 xl:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {/* Overlay escuro */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar animada */}
          <div
            className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
          >
            <SideBarMenu onClose={() => setIsMenuOpen(false)} />
          </div>

        </div>

        {/* Conteúdo da página */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}