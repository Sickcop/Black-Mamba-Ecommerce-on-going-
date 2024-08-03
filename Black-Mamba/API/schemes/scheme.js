import z from 'zod'
import { decimalWithTwoPlaces } from '../utils/utils.js'

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: decimalWithTwoPlaces,
  stock: z.int(),
  img_url: z.string().url({
    message: 'img must be a vlaid URL'
  })
})

export function validateProduct (object) {
  return productSchema.safeparse(object)
}


export function validatePartialProduct (object) {
  return productSchema.partia().safeparse(object)
}