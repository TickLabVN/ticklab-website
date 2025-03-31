import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText' // adjust import as needed

// Helper component for each project card
export const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const details = (
    <div className="px-6 pb-4 md:py-2 flex-1">
      <h3 className="text-xl md:text-3xl font-semibold text-gray-900 mb-4 text-center">
        {project.title}
      </h3>
      <RichText data={project.description} enableGutter={false} />
    </div>
  )

  const screenshot = project.image && (
    <a href={project.link || ''} target="_blank" rel="noopener noreferrer" className="flex-1">
      <div className="relative w-full h-[250px] md:h-[500px] shadow-lg">
        <Image
          src={project.image.url}
          alt={project.image.alt}
          fill
          style={{ objectFit: 'cover' }}
          className={`shadow-lg ${
            (index + 1) % 2 === 1
              ? 'rounded-t-xl md:rounded-r-xl md:rounded-l-none'
              : 'rounded-t-xl md:rounded-l-xl md:rounded-r-none'
          }`}
        />
      </div>
    </a>
  )

  return (
    <div
      key={project.id}
      className={`flex gap-4 items-center mt-8 border border-gray-200 shadow-lg rounded-xl flex-col md:flex-row`}
    >
      {(index + 1) % 2 === 1 ? (
        <>
          {details}
          {screenshot}
        </>
      ) : (
        <>
          {screenshot}
          {details}
        </>
      )}
    </div>
  )
}
