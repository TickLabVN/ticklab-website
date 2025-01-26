import { Block } from "payload"

export const CoreValue: Block = {
  slug: "coreValue",
  labels: {
    singular: "Core Value Section",
    plural: "Core Value Sections",
  },
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "CORE VALUES",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      defaultValue: "Our core values define our identity and drive our actions. They reflect our commitment to excellence, integrity, collaboration, innovation, and growth. These values form the foundation of our culture and guide our decisions every day.",
      required: true,
    },
    {
      name: "values",
      type: "array",
      required: true,
      defaultValue: [
        {
          title: "Taking individuals as the cornerstone of development",
          icon: "UserSquare2"
        },
        {
          title: "Comprehensive human development",
          icon: "Users"
        },
        {
          title: "Respect moral values",
          icon: "Heart"
        },
        {
          title: "Tradition of \"when drinking water, remember its source\"",
          icon: "Droplets"
        },
        {
          title: "Professional orientation",
          icon: "Compass"
        },
        {
          title: "Balance individual benefits and organization benefits",
          icon: "Scale"
        },
        {
          title: "Placing emphasis on innovation and creativity",
          icon: "Lightbulb"
        }
      ],
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "icon",
          type: "text",
          required: true,
        }
      ]
    }
  ],
}
