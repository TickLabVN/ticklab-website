import type { Block } from 'payload'

export const Equation: Block = {
  slug: 'equation',
  interfaceName: 'EquationBlock',
  fields: [
    {
      name: 'equation',
      type: 'text',
      label: false,
      required: true,
    },
  ],
}
