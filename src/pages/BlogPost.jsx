import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
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

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(
        `*[_type=="post" && slug.current==$slug][0]{
          title, publishedAt, mainImage,
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

  return (
    <article className="max-w-3xl mx-auto px-4 pt-10 pb-12">
      <Link to="/blogs" className="text-blue-400 text-sm">← Back to Blogs</Link>
      <h1 className="text-4xl font-bold mt-4 mb-6">{post.title}</h1>
      {post.publishedAt && (
        <p className="text-slate-400 mb-6">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
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
    </article>
  )
}