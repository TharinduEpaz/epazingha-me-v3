# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server on http://localhost:3010
npm run build     # Type check (astro check) + build with 4GB heap
npm run preview   # Preview built output
npm run prettier  # Format TS/TSX/CSS/Astro files
```

## Architecture

**epasingha.me** is a personal portfolio/blog built with **Astro 7** (`output: 'static'`), React 19 (islands only), and Tailwind CSS 4. It deploys to Cloudflare Pages as a plain static bundle (`dist/`) — there is **no** server adapter.

### Key architectural points

- **Static output, no adapter**: `output: 'static'` in `astro.config.ts`. All routes are prerendered at build. Dev runs on plain Vite (fast); do NOT re-add `@astrojs/cloudflare` / server mode — a prior attempt broke local dev because the adapter runs the app inside the Workers runtime (`require`/`module is not defined`).
- **Single Vite**: `overrides.vite` in `package.json` pins one Vite version across the tree. Removing it reintroduces a duplicate-Vite / module-runner mismatch. Keep it aligned with the version Astro 7 depends on.
- **Retro "field-ops" theme**: design tokens (olive `#1c1f1a` + orange `#ff6a00`, Rajdhani + IBM Plex Mono) live in `src/styles/global.css` via a Tailwind v4 `@theme` block (utilities: `bg-panel`, `text-accent`, `border-line`, `font-display`, `font-mono`, …). The homepage (`src/pages/index.astro`) recreates `Portfolio.dc.html`; its tab/carousel interactivity is inline vanilla JS (no React on the homepage).
- **Markdown pipeline (Sätteri)**: Astro 7 replaced the default unified processor. Custom remark/rehype plugins go inside `markdown.processor: unified({ ... })` from `@astrojs/markdown-remark`, NOT top-level `remarkPlugins`/`rehypePlugins`. Code blocks use `astro-expressive-code`.
- **Content collections**: blog (`src/content/blog/**/*.mdx`) + projects (`src/content/projects/**/*.{md,mdx}`) via the Content Layer glob loader in `src/content.config.ts`. Import `z` from `astro:schema`.
- **OG images**: prerendered at `src/pages/image/[...id].png.ts` using Satori + `@resvg/resvg-wasm`. Keep it WASM-based and call `initWasm()` (loaded from the `.wasm` in `node_modules`) before `new Resvg()` — it now executes at build time.
- **Data utilities**: `src/lib/data-utils.ts` (getAllPosts, getPostsByTag, groupPostsByYear, getAllProjects, …). **Path alias**: `@/*` → `src/*`.

### Content frontmatter schemas

Blog posts require: `title`, `description`, `date`. Optional: `image` (relative path), `tags`, `authors`, `draft`.

Projects require: `name`, `description`, `tags`, `image`. Optional: `link`, `startDate`, `endDate`.

Images in content files must use paths **relative to the MDX file**, e.g., `image: ./cover.png`.

### Build notes

- Requires Node 22+. `astro check` runs before every build for type validation.
- Build still sets `NODE_OPTIONS=--max-old-space-size=4096` as a safety margin (WASM/image processing).
- The `portfolio-retro-design-prototype/` folder is the Claude Design handoff bundle (reference only) and can be deleted from the repo.
