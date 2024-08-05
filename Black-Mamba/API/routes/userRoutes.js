import express from 'express';
import { UserController } from '../controllers/userController.js'; // Asegúrate de que el nombre coincida

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', UserController.getAll);

// Ruta para obtener un usuario por ID
router.get('/:id', UserController.getById);

// Ruta para crear un nuevo usuario
router.post('/', UserController.create);

// Ruta para actualizar un usuario por ID
router.put('/:id', UserController.update);

// Ruta para eliminar un usuario por ID
router.delete('/:id', UserController.delete);

export default router;
