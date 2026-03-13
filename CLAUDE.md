# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server on http://localhost:3010
npm run build     # Type check (astro check) + build with 4GB heap
npm run preview   # Preview built output
npm run prettier  # Format TS/TSX/CSS/Astro files
```

Keystatic CMS is accessible at `http://localhost:3010/keystatic` during dev.

## Architecture

**epasingha.me v3** is a personal portfolio/blog built with Astro 5 (static output), React 19, Tailwind CSS 4, and deployed on Cloudflare Pages.

### Key architectural points

- **Static-only**: All pages use `getStaticPaths()` + pre-rendering. Do NOT switch to server mode without converting all routes to dynamic `Astro.params` fetching.
- **Content collections**: Blog posts (`src/content/blog/**/*.mdx`) and projects (`src/content/projects/**/*.{md,mdx}`) are managed via Astro Content Collections with Zod schemas defined in `src/content.config.ts`.
- **React components** live in `src/components/react/` and use `client:*` directives in Astro templates. Shadcn-style UI components are in `src/components/ui/`.
- **OG images**: Dynamically generated at `src/pages/image/[...id].png.ts` using Satori + `@resvg/resvg-wasm` (must stay WASM-based for Cloudflare compatibility — do not swap for native `@resvg/resvg-js`).
- **Data utilities**: `src/lib/data-utils.ts` contains helpers for fetching and grouping content (getAllPosts, getPostsByTag, groupPostsByYear, etc.).
- **Path alias**: `@/*` maps to `src/*`.

### Content frontmatter schemas

Blog posts require: `title`, `description`, `date`. Optional: `image` (relative path), `tags`, `authors`, `draft`.

Projects require: `name`, `description`, `tags`, `image`. Optional: `link`, `startDate`, `endDate`.

Images in content files must use paths **relative to the MDX file**, e.g., `image: ./cover.png`.

### Build notes

- Build uses `NODE_OPTIONS=--max-old-space-size=4096` due to large dependencies (Three.js, WASM, etc.).
- WASM files (`.wasm`) are externalized in Vite config — do not add them to the optimization bundle.
- `astro check` runs before every build for type validation.
