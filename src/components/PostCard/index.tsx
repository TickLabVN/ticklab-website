import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiCalendar, FiUser } from 'react-icons/fi'
import RichText from '@/components/RichText' // Adjust import if necessary
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export const PostCard = ({ post }: { post: any }) => {
  // Extract the featured image from meta
  const image = post.meta?.image

  // Format the published date (e.g., "Apr 01, 2025")
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : ''

  // Get the first author's name or default to "Unknown Author"
  const authorName =
    post.authors && Array.isArray(post.authors) && post.authors.length > 0
      ? post.authors[0].name || 'Unknown Author'
      : 'Unknown Author'

  // Details Section
  const details = (
    <div className="px-4 py-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
      {post.description && (
        <RichText data={post.description as DefaultTypedEditorState} enableGutter={false} />
      )}

      {/* Author and Published Date */}
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

  // Image Section (maintains a 16:9 aspect ratio)
  const screenshot = image && (
    <div className="relative w-full aspect-[16/12]">
      <Image
        src={image.url || '/placeholder.svg'}
        alt={image.alt || 'Post Image'}
        fill
        className="object-cover rounded-t-xl"
      />
    </div>
  )

  return (
    <div
      key={post.id}
      className="border border-gray-200 shadow-lg rounded-xl w-full overflow-hidden"
    >
      <Link href={'/posts/' + post.slug} className="block">
        {screenshot}
        {details}
      </Link>
    </div>
  )
}
