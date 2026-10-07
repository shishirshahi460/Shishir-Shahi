import { Link } from 'react-router-dom'
import { Mail, ArrowRight } from 'lucide-react'

const EMAIL = 'shishirshahi05@gmail.com'

// ─── Social icons (SVG) ───────────────────────────────────────────
const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)
const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)
const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)
const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)
const YoutubeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)
const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.19 8.19 0 004.79 1.52V6.82a4.85 4.85 0 01-1.02-.13z" />
  </svg>
)

// ─── Social links (ContactPage bata) ──────────────────────────────
const SOCIALS = [
  {
    name: 'LinkedIn',
    href: 'https://np.linkedin.com/in/shishirshahi',
    icon: <LinkedinIcon size={18} />,
    hover: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/shishirshahi460',
    icon: <GithubIcon size={18} />,
    hover: 'hover:bg-slate-900 hover:border-slate-900 dark:hover:bg-white dark:hover:border-white dark:hover:text-slate-900',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/shishir.05',
    icon: <InstagramIcon size={18} />,
    hover: 'hover:bg-[#E1306C] hover:border-[#E1306C]',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/ShishirShahiVlogs',
    icon: <FacebookIcon size={18} />,
    hover: 'hover:bg-[#1877F2] hover:border-[#1877F2]',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@shishir.05',
    icon: <YoutubeIcon size={18} />,
    hover: 'hover:bg-[#FF0000] hover:border-[#FF0000]',
  },
  {
    name: 'TikTok',
    href: 'https://vt.tiktok.com/ZSdKeg41R/',
    icon: <TikTokIcon size={18} />,
    hover: 'hover:bg-black hover:border-black dark:hover:bg-white dark:hover:border-white dark:hover:text-black',
  },
]

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
  return (
    <footer className="relative overflow-hidden bg-[#f8f9ff] text-slate-700 dark:bg-slate-950 dark:text-slate-300 transition-colors">
      {/* Mathi ko gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent dark:via-indigo-500" />

      {/* Halka background blob (Home sanga milne) */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl dark:bg-indigo-900/20" />
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-purple-100/50 blur-3xl dark:bg-purple-900/15" />

      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Naam, parichay ra social icons */}
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

            <div className="mt-6 flex flex-wrap gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:text-white hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 ${s.hover}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
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
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Have a project or idea in mind? Let&apos;s talk.
            </p>
            <Link
              to="/contact"
              className="group mt-5 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500"
            >
              Contact Me
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}