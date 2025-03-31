import React from 'react'
import Image from 'next/image'
import { FaFileAlt, FaGithub, FaLinkedin } from 'react-icons/fa'
import PageClient from './page.client' // adjust the import path as needed
import RichText from '@/components/RichText'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { User } from '@/payload-types'
import { Media } from '@/payload-types'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

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
  console.log(result)

  const user: User | undefined = result.docs[0]
  if (!user) {
    return <div>User not found</div>
  }

  // You can now use the slug to query your data, etc.
  return (
    <div className="bg-white text-gray-800 font-sans mx-auto md:text-xl px-6 text-lg">
      <PageClient />

      {/* <PayloadRedirects disableNotFound url={url} /> */}

      {/* {draft && <LivePreviewListener />} */}

      {/* Hero / Intro Section */}
      <section className="my-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-8">
        {/* Profile Picture */}
        <div className="w-full sm:w-96 sm:h-96 rounded-xl overflow-hidden shadow">
          <Image
            width={960}
            height={960}
            src={(user.avatar as Media)?.url || '/default-avatar.jpg'}
            alt={(user.avatar as Media)?.alt || 'Profile Photo'}
          />
        </div>
        {/* Intro Text */}
        <div className="flex-1 flex flex-col text-left gap-4">
          <RichText
            className="mx-0"
            data={user.bio as DefaultTypedEditorState}
            enableGutter={false}
          />
          <div className="flex flex-wrap gap-4 text-sm md:text-lg">
            <a
              href={user.infomation?.cv?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-blue-700 transition-shadow shadow-md"
            >
              <FaFileAlt />
              <span>CV</span>
            </a>

            <a
              href={user.infomation?.github || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900 transition-shadow shadow-md"
            >
              <FaGithub />
              <span>GitHub</span>
            </a>
            <a
              href={user.infomation?.linkedin || '#'}
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
        {user.projects?.length === 0 && (
          <p className="text-gray-700 text-lg">There are no projects now</p>
        )}
        <div>
          {user.projects?.map((project, index) => (
            <div
              key={project.id}
              className={`flex gap-4 items-center mt-8 border border-gray-100 rounded-xl animate__animated animate__fadeInUp ${
                (index + 1) % 2 === 1 ? 'flex-col-reverse md:flex-row' : 'flex-col md:flex-row'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {(index + 1) % 2 === 1 ? (
                <>
                  {/* Project Details */}
                  <div className="px-6 pb-4 md:py-2 flex-1">
                    <h3 className="text-xl md:text-3xl font-semibold text-gray-900 mb-4">
                      {project.title}
                    </h3>
                    <RichText
                      data={project.description as DefaultTypedEditorState}
                      enableGutter={false}
                    />
                  </div>
                  {/* Project Screenshot */}
                  {project.image && (
                    <a
                      href={project.link || ''}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Image
                        width={800}
                        height={600}
                        src={project.image.url}
                        alt={project.image.alt}
                        className="w-full max-h-md h-auto rounded-t-lg md:rounded-r-lg md:rounded-l-none shadow-lg"
                      />
                    </a>
                  )}
                </>
              ) : (
                <>
                  {/* Project Screenshot */}
                  {project.image && (
                    <a
                      href={project.link || ''}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Image
                        width={800}
                        height={600}
                        src={project.image.url}
                        alt={project.image.alt}
                        className="w-full max-h-md h-auto rounded-t-lg md:rounded-l-lg md:rounded-r-none shadow-lg"
                      />
                    </a>
                  )}
                  {/* Project Details */}
                  <div className="px-6 pb-4 md:py-2 flex-1">
                    <h3 className="text-xl md:text-3xl font-semibold text-gray-900 mb-4">
                      {project.title}
                    </h3>
                    <RichText
                      data={project.description as DefaultTypedEditorState}
                      enableGutter={false}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
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
                  {new Date(activity.date).toLocaleDateString('en-US', {
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
        {user.blog && user.blog.length > 0 ? (
          <div className="prose max-w-none">
            {user.blog.map((blogItem, idx) => (
              <p key={idx}>
                {blogItem?.root.children
                  .map((child) => child.children?.map((c) => c.text).join(' ') || '')
                  .join(' ')}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 text-lg">There is no blog now</p>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto  py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact</h2>
        {user.contact == undefined && (
          <p className="text-gray-700 text-lg">There is no contact now</p>
        )}
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
      </section>
    </div>
  )
}
