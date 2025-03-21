import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const isMember: isAuthenticated = ({ req: { user } }) => {
  return user?.role === 'member' || user?.role === 'admin'
}
