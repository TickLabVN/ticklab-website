import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText' // adjust import as needed
import { Project } from '@/payload-types' // adjust import as needed
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical' // adjust import as needed
import Link from 'next/link'
import { FiCalendar, FiUser } from 'react-icons/fi'

// Helper component for each project card
export const ProjectCardV = ({ project }: { project: Project }) => {
  // Get 2 first technologies
  const technologies = project.technologies?.slice(0, 2) || []

  if (typeof project.author == 'number') {
  }

  let authorName = 'Unknown'
  if (project.author != undefined && typeof project.author[0] == 'object') {
    authorName = project.author[0].name || ''
  }

  const formattedDate = project.updatedAt
    ? new Date(project.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : ''
  // Shorten description

  const details = (
    <div className="px-6 pb-4 md:py-2 flex-1">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 text-center">
        {project.title}
      </h3>
      <RichText data={project.description as DefaultTypedEditorState} enableGutter={false} />
      {technologies.length > 0 && (
        <div className="flex flex-wrap mt-2">
          {technologies.map((tech) => (
            <span
              key={tech.id}
              className="bg-green-700 text-white hover:bg-green-800 px-4 py-1 rounded-full text-sm font-semibold mr-2 mb-2"
            >
              {tech.technology}
            </span>
          ))}
        </div>
      )}

      {/* Author and Updated Date */}
      <div className="flex items-center justify-between space-x-6 mt-4 text-gray-500 text-sm">
        <div className="flex items-center">
          <FiCalendar className="h-5 w-5 mr-1" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <FiUser className="h-5 w-5 mr-1" />
          <span>{authorName}</span>
        </div>
      </div>
    </div>
  )

  const blogslug = typeof project.posts == 'object' ? project.posts?.slug : '#'

  const screenshot = project.image && (
    <div className="relative md:w-full h-[300px]  shadow-sm flex-1">
      {typeof project.image === 'object' && (
        <Image
          src={project.image.url || '/placeholder.svg'}
          alt={project.image.alt || 'Project Screenshot'}
          fill
          style={{ objectFit: 'cover' }}
          className={`shadow-lg rounded-t-xl `}
        />
      )}
    </div>
  )

  return (
    <div
      key={project.id}
      className={`flex  gap-4 items-center mt-8 border border-gray-200 shadow-lg rounded-xl flex-col w-full`}
    >
      <Link href={'/posts/' + blogslug} className="flex-1">
        <div className="w-full ">{screenshot}</div>
        <div className="w-full">{details}</div>
      </Link>
    </div>
  )
}
