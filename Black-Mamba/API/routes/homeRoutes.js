import express from 'express';
import { getHome } from '../controllers/homeController.js'; // Importa el controlador

const homeRouter = express.Router();

// Define la ruta home
homeRouter.get('/', getHome);

export default homeRouter;

