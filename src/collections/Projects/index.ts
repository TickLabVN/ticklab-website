import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { isAdmin } from '@/access/admin'
import { isMember } from '@/access/member'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
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
      name: 'description',
      type: 'richText',
    },
    {
      name: 'link',
      type: 'text',
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
      name: 'catogory',
      type: 'select',
      options: [
        {
          label: 'WebDevelopment',
          value: 'webdevelopment',
        },
        {
          label: 'Mobile',
          value: 'mobile',
        },
        {
          label: 'AI',
          value: 'ai',
        },
        {
          label: 'ML',
          value: 'ml',
        },
        {
          label: 'Blockchain',
          value: 'blockchain',
        },
      ],
      required: true,
      defaultValue: 'webdevelopment',
    },
  ],
  timestamps: true,
}
