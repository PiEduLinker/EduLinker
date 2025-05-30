import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f7ff] to-white text-[#1B1E3C]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1B1E3C] mb-4">
              Política de Privacidade
            </h1>
            <p className="text-md text-gray-600">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </p>
          </div>

          {/* Conteúdo */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 text-base leading-relaxed">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#EC1172] mb-4">
                Introdução
              </h2>
              <p className="text-gray-700 mb-4">
                Nós valorizamos sua privacidade e estamos comprometidos em proteger suas informações pessoais. Esta política explica como coletamos, usamos e protegemos seus dados quando você utiliza nossos serviços.
              </p>
              <p className="text-gray-700">
                Ao utilizar nosso site ou serviços, você concorda com os termos desta política de privacidade.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#EC1172] mb-4">
                Informações que Coletamos
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><span className="font-medium">Informações fornecidas por você:</span> Nome da escola, nome do responsável, e-mail, telefone, preferências de design etc.</li>
                <li><span className="font-medium">Dados de autenticação:</span> Credenciais de login e tokens JWT.</li>
                <li><span className="font-medium">Dados de uso:</span> Informações sobre como você utiliza a plataforma.</li>
                <li><span className="font-medium">Informações técnicas:</span> IP, navegador e sistema operacional.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#EC1172] mb-4">
                Como Usamos Suas Informações
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Gerar e configurar automaticamente o site institucional</li>
                <li>Permitir login seguro à área administrativa</li>
                <li>Armazenar preferências de layout e conteúdo</li>
                <li>Enviar atualizações importantes</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#EC1172] mb-4">
                Compartilhamento de Dados
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><span className="font-medium">Prestadores de serviço:</span> Terceiros que auxiliam na operação.</li>
                <li><span className="font-medium">Obrigações legais:</span> Quando exigido por lei.</li>
                <li><span className="font-medium">Transferência de negócio:</span> Fusões, aquisições etc.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#EC1172] mb-4">
                Cookies e Tecnologias Semelhantes
              </h2>
              <p className="text-gray-700 mb-2">
                Utilizamos cookies essenciais para o funcionamento da área administrativa.
              </p>
              <p className="text-gray-700">
                Desativar cookies pode impedir o acesso a recursos como login.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#EC1172] mb-4">
                Segurança dos Dados
              </h2>
              <p className="text-gray-700 mb-2">
                Adotamos medidas para proteger seus dados contra acesso não autorizado.
              </p>
              <p className="text-gray-700">
                Nenhum método é 100% seguro, mas seguimos boas práticas de proteção.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#EC1172] mb-4">
                Links para Outros Sites
              </h2>
              <p className="text-gray-700">
                Nosso site pode conter links para sites externos. Leia a política de privacidade de cada um deles.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#EC1172] mb-4">
                Alterações a Esta Política
              </h2>
              <p className="text-gray-700 mb-2">
                Podemos atualizar esta política periodicamente.
              </p>
              <p className="text-gray-700">
                Recomendamos que revise esta página regularmente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#EC1172] mb-4">
                Contate-Nos
              </h2>
              <p className="text-gray-700">
                Dúvidas? Escreva para{" "}
                <a
                  href="mailto:suporte@edulinker.com"
                  className="text-[#EC1172] hover:underline"
                >
                  suporte@edulinker.com
                </a>
              </p>
            </section>
          </div>

          {/* Rodapé */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>© 2025 EduLinker. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
