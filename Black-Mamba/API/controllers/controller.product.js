import { ProductModel } from "../models/model.product.js";
//import { validateProduct, validatePartialProduct } from "../schemes/scheme.js";

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

  static async create (req, res) {
    const body = req.body

    console.log(body)

    // if(body.error) {
    //   return res.status(400).json({ error: JSON.parse(body.error.message) })
    // }

    const newProduct = await ProductModel.create({input: body})

    res.status(201).json(newProduct)
  }
}