'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CreateAccountLayout from '@/components/Layouts/CreateAccountLayout'
import { Eye, EyeOff } from 'lucide-react' // Adicione esses ícones ou use outro método de sua preferência

export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  })
  const [erro, setErro] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    isValid: false,
    message: '',
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    }
  })

  useEffect(() => {
    if (formData.senha) {
      const requirements = {
        length: formData.senha.length >= 8,
        uppercase: /[A-Z]/.test(formData.senha),
        lowercase: /[a-z]/.test(formData.senha),
        number: /[0-9]/.test(formData.senha),
        specialChar: /[^A-Za-z0-9]/.test(formData.senha),
      }

      const isValid = Object.values(requirements).every(Boolean)
      
      setPasswordStrength({
        isValid,
        message: isValid ? 'Senha forte' : 'Senha fraca',
        requirements
      })
    } else {
      setPasswordStrength({
        isValid: false,
        message: '',
        requirements: {
          length: false,
          uppercase: false,
          lowercase: false,
          number: false,
          specialChar: false,
        }
      })
    }
  }, [formData.senha])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')

    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    if (!passwordStrength.isValid) {
      setErro('A senha não atende aos requisitos mínimos de segurança.')
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
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="senha"
              placeholder="Senha"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg
                focus:ring-purple-500 focus:border-purple-500 outline-none transition pr-10"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {formData.senha && (
              <div className="mt-2 text-xs text-gray-600">
                <p className={`font-medium ${passwordStrength.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordStrength.message}
                </p>
                <ul className="mt-1 space-y-1">
                  <li className={passwordStrength.requirements.length ? 'text-green-600' : 'text-gray-400'}>
                    • Mínimo 8 caracteres
                  </li>
                  <li className={passwordStrength.requirements.uppercase ? 'text-green-600' : 'text-gray-400'}>
                    • Pelo menos uma letra maiúscula
                  </li>
                  <li className={passwordStrength.requirements.lowercase ? 'text-green-600' : 'text-gray-400'}>
                    • Pelo menos uma letra minúscula
                  </li>
                  <li className={passwordStrength.requirements.number ? 'text-green-600' : 'text-gray-400'}>
                    • Pelo menos um número
                  </li>
                  <li className={passwordStrength.requirements.specialChar ? 'text-green-600' : 'text-gray-400'}>
                    • Pelo menos um caractere especial
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmarSenha"
              placeholder="Repita sua senha"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg
                focus:ring-purple-500 focus:border-purple-500 outline-none transition pr-10"
            />
            <button
              type="button"
              onClick={toggleShowConfirmPassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

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