import { OrderModel } from '../models/orderModel.js';

class OrderController {
    // Crear una orden para un usuario
    static async createOrder(req, res) {
        try {
            const { userId, total, status } = req.body;
            if (!userId || total === undefined || !status) {
                return res.status(400).json({ error: 'User ID, total, and status are required' });
            }

            const orderId = await OrderModel.createOrder(userId, total, status);
            res.status(201).json({ orderId });
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ error: 'Failed to create order' });
        }
    }

    static async getAllOrders(req, res) {
        try {
            const orders = await OrderModel.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Failed to fetch orders' });
        }
    }

    // Agregar un producto a una orden
    static async addProductToOrder(req, res) {
        try {
            const { orderId } = req.params;
            const { productId, quantity } = req.body;
            if (!productId || !quantity) {
                return res.status(400).json({ error: 'Product ID and quantity are required' });
            }

            await OrderModel.addProductToOrder(orderId, productId, quantity);
            res.status(200).json({ message: 'Product added to order' });
        } catch (error) {
            console.error('Error adding product to order:', error);
            res.status(500).json({ error: 'Failed to add product to order' });
        }
    }

    // Eliminar un producto de una orden
    static async removeProductFromOrder(req, res) {
        try {
            const { orderId, productId } = req.params;

            await OrderModel.removeProductFromOrder(orderId, productId);
            res.status(200).json({ message: 'Product removed from order' });
        } catch (error) {
            console.error('Error removing product from order:', error);
            res.status(500).json({ error: 'Failed to remove product from order' });
        }
    }

    // Obtener todos los productos de una orden
    static async getOrderItems(req, res) {
        try {
            const { orderId } = req.params;
            const items = await OrderModel.getOrderItems(orderId);
            res.status(200).json(items);
        } catch (error) {
            console.error('Error fetching order items:', error);
            res.status(500).json({ error: 'Failed to fetch order items' });
        }
    }
}

export default OrderController;

