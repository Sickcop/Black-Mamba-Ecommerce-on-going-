import dotenv from 'dotenv'

dotenv.config()

export const configDb = {
  host: process.env.HOST,
  user:  process.env.USER,
  port: 3306,
  password: 'JmHurtadoIs12*',
  database: 'mercado_libre'
}

console.log(configDb)