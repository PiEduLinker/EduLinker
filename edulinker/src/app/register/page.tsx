'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CreateAccountLayout from '@/components/Layouts/CreateAccountLayout'

export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  })
  const [erro, setErro] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')

    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
        }),
      })

      const data = await res.json()

      if (res.status === 409) {
        // E-mail já cadastrado
        setErro(data.erro || 'E-mail já cadastrado. Por favor, faça login.')
        return
      }

      if (!res.ok) {
        setErro(data.erro || 'Erro ao cadastrar.')
        return
      }

      const { onboarding } = data
      const siteId = onboarding?.siteId
      const etapa  = onboarding?.etapa

      if (!siteId || !etapa) {
        setErro('Não foi possível iniciar o onboarding.')
        return
      }

      // Redireciona para a etapa de onboarding correspondente
      switch (etapa) {
        case 'BASIC_INFO':
          router.push(`/account/school_description?siteId=${siteId}`)
          break
        default:
          router.push('/auth/admin')
      }
    } catch {
      setErro('Erro de conexão com o servidor.')
    }
  }

  return (
    <CreateAccountLayout>
      <div className="w-full max-w-lg flex flex-col items-center justify-center flex-1 pb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 text-center">
          PREENCHA SEUS DADOS
        </h1>

        {erro && (
          <p className="text-red-600 font-medium text-sm text-center mb-4">
            {erro}
          </p>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="text"
            name="nome"
            placeholder="Seu nome"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg
              focus:ring-purple-500 focus:border-purple-500 outline-none transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg
              focus:ring-purple-500 focus:border-purple-500 outline-none transition"
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg
              focus:ring-purple-500 focus:border-purple-500 outline-none transition"
          />
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Repita sua senha"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg
              focus:ring-purple-500 focus:border-purple-500 outline-none transition"
          />

          <button
            type="submit"
            className="w-full mt-6 bg-purple-700 text-white font-semibold py-3
              rounded-full hover:bg-purple-800 cursor-pointer transition"
          >
            Continuar
          </button>
        </form>

        {erro === 'E-mail já cadastrado. Por favor, faça login.' && (
          <p className="mt-4 text-center text-sm">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-purple-700 underline">
              Faça login
            </Link>
          </p>
        )}
      </div>
    </CreateAccountLayout>
  )
}
