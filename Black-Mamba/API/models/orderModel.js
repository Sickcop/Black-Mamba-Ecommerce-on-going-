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

export class OrderModel {
    static async getAllOrders() {
        try {
            const query = 'SELECT * FROM orders';
            const [rows] = await connection.query(query);
            return rows;
        } catch (error) {
            console.error('Error fetching orders from database:', error);
            throw error;
        }
    }

    // Crear una orden
    static async createOrder(userId, total, status) {
        try {
            const [result] = await connection.query(
                'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
                [userId, total, status]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }

    // Agregar un producto a una orden
    static async addProductToOrder(orderId, productId, quantity) {
        try {
            await connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)',
                [orderId, productId, quantity]
            );
        } catch (error) {
            console.error('Error adding product to order:', error);
            throw error;
        }
    }

    // Eliminar un producto de una orden
    static async removeProductFromOrder(orderId, productId) {
        try {
            await connection.query(
                'DELETE FROM order_items WHERE order_id = ? AND product_id = ?',
                [orderId, productId]
            );
        } catch (error) {
            console.error('Error removing product from order:', error);
            throw error;
        }
    }

    // Obtener todos los productos de una orden
    static async getOrderItems(orderId) {
        try {
            const [items] = await connection.query(
                'SELECT * FROM order_items WHERE order_id = ?',
                [orderId]
            );
            return items;
        } catch (error) {
            console.error('Error fetching order items:', error);
            throw error;
        }
    }
}


