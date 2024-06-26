import { useSession } from 'next-auth/react'
import { UserRole } from '@prisma/client'

export const useCurrentRole = () => {
  const session = useSession()
  return session?.data?.user?.role ?? UserRole.USER
}
