'use server'

import { newPasswordSchema, NewPasswordSchema } from '@/schemas'
import { getUserByEmail } from '@/services/user-service'
import { getPasswordResetTokenByToken } from '@/services/password-reset-service'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { sendPasswordHasBeenChangedEmail } from '@/lib/mail'

export const newPassword = async (
  values: NewPasswordSchema,
  token?: string | null
) => {
  if (!token) {
    return { error: 'Missing token!' }
  }
  const validatedFields = newPasswordSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid password!' }
  }

  const { password } = validatedFields.data
  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid token' }
  }

  const hasExpired = new Date() > new Date(existingToken.expires)
  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: {
      id: existingUser.id
    },
    data: { password: hashedPassword }
  })

  await db.passwordResetToken.delete({
    where: { id: existingToken.id }
  })

  await sendPasswordHasBeenChangedEmail(existingUser.email!)

  return { success: 'Password updated!' }
}
