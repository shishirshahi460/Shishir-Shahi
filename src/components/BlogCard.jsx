import { Link } from 'react-router-dom'
import { urlFor } from '../sanityClient'

export default function BlogCard({ post, variant = 'dark' }) {
  const styles =
    variant === 'auto'
      ? {
          card: 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 hover:border-indigo-300 dark:hover:border-slate-500',
          title: 'text-slate-900 dark:text-slate-100',
          date: 'text-slate-500 dark:text-slate-400',
          chip: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300',
        }
      : {
          card: 'border-slate-700 bg-slate-900/40 hover:border-slate-500',
          title: 'text-white',
          date: 'text-slate-400',
          chip: 'bg-indigo-500/15 text-indigo-300',
        }

  const categories = (post.categories || []).filter(Boolean).slice(0, 2)

  return (
    <Link
      to={`/blogs/${post.slug}`}
      className={`group border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${styles.card}`}
    >
      {post.mainImage && (
        <div className="overflow-hidden">
          <img
            src={urlFor(post.mainImage).width(600).height(340).url()}
            alt={post.mainImage?.alt || post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((c) => (
              <span
                key={c}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.chip}`}
              >
                {c}
              </span>
            ))}
          </div>
        )}
        <h3 className={`text-lg font-bold leading-snug line-clamp-2 ${styles.title}`}>
          {post.title}
        </h3>
        {post.publishedAt && (
          <p className={`text-sm mt-2 ${styles.date}`}>
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </Link>
  )
}