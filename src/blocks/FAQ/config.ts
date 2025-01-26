import { Block } from "payload"

export const FAQ: Block = {
  slug: "faq",
  interfaceName: "FAQBlock",
  labels: {
    singular: "FAQ Block",
    plural: "FAQ Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "Your Questions, Our Answers",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      defaultValue: "Quick insights into TickLab's structure, culture, and activities.",
      required: true,
    },
    {
      name: "questions",
      type: "array",
      required: true,
      minRows: 1,
      admin: {
        description: "Add FAQ questions and answers",
      },
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
        },
        {
          name: "answer",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
}
