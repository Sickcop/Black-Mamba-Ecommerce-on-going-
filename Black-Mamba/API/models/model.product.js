import mysql from 'mysql2/promise'
import { configDb } from '../config/config.js'

let connection

async function initDbConnection() {
  if (!configDb) {
    throw new Error('Database configuration is missing');
  }

  try {
    connection = await mysql.createConnection(configDb);
    console.log('Database connection established');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; 
  }
}

await initDbConnection();

export class ProductModel {
  static async getAll() {
    try {
      const [products] = await connection.query('SELECT * FROM products;');
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error; 
    }
  }

  static async getById ({ id }) {
    try {
      const [rows] = await connection.query('SELECT * FROM products WHERE product_id = ?', [id])
      
      if(rows.length === 0)  throw new Error('Product not found M')
      return rows[0]

    } catch (error) { 
      console.error('Error fetching product:', error)
      return { message: 'not found'}
    }
  } 

  static async create ({ input }) {

    // if (!input) {
    //   throw new Error('Input object is required');
    // }

    const {
      name,
      description,
      price,
      stock,
      img_url
    } = input

    try {
      await connection.query('insert into products (name, description, price, stock, img_url) values (?, ?, ?, ?, ?)', [name,description, price, stock, img_url])
      return console.log('product created')
    } catch (error) { console.error('Error creating product:', error)
      return { message: 'not found'} }
  }
}