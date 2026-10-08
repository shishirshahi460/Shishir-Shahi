const PROJECT_ID = 'bgl56kqx'
const DATASET = 'production'
const SITE = 'https://www.shishirshahi.com.np'

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

async function getPost(slug) {
  const params = new URLSearchParams()
  params.set(
    'query',
    '*[_type=="post" && slug.current==$slug][0]{ title, "plain": pt::text(body), "image": mainImage.asset->url }'
  )
  params.set('$slug', JSON.stringify(slug))
  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?${params.toString()}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sanity ${res.status}`)
  const json = await res.json()
  return json.result || null
}

// Tag cha vane badalne, chhaina vane </head> aghi thapne
function setMeta(html, key, value, content) {
  const tag = `<meta ${key}="${value}" content="${esc(content)}" />`
  const re = new RegExp(`<meta[^>]*${key}="${value}"[^>]*>`, 'i')
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

export default async function handler(req, res) {
  const slug = String(req.query.slug || '')
  const origin = `https://${req.headers.host}`

  let html = ''
  try {
    html = await (await fetch(`${origin}/index.html`)).text()
  } catch (err) {
    res.status(500).send('Unable to load page')
    return
  }

  let status = 'no-slug'
  try {
    const post = slug ? await getPost(slug) : null
    if (post && post.title) {
      const title = `${post.title} | Shishir Shahi`
      const description = (post.plain || '').replace(/\s+/g, ' ').trim().slice(0, 160)
      const image = post.image
        ? `${post.image}?w=1200&h=630&fit=crop&auto=format`
        : `${SITE}/og-image.jpg`
      const pageUrl = `${SITE}/blogs/${encodeURIComponent(slug)}`

      html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`)
      html = html.replace(
        /<link[^>]*rel="canonical"[^>]*>/i,
        `<link rel="canonical" href="${esc(pageUrl)}" />`
      )
      html = setMeta(html, 'name', 'description', description)
      html = setMeta(html, 'property', 'og:type', 'article')
      html = setMeta(html, 'property', 'og:url', pageUrl)
      html = setMeta(html, 'property', 'og:title', post.title)
      html = setMeta(html, 'property', 'og:description', description)
      html = setMeta(html, 'property', 'og:image', image)
      html = setMeta(html, 'name', 'twitter:card', 'summary_large_image')
      html = setMeta(html, 'name', 'twitter:title', post.title)
      html = setMeta(html, 'name', 'twitter:description', description)
      html = setMeta(html, 'name', 'twitter:image', image)
      status = 'post-found'
    } else {
      status = 'post-not-found'
    }
  } catch (err) {
    status = `error: ${err.message}`
  }

  if (req.query.debug) {
    res.status(200).json({ slug, status })
    return
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600')
  res.setHeader('X-Meta-Status', status)
  res.status(200).send(html)
}
