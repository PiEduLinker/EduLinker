import { Schema, model, models, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface ISite extends Document {
  usuarioId: ObjectId;
  slug?: string; 
  descricao?: string;
  tema?: string;
  logo?: string;
  status: 'BASIC_INFO' | 'PLAN_SELECTION' | 'TEMPLATE_SELECTION' | 'COMPLETED';
  dataCriacao: Date;
  configuracoes: any;
  templateOriginalId?: ObjectId;
}

const SiteSchema = new Schema<ISite>({
  usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  slug:    { type: String, unique: true, sparse: true },
  descricao: String,
  tema:      String,
  logo:      String,
  status: {
    type: String,
    enum: ['BASIC_INFO','PLAN_SELECTION','TEMPLATE_SELECTION','COMPLETED'],
    default: 'BASIC_INFO',
  },
  dataCriacao:    { type: Date, default: Date.now },
  configuracoes:  { type: Schema.Types.Mixed, default: {} },   // default vazio
  templateOriginalId: { type: Schema.Types.ObjectId, ref: 'Template' }
});

const Site = models.Site || model<ISite>('Site', SiteSchema);
export default Site;