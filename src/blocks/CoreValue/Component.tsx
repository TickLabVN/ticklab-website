"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { UserSquare2, Users, Heart, Droplets, Compass, Scale, Lightbulb } from "lucide-react"

type Props = {
  title: string
  description: string
  values: {
    title: string
    icon: string
  }[]
}

const IconMap: Record<string, React.ElementType> = {
  UserSquare2,
  Users,
  Heart,
  Droplets,
  Compass,
  Scale,
  Lightbulb,
}

const CoreValueCard: React.FC<{
  title: string
  icon: string
  index: number
}> = ({ title, icon, index }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const Icon = IconMap[icon] || UserSquare2

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
      }}
      className="flex flex-col items-center text-center p-6"
    >
      <motion.div
        className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-600 to-teal-500 flex items-center justify-center mb-4 shadow-lg shadow-teal-200/50"
        whileHover={{
          scale: 1.1,
          rotate: 360,
          boxShadow: "0 0 25px rgba(20, 184, 166, 0.5)",
        }}
        transition={{
          duration: 0.5,
          rotate: { duration: 0.5 },
          boxShadow: { duration: 0.2 },
        }}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
      <motion.h3
        className="text-lg font-semibold text-gray-800 mt-2 max-w-[250px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      >
        {title}
      </motion.h3>
    </motion.div>
  )
}

export const CoreValue: React.FC<Props> = ({ title, description, values }) => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section className="relative w-full py-16 overflow-hidden bg-[#f1f7f4]">
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
      <div className="container mx-auto px-4" ref={containerRef}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {title}
            <motion.div
              className="h-1 bg-gradient-to-r from-teal-600 to-teal-500 mx-auto mt-4"
              initial={{ width: 0 }}
              animate={isInView ? { width: "8rem" } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {description}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
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
          {values.map((value, index) => (
            <CoreValueCard key={index} title={value.title} icon={value.icon} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
