import { Block } from "payload"

export const SliderSection: Block = {
  slug: "sliderSection",
  labels: {
    singular: "Slider Section",
    plural: "Slider Sections",
  },
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "What We've Achieved",
      required: true,
    },
    {
      name: "description",
      type: "text",
      defaultValue: "Showcasing Innovations and Milestones in Engineering and Research",
      required: true,
    },
    {
      name: "slides",
      type: "array",
      minRows: 1,
      maxRows: 4,
      required: true,
      defaultValue: [
        {
          title: "TICKIT: Digital system KIT for education",
          image: undefined,
        },
        {
          title: "TickLab Research Team's Paper Accepted at ACCV 2024: MonoDSSMs - Efficient Monocular 3D Object Detection with Depth-Aware State Space Models",
          image: undefined,
        },
        {
          title: "TickLab Research Team's Paper Accepted at RIVF 2023: MonoVINI: Seeing in the Dark with Virtual-World Supervision",
          image: undefined,
        },
        {
          title: "TickLab Research Team's Paper Accepted at RIVF 2023: MLDSE: Multi-task Learning for Depth Segmentation Estimation",
          image: undefined,
        },
      ],
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
}
