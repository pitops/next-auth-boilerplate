'use client'

import React from 'react'
import { UserInfo } from '@/components/user-info'
import { useCurrentUser } from '@/hooks/use-current-user'

const ClientPage = () => {
  const user = useCurrentUser()
  return <UserInfo label="Server component" user={user} />
}

export default ClientPage
