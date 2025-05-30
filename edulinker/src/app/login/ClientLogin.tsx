"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  from?: string;
}

export default function ClientLogin({ from }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const fromParam = from ?? params.get("from") ?? "";

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [showPassword, setShow] = useState(false);

  const toggleShow = () => setShow((s) => !s);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, senha }),
    });
    const data = await res.json();

    if (!res.ok) {
      setErro(data.erro || "Usuário ou senha inválidos.");
      return;
    }

    if (fromParam) {
      router.push(fromParam);
      return;
    }

    const statusRes = await fetch("/api/onboarding/status", {
      credentials: "include",
    });
    if (!statusRes.ok) {
      router.push("/auth/admin");
      return;
    }
    const { etapa, siteId } = await statusRes.json();

    switch (etapa) {
      case "BASIC_INFO":
        router.push(`/account/school_description?siteId=${siteId}`);
        break;
      case "PLAN_SELECTION":
        router.push(`/account/plan_selection?siteId=${siteId}`);
        break;
      case "TEMPLATE_SELECTION":
        router.push(`/account/theme_choice?siteId=${siteId}`);
        break;
      case "COMPLETED":
      default:
        router.push("/auth/admin");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Seção de Login */}
      <div className="w-full md:w-1/2 p-4 md:p-8 relative flex min-h-[calc(100vh-1rem)] md:min-h-screen">
        {/* Logo */}
        <div className="absolute top-4 md:top-8 left-4 md:left-8">
          <Image
            src="/logo/edulinker.png"
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        {/* Container centralizador */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="p-6 md:p-8 rounded-xl">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 text-center">
                FAÇA SEU LOGIN
              </h1>

              {erro && (
                <p className="text-red-600 font-medium text-sm text-center mb-4">
                  {erro}
                </p>
              )}

              {/* Formulário */}
              <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    required
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Senha"
                    className="w-full px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 outline-none transition pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShow}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#E60076] hover:bg-[#cc0064] text-white font-bold py-2 md:py-3 px-4 rounded-full transition duration-200 cursor-pointer"
                >
                  Entrar
                </button>
              </form>

              <div className="flex justify-center">
                <p>ou</p>
              </div>

              {/* Login Google */}
              <button
                onClick={() => window.location.href = '/api/auth/google'}
                className="flex items-center justify-center w-full max-w-sm px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 533.5 544.3"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M533.5 278.4c0-17.4-1.5-34.3-4.3-50.6H272v95.9h146.9
         c-6.3 34.1-25 63-53.4 82.3v68h86.3
         c50.5-46.5 80.7-115.1 80.7-195.6z"
                    fill="#4285F4"
                  />
                  <path
                    d="M272 544.3c72.5 0 133.3-23.9 177.8-64.8
         l-86.3-68
         c-24.1 16.2-55 25.7-91.5 25.7
         c-70.3 0-129.9-47.4-151.2-111
         l-89.9 69.4
         c43.7 87.3 133.7 148.7 241.1 148.7z"
                    fill="#34A853"
                  />
                  <path
                    d="M120.8 323.4
         c-9.7-28.7-9.7-59.6 0-88.3
         l-89.9-69.4
         c-39.3 78.3-39.3 167.3 0 245.6
         l89.9-69.4z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M272 107.7
         c39.5 0 75 13.6 102.8 40.3
         l77.1-77.1
         C399.3 24 336.1 0 272 0
         C164.6 0 74.6 61.4 30.9 148.7
         l89.9 69.4
         c21.2-63.6 80.8-111 151.2-111z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="ml-2">Entrar com Google</span>
              </button>

              <div className="mt-4 md:mt-6 text-center text-sm text-gray-800">
                <p>
                  Ainda não tem uma conta?{" "}
                  <Link
                    href={"./register/"}
                    className="font-semibold text[#E60076] hover:text[#E60076]"
                  >
                    Cadastre-se aqui!
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção da Imagem */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/Backgrounds/happyBusinessWoman.jpg"
          alt="Side Image"
          fill
          className="object-cover"
          priority
        />
      </div>
    </main>
  );
}
