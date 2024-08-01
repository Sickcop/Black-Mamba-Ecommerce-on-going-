import mysql from 'mysql2/promise'
import { configDb } from '../config/config.js'


const connection = await mysql.createConnection(configDb)

export class ProductModel {
  static async getAll () {
    const [products] = await connection.query('select * from products')

    return products
  }
}