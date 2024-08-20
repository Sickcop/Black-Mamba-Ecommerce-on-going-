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

export class LoginModel {

  static async searchUser(username, password) {
    
    try {
      const [dbData] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password])
      return dbData
    } catch (error) {
      console.error('Error buscando el usuario:', error)
      throw error
    }
  }

}