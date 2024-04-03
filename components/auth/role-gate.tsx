import React from 'react'
import { UserRole } from '@prisma/client'
import { useCurrentRole } from '@/hooks/use-current-role'
import { FormError } from '@/components/form-error'

interface RoleGateProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
}

export const RoleGate: React.FC<RoleGateProps> = ({
  children,
  allowedRoles
}) => {
  const role = useCurrentRole()

  if (!allowedRoles.includes(role)) {
    return (
      <FormError message="you do not have permission to view this content!" />
    )
  }

  return <>{children}</>
}
