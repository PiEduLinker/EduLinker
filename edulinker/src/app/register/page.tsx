"use client"; // Necessário para usar hooks como useState e useRouter em apps Next.js 13+

import { useState } from "react";
import CreateAccountLayout from "@/components/Layouts/CreateAccountLayout";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  // Estado que armazena os dados digitados no formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  // Estado para armazenar e exibir mensagens de erro
  const [erro, setErro] = useState("");

  // Atualiza o estado do formulário conforme o usuário digita
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função que trata o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página
    setErro(""); // Limpa erros anteriores

    // Verifica se as senhas digitadas são iguais
    if (formData.senha !== formData.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      // Envia os dados do formulário como JSON para a API
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
        }),
      });

      // Converte a resposta da API em JSON
      const data = await res.json();

      // Se houve erro na resposta, mostra a mensagem
      if (!res.ok) {
        setErro(data.erro || "Erro ao cadastrar.");
        return;
      }

      // Se deu tudo certo, redireciona o usuário para a página de login
      router.push("/account/school_description");

    } catch (err) {
      // Captura erros de rede ou exceções e exibe mensagem
      setErro("Erro de conexão com o servidor.");
    }
  };

  return (
    <CreateAccountLayout>
      {/* Container principal da tela */}
      <div className="w-full max-w-lg flex flex-col items-center justify-center flex-1 pb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 text-center">
          PREENCHA SEUS DADOS
        </h1>

        {/* Exibe mensagem de erro, se houver */}
        {erro && (
          <p className="text-red-600 font-medium text-sm text-center mb-4">{erro}</p>
        )}

        {/* Formulário de cadastro */}
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

          {/* Botão de envio do formulário */}
          <button
            type="submit"
            className="w-full mt-6 bg-purple-700 text-white font-semibold py-3 
            rounded-full hover:bg-purple-800 cursor-pointer transition"
          >
            Continuar
          </button>
        </form>
      </div>
    </CreateAccountLayout>
  );
}