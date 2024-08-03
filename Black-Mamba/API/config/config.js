import dotenv from 'dotenv'

dotenv.config({ path : '../.env' })

export const configDb = {
  host: process.env.HOST,
  user:  process.env.USER,
  port: process.env.PORTDB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}

console.log(configDb)