import mongoose, { Schema, Document, models } from 'mongoose'

export interface ITemplate extends Document {
  nome: string
  descricao: string
  categorias: string[]
  configuracoesPadrao: any
  ativo: boolean
  exemploUrl: string 
}

const TemplateSchema = new Schema<ITemplate>({
  nome: { type: String, required: true },
  descricao: { type: String },
  categorias: [String],
  configuracoesPadrao: { type: Schema.Types.Mixed },
  ativo: { type: Boolean, default: true },
  exemploUrl: { type: String, required: false } 
})

export default models.Template || mongoose.model<ITemplate>('Template', TemplateSchema)
