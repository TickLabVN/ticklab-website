'use client'

import Link from "next/link"
import { Logo } from '@/components/Logo/Logo'
import { Facebook, Github, Youtube } from "lucide-react"
import type { Footer } from '@/payload-types'

interface FooterClientProps {
  data: Footer
}

export const FooterClient: React.FC<FooterClientProps> = ({ data }) => {
  return (
    <footer className="bg-[#1B2329] py-8 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 px-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-4">
            {data?.quickLinks?.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Resources</h3>
          <ul className="space-y-4">
            {data?.resources?.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Contact</h3>
          <ul className="space-y-4">
            {data?.contact?.email && (
              <li>
                <a
                  href={`mailto:${data.contact.email}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {data.contact.email}
                </a>
              </li>
            )}
            {data?.contact?.address && (
              <li className="text-gray-300">
                {data.contact.address}
              </li>
            )}
            <li>
              <div className="flex items-center gap-4">
                {data?.contact?.facebook && (
                  <a
                    href={data.contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                )}
                {data?.contact?.github && (
                  <a
                    href={data.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                )}
                {data?.contact?.youtube && (
                  <a
                    href={data.contact.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Logo and Copyright */}
      <div className="flex items-center mb-4 md:mb-0">
        <Link href="/">
          <Logo loading="eager" priority="high" />
        </Link>
        <p className="text-sm text-gray-400">
          Copyright © {new Date().getFullYear()} {data?.companyName}. Made by Engineering team.
        </p>
      </div>
    </footer>
  )
}
