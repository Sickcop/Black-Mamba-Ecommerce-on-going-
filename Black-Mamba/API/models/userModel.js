import mysql from 'mysql2/promise';
import { configDb } from '../config/config';

let connection;

async function initDbConnection() {
    if (!configDb){
        throw new Error('Database configuration is missing');
    }

    try{
        connection = await mysql.createConnection(configDb);
        console.log('Database connection established');
    } catch (error){
        console.error('Error connecting to the database:', error);
        throw error;
    }
    
}

await initDbConnection();

export class UserModel {
    static async getAll(){
        try{
            const [users] = await connection.query('SELECT * FROM users;');
            return users;
        } catch (error){
            console.error('Error fething users:', error);
            throw error;
        }
    }
    
    static async getById(id){
        try {
            const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);

            if(rows.length == 0) throw new Error('User not found');
            return rows[0];
        } catch (error){
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    static async create(userData){
        const { name, email } = userData;

        try{
            const [result] = await connection.query(
                'INSERT INTO USER (name, email) VALUES (?, ?)',
                [name, email]
            );
            return result.insertId;
        } catch (error){
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async update(id, userData){
        const { name, email } = userData;

        try{
            await connection.query(
                'UPDATE users SET name = ?, email = ? WHERE id = ?',
                [name, email, id]
            );
        } catch(error){
            console.error('Error updating user:', error);
            throw error;
        }
    }

    static async delete(id){
        try{
            await connection.query(
                'DELETE FROM users WHERE id = ?', [id]
            );
        } catch (error){
            console.error('Error deleting user:', error);
            throw error;
        }
    }
}
