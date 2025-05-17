import Image from "next/image";
import CreateAccountLayout from "@/components/Layouts/CreateAccountLayout";

export default function CongratsPage() {
    return (
        <CreateAccountLayout>
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
        </CreateAccountLayout>
    );
}