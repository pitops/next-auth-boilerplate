'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RoleGate } from '@/components/auth/role-gate'
import { UserRole } from '@prisma/client'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { admin } from '@/actions/admin-action'

const AdminPage = () => {
  const onServerActionClick = async () => {
    const isAdmin = await admin()

    if (isAdmin.success) {
      toast.success('Allowed Server Action')
    } else {
      toast.error('Forbidden Server Action')
    }
  }
  const onApiRouteClick = async () => {
    const response = await fetch('/api/admin')

    if (response.ok) {
      toast.success('Allowed API route')
    } else {
      toast.error('Forbidden API route')
    }
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRoles={[UserRole.ADMIN]}>
          <FormSuccess message="You are an admin!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only server action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminPage
