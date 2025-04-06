import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;
const SECRET_KEY = process.env.JWT_SECRET || 'secreta';

export const hashPassword = (senha: string) => bcrypt.hash(senha, SALT_ROUNDS);
export const comparePassword = (senha: string, hash: string) => bcrypt.compare(senha, hash);

export const generateToken = (payload: object) =>
  jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });