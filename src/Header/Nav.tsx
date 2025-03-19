'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-8 items-center justify-center w-full">
      {navItems.map(({ link, subMenu }, i) => {
        return subMenu && subMenu.length > 0 ? (
          <HoverCard key={i} openDelay={0}>
            <HoverCardTrigger>
              <Button
                className='text-base hover:text-teal-700 flex items-center hover:no-underline'
                size={'clear'}
                variant={'link'}
              >
                {link.label}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent align="start" className="flex flex-col gap-2 p-4 min-w-36 max-w-44 rounded-md">
              {subMenu.map((subLink, j) => (
                <CMSLink
                  key={j}
                  {...subLink.link}
                  appearance="link"
                  className="text-base hover:text-teal-700"
                />
              ))}
            </HoverCardContent>
          </HoverCard>
        ) : (
          <CMSLink key={i} {...link} appearance="link" className="text-base hover:text-teal-700" />
        )
      })}
    </nav>
  )
}
