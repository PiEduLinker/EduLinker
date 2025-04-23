'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function SideBarMenu() {
  const pathname = usePathname();

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
    <nav className="flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold">Escola Musiqueiros</h2>
      <div className="w-[80%] mt-5 space-y-3 flex flex-col justify-center">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`block ${
                isActive ? 'font-bold text-blue-600' : 'text-gray-800'
              } hover:font-semibold`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
