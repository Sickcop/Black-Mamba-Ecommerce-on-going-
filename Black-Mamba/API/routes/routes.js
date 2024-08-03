import { Router } from 'express'
import { ProductController } from '../controllers/controller.product.js'

const router = Router()

router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getById)

export default router