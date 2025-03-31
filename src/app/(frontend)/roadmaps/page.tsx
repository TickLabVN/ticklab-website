// This file does NOT include "use client" at the top
import React from 'react'
import RoadmapList from './RoadmapList.client' // Adjust the import path as necessary

export default function RoadmapPage() {
  // Define your roadmap data (or fetch from an API)
  const roadmapData = [
    {
      id: 'software-engineering',
      title: 'Software Engineering Roadmap',
      description:
        'This roadmap outlines the skills and technologies required to become a proficient software engineer, including frontend, backend, DevOps, and more.',
      embedUrl: 'https://roadmap.sh/r/embed?id=67eaa84b08b58aed6ce1cdc9', // Replace with your actual embed URL
    },
    {
      id: 'hardware-engineering',
      title: 'Hardware Engineering Roadmap',
      description:
        'This roadmap provides a guide for hardware engineering, covering digital circuits, embedded systems, microcontrollers, and hardware design.',
      embedUrl: 'https://roadmap.sh/r/embed?id=67eaa84b08b58aed6ce1cdc9', // Replace with actual embed URL
    },
    {
      id: 'ai-research',
      title: 'AI Research Roadmap',
      description:
        'Explore the roadmap for AI research that includes machine learning, deep learning, computer vision, and natural language processing.',
      embedUrl: 'https://roadmap.sh/r/embed?id=67eaa84b08b58aed6ce1cdc9', // Replace with actual embed URL
    },
  ]

  return (
    <div>
      {/* Pass the roadmap data to the client component */}
      <RoadmapList roadmapData={roadmapData} />
    </div>
  )
}
