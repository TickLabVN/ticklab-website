import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProjectCard } from '@/components/ProjectCard'
import { Project } from '@/payload-types'
import PageClient from './page.client'

// Hero section component
function HeroSection() {
  return (
    <div className="py-12 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Organization Projects</h1>
      <p className="text-lg md:text-xl max-w-4xl mx-auto">
        Explore our portfolio of innovative projects that drive success and make a meaningful
        impact. Each project reflects our commitment to excellence and growth.
      </p>
    </div>
  )
}

type Args = {
  searchParams: Promise<{ category: string }>
}

// Main Projects page component (server-side rendered)
export default async function Projects({ searchParams: searchParamsPromise }: Args) {
  const payload = await getPayload({ config: configPromise })
  //const filters = buildFilters(searchParams)
  const { category } = await searchParamsPromise
  console.log(category)
  let error = false

  const capitalizedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : undefined

  const where =
    capitalizedCategory && capitalizedCategory !== 'All'
      ? {
          or: [{ category: { equals: capitalizedCategory } }],
        }
      : undefined

  let result
  try {
    result = await payload.find({
      collection: 'projects',
      pagination: false,
      where: where,
    })
  } catch (err) {
    console.error('Error fetching projects:', err)
    error = true
  }

  // Destructure the docs array from the result
  const projects: Project[] = !error && result ? result.docs : []

  return (
    <div className="mb-20 min-h-screen flex flex-col max-w-[1400px] mx-auto text-gray-800">
      <HeroSection />
      <PageClient />

      {/* Projects Grid */}
      <div className="px-4">
        {projects.length === 0 || error ? (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">No Projects Found</h2>
            <p className="text-lg text-gray-600">Please check back later for updates.</p>
          </div>
        ) : (
          projects.map((project: Project, index: number) => (
            <ProjectCard key={project.id} index={index} project={project} />
          ))
        )}
      </div>
    </div>
  )
}
