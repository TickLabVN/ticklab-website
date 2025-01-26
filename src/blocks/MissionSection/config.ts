import type { Block } from 'payload'

export const MissionSection: Block = {
  slug: 'missionSection',
  labels: {
    singular: 'Mission Section',
    plural: 'Mission Sections',
  },
  fields: [
    {
      name: 'visionTitle',
      type: 'text',
      defaultValue: 'Vision',
      required: true,
    },
    {
      name: 'visionContent',
      type: 'textarea',
      defaultValue: `To become a good launcher for the process of moral cultivation, skill building and training of the excellent Vietnamese human qualities. Talent without virtue is useless, virtue without talent makes everything difficult

To develop resources and contribute to the country's construction and renovation, fostering individuals who create value, solve challenges, and elevate the nation's global standing.`,
      required: true,
    },
    {
      name: 'missionTitle',
      type: 'text',
      defaultValue: 'Mission',
      required: true,
    },
    {
      name: 'missionContent',
      type: 'textarea',
      defaultValue: `To establish, maintain, and develop a comprehensive development environment for generations of students. TickLab will always be a human development organization.

To seek and nurture students with the potential to become pioneers in building the nation. TickLab always welcomes generations of students with shared aspirations, goals, sufficient qualities, enthusiasm, and courage to cultivate themselves together, achieve great things, and become a pioneering force in the country's development.`,
      required: true,
    },
  ],
};
