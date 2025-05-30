import Link from "next/link";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-800 mb-2">
              📄 Termos de Uso – EduLinker
            </h1>
            <p className="text-lg text-gray-600">
              Última atualização: 28 de maio de 2025
            </p>
          </div>

          {/* Conteúdo */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
            <section className="mb-8">
              <p className="text-gray-700 mb-6 text-lg">
                Bem-vindo ao EduLinker!
              </p>
              <p className="text-gray-700">
                Estes Termos de Uso regem o uso do site, serviços e funcionalidades oferecidos pela plataforma EduLinker, incluindo a criação, gerenciamento e hospedagem de sites para instituições de ensino, cursos e profissionais da área educacional.
              </p>
              <p className="text-gray-700 mt-4 font-medium">
                Ao utilizar nossos serviços, você concorda com estes termos. Por favor, leia-os com atenção.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                1. Aceitação dos Termos
              </h2>
              <p className="text-gray-700">
                Ao acessar ou usar a plataforma EduLinker, você declara que leu, entendeu e concorda com estes Termos de Uso. Se você não concordar com os termos, não utilize nossos serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                2. Descrição dos Serviços
              </h2>
              <p className="text-gray-700 mb-4">
                O EduLinker oferece:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Criação de sites personalizados voltados à área educacional;</li>
                <li>Planos gratuitos e pagos com diferentes funcionalidades;</li>
                <li>Hospedagem de conteúdo (imagens, textos, vídeos) nos sites criados;</li>
                <li>Painel administrativo para gerenciamento do conteúdo;</li>
                <li>Suporte básico (para planos gratuitos) e suporte prioritário (para planos premium).</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                3. Cadastro e Responsabilidades
              </h2>
              <p className="text-gray-700 mb-4">
                Para utilizar a plataforma, o usuário deve fornecer informações reais e completas no momento do cadastro.
              </p>
              <p className="text-gray-700 mb-2">
                Você é responsável por:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Manter suas credenciais de acesso seguras;</li>
                <li>Garantir que o conteúdo publicado no seu site esteja de acordo com as leis brasileiras;</li>
                <li>Não utilizar os serviços para fins ilegais ou prejudiciais.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                4. Conteúdo Publicado
              </h2>
              <p className="text-gray-700 mb-4">
                Você mantém a propriedade do conteúdo que publica, mas autoriza o EduLinker a armazená-lo e exibi-lo conforme a estrutura do serviço.
              </p>
              <p className="text-gray-700 mb-2">
                Não é permitido publicar:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Conteúdo ilegal, ofensivo, difamatório ou que infrinja direitos autorais;</li>
                <li>Conteúdo adulto, discriminatório ou que promova violência.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Nos reservamos o direito de suspender ou remover sites que violem estas diretrizes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                5. Planos, Pagamentos e Cancelamento
              </h2>
              <p className="text-gray-700 mb-4">
                O EduLinker oferece planos gratuitos e pagos, com diferentes níveis de recursos e suporte.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>O plano gratuito tem limitações de espaço, personalização e número de páginas;</li>
                <li>Planos pagos são cobrados de forma recorrente, com cancelamento a qualquer momento;</li>
                <li>O cancelamento encerra os serviços ao final do ciclo vigente sem reembolso proporcional.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                6. Propriedade Intelectual
              </h2>
              <p className="text-gray-700">
                Todo o código-fonte, design, funcionalidades e identidade visual da plataforma EduLinker são de propriedade exclusiva da empresa e não podem ser copiados ou utilizados sem autorização prévia.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                7. Modificações nos Termos
              </h2>
              <p className="text-gray-700">
                Podemos atualizar estes Termos a qualquer momento. Alterações importantes serão comunicadas com antecedência pelo e-mail cadastrado ou no painel administrativo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                8. Limitação de Responsabilidade
              </h2>
              <p className="text-gray-700 mb-2">
                O EduLinker se compromete a manter a plataforma disponível, mas não se responsabiliza por:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Perdas decorrentes de falhas técnicas;</li>
                <li>Interrupções causadas por terceiros (como provedores de hospedagem);</li>
                <li>Conteúdos publicados por usuários.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                9. Privacidade
              </h2>
              <p className="text-gray-700">
                O uso da plataforma também está sujeito à nossa <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">Política de Privacidade</Link>, que explica como tratamos seus dados pessoais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                10. Contato
              </h2>
              <p className="text-gray-700">
                Para dúvidas ou solicitações, entre em contato pelo e-mail:
                <br />
                <a href="mailto:suporte@edulinker.com.br" className="text-blue-600 hover:text-blue-800 underline">
                  📧 suporte@edulinker.com.br
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