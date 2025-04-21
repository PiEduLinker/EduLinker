import Image from "next/image";

export default function ThemeChoicePage() {
    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 relative">
            {/* Logo */}
            <div className="absolute top-8 left-8">
                <Image
                    src="/images/Logo/EduLinker.png"
                    alt="Logo"
                    width={150}  // Reduzi o tamanho para ficar melhor no canto
                    height={150}
                    className="object-contain"
                />
            </div>

            {/* Barra de progresso */}
            <div className="absolute top-20">
                <div className="w-40 h-2 bg-gray-300 rounded-full">
                    <div className="h-2 bg-pink-500 rounded-full w-4/6"></div>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="mt-40 w-full max-w-4xl flex flex-col items-center gap-8">
                <h1 className="text-xl font-bold text-center">ESCOLHA O SEU TEMA</h1>

                {/* Modelos */}
                <div className="flex flex-wrap justify-center gap-6">
                    {/* Modelo Express */}
                    <div className="flex flex-col items-center">
                        <div className="w-72 h-48 rounded-xl overflow-hidden shadow-md border border-gray-200">
                            <img
                                src="/modelo-express.jpg"
                                alt="Modelo Express"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="mt-2 font-medium">Modelo Express</p>
                    </div>

                    {/* Modelo Impacto */}
                    <div className="flex flex-col items-center relative">
                        <div className="w-72 h-48 rounded-xl overflow-hidden shadow-md border border-gray-200 relative">
                            <img
                                src="/modelo-impacto.jpg"
                                alt="Modelo Impacto"
                                className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                                PRO
                            </span>
                        </div>
                        <p className="mt-2 font-medium">Modelo Impacto</p>
                    </div>
                </div>

                {/* Botão continuar */}
                <button className="bg-purple-700 text-white font-semibold py-3 px-10 rounded-full hover:bg-purple-800 transition">
                    Continuar
                </button>
            </div>
        </main>
    );
}
