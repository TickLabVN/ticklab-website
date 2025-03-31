import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProfileCard } from '@/components/ProfileCard'
import PageClient from './page.client'

async function MemberList() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'users',
    limit: 20,
    pagination: false,
  })
  console.log(result)

 
  const members = result.docs.map((user) => ({
    avatar: user.avatar?.url || '',
    name: user.name || '',
    role: user.role || '',
    // Use user.infomation?.position, or default to 'Software Engineer'
    position: user.infomation?.position || 'Software Engineer',
    major: user.infomation?.major || '',
    university: user.infomation?.university || '',
    slug: user.slug || '',
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
    <div className="container mx-auto px-4 py-8">
      <PageClient />
      {engineeringMembers.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Engineering</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {engineeringMembers.map((member) => (
              <ProfileCard key={member.slug} profile={member} />
            ))}
          </div>
        </section>
      )}

      {researchMembers.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Research</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {researchMembers.map((member) => (
              <ProfileCard key={member.slug} profile={member} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default MemberList
