import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">
              Política de Privacidade
            </h1>
            <p className="text-lg text-gray-600">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </p>
          </div>

          {/* Conteúdo */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Introdução
              </h2>
              <p className="text-gray-700 mb-4">
                Nós valorizamos sua privacidade e estamos comprometidos em
                proteger suas informações pessoais. Esta política explica como
                coletamos, usamos e protegemos seus dados quando você utiliza
                nossos serviços.
              </p>
              <p className="text-gray-700">
                Ao utilizar nosso site ou serviços, você concorda com os termos
                desta política de privacidade.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Informações que Coletamos
              </h2>
              <p className="text-gray-700 mb-4">
                Coletamos informações essenciais para criar e manter o site personalizado da sua escola, incluindo:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Informações fornecidas por você:</span> Nome da escola, nome do responsável, e-mail, telefone, preferências de design e outros dados fornecidos durante a geração do site.
                </li>
                <li>
                  <span className="font-medium">Dados de autenticação:</span> Credenciais de login (armazenadas de forma segura) e tokens JWT utilizados para acesso à área administrativa.
                </li>
                <li>
                  <span className="font-medium">Dados de uso:</span> Informações sobre como você utiliza a plataforma, páginas acessadas e configurações aplicadas.
                </li>
                <li>
                  <span className="font-medium">Informações técnicas:</span> Endereço IP, navegador e sistema operacional usados para acessar o painel.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Como Usamos Suas Informações
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Gerar e configurar automaticamente o site institucional da sua escola</li>
                <li>Permitir login seguro à área administrativa usando autenticação via token</li>
                <li>Armazenar preferências de layout, cores e conteúdos configurados</li>
                <li>Comunicar informações importantes sobre atualizações, melhorias ou suporte</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Compartilhamento de Dados
              </h2>
              <p className="text-gray-700 mb-4">
                Não vendemos nem alugamos suas informações pessoais a terceiros.
                Podemos compartilhar seus dados nas seguintes situações:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Prestadores de serviço:</span>{" "}
                  Terceiros que nos auxiliam na operação do nosso negócio.
                </li>
                <li>
                  <span className="font-medium">Obrigações legais:</span> Quando
                  exigido por lei ou para proteger nossos direitos.
                </li>
                <li>
                  <span className="font-medium">Transferências de negócio:</span>{" "}
                  Em caso de fusão, aquisição ou venda de ativos.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Cookies e Tecnologias Semelhantes
              </h2>
              <p className="text-gray-700 mb-4">
                Utilizamos cookies estritamente necessários para garantir a segurança e a funcionalidade do login administrativo da sua escola. Esses cookies armazenam o token JWT (JSON Web Token) usado para autenticação.
              </p>
              <p className="text-gray-700">
                Você pode optar por não aceitar cookies em seu navegador; no entanto, isso impedirá o funcionamento de recursos como o acesso à área administrativa do seu site.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Segurança dos Dados
              </h2>
              <p className="text-gray-700 mb-4">
                Implementamos medidas de segurança técnicas e organizacionais
                adequadas para proteger suas informações pessoais contra acesso
                não autorizado, alteração, divulgação ou destruição.
              </p>
              <p className="text-gray-700">
                No entanto, nenhum método de transmissão pela Internet ou método
                de armazenamento eletrônico é 100% seguro, e não podemos
                garantir segurança absoluta.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Links para Outros Sites
              </h2>
              <p className="text-gray-700">
                Nosso site pode conter links para outros sites que não são
                operados por nós. Se você clicar em um link de terceiros, será
                direcionado ao site desse terceiro. Recomendamos que você revise
                a política de privacidade de cada site que visitar.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Alterações a Esta Política
              </h2>
              <p className="text-gray-700 mb-4">
                Podemos atualizar nossa Política de Privacidade periodicamente.
                Notificaremos você sobre quaisquer alterações publicando a nova
                Política de Privacidade nesta página.
              </p>
              <p className="text-gray-700">
                Recomendamos que você revise esta Política de Privacidade
                periodicamente para quaisquer alterações.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Contate-Nos
              </h2>
              <p className="text-gray-700">
                Se você tiver dúvidas sobre esta Política de Privacidade, entre
                em contato conosco através do nosso email{" "}
                <a
                  href="mailto:suporte@edulinker.com"
                  className="text-blue-600 hover:text-blue-800 underline"
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