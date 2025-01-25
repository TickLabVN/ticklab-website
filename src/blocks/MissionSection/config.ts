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
      defaultValue: `To become a good starting point for the process of cultivating morality, enhancing capabilities, and developing the qualities of outstanding Vietnamese individuals. This is what sets the organization apart. "Talent without virtue is useless, virtue without talent makes everything difficult." TickLab always adheres to this saying, aiming for an environment that fosters comprehensive development in both character and ability.

To become a human resource and career development organization that makes significant contributions to the nation's building and innovation. Each individual originating from TickLab will be a valuable asset, creating value for the community, contributing effective solutions to the country's scientific and technical problems, and raising the nation's position to be on par with world powers.`,
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
      defaultValue: `To establish, maintain, and develop a comprehensive development environment for generations of students. TickLab will always be a human development organization. Each member of the organization must always preserve and promote traditional values, not lose the organization's original essence, and not allow the organization to be corrupted by bad intentions or personal gain.

To seek and nurture suitable students with the potential to become pioneers in building the nation. This is a mission for the community, the nation, and the people. TickLab always welcomes generations of students with shared aspirations, goals, sufficient qualities, enthusiasm, and courage to cultivate themselves together, achieve great things, and become a pioneering force in the country's development.`,
      required: true,
    },
  ],
};
