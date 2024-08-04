import { ProductModel } from "../models/model.product.js";
import { validateProduct, validatePartialProduct } from "../schemes/scheme.js";

export class ProductController {
  static async getAll(req, res) {
    try {
      const products = await ProductModel.getAll();
      res.json(products)
    } catch (err) {
      console.error('Error getting data: ', err)
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    const product = await ProductModel.getById({ id });

    if (product) return res.json(product);
    res.status(404).json({ message: 'Product not found' });
  }

  static async create(req, res) {
    const result = validateProduct( req.body );

    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors })
    }

    try {
      const newProduct = await ProductModel.create(result.data);
      res.status(201).json(newProduct)
    } catch (error) {
      console.error('Error creating product:', error)
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateProduct (req, res) {
    const { id } = req.params

    const result = validatePartialProduct(req.body)

    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors })
    }

    try {
      const newPartialProduct = await ProductModel.updateProduct({ id, input: result.data });
      res.status(201).json(newPartialProduct)
    } catch (error) {
      console.error('Error creating product:', error)
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteProduct (req, res) {
    const { id } = req.params
    try {
      const products = await ProductModel.deleteProduct({ id });
      res.json(products)
    } catch (err) {
      console.error('Error getting data: ', err)
    }
  }
}
