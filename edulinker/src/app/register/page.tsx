import Image from "next/image";

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center relative px-4">
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
                    <div className="h-2 bg-pink-500 rounded-full w-1/6"></div>
                </div>
            </div>

            {/* Formulário */}
            <div className="mt-40 w-full max-w-sm flex flex-col items-center">
                <h1 className="text-xl font-bold mb-6 text-center">
                    PREENCHA SEUS DADOS
                </h1>

                <input
                    type="text"
                    placeholder="Seu nome"
                    className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="Repita sua Senha"
                    className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none"
                />

                <button className="w-full bg-purple-700 text-white font-semibold py-3 rounded-full hover:bg-purple-800 transition">
                    Continuar
                </button>
            </div>
        </main>
    );
}
