import Image from "next/image";
import { ReactNode } from "react";

interface CreateAccountLayoutProps {
  children: ReactNode;
}

export default function CreateAccountLayout({ children }: CreateAccountLayoutProps) {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-4 relative">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <Image
          src="/images/logo/EduLinker.png"
          alt="Logo"
          width={120}
          height={120}
          className="object-contain"
        />
      </div>

      {/* Barra de progresso */}
      <div className="w-full max-w-4xl pt-24 pb-8">
        <div className="w-40 h-2 bg-gray-300 rounded-full mx-auto">
          <div className="h-2 bg-pink-500 rounded-full w-1/4"></div>
        </div>
      </div>

      {/* Conteúdo da página */}
      {children}
    </main>
  );
}
