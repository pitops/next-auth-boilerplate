import * as z from 'zod'
import { UserRole } from '@prisma/client'

export const settingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.USER, UserRole.ADMIN]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8))
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false
      }

      return true
    },
    {
      message: 'New password is required!',
      path: ['newPassword']
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false
      }

      return true
    },
    {
      message: 'Password is required!',
      path: ['password']
    }
  )

export type SettingsSchema = z.infer<typeof settingsSchema>

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, 'Password is required'),
  code: z.optional(z.string())
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, 'Minimum 8 characters required'),
  name: z.string().min(1, { message: 'Name is required' })
})

export type RegisterSchema = z.infer<typeof registerSchema>

export const resetSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' })
})

export type ResetSchema = z.infer<typeof resetSchema>

export const newPasswordSchema = z.object({
  password: z.string().min(8, { message: 'Minimum of 8 characters required' })
})

export type NewPasswordSchema = z.infer<typeof newPasswordSchema>
