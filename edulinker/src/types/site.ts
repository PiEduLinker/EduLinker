export interface SiteConfig {
  titulo: string
  sobre: string
  descricao: string
  fotoSobre?: string
  corFundo: string
  corTexto: string
  fonte: string
  logo: string
  contato?: {
    horarioSemana?: string
    horarioSabado?: string
    whatsapp?: string
    mapEmbedUrl?: string
    descricaoBreve?: string
    email?: string
    telefone?: string
    cidade?: string
    endereco?: string
    socialMedia?: {
      facebook?: string
      instagram?: string
      youtube?: string
    }
  }
  destaques?: Array<{ number: string; label?: string }>
  carrossel?: Array<{ imagem: string; }>
  galerias?: Array<{ imagem: string }>
  aulas?: Array<{
    foto: string; titulo: string; descricao: string; nivel: string
    duracao: string
  }>
  professores?: Array<{ imagem: string; nome: string; descricao: string; }>
  depoimentos?: Array<{ foto: string; nome: string; texto: string, estrelas?: 1 | 2 | 3 | 4 | 5 }>
}


