import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import icon from 'astro-icon'
import expressiveCode from 'astro-expressive-code'

import { unified, rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeExternalLinks from 'rehype-external-links'
import remarkEmoji from 'remark-emoji'

import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.epasingha.me',
  output: 'static',

  integrations: [
    expressiveCode({
      themes: ['catppuccin-latte', 'ayu-dark'],
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) =>
        theme.name === 'ayu-dark'
          ? '[data-theme="dark"]'
          : '[data-theme="light"]',
      defaultProps: {
        wrap: true,
        collapseStyle: 'collapsible-auto',
        showLineNumbers: false,
      },
      styleOverrides: {
        borderRadius: '0px',
        borderColor: '#3a4033',
        codeFontFamily: "'IBM Plex Mono', monospace",
      },
    }),
    mdx(),
    react(),
    icon(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  server: {
    port: 3010,
    host: true,
  },

  devToolbar: {
    enabled: false,
  },

  markdown: {
    processor: unified({
      remarkPlugins: [remarkEmoji],
      rehypePlugins: [
        [
          rehypeExternalLinks,
          {
            target: '_blank',
            rel: ['nofollow', 'noopener', 'noreferrer'],
          },
        ],
        rehypeHeadingIds,
      ],
    }),
  },
})
