import Image from "next/image";
import { ReactNode } from "react";

interface CreateAccountLayoutProps {
  children: ReactNode;
  status?: 'BASIC_INFO' | 'PLAN_SELECTION' | 'TEMPLATE_SELECTION' | 'COMPLETED';
}

// Função para determinar a porcentagem de progresso baseado no status
const getProgressPercentage = (status?: string) => {
  switch (status) {
    case 'BASIC_INFO':
      return '25%';
    case 'PLAN_SELECTION':
      return '50%';
    case 'TEMPLATE_SELECTION':
      return '75%';
    case 'COMPLETED':
      return '100%';
    default:
      return '0%';
  }
};

export default function CreateAccountLayout({ children, status }: CreateAccountLayoutProps) {
  const progressPercentage = getProgressPercentage(status);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-4 relative">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <a href="/">
          <Image
            src="/logo/edulinker.png"
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </a>
      </div>

      {/* Barra de progresso */}
      <div className="w-full max-w-4xl pt-24 pb-8">
        <div className="w-40 h-2 bg-gray-300 rounded-full mx-auto">
          <div
            className="h-2 bg-pink-500 rounded-full transition-all duration-300"
            style={{ width: progressPercentage }}
          ></div>
        </div>
      </div>

      {/* Conteúdo da página */}
      {children}
    </main>
  );
}