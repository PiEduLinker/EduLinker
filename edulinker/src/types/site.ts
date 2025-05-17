export interface SiteConfig {
    sobre:        string
    titulo:       string
    descricao:    string
    corFundo:     string
    corTexto:     string
    logo:         string
    carrossel?:   Array<{ imagem: string; link?: string }>
    galerias?:    Array<{ imagem: string }>
    aulas?:       Array<{ foto: string; titulo: string }>
    professores?: Array<{ foto: string; texto: string }>
    depoimentos?: Array<{ foto: string; nome: string; texto: string }>
    contato?:     { texto: string; imagem: string }
  }