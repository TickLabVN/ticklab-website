import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
// Define the shape of our profile data
interface Profile {
  avatar: string
  name: string
  role: string
  position: string
  major: string
  university?: string
  slug: string
}

// Props for the ProfileCard
interface ProfileCardProps {
  profile: Profile
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="w-72 relative border border-gray-200 rounded-2xl shadow-sm p-5 flex flex-col items-center bg-white ">
      <span className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-blue-600 border border-blue-600 rounded-full">
        {profile.role}
      </span>
      <div className="w-40 h-40 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 text-5xl">
        {/* Simple placeholder icon */}
        <span>👤</span>
      </div>
      {/* Role Tag (e.g., "Member") */}
      {/* Name & Position */}
      <h2 className="mt-4 text-2xl font-bold text-gray-800 text-center">{profile.name}</h2>
      <p className="text-lg text-blue-600 font-medium">{profile.position}</p>
      {/* Major / Department */}
      <p className="mt-1 text-sm text-gray-600 text-center">
        {`${profile.major} of ${profile.university}`}
      </p>
      {/* "View Profile" Button */}
      <a
        href={'members/' + profile.slug}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        View Profile
      </a>
    </div>
  )
}

// Sample profile data
const sampleUser: Profile = {
  name: 'Thai Nguyen Gia Bao',
  role: 'Member',
  position: 'Software Engineer',
  major: 'Computer Science',
  university: 'Ho Chi Minh University of Technology',
  slug: 'thainguyengiabao',
}

async function MemberList() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'users',
    limit: 20,
    pagination: false,
  })
  console.log(result)
  return (
    <div className="">
      <ProfileCard profile={sampleUser} />
    </div>
  )
}

export default MemberList
