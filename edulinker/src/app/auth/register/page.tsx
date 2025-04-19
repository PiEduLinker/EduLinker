import Image from "next/image"
import Link from "next/link"

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Logo no canto superior esquerdo */}
            <div className="absolute top-8 left-8">
                <Image
                    src="/images/Logo/EduLinker.png"
                    alt="Logo"
                    width={150}  // Reduzi o tamanho para ficar melhor no canto
                    height={150}
                    className="object-contain"
                />
            </div>

            {/* Progress bar*/}
            <div className="flex">
                <div>

                </div>
            </div>

        </main>
    )
}