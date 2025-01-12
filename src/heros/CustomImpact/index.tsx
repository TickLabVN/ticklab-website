'use client'

import React from 'react'
import { getClientSideURL } from '@/utilities/getURL'
import Image from 'next/image'
import { motion } from 'framer-motion'

export const CustomImpactHero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={`${getClientSideURL()}/media/ticklab-background.png`}
          alt="Dashboard Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Background Pattern */}
      <div className="absolute inset-0 w-full h-full">
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#009485]/5 to-[#009485]/10"></div>

        {/* Curved shapes */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-0 right-0 w-full h-full"
          >
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full opacity-[0.07]"
            >
              <path d="M0,0 C30,40 70,40 100,0 L100,100 L0,100 Z" fill="url(#gradient1)" />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#009485" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute top-0 right-0 w-full h-full"
          >
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full opacity-[0.05]"
            >
              <path d="M0,100 C30,60 70,60 100,100 L100,0 L0,0 Z" fill="url(#gradient2)" />
              <defs>
                <linearGradient id="gradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#009485" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        {/* Animated glass effects */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-gradient-to-br from-white/10 to-[#009485]/10 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-gradient-to-bl from-white/10 to-[#009485]/10 rounded-full blur-3xl"
          />
        </div>

        {/* Dynamic lines */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,148,133,0.03)_50%,transparent_75%)] bg-[length:600px_600px]"
          />
          <motion.div
            initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_25%,rgba(0,148,133,0.03)_50%,transparent_75%)] bg-[length:600px_600px]"
          />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full bg-white/90 px-4 text-sm"
          >
            <span className="text-emerald-700">Start here, go anywhere</span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-800 to-blue-900">
              TickLab
            </h1>
            <p className="mx-auto max-w-[800px] text-lg md:text-xl text-gray-600">
              We are a career and resource development organization dedicated to supporting and
              nurturing students who aspire to create a positive impact in their communities.{' '}
            </p>{' '}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
    </section>
  )
}
