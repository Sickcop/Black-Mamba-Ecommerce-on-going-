import express from 'express';
import { getHome } from '../controllers/homeController.js'; // Importa el controlador

const router = express.Router();

// Define la ruta home
router.get('/', getHome);

export default router;

