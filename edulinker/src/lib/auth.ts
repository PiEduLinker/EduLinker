import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SALT_ROUNDS = 10
const SECRET_KEY = process.env.JWT_SECRET

if (!SECRET_KEY) {
  throw new Error('JWT_SECRET não está definida nas variáveis de ambiente.')
}

// Criptografar a senha
export const hashPassword = (senha: string) => bcrypt.hash(senha, SALT_ROUNDS)

// Comparar senha com hash
export const comparePassword = (senha: string, hash: string) => bcrypt.compare(senha, hash)

// Gerar um token JWT
export const generateToken = (payload: object) =>
  jwt.sign(payload, SECRET_KEY as string, { expiresIn: '7d' })

// Verificar e decodificar um token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, SECRET_KEY as string)
  } catch (error) {
    return null
  }
}

// Extrai userId (ou outra claim) de um token válido
export function getUserIdFromToken(token: string): string | null {
  const payload = verifyToken(token)
  if (
    payload &&
    typeof payload === 'object'
  ) {
    // aceita tanto userId quanto id
    const uid = (payload as any).userId ?? (payload as any).id
    return uid ? String(uid) : null
  }
  return null
}