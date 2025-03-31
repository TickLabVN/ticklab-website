'use client'

import React, { useState } from 'react'
import PageClient from './page.client'

interface Roadmap {
  id: string
  title: string
  description: string
  embedUrl: string
}

interface RoadmapListProps {
  roadmapData: Roadmap[]
}

const FullscreenModal: React.FC<{ roadmap: Roadmap | null; onClose: () => void }> = ({
  roadmap,
  onClose,
}) => {
  if (!roadmap) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* Optional: If PageClient is needed for client-only logic */}
      <PageClient />
      <div className="relative w-full h-full">
        <button
          onClick={onClose}
          className="absolute top-4 left-20 z-10 bg-red-600 text-white text-xl font-bold px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300"
        >
          Exit
        </button>
        <iframe
          src={roadmap.embedUrl}
          title={roadmap.title}
          className="w-full h-full border-0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

const RoadmapList: React.FC<RoadmapListProps> = ({ roadmapData }) => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null)

  return (
    <div className="min-h-screen scroll-smooth">
      <PageClient />

      <div className="py-12 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold ">Roadmaps</h1>
          <p className="mt-4 text-lg max-w-4xl mx-auto">
            Explore our curated roadmaps for Software Engineering, Hardware Engineering, and AI
            Research. Click a link below to jump to your area of interest.
          </p>
          <div className="mt-6 space-x-10">
            {roadmapData.map((roadmap) => (
              <a
                key={roadmap.id}
                href={`#${roadmap.id}`}
                className="inline-block text-xl font-bold bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors"
              >
                {roadmap.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap Sections */}
      {selectedRoadmap ? (
        <FullscreenModal roadmap={selectedRoadmap} onClose={() => setSelectedRoadmap(null)} />
      ) : (
        <div className="container mx-auto px-4 py-8 space-y-12">
          {roadmapData.map((roadmap) => (
            <section key={roadmap.id} id={roadmap.id} className="space-y-4">
              <h2 className="text-3xl font-bold ">{roadmap.title}</h2>
              <p className="text-lg text-gray-700">{roadmap.description}</p>
              <div className="w-full h-screen border border-gray-200 rounded-lg overflow-hidden shadow-md relative group">
                <iframe
                  src={roadmap.embedUrl}
                  title={roadmap.title}
                  className="w-full h-full border-0"
                  allowFullScreen
                ></iframe>
                <button
                  onClick={() => setSelectedRoadmap(roadmap)}
                  className="absolute bottom-5 right-5 bg-green-700 text-2xl text-white px-5 py-2 rounded "
                >
                  Fullscreen
                </button>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

export default RoadmapList
