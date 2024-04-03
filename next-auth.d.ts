import { DefaultJWT } from '@auth/core/jwt'
import { DefaultSession } from 'next-auth'
import { UserRole } from '@prisma/client'

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole
  isTwoFactorEnabled: boolean
  isOAuth: boolean
}

declare module '@auth/core/types' {
  interface Session {
    user: ExtendedUser
  }
}

declare module '@auth/core/jwt' {
  interface JWT extends DefaultJWT {
    role: UserRole
    isTwoFactorEnabled: boolean
    isOAuth: boolean
  }
}
