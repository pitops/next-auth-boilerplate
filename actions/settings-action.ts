'use server'

import { SettingsSchema } from '@/schemas'
import { currentUser } from '@/lib/current-user'
import { getUserByEmail, getUserById } from '@/services/user-service'
import { db } from '@/lib/db'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'
import bcrypt from 'bcryptjs'

export const updateSettingsAction = async (values: SettingsSchema) => {
  const user = await currentUser()

  if (!user) {
    return { error: 'Unauthorized!' }
  }

  const dbUser = await getUserById(user.id!)

  if (!dbUser) {
    return { error: 'Unauthorized!' }
  }

  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  if (values.email && values.email !== dbUser.email) {
    const existingUser = await getUserByEmail(values.email)

    if (existingUser && existingUser.id !== dbUser.id) {
      return { error: 'Email already in use!' }
    }

    const verificationToken = await generateVerificationToken(values.email)

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    // TODO check this why we return here
    return { success: 'Verification email sent!' }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    )

    if (!passwordsMatch) {
      return { error: 'Incorrect password!' }
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10)
    values.password = hashedPassword
    values.newPassword = undefined
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: { ...values }
  })

  return { success: 'Settings updated!' }
}
