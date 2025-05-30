"use client";

import React from "react";
import Image from "next/image";
import { SiteConfig } from "@/types/site";
import AulaCard from "@/app/components/common/gratuito/AulaCard";
import ProfessorCard from "@/app/components/common/gratuito/ProfessorCard";
import DepoimentoCard from "@/app/components/common/gratuito/DepoimentoCard";
import { useSite } from "@/contexts/siteContext";
import CarouselPremium from "../premium/CarouselPremium";
import ProfessorCardPremium from "../premium/ProfessorCardPremium";
import DepoimentoCardPremium from "../premium/DepoimentoCardPremium";
import Link from "next/link";
import {
  Clock,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  FacebookIcon,
  Instagram,
  Youtube,
} from "lucide-react";
import Gallery from "../gratuito/Gallery";
import GalleryPremium from "../premium/GalleryPremium";

// Imagens padrão
const DEFAULT_LOGO = "/logo/EduLinker.png";
const DEFAULT_LOGO_BRANCA = "/logo/EduLinkerWhite.png";
const DEFAULT_HERO_IMAGE = "/templates/free/banner1.jpg";

export default function GratuitoTemplate({ config }: { config: SiteConfig }) {
  const { plano } = useSite();
  const isPremium = plano === "premium";

  // cores e fonte
  const fg = config.corTexto || "#000000";
  const bg = config.corFundo || "#ffffff";
  const fontClass = {
    montserrat: "font-montserrat",
    geist: "font-geist",
    "geist-mono": "font-geist-mono",
    roboto: "font-roboto",
    poppins: "font-poppins",
  }[config.fonte || "montserrat"];

  // Título do site (no header e no rodapé)
  const siteTitle = config.titulo || "Sua Escola";

  // pega o banner salvo (primeiro item) ou fallback
  const banners =
    Array.isArray(config.carrossel) && config.carrossel.length > 0
      ? config.carrossel
      : [{ imagem: DEFAULT_HERO_IMAGE }];

  // Sessão "Sobre" (string simples)
  const sobreTexto = config.descricao || "Conte aqui a história da sua escola.";
  const fotoSobre = config.fotoSobre || "/teachers/teacher1.jpg";

  const destaques = isPremium
    ? config.destaques?.length
      ? config.destaques
      : [
        { number: "10+", label: "Anos de experiência" },
        { number: "5.000+", label: "Alunos formados" },
        { number: "98%", label: "Satisfação" },
      ]
    : [];

  // Aulas (até 4 cards)
  const allAulas = Array.isArray(config.aulas) ? config.aulas : [];
  const displayedAulas = isPremium ? allAulas : allAulas.slice(0, 4);

  // pega todos os professores configurados
  const allProfessores = Array.isArray(config.professores)
    ? config.professores
    : [];
  const displayed = isPremium ? allProfessores : allProfessores.slice(0, 4);

  // Depoimentos (até 2)
  const all = Array.isArray(config.depoimentos) ? config.depoimentos : [];
  const displayedDepoimentos = isPremium ? all : all.slice(0, 2);

  // se for premium, mostra todas; senão, só 3 primeiras
  const allGalerias = Array.isArray(config.galerias) ? config.galerias : [];
  const displayedGalerias = isPremium ? allGalerias : allGalerias.slice(0, 3);

  // Informações de contato
  const {
    descricaoBreve,
    horarioSemana,
    horarioSabado,
    email,
    telefone,
    whatsapp,
    endereco,
    cidade,
    socialMedia = {},
  } = config.contato || {};

  return (
    <div
      style={{ background: bg, color: fg }}
      className={`min-h-screen flex flex-col ${fontClass}`}
    >
      {/* Header */}
      <header className="py-4 px-6 bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="#home">
            <img
              src={config.logo || DEFAULT_LOGO}
              alt="Logo da Escola"
              className="transition-transform duration-300 group-hover:scale-105 max-h-[60px] max-w-[110px] h-auto"
            />
          </Link>
          <nav className="hidden md:flex space-x-8">
            {["Home", "Sobre", "Aulas", "Professores", "Contato"].map(
              (label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="text-gray-800 hover:text-pink-600 font-medium"
                >
                  {label}
                </a>
              )
            )}
          </nav>
          <a
            href={whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, '')}` : '#contato'}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full font-medium transition"
          >
            Contato
          </a>
        </div>
      </header>

      {/* Hero / Banner */}
      <section className="relative w-full max-h-[800px] overflow-hidden">
        {isPremium ? (
          <CarouselPremium
            items={banners}
            autoPlay
            interval={6000}
            className="h-full"
          />
        ) : (
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[800px] w-full">
            <Image
              src={banners[0].imagem || DEFAULT_HERO_IMAGE}
              alt="Banner principal"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        )}
      </section>

      <main className="flex flex-col items-center space-y-16 sm:px-16">
        {/* Sobre Nós */}
        <section id="sobre" className="w-full py-16 bg-white rounded-xl shadow-sm mt-10">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4" style={{color: fg }}>Sobre Nós</h2>
              <div className="w-20 h-1 bg-black mx-auto rounded-full"></div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-start">
              {/* Imagem agora vem primeiro no fluxo (topo em mobile) */}
              <div className="flex-1 w-full order-1 lg:order-2">
                <div className="relative h-72 rounded-lg overflow-hidden border border-gray-100 shadow-inner">
                  <Image
                    src={config.fotoSobre || "/templates/free/image_default_sobre2.png"}
                    alt="Sobre Nós"
                    fill
                    className="object-cover transition-all duration-500 hover:scale-102"
                    style={{ filter: "brightness(0.97) contrast(1.02)" }}
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-gray-100/50 pointer-events-none rounded-lg"></div>
                </div>

                {/* Destaques permanecem abaixo da imagem */}
                {isPremium && (
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                    {destaques.map((item, i) => (
                      <div
                        key={i}
                        className="group text-center p-4 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors min-w-[120px] shadow-inner relative"
                      >
                        <div className="absolute inset-0 ring-1 ring-inset ring-gray-100/50 pointer-events-none rounded-lg"></div>
                        <p className="text-2xl font-bold mb-2">
                          {item.number}
                        </p>
                        <p className="text-xs font-medium text-gray-600 uppercase tracking-tight px-1 break-words whitespace-normal">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Texto movido para baixo em mobile */}
              <div className="flex-1 relative pl-6 order-2 lg:order-1">
                <div className="absolute left-0 top-0 h-full w-1 bg-black rounded-full"></div>
                <p className="leading-relaxed mt-8 lg:mt-0" style={{ color: fg }}>
                  {sobreTexto}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Galeria */}
        <section className="w-full py-16 bg-white rounded-xl shadow-sm">
          <div className="container mx-auto px-6">
            {/* Cabeçalho no estilo consistente */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4" style={{color: fg }}>Nossa Galeria</h2>
              <div className="w-20 h-1 bg-black mx-auto rounded-full"></div>
            </div>

            {/* Container da galeria com tratamento visual similar */}
            <div className="flex justify-center">
              <div className="w-full max-w-6xl">
                <div className="relative rounded-lg overflow-hidden border border-gray-100 shadow-inner p-4 bg-gray-50">
                  <Gallery
                    items={
                      config.galerias && config.galerias.length > 0
                        ? config.galerias
                        : [
                          { imagem: '/templates/premium/placeholderGallery.webp' },
                          { imagem: '/templates/premium/placeholderGallery.webp' },
                          { imagem: '/templates/premium/placeholderGallery.webp' }
                        ]
                    }
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-gray-100/50 pointer-events-none rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Elementos decorativos sutis */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none -z-10">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-indigo-100 filter blur-xl"></div>
              <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-100 filter blur-xl"></div>
            </div>
          </div>
        </section>

        {/* Aulas */}
        <section id="aulas" className="w-full py-16 bg-white rounded-xl shadow-sm">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4" style={{color: fg }}>Nossas Aulas</h2>
              <div className="w-20 h-1 bg-black mx-auto rounded-full"></div>
            </div>

            {/* Container das aulas - versão ajustada */}
            <div className="flex justify-center">
              {displayedAulas.length > 0 ? (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-6xl">
                  {displayedAulas.map((aula, index) => (
                    <AulaCard
                      key={index}
                      foto={aula.foto}
                      titulo={aula.titulo}
                      descricao={aula.descricao}
                      nivel={aula.nivel}
                      duracao={aula.duracao}
                      whatsapp={whatsapp}
                      fg={config.corTexto}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 max-w-2xl">
                  <AulaCard
                    foto=""
                    titulo="Aula Demonstrativa"
                    descricao="Experimente nossa aula modelo no plano gratuito"
                    nivel="Iniciante"
                    duracao="1h"
                    whatsapp={whatsapp}
                    fg={config.corTexto}
                  />
                  <AulaCard
                    foto=""
                    titulo="Aula Demonstrativa"
                    descricao="Experimente nossa aula modelo no plano gratuito"
                    nivel="Iniciante"
                    duracao="1h"
                    whatsapp={whatsapp}
                    fg={config.corTexto}
                  />
                </div>
              )}
            </div>

            {/* Mensagem de upgrade */}
            {!isPremium && allAulas.length > 1 && (
              <p className="mt-8 text-center text-gray-600">
                Você tem {allAulas.length} aulas disponíveis.{" "}
                <a href="/upgrade" className="text-indigo-600 font-medium hover:underline">
                  Faça upgrade para acessar todas
                </a>
              </p>
            )}
          </div>
        </section>

        {/* Professores */}
        <section id="professores" className="w-full py-16 bg-white rounded-xl shadow-sm">
          <div className="container mx-auto px-6">
            {/* Cabeçalho no estilo consistente */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4" style={{color: fg }}>Nossa Equipe</h2>
              <div className="w-20 h-1 bg-black mx-auto rounded-full"></div>
            </div>

            {/* Flexbox de professores */}
            {(() => {
              type Professor = { foto: string; nome: string; texto: string };
              const professoresItems: Professor[] = config.professores && config.professores.length > 0
                ? config.professores.map((prof: any) => ({
                  foto: prof.foto ?? prof.imagem ?? '',
                  nome: prof.nome,
                  texto: prof.texto ?? prof.descricao ?? '',
                }))
                : [
                  {
                    foto: '',
                    nome: 'Prof. Ana Martins',
                    texto: '“Especialista em metodologias ativas e ensino moderno.”',
                  },
                  {
                    foto: '',
                    nome: 'Prof. Carlos Henrique',
                    texto: '“Apaixonado por ensinar e transformar vidas através da educação.”',
                  }
                ];
              return (
                <div className="flex flex-wrap justify-center gap-8">
                  {professoresItems.map((item: Professor, idx: number) => (
                    <div
                      key={idx}
                      className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.333%-22px)] lg:w-[calc(25%-24px)]"
                      style={{ minWidth: '250px', maxWidth: '280px' }} // Ajuste conforme necessário
                    >
                      <ProfessorCard
                        foto={item.foto}
                        nome={item.nome}
                        texto={item.texto}
                      />
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>

        {/* Depoimentos */}
        <section id="depoimentos" className="w-full py-16 bg-white rounded-xl shadow-sm mt-10">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4" style={{color: fg }}>Depoimentos</h2>
              <div className="w-20 h-1 bg-black mx-auto rounded-full"></div>
            </div>

            {displayedDepoimentos.length === 0 ? (
              <div className="flex justify-center">
                <div className="w-full sm:w-[350px]">
                  <div className="bg-white rounded-lg shadow-inner p-6 h-full border border-gray-100 relative">
                    <div className="absolute inset-0 ring-1 ring-inset ring-gray-100/50 pointer-events-none rounded-lg"></div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full mr-4 bg-gray-100 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold" style={{ color: fg }}>Nome do Cliente</h3>
                    </div>

                    <div className="relative mb-4">
                      <span className="absolute -top-2 -left-1 text-3xl text-gray-300">
                        "
                      </span>
                      <p className="leading-relaxed pl-4 pr-2" style={{ color: fg }}>
                        Este é um depoimento fictício. Em breve clientes reais
                        compartilharão suas experiências!
                      </p>
                      <span className="absolute -bottom-3 -right-1 text-3xl text-gray-300">
                        "
                      </span>
                    </div>

                    <div className="flex justify-start">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${star <= 4
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                            }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-8">
                {displayedDepoimentos.slice(0, 2).map((d, index) => (
                  <div key={index} className="w-full sm:w-[350px]">
                    <div className="bg-white rounded-lg shadow-inner p-6 h-full border border-gray-100 relative">
                      <div className="absolute inset-0 ring-1 ring-inset ring-gray-100/50 pointer-events-none rounded-lg"></div>
                      <div className="flex items-center mb-4">
                        {d.foto ? (
                          <img
                            src={d.foto}
                            alt={d.nome}
                            className="w-12 h-12 rounded-full mr-4 object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full mr-4 bg-gray-100 flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                        )}
                        <h3 className="text-lg font-semibold" style={{ color: fg }}>{d.nome}</h3>
                      </div>

                      <div className="relative mb-4">
                        <span className="absolute -top-2 -left-1 text-3xl text-gray-300">
                          "
                        </span>
                        <p className="leading-relaxed pl-4 pr-2" style={{ color: fg }}>{d.texto}</p>
                        <span className="absolute -bottom-3 -right-1 text-3xl text-gray-300">
                          "
                        </span>
                      </div>

                      <div className="flex justify-start">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const rating = Number(d.estrelas) || 0;
                          return (
                            <svg
                              key={star}
                              className={`w-5 h-5 ${star <= rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                                }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="w-full py-16 bg-white rounded-xl shadow-sm mt-10 mb-10">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4" style={{color: fg }}>Contato</h2>
              <div className="w-20 h-1 bg-black mx-auto rounded-full"></div>
            </div>

            <div className="flex flex-wrap justify-center items-stretch gap-6 lg:gap-8">
              {/* E-mail */}
              <div className="flex flex-col items-center text-center w-full sm:w-48 min-h-[180px] p-6 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 ring-1 ring-inset ring-gray-100/50 pointer-events-none rounded-lg"></div>
                <Mail className="w-7 h-7 mb-4 text-black" />
                <h3 className="font-semibold mb-2" style={{ color: fg }}>E-mail</h3>
                <p className="text-sm leading-relaxed px-2 break-words w-full" style={{ color: fg }}>
                  {email || "contato@seudominio.com"}
                </p>
              </div>

              {/* Telefone */}
              <div className="flex flex-col items-center text-center w-full sm:w-48 min-h-[180px] p-6 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 ring-1 ring-inset ring-gray-100/50 pointer-events-none rounded-lg"></div>
                <Phone className="w-7 h-7 mb-4 text-black" />
                <h3 className="font-semibold mb-2" style={{ color: fg }}>Telefone</h3>
                <p className="text-sm leading-relaxed px-2 break-words w-full" style={{ color: fg }}>
                  {telefone || "(00) 00000-0000"}
                </p>
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col items-center text-center w-full sm:w-48 min-h-[180px] p-6 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 ring-1 ring-inset ring-gray-100/50 pointer-events-none rounded-lg"></div>
                <MessageCircle className="w-7 h-7 mb-4 text-black" />
                <h3 className="font-semibold mb-2" style={{ color: fg }}>WhatsApp</h3>
                <p className="text-sm leading-relaxed px-2 break-words w-full" style={{ color: fg }}>
                  {whatsapp || "(00) 00000-0000"}
                </p>
              </div>

              {/* Horários */}
              <div className="flex flex-col items-center text-center w-full sm:w-48 min-h-[180px] p-6 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 ring-1 ring-inset ring-gray-100/50 pointer-events-none rounded-lg"></div>
                <Clock className="w-7 h-7 mb-4 text-black" />
                <h3 className="font-semibold mb-2" style={{ color: fg }}>Horário</h3>
                <p className="text-sm leading-relaxed px-2 break-words w-full" style={{ color: fg }}>
                  {horarioSemana || "Seg-Sex: 00h-00h"}
                  <br />
                  {horarioSabado || "Sáb: 00h-00h"}
                </p>
              </div>

              {/* Endereço */}
              <div className="flex flex-col items-center text-center w-full sm:w-48 min-h-[180px] p-6 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 ring-1 ring-inset ring-gray-100/50 pointer-events-none rounded-lg"></div>
                <MapPin className="w-7 h-7 mb-4 text-black" />
                <h3 className="font-semibold mb-2" style={{ color: fg }}>Endereço</h3>
                <p className="text-sm leading-relaxed px-2 break-words w-full" style={{ color: fg }}>
                  {endereco || "Rua Exemplo, 123"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Redes Sociais - Centralizado no mobile, esquerda no desktop */}
            <div className="order-2 md:order-1 flex space-x-4 mb-4 md:mb-0">
              {config.contato?.socialMedia?.facebook && (
                <a
                  href={config.contato.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FacebookIcon className="w-6 h-6" />
                </a>
              )}
              {config.contato?.socialMedia?.instagram && (
                <a
                  href={config.contato.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              )}
              {config.contato?.socialMedia?.youtube && (
                <a
                  href={config.contato.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              )}
            </div>

            {/* Copyright - Esquerda */}
            <div className="order-1 md:order-2 mb-4 md:mb-0">
              <p className="text-sm">
                © {new Date().getFullYear()} Edulinker. Todos os direitos reservados.
              </p>
            </div>

            {/* Versão */}
            <div className="order-3">
              <p className="text-sm text-gray-400">
                Versão Gratuita – Edulinker
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}