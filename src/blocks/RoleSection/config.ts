import { Block } from "payload"

export const RoleSection: Block = {
  slug: "roleSection",
  labels: {
    singular: "Role Section",
    plural: "Role Sections",
  },
  fields: [
    {
      name: "engineeringTitle",
      type: "text",
      defaultValue: "ENGINEERING",
      required: true,
    },
    {
      name: "engineeringContent",
      type: "textarea",
      defaultValue: "Engineers at TickLab apply scientific and technical knowledge to solve real-world problems, considering safety, reliability, and cost-effectiveness. The focus is on providing a broad range of experiences across different engineering disciplines, rather than specializing in a single area early on. This includes various software development roles (Frontend, Backend, DevOps, Mobile) and hardware/IoT/logic design roles (Embedded Systems, Hardware Design, Digital IC Design).",
      required: true,
    },
    {
      name: "engineeringImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "researchTitle",
      type: "text",
      defaultValue: "RESEARCH",
      required: true,
    },
    {
      name: "researchContent",
      type: "textarea",
      defaultValue: "Researchers at TickLab are envisioned as future pioneers in science and technology, fostered within a professional research environment that values learning, practical application of theoretical knowledge, and contribution to both research and organizational development. The current research focus areas are Computer Vision, Reinforcement Learning, and Text-to-Speech.",
      required: true,
    },
    {
      name: "researchImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
}
