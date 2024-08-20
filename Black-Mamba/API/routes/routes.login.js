import express from 'express'
import { loginController } from '../controllers/controller.login.js'

const loginRouter = express.Router()

loginRouter.get('/login', loginController.searchUser)

export default loginRouter