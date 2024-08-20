import { LoginModel } from "../models/model.login"
import { validateUser } from '../schemes/scheme.user'

export class productController {
  static async searchUser(req, res) {

    try {
      const body = validateUser(req.body)
      const dataUser = await LoginModel(body.username, body.password)

      if (dataUser.length > 0) {
          return res.json(dataUser);
        }
        // Si no se encuentra el usuario, devolver un error 404
        res.status(404).json({ message: 'User not found' });
    } catch (error) {
      // Manejar cualquier error que ocurra en la validación o la búsqueda de usuario
      console.error('Error en la búsqueda del usuario:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}