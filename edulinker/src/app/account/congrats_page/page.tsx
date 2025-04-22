import Image from "next/image";

export default function CongratsPage() {
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
                    <div className="h-2 bg-pink-500 rounded-full w-4/4"></div>
                </div>
            </div>

            {/* Container principal */}
            <div className="flex flex-col items-center justify-center gap-6 text-center w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800">PARABÉNS!!!</h1>
                <p className="text-gray-600 text-lg">
                    O link do site da sua escola já está disponível!
                </p>

                <div className="w-64 aspect-[4/5] relative">
                    <Image
                        src="/images/backgrounds/happySmartPhone.png"
                        alt="Celular comemorando"
                        fill
                        className="object-contain"
                        priority
                        sizes="(max-width: 768px) 50vw, 256px"
                    />
                </div>

                {/* Botão */}
                <button className="mt-2 bg-purple-700 text-white font-semibold py-3 px-10 rounded-full hover:bg-purple-800 cursor-pointer transition">
                    Continue construindo
                </button>
            </div>
        </main>
    );
}