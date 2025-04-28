import Assinatura from '@/models/Assinatura';
import Template from '@/models/Template';

export function validarTemplateNome(template: any): void {
  if (!template) {
    throw new Error('Template não encontrado.');
  }
}


export function validarTemplateDisponibilidade(template: any, tipoConta: string): void {
  if (!template.disponívelPara.includes(tipoConta)) {
    throw new Error(`O template "${template.nome}" não está disponível para sua conta (${tipoConta}).`);
  }
}


export async function buscarPlanoUsuario(usuarioId: string): Promise<string> {
  const assinaturaAtiva = await Assinatura.findOne({
    usuarioId,
    status: 'ativa',
    dataExpiracao: { $gte: new Date() } // Verifica se a assinatura ainda está válida
  });

  return assinaturaAtiva ? assinaturaAtiva.plano : 'gratuito';
}
