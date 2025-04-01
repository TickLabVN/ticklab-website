import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText' // adjust import as needed
import { Project } from '@/payload-types' // adjust import as needed
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical' // adjust import as needed
import Link from 'next/link'

// Helper component for each project card
export const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const details = (
    <div className="px-6 pb-4 md:py-2 flex-1">
      <h3 className="text-xl md:text-3xl font-semibold text-gray-900 mb-4 text-center">
        {project.title}
      </h3>
      <RichText data={project.description as DefaultTypedEditorState} enableGutter={false} />
      {project.technologies && project.technologies.length > 0 && (
        <div className="flex flex-wrap mt-4">
          {project.technologies.map((tech) => (
            <span
              key={tech.id}
              className="bg-green-700 text-white hover:bg-green-800 px-4 py-1 rounded-full text-sm font-semibold mr-2 mb-2"
            >
              {tech.technology}
            </span>
          ))}
        </div>
      )}
    </div>
  )

  const screenshot = project.image && (
    <Link href={'/posts/' + project.slug} className="flex-1">
      <div className="relative md:w-full h-[300px] sm:h-[500px] shadow-lg">
        {typeof project.image === 'object' && (
          <Image
            src={project.image.url || '/placeholder.svg'}
            alt={project.image.alt || 'Project Screenshot'}
            fill
            style={{ objectFit: 'cover' }}
            className={`shadow-lg ${
              (index + 1) % 2 === 1
                ? 'rounded-t-xl md:rounded-r-xl md:rounded-l-none'
                : 'rounded-t-xl md:rounded-l-xl md:rounded-r-none'
            }`}
          />
        )}
      </div>
    </Link>
  )
  if (index % 2 == 0) {
    return (
      <div
        key={project.id}
        className={`flex  gap-4 items-center mt-8 border border-gray-200 shadow-lg rounded-xl flex-col-reverse md:flex-row w-full`}
      >
        <div className="w-full">{details}</div>
        <div className="w-full ">{screenshot}</div>
      </div>
    )
  } else {
    return (
      <div
        key={project.id}
        className={`flex gap-4 items-center mt-8 border border-gray-200 shadow-lg rounded-xl flex-col md:flex-row w-full`}
      >
        <div className="w-full">{screenshot}</div>
        <div className="w-full">{details}</div>
      </div>
    )
  }
}
