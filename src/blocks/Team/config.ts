import { Block } from "payload"

export const Team: Block = {
  slug: "team",
  interfaceName: "TeamBlock",
  labels: {
    singular: "Team Block",
    plural: "Team Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "OUR TEAMS",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      defaultValue: "Meet our passionate team members who drive innovation and excellence across different projects and initiatives.",
      required: true,
    },
    {
      name: "photos",
      type: "array",
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
        description: "Add team photos with captions",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
          required: true,
        },
      ],
    },
  ],
}
