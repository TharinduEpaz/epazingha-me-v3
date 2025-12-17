import { useEffect } from 'react'
import { technologies, type Technologies, type Category } from '../../consts'
import { InfiniteScroll } from '../ui/infinite-scroll'
import { type IconType } from 'react-icons'
import { FaQuestionCircle } from 'react-icons/fa'
import {
  SiHtml5,
  SiJavascript,
  SiCss3,
  SiPhp,
  SiAstro,
  SiTailwindcss,
  SiGit,
  SiDigitalocean,
  SiCloudflare,
  SiNetlify,
  SiUbuntu,
  SiLua,
  SiGo,
  SiNodedotjs,
  SiApache,
  SiNginx,
  SiMysql,
  SiMongodb,
  SiDiscord,
  SiSpotify,
  SiBrave,
  SiAmazon,
  SiVercel,
  SiPython,
  SiPostgresql,
  SiAmazondynamodb,
  SiDocker,
  SiKubernetes,
  SiSqlite,
} from 'react-icons/si'
import { FileCode, LucideAppWindow, Code } from 'lucide-react'

// Java icon component (not available in react-icons)
const JavaIcon: IconType = ({ className, ...props }: any) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M8.851 18.56s-.794.951.855 1.277c1.976.49 2.055.468 3.803.468 0 0 .522.044 1.004-.116 0 0 .522-.161.794-.644-.719-.512-2.273-.951-2.273-.951s1.004.322 1.664.322c2.498 0 4.339-1.958 4.339-1.958s.719.825-.322 1.569c-.951.644-2.624 1.113-4.557 1.113-3.012 0-4.812-.383-5.704-.644-.644-.161-.859-.322-.859-.322zm-2.498-2.436s-1.277 1.004.644 1.388c1.594.274 2.498.383 4.186.383 1.277 0 2.055-.138 2.055-.138s-.644.183-1.277.274c-2.273.322-5.323.138-6.601-.138-1.004-.228-1.113-.644-1.113-.644l2.068-.115zm9.785-3.473s.951.644-.322 1.113c-1.113.383-3.803.644-5.323.644-1.664 0-2.498-.138-2.498-.138s.794.183 1.664.274c1.277.138 3.15.183 4.557-.046 1.113-.183 1.664-.383 1.664-.383s-.644.322-1.388.468c-1.664.322-4.557.322-6.601-.046-1.113-.322-1.664-.644-1.664-.644s.644.183 1.277.274c1.664.322 4.186.322 5.704.138 1.277-.138 1.664-.322 1.664-.322l-.644.183zm-9.463-1.664s-1.277.951.644 1.277c1.664.274 3.15.383 5.323.383 1.664 0 2.498-.138 2.498-.138s-.644.183-1.277.274c-2.273.322-5.323.138-6.601-.138-1.004-.228-1.113-.644-1.113-.644l2.068-.115zm9.463-1.664s.951.644-.322 1.113c-1.113.383-3.803.644-5.323.644-1.664 0-2.498-.138-2.498-.138s.794.183 1.664.274c1.277.138 3.15.183 4.557-.046 1.113-.183 1.664-.383 1.664-.383s-.644.322-1.388.468c-1.664.322-4.557.322-6.601-.046-1.113-.322-1.664-.644-1.664-.644s.644.183 1.277.274c1.664.322 4.186.322 5.704.138 1.277-.138 1.664-.322 1.664-.322l-.644.183zM8.282 7.936S5.232 9.17 7.51 9.592c1.664.322 3.803.644 5.704.644 1.664 0 2.498-.138 2.498-.138s-.644.183-1.277.274c-2.273.322-5.323.138-6.601-.138-1.004-.228-1.113-.644-1.113-.644l2.068-.115zm9.463-1.664s.951.644-.322 1.113c-1.113.383-3.803.644-5.323.644-1.664 0-2.498-.138-2.498-.138s.794.183 1.664.274c1.277.138 3.15.183 4.557-.046 1.113-.183 1.664-.383 1.664-.383s-.644.322-1.388.468c-1.664.322-4.557.322-6.601-.046-1.113-.322-1.664-.644-1.664-.644s.644.183 1.277.274c1.664.322 4.186.322 5.704.138 1.277-.138 1.664-.322 1.664-.322l-.644.183z" />
  </svg>
)

const iconMap: { [key: string]: IconType } = {
  'mdi:language-html5': SiHtml5,
  'mdi:language-javascript': SiJavascript,
  'mdi:language-css3': SiCss3,
  'mdi:language-php': SiPhp,
  'simple-icons:astro': SiAstro,
  'mdi:tailwind': SiTailwindcss,
  'mdi:git': SiGit,
  'mdi:digital-ocean': SiDigitalocean,
  'cib:cloudflare': SiCloudflare,
  'cib:netlify': SiNetlify,
  'mdi:ubuntu': SiUbuntu,
  'mdi:language-lua': SiLua,
  'mdi:language-go': SiGo,
  'mdi:nodejs': SiNodedotjs,
  'cib:apache': SiApache,
  'cib:nginx': SiNginx,
  'cib:mysql': SiMysql,
  'cib:mongodb': SiMongodb,
  'mdi:discord': SiDiscord,
  'mdi:spotify': SiSpotify,
  'cib:brave': SiBrave,
  'mdi:visual-studio-code': FileCode,
  'mdi:windows': LucideAppWindow,
  'mdi:visual-studio': Code,
  'mdi:aws': SiAmazon,
  'cib:vercel': SiVercel,
  'mdi:language-java': JavaIcon,
  'mdi:language-python': SiPython,
  'cib:postgresql': SiPostgresql,
  'cib:dynamodb': SiAmazondynamodb,
  'mdi:docker': SiDocker,
  'mdi:kubernetes': SiKubernetes,
  'cib:sqlite': SiSqlite,
}

const categories = Object.keys(technologies)
const groupSize = Math.ceil(categories.length / 3)
const categoryGroups = [
  categories.slice(0, groupSize),
  categories.slice(groupSize, groupSize * 2),
  categories.slice(groupSize * 2),
]

const Skills: React.FC = () => {
  useEffect(() => {
    document.querySelectorAll('.tech-badge').forEach((badge) => {
      badge.classList.add('tech-badge-visible')
    })
  }, [])

  return (
    <div className="z-30 mt-12 flex w-full flex-col max-w-[calc(100vw-5rem)] mx-auto lg:max-w-full">
      <div className="space-y-2">
        {categoryGroups.map((group, groupIndex) => (
          <InfiniteScroll
            key={groupIndex}
            duration={50000}
            direction={groupIndex % 2 === 0 ? 'normal' : 'reverse'}
            showFade={true}
            className="flex flex-row justify-center"
          >
            {group.flatMap((category) =>
              technologies[category as keyof Technologies].map(
                (tech: Category, techIndex: number) => {
                  const IconComponent = iconMap[tech.logo] || FaQuestionCircle
                  return (
                    <div
                      key={`${category}-${techIndex}`}
                      className="tech-badge repo-card border-border bg-card text-muted-foreground mr-5 flex items-center gap-3 rounded-full border p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                      data-tech-name={`${category}-${techIndex}`}
                    >
                      <span className="bg-muted flex h-10 w-10 items-center justify-center rounded-full p-2 text-lg shadow-inner">
                        <IconComponent className="tech-icon text-primary" />
                      </span>
                      <span className="text-foreground font-medium">
                        {tech.text}
                      </span>
                    </div>
                  )
                },
              ),
            )}
          </InfiniteScroll>
        ))}
      </div>
    </div>
  )
}

export default Skills
