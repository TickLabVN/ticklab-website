import React from 'react'
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHeart,
  FaEye,
  FaComment,
} from 'react-icons/fa'

const ProfileCard: React.FC = () => {
  return (
    <div className="w-72 rounded-xl overflow-hidden shadow-md bg-white">
      {/* Banner Section */}
      <div className="relative bg-blue-500 h-20 flex items-center justify-center">
        {/* Avatar */}
        <img
          className="w-20 h-20 rounded-full border-4 border-white absolute top-10"
          src="https://via.placeholder.com/150"
          alt="Profile"
        />
      </div>

      {/* Content Section */}
      <div className="mt-12 flex flex-col items-center p-4">
        {/* Name & Subtitle */}
        <h2 className="text-xl font-bold text-gray-800">CodingLab</h2>
        <p className="text-gray-500 text-sm">YouTuber &amp; Blogger</p>

        {/* Social Media Icons */}
        <div className="flex gap-2 mt-3">
          <a href="#" className="text-blue-600 hover:text-blue-700">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-500">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-pink-500 hover:text-pink-600">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-red-600 hover:text-red-700">
            <FaYoutube size={20} />
          </a>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Subscribe
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
            Message
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-between w-full mt-5 border-t pt-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaHeart className="text-red-500" />
            <span>60.4k</span>
          </div>
          <div className="flex items-center gap-1">
            <FaEye className="text-blue-500" />
            <span>20k</span>
          </div>
          <div className="flex items-center gap-1">
            <FaComment className="text-green-500" />
            <span>12.4k</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard