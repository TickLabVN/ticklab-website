import React from 'react'
import PageClient from './page.client'
import Image from 'next/image'
const user = {
  id: 5,
  name: 'Thai Nguyễn Gia Bao',
  avatar: {
    id: 25,
    alt: 'bao-avatar',
    caption: null,
    prefix: 'media',
    updatedAt: '2025-03-30T17:26:35.645Z',
    createdAt: '2025-03-30T17:26:35.752Z',
    url: 'https://minio.ticklab.site/ticklab-website-dev/media%2Fbao.jpg',
    thumbnailURL: '/api/media/file/bao-300x300.jpg',
    filename: 'bao.jpg',
    mimeType: 'image/jpeg',
    filesize: 70689,
    width: 959,
    height: 960,
    focalX: 50,
    focalY: 50,
    sizes: {
      /* omitted for brevity */
    },
  },
  bio: {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: 'left',
          indent: 0,
          version: 1,
          children: [
            {
              mode: 'normal',
              text: "Hi, I'm Thai Nguyen Gia Bao",
              type: 'text',
              style: '',
              detail: 0,
              format: 1,
              version: 1,
            },
            { type: 'linebreak', version: 1 },
            { type: 'linebreak', version: 1 },
            {
              mode: 'normal',
              text: 'I’m a Computer Science student (Honors Program) at Ho Chi Minh University of Technology - VNU',
              type: 'text',
              style: '',
              detail: 0,
              format: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          textStyle: '',
          textFormat: 1,
        },
      ],
      direction: 'ltr',
      textFormat: 1,
    },
  },
  projects: [
    {
      id: '67e97f0a5a6746fbef7523ca',
      title: 'TickPortal',
      description:
        'Developed a Discord bot that centralized notifications from Gmail and Facebook to Ticklab’s Discord, automated workflows for email forwarding, CV management, and candidate scheduling, streamlining HR processes.',
      link: 'https://iqthaison.vercel.app/',
      image: {
        id: 26,
        alt: 'ticklab',
        url: 'https://minio.ticklab.site/ticklab-website-dev/media%2Fticklab.png',
      },
    },
    {
      id: '67e97f515a6746fbef7523cc',
      title: 'IQThaiSon',
      description:
        'A website that provides online courses for students preparing for the university entrance exam, with features such as prevent multiple login in one accound, prevent to download video,...',
      link: 'https://iqthaison.vercel.app/',
      image: {
        id: 27,
        alt: 'iqthaison',
        url: 'https://minio.ticklab.site/ticklab-website-dev/media%2Fiqthaison.png',
      },
    },
  ],
  activities: [
    {
      id: '67e97f805a6746fbef7523ce',
      title: 'Research about Decentralized Federated Learning',
      description:
        '- Advisor: Nhan Trong Phan, Ph.D\n- Focusing on performance optimization, security & privacy (DP, SMC, HE), protocols (p2p, blockchain-based)',
      date: '2025-01-01T12:00:00.000Z',
    },
  ],
  blog: null,
  contact: {
    email: 'bao.thainguyenkhmt@hcmut.edu.com',
    phone: '0332 504 557',
  },
  role: 'member',
  updatedAt: '2025-03-30T17:30:51.444Z',
  createdAt: '2025-03-30T17:30:24.103Z',
  email: 'bao.thainguyenkhmt@hcmut.edu.vn',
  loginAttempts: 0,
}

function MemberProfile() {
  const renderBio = () => {
    if (user.bio && user.bio.root && user.bio.root.children?.length) {
      return user.bio.root.children
        .map((child) => child.children?.map((c) => c.text).join(' ') || '')
        .join('\n\n')
    }
    return ''
  }

  return (
    <div className="bg-white text-gray-800 font-sans mx-auto md:text-xl px-6 text-lg">
      {/* Navigation Bar */}
      <header className="bg-white border-b border-gray-200 w-full p-0 md:px-20 py-4">
        <nav className="bg-white border-gray-200">
          <div className="flex flex-wrap items-center justify-between mx-auto">
            <span className="self-center text-2xl md:text-3xl font-bold">Thai Nguyen Gia Bao</span>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul className="font-medium flex flex-col mt-2 text-gray-600 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                <li>
                  <a href="#education" className="hover:text-blue-600">
                    Education
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-blue-600">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#activities" className="hover:text-blue-600">
                    Activities
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-blue-600">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero / Intro Section */}
      <section className="my-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
        {/* Profile Picture */}
        <div className="w-full sm:w-96 sm:h-96 rounded-xl overflow-hidden shadow">
          <img
            src={user.avatar.url}
            alt={user.avatar.alt || 'Profile Photo'}
            className="w-full h-full object-cover"

          />
        </div>
        {/* Intro Text */}
        <div className="flex-1 flex flex-col text-left gap-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Hi, I am <span className="text-blue-600">{user.name}</span>
          </h2>
          <p className="text-gray-700">{renderBio()}</p>
          {/* Badge Group */}
          <div className="flex flex-wrap gap-4 text-sm md:text-lg">
            <a
              href="cv/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-blue-700 transition-shadow shadow-md"
            >
              <i className="fas fa-file-alt"></i>
              <span>CV</span>
            </a>
            <a
              href="https://github.com/ThaiNguyenGiaBao"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900 transition-shadow shadow-md"
            >
              <i className="fab fa-github"></i>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/bao-thai-nguyen-gia-2450b22b7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-900 transition-shadow shadow-md"
            >
              <i className="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="my-12 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Projects</h2>
        <div>
          {user.projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex gap-4 items-center mt-8 border border-gray-100 rounded-xl animate__animated animate__fadeInUp ${
                (index + 1) % 2 === 1 ? 'flex-col-reverse md:flex-row' : 'flex-col md:flex-row'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {(index + 1) % 2 === 1 ? (
                <>
                  {/* Project Details */}
                  <div className="px-6 pb-4 md:py-2 flex-1">
                    <h3 className="text-xl md:text-3xl font-semibold text-gray-900 mb-4">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {/* {project.badges &&
                        project.badges.map((badge, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                          >
                            {badge}
                          </span>
                        ))} */}
                    </div>
                  </div>
                  {/* Project Screenshot */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <img
                      src={project.image.url}
                      alt={project.image.alt}
                      className="w-full max-h-md h-auto rounded-t-lg md:rounded-r-lg md:rounded-l-none shadow-lg"
                    />
                  </a>
                </>
              ) : (
                <>
                  {/* Project Screenshot */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <img
                      src={project.image.url}
                      alt={project.image.alt}
                      className="w-full max-h-md h-auto rounded-t-lg md:rounded-l-lg md:rounded-r-none shadow-lg"
                    />
                  </a>
                  {/* Project Details */}
                  <div className="px-6 pb-4 md:py-2 flex-1">
                    <h3 className="text-xl md:text-3xl font-semibold text-gray-900 mb-4">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {/* {project.badges &&
                        project.badges.map((badge, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                          >
                            {badge}
                          </span>
                        ))} */}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Activities</h2>
        <div className="space-y-8">
          {user.activities.map((activity) => (
            <div key={activity.id}>
              <h3 className="text-xl font-semibold">
                <span className="font-bold">{new Date(activity.date).toLocaleDateString()}</span>:{' '}
                {activity.title}
              </h3>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {activity.description.split('\n').map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Blog</h2>
        {/* {user.blog ? (
          <div className="prose max-w-none">
            {user.blog.root.children.map((child, idx) => (
              <p key={idx}>{child.children.map((c) => c.text).join(' ')}</p>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">There is no blog now</p>
        )} */}
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact</h2>
        <p className="text-gray-700">
          Interested in collaborating or learning more about my work? Feel free to reach out:
        </p>
        <ul className="list-none mt-4 text-gray-700 space-y-2">
          <li>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${user.contact.email}`} className="text-blue-600 hover:underline">
              {user.contact.email}
            </a>
          </li>
          <li>
            <strong>Phone:</strong> {user.contact.phone}
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 text-center py-4 mt-8 text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Thai Nguyen Gia Bao. All rights reserved.
      </footer>
    </div>
  )
}

export default MemberProfile
