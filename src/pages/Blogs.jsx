import { useEffect, useState } from 'react'
import { client } from '../sanityClient'
import BlogCard from '../components/BlogCard'

export default function Blogs() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(
        `*[_type=="post" && defined(slug.current)] | order(publishedAt desc){
          title, publishedAt, mainImage, "slug": slug.current
        }`
      )
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="pt-10 text-center">Loading...</p>

  return (
    <div className="max-w-6xl mx-auto px-4 pt-10 pb-12">
      <h1 className="text-3xl font-bold mb-8">Blogs</h1>
      {posts.length === 0 && <p className="text-slate-400">No posts yet.</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  )
}