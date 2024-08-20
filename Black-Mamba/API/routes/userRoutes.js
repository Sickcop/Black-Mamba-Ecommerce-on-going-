import express from 'express';
import { UserController } from '../controllers/userController.js'; // Asegúrate de que el nombre coincida

const UserRouter = express.Router();

// Ruta para obtener todos los usuarios
UserRouter.get('/', UserController.getAll);

// Ruta para obtener un usuario por ID
UserRouter.get('/:id', UserController.getById);

// Ruta para crear un nuevo usuario
UserRouter.post('/', UserController.create);

// Ruta para actualizar un usuario por ID
UserRouter.put('/:id', UserController.update);

// Ruta para eliminar un usuario por ID
UserRouter.delete('/:id', UserController.delete);

export default UserRouter;
