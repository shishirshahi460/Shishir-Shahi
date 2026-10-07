import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { client } from '../sanityClient'
import BlogCard from './BlogCard'

const LIMIT = 6

export default function LatestBlogs() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(
        `*[_type=="post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)[0...${LIMIT}]{
          title, mainImage,
          "publishedAt": coalesce(publishedAt, _createdAt),
          "slug": slug.current,
          "categories": categories[]->title
        }`
      )
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // Post chhaina (ya fetch fail bhayo) vane section nai lukaune
  if (!loading && posts.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3">
          From the Blog
        </span>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          Latest{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
            Blogs
          </span>
        </h2>
        <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm md:text-base">
          Thoughts, lessons and stories from my journey in technology.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-72 rounded-2xl bg-slate-200 dark:bg-slate-800/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} variant="auto" />
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          to="/blogs"
          className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all"
        >
          See all blogs
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}