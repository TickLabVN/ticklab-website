"use client"

import type React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

type Props = {
  visionTitle: string
  visionContent: string
  missionTitle: string
  missionContent: string
}

const Title: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
  <p
    className={`font-bold font-geist tracking-wide ${className}`}
    style={{
      color: "#26A69A",
      top: "15%",
      fontSize: "4rem",
      textShadow: `
        2px 2px 0 #00796B,
        -1px -1px 0 #00796B,
        1px -1px 0 #00796B,
        -1px 1px 0 #00796B,
        1px 1px 0 #00796B,
        3px 3px 6px rgba(0,0,0,0.2)
      `,
    }}
  >
    {text}
  </p>
)

const HighlightedText: React.FC<{ text: string }> = ({ text }) => {
  const highlightPatterns = [
    {
      pattern: /(human resource|career development|significant contributions|valuable asset|creating value|effective solutions|scientific and technical|world powers)/g,
      className: "font-semibold text-blue-600"
    },
    {
      pattern: /(pioneers|building the nation|shared aspirations|goals|sufficient qualities|enthusiasm|courage|pioneering force)/g,
      className: "font-bold underline decoration-teal-400 decoration-2"
    },
    {
      pattern: /Talent without virtue is useless, virtue without talent makes everything difficult/g,
      className: "font-semibold text-teal-700 italic block whitespace-pre-line text-center"
    }
  ]

  let result = text
  highlightPatterns.forEach(({ pattern, className }) => {
    result = result.replace(pattern, `<span class="${className}">$&</span>`)
  })

  return <p className="text-gray-600 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: result }} />
}

const ContentCard: React.FC<{ emoji: string; title: string; content: string; index: number }> = ({
  emoji,
  title,
  content,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300"
  >
    <div className="flex items-center gap-4 mb-6">
      <span className="text-4xl">{emoji}</span>
      <h2 className="text-[1.5rem] font-bold text-gray-800">{title}</h2>
    </div>
    <HighlightedText text={content} />
  </motion.div>
)

export const MissionSection: React.FC<Props> = ({ visionTitle, visionContent, missionTitle, missionContent }) => {
  const visionParagraphs = visionContent.split("\n\n")
  const missionParagraphs = missionContent.split("\n\n")

  return (
    <section className="relative w-full pt-16 overflow-hidden bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h1
          className="text-center font-bold font-geist mb-16"
          style={{
            fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
            background: "linear-gradient(to right, #00796B, #26A69A, #4DB6AC)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Our Vision & Mission
        </h1>
      </motion.div>

      <div className="relative container mx-auto px-4 space-y-16">
        {/* Vision Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Vision Title Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden"
          >
            <Image src="/media/vision.png" alt="Vision" fill className="object-cover brightness-100" />
            <div className="absolute inset-0">
              <div className="relative h-full flex items-center">
                <Title text={visionTitle} className="absolute right-[32%] top-[15%] transform -rotate-6" />
              </div>
            </div>
          </motion.div>

          {/* Vision Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {visionParagraphs.map((paragraph, index) => (
              <ContentCard
                key={index}
                emoji={index === 0 ? "⚡️" : "🎯"}
                title={index === 0 ? "Character Development" : "National Impact"}
                content={paragraph}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        {/* Mission Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Mission Content Column - Order swapped on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 order-2 md:order-1"
          >
            {missionParagraphs.map((paragraph, index) => (
              <ContentCard
                key={index}
                emoji={index === 0 ? "🌱" : "🚀"}
                title={index === 0 ? "Growth Environment" : "Pioneer Development"}
                content={paragraph}
                index={index}
              />
            ))}
          </motion.div>

          {/* Mission Title Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden order-1 md:order-2"
          >
            <Image src="/media/mission.png" alt="Mission" fill className="object-cover brightness-100" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Title text={missionTitle} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}