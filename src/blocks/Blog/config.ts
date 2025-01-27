import { Block } from "payload"

export const Blog: Block = {
  slug: "blog",
  interfaceName: "BlogBlock",
  labels: {
    singular: "Blog Block",
    plural: "Blog Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "Our Blogs",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      defaultValue: "Explore the Latest in TickLab Development, Integration, and Innovation",
      required: true,
    },
    {
      name: "posts",
      type: "array",
      required: true,
      minRows: 1,
      admin: {
        description: "Add blog posts",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "category",
          type: "text",
          required: true,
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
        {
          name: "author",
          type: "group",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
            },
            {
              name: "avatar",
              type: "upload",
              relationTo: "media",
              required: true,
            }
          ]
        },
        {
          name: "publishedDate",
          type: "date",
          required: true,
        },
        {
          name: "readTime",
          type: "text",
          required: true,
        }
      ],
    },
  ],
}
