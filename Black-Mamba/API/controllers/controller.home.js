import { ProductModel } from "../models/model.product.js";

export class ProductController {
  static async getAll (req, res) {
    
    const products = await ProductModel.getAll()

    res.json(products)
  }
}