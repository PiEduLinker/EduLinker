'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromParam = searchParams.get('from') || ''

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setLoading(true)

    try {
      // 1. Attempt login
      const loginRes = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, senha }),
      })

      if (!loginRes.ok) {
        const errorData = await loginRes.json()
        throw new Error(errorData.message || 'Credenciais inválidas')
      }

      // 2. Handle redirect from param if exists
      if (fromParam) {
        router.push(fromParam)
        return
      }

      // 3. Check onboarding status
      const statusRes = await fetch('/api/onboarding/status', {
        credentials: 'include',
      })

      if (!statusRes.ok) {
        router.push('/auth/admin')
        return
      }

      const statusData = await statusRes.json()
      
      // Validate response structure
      if (!statusData || typeof statusData !== 'object') {
        throw new Error('Resposta inválida do servidor')
      }

      const { etapa, siteId } = statusData
      
      // 4. Determine redirect path
      const redirectPaths: Record<string, string> = {
        BASIC_INFO: `/account/school_description?siteId=${siteId || ''}`,
        PLAN_SELECTION: `/account/plan_selection?siteId=${siteId || ''}`,
        TEMPLATE_SELECTION: `/account/theme_choice?siteId=${siteId || ''}`,
        COMPLETED: '/auth/admin',
        DEFAULT: '/auth/admin'
      }

      const path = redirectPaths[etapa] || redirectPaths.DEFAULT
      router.push(path)

    } catch (error) {
      console.error('Login error:', error)
      setErro(
        error instanceof Error 
          ? error.message 
          : 'Ocorreu um erro durante o login. Tente novamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Login Section */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center relative">
        {/* Logo */}
        <div className="absolute top-6 left-6">
          <Image
            src="/images/logo/EduLinker.png"
            alt="EduLinker Logo"
            width={120}
            height={40}
            priority
          />
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            FAÇA SEU LOGIN
          </h1>

          {/* Error Message */}
          {erro && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md text-center">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                  Lembrar de mim
                </label>
              </div>

              <Link 
                href="/forgot-password" 
                className="text-sm text-purple-600 hover:text-purple-500 transition"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition flex items-center justify-center ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link 
              href="/register" 
              className="font-medium text-purple-600 hover:text-purple-500 transition"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden md:block md:w-1/2 relative bg-gray-100">
        <Image
          src="/images/backgrounds/happyBusinessWoman.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={80}
        />
      </div>
    </div>
  )
}