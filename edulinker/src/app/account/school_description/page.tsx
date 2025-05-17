import Image from "next/image";
import { Plus } from "lucide-react";
import CreateAccountLayout from "@/components/Layouts/CreateAccountLayout";


export default function SchoolInfoPage() {
    return (
        <CreateAccountLayout>
            {/* Container do formulário */}
            <div className="w-full max-w-lg flex flex-col items-center justify-center flex-1 pb-12">
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
        </CreateAccountLayout>
    );
}