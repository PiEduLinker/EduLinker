'use client';

import NavBar from '../NavBar';
import SideBarMenu from '../SideBarMenu';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

//----------------- Layout padrão das páginas de Admin ------------------------
export default function AdminLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* NavBar */}
      <NavBar />

      {/* Menu Lateral */}
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-100 border-r border-gray-300 p-4">
          <SideBarMenu />
        </aside>

        {/* Conteúdo da Página */}
        <main className="flex justify-center flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
