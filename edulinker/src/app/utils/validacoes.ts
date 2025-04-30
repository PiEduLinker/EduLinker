import Assinatura from '@/models/Assinatura'
import Template, { ITemplate } from '@/models/Template'

export function validarTemplateNome(template: ITemplate | null): void {
  if (!template) {
    throw new Error('Template não encontrado.')
  }
}

export function validarTemplateDisponibilidade(template: ITemplate, tipoConta: string): void {
  if (!template.disponívelPara.includes(tipoConta)) {
    throw new Error(`O template "${template.nome}" não está disponível para sua conta (${tipoConta}).`)
  }
}

export async function buscarPlanoUsuario(usuarioId: string): Promise<string> {
  const assinatura = await Assinatura.findOne({
    usuarioId,
    status: 'ativa',
    dataExpiracao: { $gte: new Date() }
  })

  return assinatura?.plano ?? 'gratuito'
}
