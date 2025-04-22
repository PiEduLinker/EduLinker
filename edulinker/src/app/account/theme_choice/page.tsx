import Image from "next/image";

export default function ThemeChoicePage() {
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
                    <div className="h-2 bg-pink-500 rounded-full w-3/4"></div>
                </div>
            </div>

            {/* Container principal */}
            <div className="w-full max-w-4xl flex flex-col items-center justify-center flex-1 pb-12">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
                    ESCOLHA O SEU TEMA
                </h1>

                {/* Grid de templates */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Modelo Express */}
                    <div className="flex flex-col items-center">
                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-2 border-gray-300 hover:border-purple-500 transition cursor-pointer relative">
                            <Image
                                src="/images/themeImages/Facilita Sites.jpg"
                                alt="Modelo Express"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                quality={85}
                            />
                        </div>
                        <p className="mt-4 text-lg font-bold text-gray-800">Modelo Express</p>
                    </div>

                    {/* Modelo Impacto */}
                    <div className="flex flex-col items-center">
                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-2 border-gray-300 hover:border-purple-500 transition cursor-pointer relative">
                            <Image
                                src="/images/themeImages/Advocacia.jpg"
                                alt="Modelo Impacto"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                quality={85}
                            />
                            {/* Ícone PRO */}
                            <span className="absolute top-2 right-2 md:top-3 md:right-3 bg-pink-500 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full z-10">
                                PRO
                            </span>
                        </div>
                        <p className="mt-4 text-lg font-bold text-gray-800">Modelo Impacto</p>
                    </div>
                </div>

                {/* Botão continuar */}
                <button className="w-full max-w-md bg-purple-700 text-white font-semibold py-3 rounded-full hover:bg-purple-800 cursor-pointer transition">
                    Continuar
                </button>
            </div>
        </main>
    );
}