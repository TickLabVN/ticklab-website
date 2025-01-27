"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { format } from "date-fns"
import type { Media } from "@/payload-types"
import { Button } from "@/components/ui/button"

type Author = {
  name: string
  avatar: Media
}

type Post = {
  id?: string
  image: Media
  category: string
  title: string
  description: string
  author: Author
  publishedDate: string
  readTime: string
}

type Props = {
  title?: string
  description?: string
  posts?: Post[]
}

export const Blog: React.FC<Props> = ({ title, description, posts = [] }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const MotionButton = motion(Button)

  return (
    <section className="relative w-full py-8 overflow-hidden bg-white">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {title}
          </motion.h2>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {posts.map((post, index) => (
            <motion.article
              key={post.id || index}
              className="relative overflow-hidden group"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 70,
                    damping: 20,
                  },
                },
              }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-[2fr,3fr] gap-8 items-center">
                <motion.div
                  className="relative aspect-[3/2] rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                >
                  {post.image?.url && (
                    <Image
                      src={post.image.url || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  )}
                </motion.div>
                <div>
                  <motion.div
                    className="flex items-center gap-2 mb-4"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-400 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-gray-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">{post.description}</p>
                  <motion.div
                    className="flex items-center gap-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {post.author.avatar?.url && (
                      <Image
                        src={post.author.avatar.url || "/placeholder.svg"}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{post.author.name}</p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(post.publishedDate), "MMMM d, yyyy")} • {post.readTime} read
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <MotionButton
            className="!bg-[#B4CFBB] !hover:bg-[#9DC1A6] text-black rounded-full px-12 py-6 text-lg font-medium transition-all duration-300 hover:shadow-lg"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            Read all our blogs
          </MotionButton>
        </motion.div>
      </div>
    </section>
  )
}
