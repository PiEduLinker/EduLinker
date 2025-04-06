import { Schema, model, models, Document } from 'mongoose'
import { ObjectId } from 'mongodb'

export interface IAssinatura extends Document {
  usuarioId: ObjectId
  plano: string
  valor: number
  dataInicio: Date
  dataExpiracao: Date
  status: string
}

const AssinaturaSchema = new Schema<IAssinatura>({
  usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  plano: { type: String, required: true },
  valor: { type: Number, required: true },
  dataInicio: { type: Date, default: Date.now },
  dataExpiracao: { type: Date, required: true },
  status: { type: String, default: 'ativa' }
})

const Assinatura = models.Assinatura || model<IAssinatura>('Assinatura', AssinaturaSchema)
export default Assinatura