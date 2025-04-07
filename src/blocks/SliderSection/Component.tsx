"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import type { Media } from "@/payload-types"

type Props = {
  title: string
  description: string
  slides: {
    title: string
    image: Media | undefined
  }[]
}

export const SliderSection: React.FC<Props> = ({ title, description, slides }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [key, setKey] = useState(0) // Used to reset animation

  // Only start animations after component is fully mounted and visible
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Handle infinite loop animation without using set()
  useEffect(() => {
    if (!isReady) return

    const interval = setInterval(() => {
      // Reset animation by changing the key, forcing a re-mount
      setKey(prev => prev + 1)
    }, 20000) // Slightly longer than animation duration

    return () => clearInterval(interval)
  }, [isReady])

  if (slides.length === 0) {
    return null
  }

  return (
    <section className="relative w-full py-8 overflow-hidden bg-white">
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-teal-100/20 to-transparent"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block rounded-full bg-[#E8F2EE] px-4 py-1.5 mb-4"
          >
            <span className="text-sm font-medium text-teal-800">OUR CONTRIBUTIONS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {description}
          </motion.p>
        </div>
      </div>

      <div ref={containerRef} className="relative h-[450px] mt-16 overflow-hidden">
        {isReady && (
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              className="absolute flex gap-4 px-8"
              style={{ width: `${slides.length * 470}px` }} // 450px width + 20px gap
              initial={{ x: "0%" }}
              animate={{ x: "-100%" }}
              transition={{
                duration: 20,
                ease: "linear",
                repeat: 0
              }}
            >
              {[...slides, ...slides].map((slide, index) => (
                <motion.div
                  key={index}
                  className="relative w-[450px] h-[400px] rounded-2xl overflow-hidden flex-shrink-0 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  {slide.image?.url ? (
                    <>
                      <Image
                        src={slide.image.url || "/placeholder.svg"}
                        alt={slide.image.filename || "Slide image"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-lg font-semibold line-clamp-2">{slide.title}</h3>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <p className="text-gray-500">Please upload an image</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}