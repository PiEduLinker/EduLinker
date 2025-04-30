import { Schema, model, models, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface ISite extends Document {
  usuarioId: ObjectId;
  slug: string; 
  descricao: string;
  tema: string;
  logo: string;
  status: string;
  dataCriacao: Date;
  configuracoes: any;
  templateOriginalId?: ObjectId;
}

const SiteSchema = new Schema<ISite>({
  usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  slug: { type: String, required: true, unique: true }, 
  descricao: { type: String },
  tema: { type: String },
  logo: { type: String },
  status: { type: String, default: 'ativo' },
  dataCriacao: { type: Date, default: Date.now },
  configuracoes: { type: Schema.Types.Mixed, required: true },
  templateOriginalId: { type: Schema.Types.ObjectId, ref: 'Template' }
});


const Site = models.Site || model<ISite>('Site', SiteSchema);
export default Site;
