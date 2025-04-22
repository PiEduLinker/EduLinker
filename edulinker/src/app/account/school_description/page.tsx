import Image from "next/image";
import { Plus } from "lucide-react";

export default function SchoolInfoPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 relative">
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
            <div className="absolute top-24 w-full max-w-4xl">
                <div className="w-40 h-2 bg-gray-300 rounded-full mx-auto">
                    <div className="h-2 bg-pink-500 rounded-full w-2/4"></div>
                </div>
            </div>

            {/* Container do formulário */}
            <div className="w-full max-w-lg flex flex-col items-center py-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 text-center">
                    FALE SOBRE SUA ESCOLA
                </h1>

                <div className="w-full space-y-4">
                    <input
                        type="text"
                        placeholder="Nome da escola"
                        className="w-full px-4 py-2 md:py-3 border-2 md:border-3 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    />

                    <textarea
                        placeholder="Breve descrição"
                        rows={4}
                        className="w-full px-4 py-2 md:py-3 border-2 md:border-3 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 outline-none transition resize-none"
                    />

                    {/* Upload de imagem */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-3 pt-2">
                        <label className="w-14 h-14 border-2 md:border-3 border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:border-purple-500 transition mx-auto sm:mx-0">
                            <Plus className="text-gray-500" />
                            <input type="file" className="hidden" />
                        </label>
                        <p className="text-sm text-gray-700 text-center sm:text-left">
                            Adicione uma imagem <br className="hidden sm:block" /> para o logo (opcional)
                        </p>
                    </div>
                </div>

                {/* Botão continuar */}
                <button className="w-full mt-6 bg-purple-700 text-white font-semibold py-3 rounded-full hover:bg-purple-800 cursor-pointer transition">
                    Continuar
                </button>
            </div>
        </main>
    );
}