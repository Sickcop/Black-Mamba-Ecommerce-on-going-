import mysql from 'mysql2/promise';
import { configDb } from '../config/config.js';

let connection;

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

  static async getById({ id }) {
    try {
      const [rows] = await connection.query('SELECT * FROM products WHERE product_id = ?', [id]);
      if (rows.length === 0) throw new Error('Product not found');
      return rows[0];
    } catch (error) {
      console.error('Error fetching product:', error);

      return { message: 'not found' };

    }
  } 

  static async create({ name, description, price, stock, image_url }) {
    try {
      const [result] = await connection.query(
        'INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)',
        [name, description, price, stock, image_url]
      );
      return { id: result.insertId, name, description, price, stock, image_url };
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  static async updateProduct({ id, input }) {
    const keys = Object.keys(input);
    const values = Object.values(input);
    const setClause = keys.map(key => `${key} = ?`).join(', ');

    try {
      await connection.query(`UPDATE products SET ${setClause} WHERE product_id = ?`, [...values, id]);
      return { id, ...input };
    } catch (error) {
      console.error('Error updating product: ', error);
      throw error;
    }
  }

  static async deleteProduct({ id }) {
    try {
      const [rowDeleted] = await connection.query('DELETE FROM products WHERE product_id = ?;', [id]);
      return rowDeleted;
    } catch (error) {
      console.error('Error deleting product: ', error);
      throw error;
    }
  }
}
