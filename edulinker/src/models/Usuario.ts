import { Schema, model, models, Document } from 'mongoose'

export interface IUsuario extends Document {
  nome: string
  email: string
  senha: string
  dataCriacao: Date
}

const UsuarioSchema = new Schema<IUsuario>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  dataCriacao: { type: Date, default: Date.now }
})

const Usuario = models.Usuario || model<IUsuario>('Usuario', UsuarioSchema)
export default Usuario