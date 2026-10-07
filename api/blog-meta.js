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
  const query = `*[_type=="post" && slug.current==$slug][0]{
    title,
    "plain": pt::text(body),
    "image": mainImage.asset->url
  }`
  const url =
    `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}` +
    `?query=${encodeURIComponent(query)}&$slug=${encodeURIComponent(JSON.stringify(slug))}`
  const res = await fetch(url)
  if (!res.ok) return null
  const json = await res.json()
  return json.result || null
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

  try {
    const post = slug ? await getPost(slug) : null
    if (post && post.title) {
      const title = `${post.title} | Shishir Shahi`
      const description = (post.plain || '').replace(/\s+/g, ' ').trim().slice(0, 160)
      const image = post.image
        ? `${post.image}?w=1200&h=630&fit=crop&auto=format`
        : `${SITE}/og-image.jpg`
      const pageUrl = `${SITE}/blogs/${encodeURIComponent(slug)}`

      html = html
        .replace(/<title>[\s\S]*?<\/title>/, '')
        .replace(/<link\s+rel="canonical"[^>]*>/, '')
        .replace(/<meta\s+(?:name|property)="(?:description|og:[a-z:]+|twitter:[a-z:]+)"[\s\S]*?\/>/g, '')

      const tags = `
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${esc(pageUrl)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${esc(pageUrl)}" />
    <meta property="og:title" content="${esc(post.title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${esc(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(post.title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${esc(image)}" />
  `
      html = html.replace('</head>', `${tags}</head>`)
    }
  } catch (err) {
    console.error(err)
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600')
  res.status(200).send(html)
}
