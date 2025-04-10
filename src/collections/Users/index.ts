import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { isAdmin } from '@/access/admin'
import { isMember } from '@/access/member'
import { BlocksFeature, FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Markdown } from '@/blocks/Markdown/config'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: isMember,
    create: isMember,
    delete: isAdmin,
    read: authenticated,
    update: isMember,
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
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      //required: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'about',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            BlocksFeature({ blocks: [Markdown]})
          ]
        },
      }),
      label: 'About',
    },
    {
      name: 'information',
      type: 'group',
      // Contain: gitgithub, linkedin, phone, email, major, university
      fields: [
        {
          name: 'github',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'major',
          type: 'text',
        },
        {
          name: 'position',
          type: 'text',
        },
        {
          name: 'university',
          type: 'text',
        },
        {
          name: 'cv',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
    },
    {
      name: 'activities',
      type: 'array',
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
          name: 'date',
          type: 'date',
        },
      ],
    },
    {
      name: 'blogs',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
      ],
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Member', value: 'member' },
      ],
      required: true,
      defaultValue: 'member',
    },
  ],
  timestamps: true,
}
