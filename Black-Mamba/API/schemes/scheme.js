import z, { number } from 'zod'
//import { decimalWithTwoPlaces } from '../utils/utils.js'

const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: number().int(),
  stock: z.number().int().positive(),
  img_url: z.string().url({
    message: 'img must be a vlaid URL'
  })
})

export function validateProduct (object) {
  return productSchema.safeParse(object)
}


export function validatePartialProduct (object) {
  return productSchema.partial().safeParse(object)
}