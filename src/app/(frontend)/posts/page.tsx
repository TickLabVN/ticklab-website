import type { Metadata } from 'next/types'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 2, // Increased depth to get author information
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      authors: true,
      populatedAuthors: true,
      publishedAt: true,
    },
  })

  return (
    <div className="pt-12 pb-24 bg-gray-50 dark:bg-gray-900">
      <PageClient />
      <div className="container mb-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">TickLab Blog - Latest Insights & Tutorials</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore the latest articles, tutorials, and insights from TickLab on software development, technology trends, and best practices.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.docs?.map((post, index) => {
            if (typeof post === 'object' && post !== null) {
              // Calculate reading time (approx 200 words per minute)
              const description = post.meta?.description || ''
              const wordCount = description.split(/\s+/).length
              const readingTime = Math.max(Math.ceil(wordCount / 200), 5) // Minimum 5 minutes

              // Format date
              const publishDate = post.publishedAt ? new Date(post.publishedAt) : null
              const formattedDate = publishDate ?
                publishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''

              // Get author
              const authorName = post.populatedAuthors && post.populatedAuthors[0]?.name || 'Duy Vu'
              console.log(post)

              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    {post.meta?.image && typeof post.meta.image !== 'number' && (
                      <img
                        src={post.meta.image.url || undefined}
                        alt={post.title || 'Blog post'}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    {post.categories && post.categories.length > 0 && typeof post.categories[0] === 'object' && (
                      <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {post.categories[0].title}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                      <a href={`/posts/${post.slug}`}>{post.title}</a>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.meta?.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-200 mr-3">
                          {authorName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{authorName}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{readingTime} mins</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          })}
        </div>
      </div>

      <div className="container mt-12">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `TickLab Blog - Latest Insights & Tutorials`,
    description: 'Explore the latest articles, tutorials, and insights from TickLab on software development, technology trends, and best practices.',
  }
}