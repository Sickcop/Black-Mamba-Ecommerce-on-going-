import dotenv from 'dotenv'

dotenv.config({ path : '../.env' })

export const configDb = {
  host: process.env.HOST,
  user:  process.env.USER,
  port: 3306,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}

console.log(configDb)