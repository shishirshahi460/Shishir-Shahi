import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { Share2, Link2, Check } from 'lucide-react'
import { client, urlFor } from '../sanityClient'

function getYouTubeId(url = '') {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)
  return m ? m[1] : null
}

const components = {
  types: {
    image: ({ value }) => (
      <img
        src={urlFor(value).width(1000).url()}
        alt={value.alt || ''}
        className="my-6 rounded-lg w-full"
      />
    ),
    youtube: ({ value }) => {
      const id = getYouTubeId(value.url)
      if (!id) return null
      return (
        <div className="my-6 aspect-video">
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video"
            allowFullScreen
          />
        </div>
      )
    },
    videoFile: ({ value }) =>
      value.url ? (
        <video controls className="my-6 w-full rounded-lg" src={value.url} />
      ) : null,
    attachment: ({ value }) =>
      value.url ? (
        <a
          href={`${value.url}?dl=`}
          className="not-prose inline-block my-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {value.label || 'Download file'}
        </a>
      ) : null,
    table: ({ value }) => {
      const rows = value?.rows || []
      if (rows.length === 0) return null
      const [head, ...bodyRows] = rows
      return (
        <div className="not-prose my-6 overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800 text-white">
              <tr>
                {(head.cells || []).map((c, i) => (
                  <th key={i} className="px-4 py-3 font-semibold">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((r, ri) => (
                <tr key={r._key || ri} className="border-t border-slate-700">
                  {(r.cells || []).map((c, ci) => (
                    <td key={ci} className="px-4 py-3 text-slate-200">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
  },
  block: {
    small: ({ children }) => <p className="text-sm">{children}</p>,
    large: ({ children }) => <p className="text-2xl leading-relaxed">{children}</p>,
  },
  marks: {
    highlight: ({ children }) => (
      <mark className="bg-yellow-300 text-slate-900 px-1 rounded">{children}</mark>
    ),
    link: ({ value, children }) => (
      <a href={value.href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ),
  },
}

function ShareButtons({ title }) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const enc = encodeURIComponent

  const links = [
    { name: 'WhatsApp', href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { name: 'X', href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}` },
  ]

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error(err)
    }
  }

  const nativeShare = () => {
    navigator.share({ title, url }).catch(() => {})
  }

  const btn =
    'inline-flex items-center gap-2 rounded-full border border-slate-600 px-4 py-2 text-sm font-semibold hover:border-indigo-400 hover:text-indigo-400 transition'

  return (
    <div className="mt-12 border-t border-slate-700 pt-6">
      <p className="text-sm font-bold uppercase tracking-wide text-slate-400 mb-3">
        Share this post
      </p>
      <div className="flex flex-wrap gap-3">
        {typeof navigator !== 'undefined' && navigator.share && (
          <button onClick={nativeShare} className={btn}>
            <Share2 size={15} /> Share
          </button>
        )}
        {links.map((l) => (
          <a key={l.name} href={l.href} target="_blank" rel="noreferrer" className={btn}>
            {l.name}
          </a>
        ))}
        <button onClick={copyLink} className={btn}>
          {copied ? <Check size={15} /> : <Link2 size={15} />}
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    client
      .fetch(
        `*[_type=="post" && slug.current==$slug][0]{
          title, publishedAt, mainImage, tags,
          "author": author->{name, image},
          "categories": categories[]->title,
          "plain": pt::text(body),
          body[]{
            ...,
            _type=="videoFile" => { ..., "url": asset->url },
            _type=="attachment" => { ..., "url": asset->url }
          }
        }`,
        { slug }
      )
      .then(setPost)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <p className="pt-10 text-center">Loading...</p>
  if (!post) return <p className="pt-10 text-center">Post not found.</p>

  const description = (post.plain || '').replace(/\s+/g, ' ').trim().slice(0, 160)
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : ''
  const pageTitle = `${post.title} | Shishir Shahi`

  return (
    <article className="max-w-3xl mx-auto px-4 pt-10 pb-12">
      {/* SEO tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      <Link to="/blogs" className="text-blue-400 text-sm">← Back to Blogs</Link>
      <h1 className="text-4xl font-bold mt-4 mb-4">{post.title}</h1>

      {/* Author + date */}
      <div className="flex items-center gap-3 mb-6">
        {post.author?.image && (
          <img
            src={urlFor(post.author.image).width(80).height(80).url()}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div className="text-sm">
          {post.author?.name && <p className="font-semibold">By {post.author.name}</p>}
          {post.publishedAt && (
            <p className="text-slate-400">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {post.categories?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.filter(Boolean).map((c) => (
            <span
              key={c}
              className="rounded-full bg-indigo-500/15 text-indigo-300 px-3 py-1 text-xs font-semibold"
            >
              {c}
            </span>
          ))}
        </div>
      )}

      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-slate-600 text-slate-300 px-3 py-1 text-xs"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      {post.mainImage && (
        <img
          src={urlFor(post.mainImage).width(1000).url()}
          alt={post.title}
          className="rounded-lg mb-8 w-full"
        />
      )}

      <div className="prose prose-lg prose-invert max-w-none">
        <PortableText value={post.body} components={components} />
      </div>

      <ShareButtons title={post.title} />
    </article>
  )
}