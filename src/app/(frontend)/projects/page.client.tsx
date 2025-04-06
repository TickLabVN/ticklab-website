'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useEffect } from 'react'
const FilterButtons: React.FC = () => {
  const router = useRouter()
  const filters = ['All', 'Web', 'AI', 'Mobile']

  const handleFilter = (filter: string) => {
    router.push('/projects?category=' + filter)
  }

  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  return (
    <div className="flex space-x-4 justify-center mb-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilter(filter)}
          className="inline-block text-lg font-semibold bg-green-700 text-white px-4 py-1 rounded-full hover:bg-green-800 transition-colors"
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default FilterButtons
