import { insertUserSchema } from '@/db/models'
import { z } from 'zod'

export const createUserByCitySchema = z.object({
	cityId: z.number(),
	user: insertUserSchema,
})

export type CreateUserByCityType = z.infer<typeof createUserByCitySchema>
