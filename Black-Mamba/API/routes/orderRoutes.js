import express from 'express';
import OrderController from '../controllers/orderController.js';

const router = express.Router();

router.get('/', OrderController.getAllOrders);

// Crear una orden
router.post('/', OrderController.createOrder);

// Agregar un producto a una orden
router.post('/:orderId/products', OrderController.addProductToOrder);

// Eliminar un producto de una orden
router.delete('/:orderId/products/:productId', OrderController.removeProductFromOrder);

// Obtener todos los productos de una orden
router.get('/:orderId/products', OrderController.getOrderItems);

export default router;




