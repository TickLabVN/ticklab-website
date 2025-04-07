import React from 'react'
import Image from 'next/image'
import { FaFileAlt, FaGithub, FaLinkedin } from 'react-icons/fa'
import PageClient from './page.client' // adjust the import path as needed
import RichText from '@/components/RichText'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Project, User } from '@/payload-types'
import { Media } from '@/payload-types'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { ProjectCard } from '@/components/ProjectCard'
import { PostCard } from '@/components/PostCard'
import { Post } from '@/payload-types'
import { MarkdownBlock } from '@/blocks/Markdown/Component'

type Args = {
  params: Promise<{ slug: string }>
}
export default async function MemberProfile({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'users',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    pagination: false,
  })

  const user: User | undefined = result.docs[0]
  if (!user) {
    return <div>User not found</div>
  }

  // You can now use the slug to query your data, etc.
  return (
    <div className="bg-white text-gray-800 font-sans mx-auto md:text-xl px-6 text-lg">
      <PageClient />

      {/* Hero / Intro Section */}
      <section className="my-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-8">
        {/* Profile Picture */}
        <div className="w-full sm:w-96 sm:h-96 rounded-xl overflow-hidden shadow">
          <Image
            width={960}
            height={960}
            src={typeof user.avatar == 'object' ? user.avatar?.url || '/placeholder.svg' : ''}
            alt={(user.avatar as Media)?.alt || 'Profile Photo'}
          />
        </div>
        {/* Intro Text */}
        <div className="flex-1 flex flex-col text-left gap-4">
          <RichText
            className="mx-0"
            data={user.about as DefaultTypedEditorState}
            enableGutter={false}
          />
          <div className="flex flex-wrap gap-4 text-sm md:text-lg">
            <a
              href={typeof user.information?.cv == 'object' ? user.information?.cv?.url || '#' : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-blue-700 transition-shadow shadow-md"
            >
              <FaFileAlt />
              <span>CV</span>
            </a>

            <a
              href={user.information?.github || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900 transition-shadow shadow-md"
            >
              <FaGithub />
              <span>GitHub</span>
            </a>
            <a
              href={user.information?.linkedin || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-900 transition-shadow shadow-md"
            >
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="my-12 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Projects</h2>
        {user.projects?.length === 0 ? (
          <p className="text-gray-700 text-lg">There are no projects now</p>
        ) : (
          <div>
            {user.projects?.map((project, index) => (
              <ProjectCard
                key={typeof project == 'object' ? project.id : '1'}
                project={project as Project}
                index={index}
              />
            ))}
          </div>
        )}
      </section>

      {/* Activities Section */}
      <section id="activities" className="max-w-7xl mx-auto py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Activities</h2>
        {user.activities?.length === 0 && (
          <p className="text-gray-700 text-lg">There are no activities now</p>
        )}
        <div className="space-y-8">
          {user.activities?.map((activity) => (
            <div key={activity.id}>
              <h3 className="text-xl font-semibold">
                <span className="font-bold">
                  {new Date(activity.date || '').toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                : {activity.title}
              </h3>
              <RichText
                data={activity.description as DefaultTypedEditorState}
                enableGutter={false}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="max-w-7xl mx-auto py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {user.blogs?.map((post) => {
            return <PostCard key={typeof post == 'object' ? post.id : '1'} post={post as Post} />
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto  py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact</h2>
        {user.contact == undefined ? (
          <p className="text-gray-700 text-lg">There is no contact now</p>
        ) : (
          <div>
            <p className="text-gray-700">
              Interested in collaborating or learning more about my work? Feel free to reach out:
            </p>
            <ul className="list-none mt-4 text-gray-700 space-y-2">
              <li>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${user.contact.email}`} className="text-blue-600 hover:underline">
                  {user.contact.email}
                </a>
              </li>
              <li>
                <strong>Phone:</strong> {user.contact.phone}
              </li>
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}
