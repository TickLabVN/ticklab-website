import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { isAdmin } from '@/access/admin'
import { isMember } from '@/access/member'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    admin: isAdmin,
    create: isMember,
    delete: isAdmin,
    read: authenticated,
    update: isMember,
  },
  admin: {
    defaultColumns: ['title', 'catogory'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'link',
      type: 'text',
    },
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [
        {
          name: 'technology',
          type: 'text',
        },
      ],
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Web',
          value: 'Web',
        },
        {
          label: 'Mobile',
          value: 'Mobile',
        },
        {
          label: 'AI',
          value: 'AI',
        },
        {
          label: 'Machine Learning',
          value: 'Machine Learning',
        },
        {
          label: 'Blockchain',
          value: 'Blockchain',
        },
      ],
      required: true,
      defaultValue: 'Web',
    },
  ],
  timestamps: true,
}
