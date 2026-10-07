import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { client } from '../sanityClient'
import BlogCard from '../components/BlogCard'

export default function Blogs() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    client
      .fetch(
        `*[_type=="post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc){
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

  const categories = useMemo(() => {
    const set = new Set()
    posts.forEach((p) => (p.categories || []).filter(Boolean).forEach((c) => set.add(c)))
    return ['All', ...Array.from(set)]
  }, [posts])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((p) => {
      const cats = (p.categories || []).filter(Boolean)
      const matchesCategory = activeCategory === 'All' || cats.includes(activeCategory)
      const matchesQuery =
        !q ||
        (p.title || '').toLowerCase().includes(q) ||
        cats.some((c) => c.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [posts, query, activeCategory])

  const hasFilters = query.trim() !== '' || activeCategory !== 'All'

  return (
    <div className="min-h-screen bg-[#f8f9ff] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <title>Blogs | Shishir Shahi</title>
      <meta
        name="description"
        content="Thoughts, lessons and stories from Shishir Shahi on technology, career and education."
      />

      <div className="max-w-6xl mx-auto px-4 pt-10 pb-16">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
            Blogs
          </span>
        </h1>

        {loading ? (
          <p className="text-slate-500 dark:text-slate-400">Loading...</p>
        ) : (
          <>
            {/* Search */}
            <div className="relative mb-5 max-w-md">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blogs..."
                className="w-full rounded-full border border-slate-300 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-400 transition dark:border-slate-700 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            {/* Category chips */}
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold border transition ${
                      activeCategory === c
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-slate-300 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-600 dark:text-slate-300 dark:hover:text-indigo-300'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            {posts.length === 0 && (
              <p className="text-slate-500 dark:text-slate-400">No posts yet.</p>
            )}

            {posts.length > 0 && filtered.length === 0 && (
              <div className="text-slate-500 dark:text-slate-400">
                <p>No blogs match your search.</p>
                {hasFilters && (
                  <button
                    onClick={() => {
                      setQuery('')
                      setActiveCategory('All')
                    }}
                    className="mt-3 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <BlogCard key={p.slug} post={p} variant="auto" />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}