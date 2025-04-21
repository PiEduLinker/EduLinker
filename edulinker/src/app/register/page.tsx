import Image from "next/image";

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col items-center px-4 relative">
            {/* Logo */}
            <div className="absolute top-8 left-8">
                <Image
                    src="/images/Logo/EduLinker.png"
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

            {/* Container do formulário centralizado */}
            <div className="w-full max-w-lg flex flex-col items-center justify-center flex-1 pb-12">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 text-center">
                    PREENCHA SEUS DADOS
                </h1>

                <div className="w-full space-y-4">
                    <input
                        type="text"
                        placeholder="Seu nome"
                        className="w-full px-4 py-2 md:py-3 border-2 md:border-3 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 md:py-3 border-2 md:border-3 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="w-full px-4 py-2 md:py-3 border-2 md:border-3 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    />
                    <input
                        type="password"
                        placeholder="Repita sua senha"
                        className="w-full px-4 py-2 md:py-3 border-2 md:border-3 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    />
                </div>

                <button className="w-full mt-6 bg-purple-700 text-white font-semibold py-3 rounded-full hover:bg-purple-800 cursor-pointer transition">
                    Continuar
                </button>
            </div>
        </main>
    );
}