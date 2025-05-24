import React from "react";
import Image from "next/image";
import { SiteConfig } from "@/types/site";
import AulaCard from "@/app/components/common/gratuito/AulaCard";
import ProfessorCard from "@/app/components/common/gratuito/ProfessorCard";
import DepoimentoCard from "@/app/components/common/gratuito/DepoimentoCard";

const DEFAULT_LOGO = "/default-logo.png";
const DEFAULT_HERO_IMAGE = "/banner-principal.jpg";
const DEFAULT_GALLERY_IMAGE = "/gallery-placeholder.jpg";
const DEFAULT_AULA_IMAGE = "/default-aula.jpg";
const DEFAULT_PROFESSOR_IMAGE = "/default-professor.jpg";
const DEFAULT_DEPOIMENTO_IMAGE = "/default-avatar.jpg";

export default function EscolaTemplate({ config }: { config: SiteConfig }) {
  const bg = config.corFundo || "#ffffff";
  const fg = config.corTexto || "#000000";

  const fontClass = {
    montserrat: "font-montserrat",
    geist: "font-geist",
    "geist-mono": "font-geist-mono",
    roboto: "font-roboto",
    poppins: "font-poppins",
  }[config.fonte || "montserrat"];

  // Process data with fallbacks
  const sobreContent = config.sobre || [
    {
      titulo: "Nossa História",
      texto:
        "Fundada em 2010, nossa escola tem transformado vidas através da educação de qualidade.",
    },
    {
      titulo: "Nossa Missão",
      texto:
        "Proporcionar ensino excelente e formar cidadãos preparados para os desafios do futuro.",
    },
  ];

  const aulasItems = config.aulas?.length
    ? config.aulas.map((aula) => ({
        ...aula,
        foto: aula.foto || DEFAULT_AULA_IMAGE,
      }))
    : Array(4).fill({
        foto: DEFAULT_AULA_IMAGE,
        titulo: "Aula Padrão",
        descricao: "Descrição da aula",
        nivel: "Iniciante",
      });

  const professoresItems = config.professores?.length
    ? config.professores.map((prof) => ({
        nome: prof.nome,
        descricao: prof.descricao,
        foto: prof.imagem || DEFAULT_PROFESSOR_IMAGE,
      }))
    : Array(4).fill({
        nome: "Professor Experiente",
        descricao: "Professor experiente na área",
        foto: DEFAULT_PROFESSOR_IMAGE,
      });

  const depoimentosItems = config.depoimentos?.length
    ? config.depoimentos.map((dep) => ({
        ...dep,
        foto: dep.foto || DEFAULT_DEPOIMENTO_IMAGE,
      }))
    : Array(2).fill({
        foto: DEFAULT_DEPOIMENTO_IMAGE,
        nome: "Cliente Satisfeito",
        texto: "Excelente experiência com a escola!",
      });

  // Limit gallery to 3 images
  const galleryItems = (
    config.galerias?.length
      ? config.galerias
      : Array(3).fill({ imagem: DEFAULT_GALLERY_IMAGE })
  ).slice(0, 3);

  return (
    <div
      style={{ backgroundColor: bg, color: fg }}
      className={`min-h-screen flex flex-col ${fontClass}`}
    >
      {/* Header */}
      <header className="py-4 px-6 bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <img src={config.logo || DEFAULT_LOGO} alt="Logo" className="h-12" />

          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-gray-800 hover:text-pink-600 font-medium"
            >
              Home
            </a>
            <a
              href="#sobre"
              className="text-gray-800 hover:text-pink-600 font-medium"
            >
              Sobre
            </a>
            <a
              href="#aulas"
              className="text-gray-800 hover:text-pink-600 font-medium"
            >
              Aulas
            </a>
            <a
              href="#professores"
              className="text-gray-800 hover:text-pink-600 font-medium"
            >
              Professores
            </a>
            <a
              href="#contato"
              className="text-gray-800 hover:text-pink-600 font-medium"
            >
              Contato
            </a>
          </nav>

          <a
            href="#contato"
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full font-medium transition"
          >
            Contato
          </a>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section - Static Image */}
        <section className="relative h-[500px] w-full">
          <Image
            src="/templates/free/banner1.jpg" // Imagem original que você usava
            alt="Banner principal"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {config.titulo || "Nome da Escola"}
              </h1>
              <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                {config.descricao || "Descrição da escola"}
              </p>
            </div>
          </div>
        </section>
        {/* Sobre Nós */}
        <section id="sobre" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Sobre Nós</h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {Array.isArray(sobreContent) ? (
                  sobreContent.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-8 rounded-xl">
                      <h3 className="text-2xl font-bold text-pink-600 mb-4">
                        {item.titulo}
                      </h3>
                      <p className="text-gray-700">{item.texto}</p>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-50 p-8 rounded-xl">
                    <p className="text-gray-700">{sobreContent}</p>
                  </div>
                )}
              </div>

              <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/about-us.jpg"
                  alt="Sobre Nós"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Galeria (limitada a 3 imagens) */}
        <section id="galeria" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Galeria de Fotos
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <Image
                    src={item.imagem}
                    alt={`Foto da galeria ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Aulas */}
        <section id="aulas" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">
              Nossas Aulas
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {aulasItems.map((item, index) => (
                <AulaCard
                  key={index}
                  foto={item.foto}
                  titulo={item.titulo}
                  descricao={item.descricao}
                  nivel={item.nivel}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Professores */}
        <section id="professores" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">
              Nossos Professores
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {professoresItems.map((professor, index) => (
                <ProfessorCard
                  key={index}
                  foto={professor.foto}
                  nome={professor.nome}
                  descricao={professor.descricao}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">
              Depoimentos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {depoimentosItems.map((depoimento, index) => (
                <DepoimentoCard
                  key={index}
                  foto={depoimento.foto}
                  nome={depoimento.nome}
                  texto={depoimento.texto}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contato (sem mapa) */}
        <section id="contato" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-4xl font-bold mb-8">Entre em Contato</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Informações</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-pink-100 p-2 rounded-full mr-4">
                        <svg
                          className="w-6 h-6 text-pink-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Telefone</p>
                        <p className="text-gray-600">(11) 9999-9999</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-pink-100 p-2 rounded-full mr-4">
                        <svg
                          className="w-6 h-6 text-pink-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">contato@escola.com.br</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-pink-100 p-2 rounded-full mr-4">
                        <svg
                          className="w-6 h-6 text-pink-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Endereço</p>
                        <p className="text-gray-600">
                          Rua Exemplo, 123 - São Paulo/SP
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Horário de Atendimento
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Segunda a Sexta</span>
                      <span className="font-medium">08:00 - 18:00</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Sábado</span>
                      <span className="font-medium">09:00 - 12:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Domingo</span>
                      <span className="font-medium">Fechado</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <img
              src={config.logo || DEFAULT_LOGO}
              alt="Logo"
              className="h-10 mb-6 md:mb-0"
            />
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">
                Termos
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                FAQ
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} {config.titulo || "Escola"}. Todos os
              direitos reservados.
            </p>
            <p className="mt-2">Versão Gratuita - Edulinker</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
