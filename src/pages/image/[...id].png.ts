import satori from 'satori'
import { html } from 'satori-html'
import { Resvg, initWasm } from '@resvg/resvg-wasm'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'
import fs from 'node:fs'
import path from 'node:path'
import { SITE } from '@/consts'

// --- one-time WASM init (module scope, reused across all prerendered images) ---
let wasmReady: Promise<void> | null = null
function ensureWasm() {
  if (!wasmReady) {
    const wasm = fs.readFileSync(
      path.resolve('./node_modules/@resvg/resvg-wasm/index_bg.wasm'),
    )
    wasmReady = initWasm(wasm)
  }
  return wasmReady
}

const RajBold = fs.readFileSync(path.resolve('./public/fonts2/_montserrat_bold.ttf'))
const RajRegular = fs.readFileSync(
  path.resolve('./public/fonts2/_montserrat_regular.ttf'),
)

const dimensions = { width: 1200, height: 630 }

const C = {
  bg: '#0d0f0d',
  panel: '#161a15',
  card: '#1d211c',
  line: '#373d36',
  accent: '#b4ff29',
  ink: '#f1f4ee',
  body: '#c6ccc0',
  faint: '#6a7065',
}

interface Props {
  title: string
  date: Date
  description: string
  tags: string[]
}

export async function GET(context: APIContext) {
  const { title, date, description, tags } = context.props as Props
  await ensureWasm()

  const formattedDate = date
    .toLocaleDateString('en-US', { dateStyle: 'full' })
    .toUpperCase()

  const tagElements = (tags ?? [])
    .slice(0, 5)
    .map(
      (tag) =>
        `<div style="display:flex;border:1px solid ${C.line};color:${C.faint};font-size:18px;padding:6px 14px;margin-right:10px;">#${tag}</div>`,
    )
    .join('')

  const markup = html(
    `<div style="display:flex;flex-direction:column;width:100%;height:100%;background:${C.bg};color:${C.body};font-family:'Montserrat';position:relative;padding:64px;">
      <div style="position:absolute;top:28px;left:28px;width:26px;height:26px;border-top:4px solid ${C.accent};border-left:4px solid ${C.accent};display:flex;"></div>
      <div style="position:absolute;bottom:28px;right:28px;width:26px;height:26px;border-bottom:4px solid ${C.accent};border-right:4px solid ${C.accent};display:flex;"></div>

      <div style="display:flex;font-size:20px;letter-spacing:3px;color:${C.faint};">// FIELD REPORT · ${formattedDate}</div>

      <div style="display:flex;font-size:64px;font-weight:700;color:${C.ink};line-height:1.12;margin-top:26px;width:95%;">${title}</div>

      <div style="display:flex;width:90px;height:5px;background:${C.accent};margin:30px 0;"></div>

      <div style="display:flex;font-size:26px;line-height:1.5;color:${C.body};width:88%;">${description}</div>

      <div style="display:flex;margin-top:30px;">${tagElements}</div>

      <div style="display:flex;position:absolute;bottom:56px;left:64px;align-items:center;">
        <div style="display:flex;width:8px;height:34px;background:${C.accent};margin-right:18px;"></div>
        <div style="display:flex;flex-direction:column;">
          <div style="display:flex;font-size:26px;font-weight:700;color:${C.ink};">${SITE.author}</div>
          <div style="display:flex;font-size:18px;color:${C.faint};letter-spacing:1px;">epasingha.me</div>
        </div>
      </div>
    </div>`,
  ) as unknown as React.ReactNode

  const svg = await satori(markup, {
    fonts: [
      { name: 'Montserrat', data: RajRegular, weight: 400, style: 'normal' },
      { name: 'Montserrat', data: RajBold, weight: 700, style: 'normal' },
    ],
    height: dimensions.height,
    width: dimensions.width,
  })

  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: dimensions.width },
    background: C.bg,
  })
    .render()
    .asPng()

  return new Response(png as unknown as BodyInit, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Length': png.length.toString(),
    },
  })
}

export async function getStaticPaths() {
  const posts = await getCollection('blog')
  return posts
    .filter((post) => !post.data.draft)
    .map((post) => ({
      params: { id: post.id },
      props: {
        title: post.data.title,
        date: post.data.date,
        description: post.data.description,
        tags: post.data.tags ?? [],
      },
    }))
}
