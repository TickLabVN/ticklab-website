import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { CoreValue } from '@/blocks/CoreValue/Component'
import { FAQ } from '@/blocks/FAQ/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MissionSection } from '@/blocks/MissionSection/Component'
import { RoleSection } from '@/blocks/RoleSection/Component'
import { SliderSection } from '@/blocks/SliderSection/Component'
import { Team } from '@/blocks/Team/Component'

const blockComponents = {
  archive: ArchiveBlock,
  callToAction: CallToActionBlock,
  content: ContentBlock,
  coreValue: CoreValue,
  faq: FAQ,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  missionSection: MissionSection,
  roleSection: RoleSection,
  sliderSection: SliderSection,
  team: Team,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
