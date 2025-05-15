import CreateAccountLayout from "@/components/Layouts/CreateAccountLayout";

export default function RegisterPage() {
    return (
        <CreateAccountLayout>
            {/* Container do formulário */}
            <div className="w-full max-w-lg flex flex-col items-center justify-center flex-1 pb-12">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 text-center">
                    PREENCHA SEUS DADOS
                </h1>

                <form
                    method="POST"
                    action="/api/register" // substitua pelo endpoint real se necessário
                    className="w-full space-y-4"
                >
                    <input
                        type="text"
                        name="nome"
                        placeholder="Seu nome"
                        required
                        className="w-full px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    />
                    <input
                        type="password"
                        name="senha"
                        placeholder="Senha"
                        required
                        className="w-full px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    />
                    <input
                        type="password"
                        name="confirmarSenha"
                        placeholder="Repita sua senha"
                        required
                        className="w-full px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    />

                    <button
                        type="submit"
                        className="w-full mt-6 bg-purple-700 text-white font-semibold py-3 rounded-full hover:bg-purple-800 cursor-pointer transition"
                    >
                        Continuar
                    </button>
                </form>
            </div>
        </CreateAccountLayout>
    );
}
