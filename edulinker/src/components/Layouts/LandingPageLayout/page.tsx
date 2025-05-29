import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface CreateAccountLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: CreateAccountLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-100">
            {/* Navbar */}
            <nav className="px-4 sm:px-6 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src="/logo/edulinker.png"
                        alt="Logo"
                        width={120}
                        height={120}
                        className="object-contain"
                    />
                </Link>
                <div className="hidden md:flex space-x-6">
                    <Link href="#features" className="text-gray-600 hover:text-indigo-600">Recursos</Link>
                    <Link href="#toturial" className="text-gray-600 hover:text-indigo-600">Tutorial</Link>
                    <Link href="#pricing" className="text-gray-600 hover:text-indigo-600">Planos</Link>
                    <Link href="#faq" className="text-gray-600 hover:text-indigo-600">FAQ</Link>
                </div>
                <Link 
                    href="/login" 
                    className="bg-[#E60076] text-white px-4 py-2 rounded-lg hover:bg-[#C50068] transition-colors text-sm sm:text-base"
                >
                    Entrar
                </Link>
            </nav>

            {/* Conteúdo da página filha */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-8 md:mb-0">
                            <div className="flex items-center space-x-2 mb-4">
                                <Image
                                    src="/logo/edulinkerwhite.png"
                                    alt="Logo"
                                    width={120}
                                    height={120}
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-gray-400 max-w-xs text-sm sm:text-base">
                                A maneira mais simples de conectar seu público a tudo o que você compartilha online.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
                            {[
                                {
                                    title: "Produto",
                                    links: [
                                        { name: "Recursos", href: "/features" },
                                        { name: "Planos", href: "/pricing" },
                                        { name: "Exemplos", href: "/examples" }
                                    ]
                                },
                                {
                                    title: "Suporte",
                                    links: [
                                        { name: "FAQ", href: "/faq" },
                                        { name: "Contato", href: "/contact" },
                                        { name: "Tutoriais", href: "/tutorials" }
                                    ]
                                },
                                {
                                    title: "Legal",
                                    links: [
                                        { name: "Termos", href: "/terms" },
                                        { name: "Privacidade", href: "/privacy-policy" }, // Link para a página que criamos
                                        { name: "Cookies", href: "/cookie-policy" }
                                    ]
                                }
                            ].map((section, index) => (
                                <div key={index}>
                                    <h4 className="font-semibold text-lg mb-3 sm:mb-4">{section.title}</h4>
                                    <ul className="space-y-2">
                                        {section.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <Link
                                                    href={link.href}
                                                    className="text-gray-400 hover:text-white text-sm sm:text-base transition-colors duration-200"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-8 text-center text-gray-400 text-sm sm:text-base">
                        <p>© {new Date().getFullYear()} EduLinker. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}