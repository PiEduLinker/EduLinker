import { gerarHtmlGratuito } from './templates/gerarHtmlGratuito';
import { gerarHtmlPremium } from './templates/gerarHtmlPremium';

const templatesSuportados = ['gratuito', 'premium'];

export function gerarHtml(config: any, templateNome: string): string {
  const nome = templateNome.toLowerCase();

  if (!templatesSuportados.includes(nome)) {
    throw new Error(`Template "${templateNome}" não é suportado.`);
  }

  switch (nome) {
    case 'premium':
      return gerarHtmlPremium(config);
    case 'gratuito':
    default:
      return gerarHtmlGratuito(config);
  }
}
