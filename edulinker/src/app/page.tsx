import MainLayout from "@/components/Layouts/LandingPageLayout/page";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  // Array com os caminhos das fotos dos usuários
  const userPhotos = [
    "/usuarios/usuario_1.jpg",
    "/usuarios/usuario_2.jpg",
    "/usuarios/usuario_3.jpeg",
    "/usuarios/usuario_4.jpg",
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-24 flex flex-col lg:flex-row items-center gap-8">
        <div className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
            Crie seu site o site da sua escola em{" "}
            <span className="text-pink-600">minutos</span>, sem complicação
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
            Conecte seu público a todos os seus conteúdos importantes com um
            único link. Simples, rápido e eficiente.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
            <Link
              href="/register"
              className="bg-pink-600 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-pink-700 transition-colors text-sm sm:text-base"
            >
              Comece grátis
            </Link>
            <Link
              href="/login"
              className="border border-pink-600 text-pink-600 px-5 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-pink-50 transition-colors text-sm sm:text-base"
            >
              Já tenho conta
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center lg:justify-start space-x-4">
            <div className="flex -space-x-2">
              {userPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative"
                >
                  <Image
                    src={photo}
                    alt={`Usuário ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-700">
              +5.000 criadores já usam
            </span>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="bg-white p-2 rounded-xl shadow-xl">
              <div className="bg-gray-200 rounded-lg w-full h-64 sm:h-80 md:h-96 flex items-center justify-center overflow-hidden">
                <img
                  src="/siteEdulinker/prévia-do-Dashboard.jpeg"
                  alt="Prévia do Dashboard"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg hidden sm:block">
              <span className="text-sm text-gray-500">
                Exemplo criado em 3 minutos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Recursos Incríveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Rápido e Fácil",
                description:
                  "Crie seu site em minutos com nossa interface intuitiva. Sem necessidade de conhecimentos técnicos.",
                icon: (
                  <svg
                    className="w-6 h-6 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
              },
              {
                title: "Totalmente Responsivo",
                description:
                  "Seu site perfeito em qualquer dispositivo. Celular, tablet ou desktop - sempre com a melhor experiência.",
                icon: (
                  <svg
                    className="w-6 h-6 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
              {
                title: "Segurança Garantida",
                description:
                  "Protegemos seus dados com os mais altos padrões de segurança. Seu conteúdo sempre seguro conosco.",
                icon: (
                  <svg
                    className="w-6 h-6 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <div key={index} className="bg-pink-50 p-5 sm:p-6 rounded-xl">
                <div className="bg-pink-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section id="toturial" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
            Veja como é fácil
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="rounded-lg w-full overflow-hidden aspect-video shadow-xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                Passo a passo simples
              </h3>
              <ul className="space-y-4">
                {[
                  "Cadastre-se em menos de 1 minuto",
                  "Adicione seus links e conteúdos",
                  "Personalize o design com nosso editor fácil",
                  "Publique e compartilhe com o mundo",
                ].map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-pink-100 text-pink-600 rounded-full p-1 mr-3 mt-0.5">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-800">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pink-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Pronto para simplificar sua presença online?
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de criadores que já estão compartilhando seus
            conteúdos de forma elegante e eficiente.
          </p>
          <Link
            href="/login"
            className="bg-white text-pink-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block text-sm sm:text-base"
          >
            Criar minha página agora
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
