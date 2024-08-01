import { Router } from 'express'
import { ProductController } from '../controllers/controller.js'

const router = Router()

router.get('/', ProductController.getAll)

export default router