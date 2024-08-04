import express from 'express';
import { UserController } from '../controllers/userController.js';

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/users', UserController.getAll);

// Ruta para obtener un usuario por ID
router.get('/users/:id', UserController.getById);

// Ruta para crear un nuevo usuario
router.post('/users', UserController.create);

// Ruta para actualizar un usuario por ID
router.put('/users/:id', UserController.update);

// Ruta para eliminar un usuario por ID
router.delete('/users/:id', UserController.delete);

export default router;
