import express from 'express'
import { loginController } from '../controllers/controller.login'

const router = express().router

router.get('/login', loginController.searchUser)

export default loginRouter