import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Variável de ambiente MONGODB_URI não está definida.')
} 

let cached = (global as any).mongoose || { conn: null, promise: null }

export async function connectToDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'EduLinker',
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}