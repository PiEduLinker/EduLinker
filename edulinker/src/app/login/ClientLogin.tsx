'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

interface Props {
  from?: string
}

export default function ClientLogin({ from }: Props) {
  const router      = useRouter()
  const params      = useSearchParams()
  const fromParam   = from ?? params.get('from') ?? ''

  const [email, setEmail]       = useState('')
  const [senha, setSenha]       = useState('')
  const [erro, setErro]         = useState('')
  const [showPassword, setShow] = useState(false)

  const toggleShow = () => setShow(s => !s)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, senha }),
    })
    const data = await res.json()

    if (!res.ok) {
      setErro(data.erro || 'Usuário ou senha inválidos.')
      return
    }

    if (fromParam) {
      router.push(fromParam)
      return
    }

    // se não vier “from”, redireciona conforme etapa de onboarding
    const statusRes = await fetch('/api/onboarding/status', {
      credentials: 'include',
    })
    if (!statusRes.ok) {
      router.push('/auth/admin')
      return
    }
    const { etapa, siteId } = await statusRes.json()

    switch (etapa) {
      case 'BASIC_INFO':
        router.push(`/account/school_description?siteId=${siteId}`)
        break
      case 'PLAN_SELECTION':
        router.push(`/account/plan_selection?siteId=${siteId}`)
        break
      case 'TEMPLATE_SELECTION':
        router.push(`/account/theme_choice?siteId=${siteId}`)
        break
      case 'COMPLETED':
      default:
        router.push('/auth/admin')
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Seção de Login */}
      <div className="w-full md:w-1/2 p-4 md:p-8 relative flex min-h-[calc(100vh-1rem)] md:min-h-screen">
        {/* Logo */}
        <div className="absolute top-4 md:top-8 left-4 md:left-8">
          <Image
            src="/Logo/EduLinker.png"
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

              {/* Mensagem de erro, se houver */}
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
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 md:py-3 px-4 rounded-full transition duration-200 cursor-pointer"
                >
                  Entrar
                </button>
              </form>

              <div className="mt-4 md:mt-6 text-center text-sm text-gray-800">
                <p>
                  Ainda não tem uma conta?{" "}
                  <Link href={"./register/"} className="font-semibold text-purple-600 hover:text-purple-500">
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
  )
}
