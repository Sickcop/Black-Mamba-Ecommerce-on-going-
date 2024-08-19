import z from 'zod'

export const UserSchema = z.object({
  name: z.string(),
  password: z.string()
  })

export function validateUser(object) {
  return UserSchema.safeParse(object)
}

export function validatePartialUser(object) {
  return UserSchema.partial().safeParse(object)
}