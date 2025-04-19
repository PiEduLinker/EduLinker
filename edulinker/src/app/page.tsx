import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Seção de Login */}
      <div className="w-full md:w-1/2 p-8 relative">
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

        {/* Formulário centralizado */}
        <div className="h-full flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="p-8 rounded-xl">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">FAÇA SEU LOGIN</h1>

              <form className="space-y-6">
                <div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <input
                    type="password"
                    id="password"
                    placeholder="Senha"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Lembrar de mim
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                      Esqueceu sua senha?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-full transition duration-200"
                >
                  Entrar
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                  Ainda não tem uma conta?{' '}
                  <Link href={"./auth/register"} className="font-semibold text-purple-600 hover:text-purple-500">
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
          src="/images/Backgrounds/happyBusinessWoman2.jpg"
          alt="Side Image"
          fill
          className="object-cover"
          priority
        />
      </div>
    </main>
  )
}