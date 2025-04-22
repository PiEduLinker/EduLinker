'use client';

export default function SideBarMenu() {
  const menuItems = [
    "Painel inicial",
    "Estilo do site",
    "Professores",
    "Grade de aulas",
    "Sobre a escola",
    "Depoimentos",
    "Banners rotativos",
    "Relatórios (pro)",
  ];

  return (
    <nav className="space-y-2">
      {/* Loop de Itens do Menu */}
      {menuItems.map((item) => (
        <a
          key={item}
          href="#"
          className="block text-gray-800 hover:font-semibold"
        >
          {item}
        </a>
      ))}
    </nav>
  );
}