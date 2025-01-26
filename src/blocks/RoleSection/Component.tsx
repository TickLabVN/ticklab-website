"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Code2, Microscope } from "lucide-react"
import Image from "next/image"
import type { Media } from "@/payload-types"

type Props = {
  engineeringTitle: string
  engineeringContent: string
  engineeringImage: Media
  researchTitle: string
  researchContent: string
  researchImage: Media
}

const HighlightedText: React.FC<{ text: string }> = ({ text }) => {
  const highlightPatterns = [
    {
      pattern: /(Frontend|Backend|DevOps|Mobile|Embedded Systems|Hardware Design|Digital IC Design)/g,
      className: "font-semibold text-teal-600",
    },
    {
      pattern: /(Computer Vision|Reinforcement Learning|Text-to-Speech)/g,
      className: "font-semibold text-blue-600",
    },
  ]

  let result = text
  highlightPatterns.forEach(({ pattern, className }) => {
    result = result.replace(pattern, `<span class="${className}">$&</span>`)
  })

  return <p className="text-gray-600 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: result }} />
}

const RoleCard: React.FC<{
  title: string
  content: string
  icon: React.ReactNode
  image: Media
  index: number
}> = ({ title, content, icon, image, index }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Ensure image URL exists and is a string
  const imageUrl = typeof image?.url === "string" ? image.url : ""

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } },
      }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="flex flex-col gap-6">
        <motion.div
          className="relative w-full h-[300px] rounded-2xl overflow-hidden bg-gray-100"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {imageUrl && <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />}
        </motion.div>

        <div className="flex items-start gap-6">
          <motion.div
            className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white text-2xl"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <div>
            <motion.h2
              className="text-2xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.h2>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <HighlightedText text={content} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const RoleSection: React.FC<Props> = ({
  engineeringTitle,
  engineeringContent,
  engineeringImage,
  researchTitle,
  researchContent,
  researchImage,
}) => {
  return (
    <section className="relative w-full py-8 overflow-hidden bg-gray-50">
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
        animate={{
          backgroundPosition: ["0px 0px", "24px 24px"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      ></motion.div>
      <div className="relative container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block px-4 py-2 bg-white rounded-full shadow-sm mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">WHAT WE DO</p>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Grow Your Potential
          </motion.h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <RoleCard
            title={engineeringTitle}
            content={engineeringContent}
            icon={<Code2 />}
            image={engineeringImage}
            index={0}
          />
          <RoleCard
            title={researchTitle}
            content={researchContent}
            icon={<Microscope />}
            image={researchImage}
            index={1}
          />
        </div>
      </div>
    </section>
  )
}
