import { writeFileSync } from 'node:fs'

const SITE = 'https://www.shishirshahi.com.np'
const PROJECT_ID = 'bgl56kqx'
const DATASET = 'production'

const staticPages = ['/', '/about', '/projects', '/services', '/contact', '/gallery', '/blogs']

const query = encodeURIComponent(
  '*[_type=="post" && defined(slug.current)]{"slug": slug.current, "updated": _updatedAt}'
)
const url = `https://${PROJECT_ID}.apicdn.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`

let posts = []
try {
  const res = await fetch(url)
  const json = await res.json()
  posts = json.result || []
} catch (err) {
  console.warn('Sitemap: could not fetch blog posts, using static pages only.', err)
}

const today = new Date().toISOString().slice(0, 10)

const urls = [
  ...staticPages.map((p) => ({ loc: `${SITE}${p === '/' ? '/' : p}`, lastmod: today })),
  ...posts.map((p) => ({
    loc: `${SITE}/blogs/${p.slug}`,
    lastmod: (p.updated || today).slice(0, 10),
  })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`)
  .join('\n')}
</urlset>
`

writeFileSync('public/sitemap.xml', xml)
console.log(`Sitemap written with ${urls.length} URLs`)
