import { currentRole } from '@/lib/current-role'
import { UserRole } from '@prisma/client'

export async function GET() {
  const role = await currentRole()

  if (role === UserRole.ADMIN) {
    return new Response(null, { status: 200 })
  }
  return new Response(null, { status: 403 })
}
