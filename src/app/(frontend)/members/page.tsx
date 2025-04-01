import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProfileCard, Profile } from '@/components/ProfileCard'
import PageClient from './page.client'

// Customized Hero Section for Introducing Members
function HeroSection() {
  return (
    <div className="py-12 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold  mb-4">Meet Our Team</h1>
      <p className="text-lg md:text-xl max-w-4xl mx-auto">
        Discover the dedicated professionals behind our success. Our diverse team of engineers and
        researchers works tirelessly to drive innovation and deliver exceptional solutions.
      </p>
    </div>
  )
}

export default async function MemberList() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'users',
    limit: 20,
    pagination: false,
  })
  console.log(result)

  // export interface Profile {
  //   avatar: string
  //   name: string
  //   role: string
  //   position: string
  //   major: string
  //   university: string
  //   slug: string
  // }

  const members: Profile[] = result.docs.map((user) => ({
    avatar: typeof user.avatar === 'object' ? (user.avatar?.url ?? '') : '',
    name: user.name ?? '',
    role: user.role ?? '',
    position: user.infomation?.position ?? 'Software Engineer',
    major: user.infomation?.major ?? '',
    university: user.infomation?.university ?? '',
    slug: user.slug ?? '',
  }))

  const engineeringMembers = members.filter(
    (member) =>
      member.position.toLowerCase().includes('engineer') ||
      member.position.toLowerCase().includes('engineering'),
  )
  const researchMembers = members.filter((member) =>
    member.position.toLowerCase().includes('research'),
  )

  return (
    <div className="min-h-screen flex flex-col max-w-5xl mx-auto text-gray-800 ">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10 flex-1">
        <PageClient />

        {/* Engineering Section */}
        {engineeringMembers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Engineering Team</h2>
            <p className="text-gray-600 mb-6">
              Meet our dedicated engineers who bring ideas to life and ensure that our projects run
              smoothly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {engineeringMembers.map((member) => (
                <ProfileCard key={member.slug} profile={member} />
              ))}
            </div>
          </section>
        )}

        {/* Research Section */}
        {researchMembers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Research Team</h2>
            <p className="text-gray-600 mb-6">
              Our research experts explore new frontiers, innovate solutions, and advance
              technologies for the future.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {researchMembers.map((member) => (
                <ProfileCard key={member.slug} profile={member} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TickLab. All rights reserved.
      </footer>
    </div>
  )
}
