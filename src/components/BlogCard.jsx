import { Link } from 'react-router-dom'
import { urlFor } from '../sanityClient'

export default function BlogCard({ post, variant = 'dark' }) {
  const styles =
    variant === 'auto'
      ? {
          card: 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 hover:border-indigo-300 dark:hover:border-slate-500',
          title: 'text-slate-900 dark:text-slate-100',
          date: 'text-slate-500 dark:text-slate-400',
        }
      : {
          card: 'border-slate-700 bg-slate-900/40 hover:border-slate-500',
          title: 'text-white',
          date: 'text-slate-400',
        }

  return (
    <Link
      to={`/blogs/${post.slug}`}
      className={`group border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${styles.card}`}
    >
      {post.mainImage && (
        <div className="overflow-hidden">
          <img
            src={urlFor(post.mainImage).width(600).height(340).url()}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5">
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