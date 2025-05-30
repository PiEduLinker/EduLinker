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

// Imagens padrão
const DEFAULT_LOGO = "/logo/EduLinker.png";
const DEFAULT_LOGO_BRANCA = "/logo/EduLinkerWhite.png";
const DEFAULT_HERO_IMAGE = "/templates/free/banner1.jpg";
const DEFAULT_PROFESSOR_IMAGE = "/teachers/teacher1.jpg";
const DEFAULT_DEPOIMENTO_IMAGE = "/teachers/teacher2.jpg";

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
              className="transition-transform duration-300 group-hover:scale-105 max-w-[110px] h-auto"
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
            href={`https://wa.me/${
              whatsapp ? whatsapp.replace(/\D/g, "") : ""
            }`}
            target="_blank"
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full font-medium transition"
          >
            Contato
          </a>
        </div>
      </header>

      {/* Hero / Banner */}
      <section className="relative w-full h-[400px] overflow-hidden">
        {isPremium ? (
          <CarouselPremium
            items={banners}
            autoPlay
            interval={6000}
            className="h-full"
          />
        ) : (
          <Image
            src={banners[0].imagem}
            alt="Banner principal"
            fill
            className="object-cover"
            priority
          />
        )}
      </section>

      <main className="flex-grow space-y-16 container mx-auto px-4 py-8">
        {/* Sobre Nós */}
        <section id="sobre" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Sobre Nós</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
              {/* Texto */}
              <div>
                <p className="h-full text-lg leading-relaxed break-words">
                  {sobreTexto}
                </p>
              </div>

              {/* Imagem */}
              <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={
                    config.fotoSobre ||
                    "/templates/free/image_default_sobre2.png"
                  }
                  alt="Sobre Nós"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Destaques (premium apenas) */}
            {isPremium && (
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {destaques.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-lg shadow-md border-l-4 border-black-500"
                  >
                    <p className="text-2xl font-bold text-gray-900">
                      {item.number}
                    </p>
                    <p className="text-sm text-gray-600">{item.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Galeria */}
        {displayedGalerias.length > 0 && (
          <section id="galeria" className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">
                Galeria de Fotos
              </h2>

              <div
                className={`${
                  displayedGalerias.length <= 2
                    ? "flex justify-center gap-4 flex-wrap"
                    : "grid gap-4 justify-items-center " +
                      (displayedGalerias.length === 3
                        ? "sm:grid-cols-3"
                        : "grid-cols-1 sm:grid-cols-3")
                }`}
              >
                {displayedGalerias.map((item, idx) => {
                  const imagemValida =
                    item.imagem && item.imagem.trim() !== ""
                      ? item.imagem
                      : "/images/fallback.jpg";

                  return (
                    <div
                      key={idx}
                      className="relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition w-80"
                    >
                      <img
                        src={imagemValida}
                        alt={`Foto ${idx + 1}`}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* aviso upgrade */}
              {!isPremium && allGalerias.length > 3 && (
                <p className="mt-6 text-center text-sm text-gray-500">
                  Você tem {allGalerias.length} fotos, mas conta gratuita exibe
                  só 3.{" "}
                  <a href="/upgrade" className="text-pink-600 underline">
                    Faça upgrade para ver todas
                  </a>
                  .
                </p>
              )}
            </div>
          </section>
        )}

        {/* Aulas*/}
        <section id="aulas" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              Nossas Aulas
            </h2>

            {/* Container centralizado para 1 único card */}
            <div className="flex justify-center">
              {displayedAulas.length > 0 ? (
                // Mostra o primeiro item se existir
                <div className="w-full max-w-xs">
                  <AulaCard
                    foto={displayedAulas[0].foto}
                    titulo={displayedAulas[0].titulo}
                    descricao={displayedAulas[0].descricao}
                    nivel={displayedAulas[0].nivel}
                    duracao={displayedAulas[0].duracao}
                    whatsapp={whatsapp}
                  />
                </div>
              ) : (
                // Placeholder se não houver aulas
                <div className="w-full max-w-xs">
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

            {/* Mensagem de upgrade ajustada */}
            {!isPremium && allAulas.length > 1 && (
              <p className="mt-6 text-center text-sm text-gray-500">
                Você tem {allAulas.length} aulas disponíveis.{" "}
                <a href="/upgrade" className="text-pink-600 underline">
                  Faça upgrade para acessar todas
                </a>
                .
              </p>
            )}
          </div>
        </section>

        {/* Professores - Versão Simplificada */}
        <section id="professores" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              Nossa Equipe
            </h2>

            {/* Container centralizado para 1 card */}
            <div className="flex justify-center">
              {displayed.length > 0 ? (
                isPremium ? (
                  <div className="w-full max-w-xs">
                    <ProfessorCardPremium
                      foto={displayed[0].imagem}
                      nome={displayed[0].nome}
                      texto={displayed[0].descricao}
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-xs">
                    <ProfessorCard
                      foto={displayed[0].imagem}
                      nome={displayed[0].nome}
                      descricao={displayed[0].descricao}
                    />
                  </div>
                )
              ) : (
                // Placeholder caso não haja professores
                <div className="w-full max-w-xs">
                  {isPremium ? (
                    <ProfessorCardPremium
                      foto="" // caminho da imagem padrão
                      nome="Professor Exemplo"
                      texto="Este é um professor demonstrativo"
                    />
                  ) : (
                    <ProfessorCard
                      foto="" // caminho da imagem padrão
                      nome="Professor Exemplo"
                      descricao="Conheça nosso time completo fazendo upgrade"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Mensagem de upgrade ajustada */}
            {!isPremium && allProfessores.length > 1 && (
              <p className="mt-6 text-center text-sm text-gray-500">
                Você tem {allProfessores.length} professores cadastrados.{" "}
                <a href="/upgrade" className="text-pink-600 underline">
                  Faça upgrade para ver toda a equipe
                </a>
                .
              </p>
            )}
          </div>
        </section>

        {/* Depoimentos */}
        <section id="depoimentos" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Depoimentos
            </h2>

            {displayedDepoimentos.length === 0 ? (
              <div className="flex justify-center">
                <div className="w-full sm:w-[350px]">
                  <div className="bg-white rounded-lg shadow-md p-6 h-full border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full mr-4 bg-gray-200 flex items-center justify-center">
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
                      <h3 className="text-lg font-semibold">Nome do Cliente</h3>
                    </div>

                    <div className="relative mb-4">
                      <span className="absolute -top-2 -left-1 text-3xl text-gray-300">
                        "
                      </span>
                      <p className="text-gray-600 pl-4 pr-2">
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
                          className={`w-5 h-5 ${
                            star <= 4
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
                    <div className="bg-white rounded-lg shadow-md p-6 h-full border border-gray-200">
                      <div className="flex items-center mb-4">
                        {d.foto ? (
                          <img
                            src={d.foto}
                            alt={d.nome}
                            className="w-12 h-12 rounded-full mr-4 object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full mr-4 bg-gray-200 flex items-center justify-center">
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
                        <h3 className="text-lg font-semibold">{d.nome}</h3>
                      </div>

                      <div className="relative mb-4">
                        <span className="absolute -top-2 -left-1 text-3xl text-gray-300">
                          "
                        </span>
                        <p className="text-gray-600 pl-4 pr-2">{d.texto}</p>
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
                              className={`w-5 h-5 ${
                                star <= rating
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
        <section id="contato" className="py-20">
          <div className="container mx-auto px-4">
            {/* Título Centralizado */}
            <h2 className="text-4xl font-bold text-center mb-12">Contato</h2>

            {/* Itens aumentados e centralizados */}
            <div className="flex flex-wrap justify-center items-start gap-10">
              {/* E-mail */}
              <div className="flex flex-col items-center text-center w-40">
                <Mail className="w-7 h-7 mb-3 text-blue-600" />
                <p className="font-semibold text-lg">E-mail</p>
                <p className="text-base text-gray-600 mt-1.5">
                  {email || "contato@seudominio.com"}
                </p>
              </div>

              {/* Telefone */}
              <div className="flex flex-col items-center text-center w-40">
                <Phone className="w-7 h-7 mb-3 text-green-600" />
                <p className="font-semibold text-lg">Telefone</p>
                <p className="text-base text-gray-600 mt-1.5">
                  {telefone || "(11) 99999-0000"}
                </p>
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col items-center text-center w-40">
                <MessageCircle className="w-7 h-7 mb-3 text-green-500" />
                <p className="font-semibold text-lg">WhatsApp</p>
                <p className="text-base text-gray-600 mt-1.5">
                  {whatsapp || "(11) 98888-1111"}
                </p>
              </div>

              {/* Horários */}
              <div className="flex flex-col items-center text-center w-40">
                <Clock className="w-7 h-7 mb-3 text-pink-600" />
                <p className="font-semibold text-lg">Horário</p>
                <p className="text-base text-gray-600 mt-1.5">
                  {horarioSemana || "Seg-Sex: 09h-21h"}
                </p>
              </div>

              {/* Endereço */}
              <div className="flex flex-col items-center text-center w-40">
                <MapPin className="w-7 h-7 mb-3 text-purple-600" />
                <p className="font-semibold text-lg">Endereço</p>
                <p className="text-base text-gray-600 mt-1.5">
                  {endereco || "Rua Exemplo, 123"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <img
              src={config.logo || DEFAULT_LOGO_BRANCA}
              alt="Logo da Escola"
              className="transition-transform duration-300 group-hover:scale-105 max-w-[110px] h-auto"
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

          {/* Redes Sociais */}
          <div className="flex justify-center md:justify-start space-x-4 mb-4">
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

          <p className="mb-2 text-center md:text-left">
            © {new Date().getFullYear()} {siteTitle}. Todos os direitos
            reservados.
          </p>
          <p className="text-sm text-center md:text-left">
            Versão Gratuita – Edulinker
          </p>
        </div>
      </footer>
    </div>
  );
}
