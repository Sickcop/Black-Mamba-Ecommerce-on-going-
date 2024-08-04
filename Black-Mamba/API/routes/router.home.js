import { Router } from "express";
import { ProductController } from '../controllers/controller.product.js'

const homeRouter = Router()

homeRouter.get('/', ProductController.getAll)

export default homeRouter