import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { isAdmin } from '@/access/admin'
import { isMember } from '@/access/member'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: isMember,
    create: isAdmin,
    delete: isAdmin,
    read: authenticated,
    update: isAdmin,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { 'label': 'Admin', value: 'admin' },
        { 'label': 'Member', value: 'member' },
      ]
    }
  ],
  timestamps: true,
}
