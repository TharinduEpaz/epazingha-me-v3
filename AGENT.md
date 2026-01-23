# Agent Context: epasingha.me v3

This document provides comprehensive context about the project structure, configuration, and patterns for AI agents working on this codebase.

## Project Overview

**epasingha.me** is a personal portfolio and blog website built with Astro.js. It serves as a showcase for projects, blog posts about web development, DevOps, and software engineering best practices. The site is deployed on Cloudflare Pages.

- **Repository**: https://github.com/TharinduEpaz/epazingha-me-v3
- **Live Site**: https://www.epasingha.me
- **Version**: 1.1.0
- **Node Version**: >=20.0.0

## Tech Stack

### Core Framework
- **Astro 5.12.9** - Static site generator (configured for static output mode)
- **TypeScript 5.9.2** - Type safety
- **Cloudflare Adapter** - Deployment target (though using static mode)

### UI & Styling
- **Tailwind CSS 4.1.18** - Utility-first CSS framework (via @tailwindcss/vite)
- **Radix UI** - Headless UI components (Avatar, Dropdown, Scroll Area, Separator, Slot)
- **Framer Motion 12.23.12** - Animation library
- **Lucide React** - Icon library
- **Astro Icon** - Icon system with multiple icon sets (line-md, lucide, mdi)

### React Integration
- **React 19.1.1** - For interactive components
- **React Three Fiber 9.4.2** - 3D graphics (for 3D profile avatar)
- **React Three Drei 10.7.7** - Helpers for React Three Fiber

### Content Management
- **MDX** - Markdown with JSX support for blog posts
- **Astro Content Collections** - Type-safe content management
- **Keystatic 5.0.6** - Git-based CMS (configured but using static mode)
  - Local storage in development
  - GitHub storage configured for production (not actively used in static mode)

### Code Highlighting & Markdown
- **Astro Expressive Code 0.41.3** - Code block rendering with themes
  - Themes: catppuccin-latte (light), ayu-dark (dark)
  - Plugins: Collapsible sections, line numbers
- **Rehype Pretty Code** - Syntax highlighting
- **Remark plugins**: emoji, math, sectionize
- **Rehype plugins**: external links, heading IDs, document structure

### Image Generation
- **Satori 0.16.2** - SVG generation from HTML
- **@resvg/resvg-wasm 2.6.2** - WebAssembly-based SVG to PNG conversion (Cloudflare-compatible)
- Used for generating Open Graph images dynamically at `/image/[...id].png`

### Other Key Libraries
- **Fuse.js 7.1.0** - Fuzzy search
- **FingerprintJS 4.6.2** - Browser fingerprinting
- **Class Variance Authority** - Component variant management
- **clsx & tailwind-merge** - Conditional class utilities

## Project Structure

```
src/
├── components/
│   ├── react/          # React components (navbar, blog-card, profile-3d, etc.)
│   ├── ui/             # Reusable UI components (button, badge, pagination, etc.)
│   └── *.astro         # Astro components (Breadcrumbs, Footer, Head, etc.)
├── content/
│   ├── blog/           # Blog posts (MDX files)
│   └── projects/       # Project descriptions (MD files)
├── layouts/
│   └── Layout.astro    # Main layout wrapper
├── lib/
│   ├── data-utils.ts   # Content collection utilities
│   └── utils.ts        # General utilities
├── pages/
│   ├── blog/           # Blog listing and individual post pages
│   ├── projects/       # Project listing and individual project pages
│   ├── tags/           # Tag-based filtering pages
│   ├── image/          # Dynamic OG image generation endpoint
│   ├── index.astro      # Homepage
│   ├── rss.xml.ts      # RSS feed generation
│   ├── sitemap.xml.ts  # Sitemap generation
│   └── robots.txt.ts   # Robots.txt generation
├── styles/
│   ├── global.css      # Global styles
│   └── typography.css  # Typography styles
├── consts.ts           # Site constants and configuration
├── content.config.ts   # Astro content collection schemas
└── types.ts           # TypeScript type definitions
```

## Configuration Files

### astro.config.ts
- **Output Mode**: `static` (pre-rendered at build time)
- **Adapter**: Cloudflare (though static mode doesn't require serverless functions)
- **Integrations**: 
  - Expressive Code (code highlighting)
  - MDX (markdown with JSX)
  - React (for interactive components)
  - Astro Icon
  - Keystatic (CMS - works locally in dev)
- **Markdown Processing**:
  - Custom rehype plugin that demotes H1 to H2 and strips title tags
  - External links open in new tabs
  - Syntax highlighting with catppuccin/ayu themes
  - Emoji support, math support, sectionization
- **Vite Configuration**:
  - Excludes satori, satori-html, @resvg/resvg-wasm from optimization
  - Externalizes .wasm files to prevent bundling issues
  - Deduplicates React dependencies

### content.config.ts
Defines two content collections:
1. **Blog Collection**:
   - Schema: title, description, date, image (optional), tags (optional), authors (optional), draft (optional)
   - Uses Astro's `image()` helper for optimized images
   - Files: `src/content/blog/**/*.{md,mdx}`

2. **Projects Collection**:
   - Schema: name, description, tags (required), image (required), link (optional), startDate (optional), endDate (optional)
   - Files: `src/content/projects/**/*.{md,mdx}`

### keystatic.config.js
- **Storage**: Local in development, GitHub in production (not actively used in static mode)
- **Blog Collection Schema**: Matches Astro content schema
- **Image Directory**: `src/content/blog` (stores images relative to content files)
- **Public Path**: `/images/blog/` (for served images)

## Key Features

### 1. Blog System
- MDX-based blog posts with frontmatter
- Pagination (5 posts per page)
- Tag-based filtering and organization
- Author support
- Draft posts (filtered out in production)
- Reading time calculation
- Table of contents generation
- Post navigation (previous/next)
- RSS feed generation
- Dynamic OG image generation

### 2. Projects Showcase
- Project descriptions with tags
- Image support
- Link to external project pages
- Date range support (start/end dates)

### 3. Dynamic OG Images
- Endpoint: `/image/[...id].png`
- Generates social media preview images using Satori + resvg-wasm
- Uses Montserrat fonts (regular and bold)
- Includes title, description, date, tags
- 1200x630px dimensions

### 4. Search Functionality
- Fuzzy search using Fuse.js
- Client-side search component

### 5. 3D Profile Avatar
- Uses React Three Fiber for 3D rendering
- GLB model with animations
- Interactive 3D component on homepage

### 6. Theme Support
- Dark/light mode toggle
- System preference detection
- Persistent theme selection (localStorage)

## Build Configuration

### Build Script
- Uses increased Node.js heap size (4GB) to handle large builds
- Command: `NODE_OPTIONS=--max-old-space-size=4096 astro build`

### Development
- Dev server runs on port 3010
- Hot module replacement enabled
- Keystatic CMS available at `/keystatic` in development (local mode)

## Content Management Approach

**Current Setup**: Static mode with Git-based content management
- Content edited directly in MDX/MD files
- Images stored in content directory or public directory
- Keystatic available for local development but not required
- No database needed - all content is file-based

**Image Handling**:
- Blog post cover images: Stored in `src/content/blog/` (relative to MDX files)
- Images in blog content: Referenced relative to MDX file location
- OG images: Generated dynamically at build/runtime
- Public assets: Stored in `public/` directory

## Deployment

- **Platform**: Cloudflare Pages
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Adapter**: @astrojs/cloudflare (configured but static mode doesn't use serverless functions)

## Important Notes

1. **Static Mode**: Currently using `output: "static"` - all pages are pre-rendered at build time
2. **Server Mode Issues**: Switching to server mode requires converting all `getStaticPaths()` calls to dynamic route fetching using `Astro.params`
3. **Image Paths**: Blog post images must be referenced relative to the MDX file location
4. **WASM Compatibility**: Using `@resvg/resvg-wasm` instead of `@resvg/resvg-js` for Cloudflare compatibility
5. **Memory**: Build process requires 4GB heap size due to large dependencies

## Common Patterns

### Content Collection Usage
```typescript
import { getCollection } from 'astro:content'
const posts = await getCollection('blog', (post) => !post.data.draft)
```

### Dynamic Routes (Static Mode)
```typescript
export async function getStaticPaths() {
  const items = await getCollection('collection')
  return items.map((item) => ({
    params: { id: item.id },
    props: { item },
  }))
}
```

### Image References in Content
- Frontmatter: `image: ./relative/path/to/image.png`
- Markdown: `![](./relative/path/to/image.png)`
- Both paths are relative to the content file location

### Rendering Content
```typescript
import { render } from 'astro:content'
const { Content, headings } = await render(post)
// Use <Content /> in template, headings for TOC
```

## Known Issues & Solutions

### Image Path Resolution
- **Issue**: MDX files with `![](image.png)` need correct relative paths
- **Solution**: Use paths relative to MDX file: `![](./subdirectory/image.png)`

### Build Memory Issues
- **Issue**: Build fails with "heap out of memory"
- **Solution**: Build script includes `NODE_OPTIONS=--max-old-space-size=4096`

### WASM Files in Cloudflare
- **Issue**: Native Node.js modules don't work on Cloudflare Workers
- **Solution**: Use `@resvg/resvg-wasm` instead of `@resvg/resvg-js`

### Server Mode Compatibility
- **Issue**: `getStaticPaths()` doesn't work the same way in server mode
- **Solution**: Convert to dynamic route fetching using `Astro.params`:
  ```typescript
  const { id } = Astro.params
  const items = await getCollection('collection')
  const item = items.find(i => i.id === id)
  ```

## File Naming Conventions

- Blog posts: Use kebab-case for filenames (e.g., `how-to-override-keycloak.mdx`)
- Images: Store in subdirectory matching post name or as sibling with descriptive name
- Components: PascalCase for React components, kebab-case for Astro components
- Pages: Use Astro's file-based routing (e.g., `[...id].astro` for dynamic routes)

## Development Workflow

1. **Adding a Blog Post**:
   - Create MDX file in `src/content/blog/`
   - Add frontmatter with required fields (title, description, date)
   - Add images relative to MDX file location
   - Run `npm run dev` to preview

2. **Adding a Project**:
   - Create MD file in `src/content/projects/`
   - Add frontmatter with required fields (name, description, tags, image)
   - Image must be provided (required field)

3. **Using Keystatic CMS**:
   - Run `npm run dev`
   - Navigate to `http://localhost:3010/keystatic`
   - Edit content through web UI (saves to local files)

## Testing & Validation

- Type checking: `astro check` (runs before build)
- Linting: Prettier configured for consistent formatting
- Content validation: Zod schemas in `content.config.ts` validate frontmatter

## Performance Considerations

- All pages are pre-rendered (static mode)
- Images are optimized by Astro's image() helper
- Code splitting handled automatically by Astro
- OG images generated on-demand but can be cached

## Security Notes

- External links automatically open in new tabs with `rel="noopener"`
- No user input processing (static site)
- Content is file-based, no database vulnerabilities

## Future Considerations

- If switching to server mode: Update all routes to use dynamic fetching
- If enabling Keystatic in production: Set up GitHub App and environment variables
- Consider image optimization pipeline for better performance
- May want to add ISR (Incremental Static Regeneration) if moving to hybrid mode
