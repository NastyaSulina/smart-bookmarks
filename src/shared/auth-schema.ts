import { z } from 'zod'

export const authSchema = z.object({
    email: z.email({ message: 'Invalid email address' }).trim(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }).trim(),
})
