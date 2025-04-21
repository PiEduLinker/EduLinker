import Image from "next/image";


export default function CongratsPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 relative">
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
                    <div className="h-2 bg-pink-500 rounded-full w-6/6"></div>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="mt-40 flex flex-col items-center gap-6 text-center">
                <h1 className="text-2xl font-bold">PARABÉNS!!!</h1>
                <p className="text-gray-600 text-lg">
                    O link do site da sua escola já está disponível!
                </p>

                {/* Imagem do celular animado */}
                <img
                    src="\images\Backgrounds\happySmartPhone.png"
                    alt="Celular comemorando"
                    className="w-100 h-auto"
                />

                {/* Botão */}
                <button className="mt-6 bg-purple-700 text-white font-semibold py-3 px-10 rounded-full hover:bg-purple-800 transition">
                    Continue construindo
                </button>
            </div>
        </main>
    );
}
