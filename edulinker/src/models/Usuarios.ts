import mongoose, { Schema, Document, models } from 'mongoose'

export interface IUsuarios extends Document {
  nome: string
  email: string
  senha: string
  tipoDeConta: 'gratuita' | 'premium'
  criadoEm: Date
}

const UssuariosSchema = new Schema<IUsuarios>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipoDeConta: { type: String, enum: ['gratuita', 'premium'], default: 'gratuita' },
  criadoEm: { type: Date, default: Date.now }
})

export default models.User || mongoose.model<IUsuarios>('User', UssuariosSchema)