import React from 'react'
import Image from 'next/image'
export interface Profile {
  avatar: string
  name: string
  role: string
  position: string
  major: string
  university: string
  slug: string
}

// Props for the ProfileCard
export interface ProfileCardProps {
  profile: Profile
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="w-80 relative border border-gray-200 rounded-2xl shadow-md p-5 flex flex-col items-center bg-white ">
      <span className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-green-700 border border-green-600 rounded-full">
        {profile.role}
      </span>
      <div className="relative w-52 h-52 rounded-full border-2 border-gray-300 overflow-hidden">
        <div className="relative w-52 h-52 rounded-full border-2 border-gray-300 overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <Image src={profile.avatar} alt="User Avatar" fill style={{ objectFit: 'cover' }} />
        </div>
      </div>
      {/* Role Tag (e.g., "Member") */}
      {/* Name & Position */}
      <h2 className="mt-4 text-2xl font-bold text-gray-800 text-center">{profile.name}</h2>
      <p className="text-lg text-green-700 font-bold">{profile.position}</p>
      {/* Major / Department */}
      <p className="mt-1 text-sm text-gray-600 text-center">
        {`${profile.major} of ${profile.university}`}
      </p>
      {/* "View Profile" Button */}
      <a
        href={'members/' + profile.slug}
        className="mt-4 bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition"
      >
        View Profile
      </a>
    </div>
  )
}
