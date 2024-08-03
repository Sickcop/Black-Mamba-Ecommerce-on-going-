import { ProductModel } from "../models/model.product.js";

export class ProductController {
  static async getAll (req, res) {
    const products = await ProductModel.getAll()

    res.json(products)
  }

  static async getById (req, res) {
    const { id } = req.params
    const product = await ProductModel.getById({ id })

    if(product) return res.json(product)
    res.status(404).json({ message: 'Product not found' })
  }
}