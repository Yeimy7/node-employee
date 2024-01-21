import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT ?? '3000'
// export const PORT_FRONT = process.env.PORT_FRONT ?? '5173'
export const DB_HOST = process.env.DB_HOST ?? 'localhost'
export const DB_USER = process.env.DB_USER ?? 'root'
export const DB_PASS = process.env.DB_PASS ?? ''
export const DB_DATABASE = process.env.DB_DATABASE ?? 'employeemanagement'
export const WORD_SECRET = process.env.WORD_SECRET ?? 'jupiter845'
export const WORD_SECRET_RESET = process.env.WORD_SECRET_RESET ?? 'jupiter845123'