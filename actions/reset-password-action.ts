'use server'

import { resetSchema, ResetSchema } from '@/schemas'
import { getUserByEmail } from '@/services/user-service'
import { generatePasswordResetToken } from '@/lib/tokens'
import { sendPasswordResetEmail } from '@/lib/mail'

export const resetPassword = async (values: ResetSchema) => {
  const validatedFields = resetSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid email!' }
  }

  const { email } = validatedFields.data
  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'Email not found!' }
  }

  const passwordResetToken = await generatePasswordResetToken(
    existingUser.email!
  )
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )

  return { success: 'Reset email sent!' }
}
