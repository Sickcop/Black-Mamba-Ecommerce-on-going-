import express from 'express';
import OrderController from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.get('/', OrderController.getAllOrders);

// Crear una orden
orderRouter.post('/', OrderController.createOrder);

// Agregar un producto a una orden
orderRouter.post('/:orderId/products', OrderController.addProductToOrder);

// Eliminar un producto de una orden
orderRouter.delete('/:orderId/products/:productId', OrderController.removeProductFromOrder);

// Obtener todos los productos de una orden
orderRouter.get('/:orderId/products', OrderController.getOrderItems);

export default orderRouter;




