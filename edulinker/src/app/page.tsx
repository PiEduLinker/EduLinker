import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Seção de Login */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="mb-12">
          <Image 
            src="/images/Logo/EduLinker.png" 
            alt="Logo" 
            width={300} 
            height={300} 
            className="object-contain"
          />
        </div>

        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">FAÇA SEU LOGIN</h1>
            <p className="text-gray-600 mb-8 text-center">Acesse sua conta para continuar</p>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Lembrar de mim
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Esqueceu sua senha?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md"
              >
                Entrar
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                Ainda não tem uma conta?{' '}
                <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                  Cadastre-se aqui!
                </a>
              </p>
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