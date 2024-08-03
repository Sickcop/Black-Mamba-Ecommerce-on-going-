import { ProductModel } from "../models/model.product.js";
import { validateProduct, validatePartialProduct } from "../schemes/scheme.js";

export class ProductController {
  static async getAll(req, res) {
    const products = await ProductModel.getAll();
    res.json(products);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const product = await ProductModel.getById({ id });

    if (product) return res.json(product);
    res.status(404).json({ message: 'Product not found' });
  }

  static async create(req, res) {
    const result = validateProduct({
      "name": "Sample Product",
      "description": "This is a description of the sample product.",
      "price": 199, 
      "stock": 150,
      "image_url": "https://smselectronic.com/wp-content/uploads/2023/05/SM-S918B_Black_01.jpg"
    });

    console.log(result)
    console.log(result.data)

    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }

    try {
      const newProduct = await ProductModel.create(result.data);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
