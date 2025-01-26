"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

type Props = {
  title?: string
  description?: string
  questions?: {
    id?: string
    question: string
    answer: string
  }[]
}

export const FAQ: React.FC<Props> = ({
  title = "Your Questions, Our Expertise",
  description = "Find quick answers to common questions about our services, integrations, and benefits.",
  questions = []
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section className="relative w-full py-8 overflow-hidden bg-white">
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]"
        style={{ backgroundSize: "32px 32px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-sm font-medium text-gray-600 uppercase tracking-wider mb-4 bg-white rounded-full shadow-lg px-4 py-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            FAQ
          </motion.span>
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>

        <motion.div
          className="max-w-4xl mx-auto space-y-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {questions.map((item, index) => (
            <motion.div
              key={item.id || index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.1,
                  },
                },
              }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {item.question}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
