'use client';
import Image from "next/image";
import { Star, Menu } from "lucide-react";

type Props = {
  onMenuClick?: () => void;
  isMenuOpen?: boolean;
};

export default function NavBar({ onMenuClick, isMenuOpen }: Props) {
  return (
    <nav className="w-screen h-14 flex justify-center bg-[#1E2330]">
      <div className="w-[90%] flex justify-between items-center">
        {/* Logo (sempre alinhada à esquerda) */}
        <a href="#" className="mr-4">
          <Image
            src="/images/Logo/EduLinkerWhite.png"
            alt="Logo"
            width={140}
            height={140}
            className="object-contain"
          />
        </a>

        {/* Texto central - visível APENAS em xl (1280px+) */}
        <p className="hidden xl:inline text-white text-sm whitespace-nowrap mx-4">
          Experimente a versão pro e tenha <b>maior controle e crescimento da sua escola!</b>
        </p>

        {/* Botões (sempre alinhados à direita) */}
        <div className="flex items-center gap-4">
          {/* Botão Upgrade */}
          <a
            href="/auth/admin/upgrade"
            className="flex items-center gap-2 bg-[#9FFF64] px-4 py-1 md:px-6 md:py-2 rounded-lg hover:bg-[#74EB2A] transition"
          >
            <Star className="w-5 h-5 mb-1 fill-black" />
            <span className="font-bold hidden sm:inline">Upgrade!</span>
          </a>

          {/* Menu hambúrguer */}
          <button
            className="xl:hidden text-white cursor-pointer"
            onClick={onMenuClick}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <Menu className={`w-8 h-8 duration-300 ${isMenuOpen ? 'shadow-[0px_0px_5px_3px_rgba(255,255,255,0.8)]' : ''}`} />
          </button>
        </div>
      </div>
    </nav>
  );
}