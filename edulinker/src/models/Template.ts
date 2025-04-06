import { Schema, model, models, Document } from 'mongoose'

export interface ITemplate extends Document {
  nome: string
  descricao: string
  exemploUrl: string
  configPadrao: string
  disponívelPara: string[] 
}

const TemplateSchema = new Schema<ITemplate>({
  nome: { type: String, required: true },
  descricao: { type: String },
  exemploUrl: { type: String, required: true },
  configPadrao: { type: String },
  disponívelPara: [{ type: String }]
})

const Template = models.Template || model<ITemplate>('Template', TemplateSchema)
export default Template