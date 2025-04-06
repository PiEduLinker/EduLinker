import mongoose, { Schema, Document, models } from 'mongoose'

export interface IAssinatura extends Document {
  usuario: mongoose.Types.ObjectId
  ativa: boolean
  plano: 'mensal' | 'anual'
  inicio: Date
  fim: Date
  idTransacao: string 
}

const AssinaturaSchema = new Schema<IAssinatura>({
  usuario: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  ativa: { type: Boolean, default: true },
  plano: { type: String, enum: ['mensal', 'anual'], required: true },
  inicio: { type: Date, required: true },
  fim: { type: Date, required: true },
  idTransacao: { type: String, required: true }
})

export default models.Assinatura || mongoose.model<IAssinatura>('Assinatura', AssinaturaSchema)
