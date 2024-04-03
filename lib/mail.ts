import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXT_PUBLIC_API_URL
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
  })
}

export const sendPasswordHasBeenChangedEmail = async (email: string) => {
  const resetLink = `${domain}/auth/reset-password`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Your password has been changed',
    html: `We would like to inform you that your password has been changed. If you did not request this change, please <a href="${resetLink}">reset your password</a> immediately.`
  })
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Your 2FA Code',
    html: `<p>Your 2FA code: ${token}</p>`
  })
}
