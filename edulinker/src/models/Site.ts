import mongoose, { Schema, Document, models } from 'mongoose'

export interface ISite extends Document {
  usuario: mongoose.Types.ObjectId
  template: mongoose.Types.ObjectId
  nome: string
  configuracoes: any 
  publicado: boolean
  criadoEm: Date
}

const SiteSchema = new Schema<ISite>({
  usuario: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  template: { type: Schema.Types.ObjectId, ref: 'Template', required: true },
  nome: { type: String, required: true },
  configuracoes: { type: Schema.Types.Mixed }, 
  publicado: { type: Boolean, default: false },
  criadoEm: { type: Date, default: Date.now }
})

export default models.Site || mongoose.model<ISite>('Site', SiteSchema)