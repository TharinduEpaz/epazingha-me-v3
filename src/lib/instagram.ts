// Build-time fetch of recent Instagram media via the Instagram Graph API
// (Instagram API with Instagram Login). Requires a long-lived access token
// exposed to the build as the INSTAGRAM_TOKEN environment variable.
//
// Token setup (once): create a Meta app → add "Instagram" product with
// Instagram Login → generate a long-lived user token (valid ~60 days) and set
//   INSTAGRAM_TOKEN=...   (locally in .env, and in the Cloudflare Pages build env)
// Long-lived tokens must be refreshed before they expire:
//   GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=TOKEN
//
// This is intentionally fail-soft: any problem (no token, network error, API
// error, unexpected shape) returns [] so the build succeeds and the homepage
// carousel falls back to its static status-feed.

export interface InstaPost {
  id: string
  caption: string
  permalink: string
  image: string
  timestamp: string
}

const GRAPH_FIELDS =
  'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'

function getToken(): string | undefined {
  return (
    import.meta.env.INSTAGRAM_TOKEN ??
    (typeof process !== 'undefined' ? process.env?.INSTAGRAM_TOKEN : undefined)
  )
}

export async function getInstagramPosts(limit = 6): Promise<InstaPost[]> {
  const token = getToken()
  if (!token) return []

  try {
    const url =
      `https://graph.instagram.com/me/media` +
      `?fields=${GRAPH_FIELDS}&limit=${limit}&access_token=${token}`

    const res = await fetch(url)
    if (!res.ok) {
      console.warn(`[instagram] API responded ${res.status} — using fallback`)
      return []
    }

    const json = (await res.json()) as { data?: unknown }
    if (!Array.isArray(json.data)) return []

    return (json.data as Record<string, string>[])
      .map((m) => {
        const isVideo = m.media_type === 'VIDEO'
        const image = isVideo ? (m.thumbnail_url ?? m.media_url) : m.media_url
        return {
          id: m.id,
          caption: (m.caption ?? '').trim(),
          permalink: m.permalink ?? 'https://www.instagram.com/epazingha',
          image,
          timestamp: m.timestamp ?? '',
        }
      })
      .filter((p): p is InstaPost => Boolean(p.image))
      .slice(0, limit)
  } catch (err) {
    console.warn('[instagram] fetch error — using fallback:', err)
    return []
  }
}
