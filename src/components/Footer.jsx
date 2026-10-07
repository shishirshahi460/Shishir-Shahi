import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'

// Social link yaha bharnus. Khali ('') rakheko link footer ma dekhindaina.
const SOCIALS = [
  { name: 'LinkedIn', href: '' },
  { name: 'GitHub', href: '' },
  { name: 'Facebook', href: '' },
  { name: 'Instagram', href: '' },
]

const EMAIL = 'shishirshahi05@gmail.com'

const QUICK_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Gallery', path: '/gallery' },
]

export default function Footer() {
  const socials = SOCIALS.filter((s) => s.href)

  return (
    <footer className="relative overflow-hidden bg-[#f8f9ff] text-slate-700 dark:bg-slate-950 dark:text-slate-300 transition-colors">
      {/* Mathi ko gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent dark:via-indigo-500" />

      {/* Halka background blob (Home sanga milne) */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl dark:bg-indigo-900/20" />
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-purple-100/50 blur-3xl dark:bg-purple-900/15" />

      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Naam ra parichay */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-lg font-black text-white shadow-md shadow-indigo-500/30">
                S
              </span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Shishir Shahi
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Full-Stack Software Engineer &amp; Digital Marketer from Kathmandu, Nepal.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.name}>
                  <Link
                    to={l.path}
                    className="text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Get in Touch
            </h3>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
              <Mail size={16} />
              {EMAIL}
            </a>

            {socials.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-600 dark:hover:text-indigo-400"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}