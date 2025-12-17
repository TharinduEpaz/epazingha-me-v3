import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'Tharindu Epasingha',
  description:
    "Engineer specializing in modern web technologies. Expert in React, Python, Java and cloud development. Read my latest tech tutorials, project insights, and programming tips on web development, DevOps, and software engineering best practices.",
  href: 'https://www.epasingha.com',
  author: 'Tharindu Epasingha',
  locale: 'en-US',
  location: 'Sri Lanka',
  email: 'epazingha@gmail.com'
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/',
    label: 'home',
  },
  {
    href: '/projects',
    label: 'projects',
  },
  {
    href: '/blog',
    label: 'blog',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/TharinduEpaz',
    label: 'GitHub',
  },
  {
    href: 'mailto:epazingha@gmail.com',
    label: 'Email',
  },
  {
    href: 'tel:+94753884121',
    label: 'Phone',
  },
  {
    href: 'https://www.instagram.com/epazingha',
    label: 'Instagram',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  Instagram: 'lucide:instagram',
  Phone: 'lucide:phone',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}

export interface Category {
  text: string
  logo: string
}

export type Technologies = {
  'Web Development': Category[]
  'Development Tools': Category[]
  'Hosting and Cloud Services': Category[]
  'Other Programming Languages and Technologies': Category[]
  'Databases': Category[]
}

export const technologies: Technologies = {
  'Web Development': [
    { text: 'React', logo: 'mdi:react' },
    { text: 'Spring Boot', logo: 'mdi:spring-boot' },
    { text: 'FastAPI', logo: 'mdi:fastapi' },
    { text: 'TypeScript', logo: 'mdi:language-typescript' },
    { text: 'Angular', logo: 'mdi:angular' },
    { text: 'Astro', logo: 'simple-icons:astro' },
    { text: 'Tailwind CSS', logo: 'mdi:tailwind' },

  ],
  'Development Tools': [
    { text: 'Visual Studio Code', logo: 'mdi:visual-studio-code' },
    { text: 'Git', logo: 'mdi:git' },
    { text: 'Docker', logo: 'mdi:docker' },
    { text: 'Kubernetes', logo: 'mdi:kubernetes' },
  ],
  'Hosting and Cloud Services': [
    { text: 'AWS', logo: 'mdi:aws' },
    { text: 'Cloudflare', logo: 'cib:cloudflare' },
    { text: 'Vercel', logo: 'cib:vercel' },
  ],

  'Other Programming Languages and Technologies': [
    { text: 'Java', logo: 'mdi:language-java' },
    { text: 'Python', logo: 'mdi:language-python' },
    { text: 'Node.js', logo: 'mdi:nodejs' },
  ],

  'Databases': [
    { text: 'MySQL', logo: 'cib:mysql' },
    { text: 'PostgreSQL', logo: 'cib:postgresql' },
    { text: 'SQLite', logo: 'cib:sqlite' },
    { text: 'DynamoDB', logo: 'cib:dynamodb' },
  ],

}
