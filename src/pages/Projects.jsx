import React, { useEffect, useRef, useState } from 'react';
import {
  GitBranch, ExternalLink, Globe, ShoppingCart,
  GraduationCap, UtensilsCrossed, MessageSquare, BookOpen,
  CheckSquare, Star, Layers, Clock, Code2
} from 'lucide-react';

// Alias so the rest of the file works unchanged
const Github = GitBranch;

// ─── Reusable: fade-in on scroll ────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Reusable: Tech Badge ────────────────────────────────────────
function TechBadge({ label }) {
  return (
    <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold
                     bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400
                     border border-slate-200 dark:border-slate-700">
      {label}
    </span>
  );
}

// ─── Reusable: Project Card ──────────────────────────────────────
function ProjectCard({ project, index }) {
  const [ref, visible] = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col bg-white dark:bg-slate-900/70 backdrop-blur
                 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden
                 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-400"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hovered ? 'translateY(-8px)' : 'translateY(0)')
          : 'translateY(36px)',
        transition: `opacity 0.65s ease ${index * 80}ms, transform 0.35s ease, box-shadow 0.35s ease`,
      }}
    >
      {/* ── Card top colour strip + icon ── */}
      <div className={`relative h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/10" />

        {/* Icon */}
        <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
          {project.icon}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold">
            <Star size={11} fill="currentColor" />
            Featured
          </div>
        )}

        {/* Category label */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
          {project.category}
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map(t => <TechBadge key={t} label={t} />)}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                               text-sm font-bold border-2 border-slate-200 dark:border-slate-700
                               text-slate-700 dark:text-slate-300
                               hover:border-indigo-400 dark:hover:border-indigo-500
                               hover:text-indigo-600 dark:hover:text-indigo-400
                               hover:bg-indigo-50 dark:hover:bg-indigo-950/30
                               transition-all duration-200">
              <Github size={15} />
              GitHub
            </button>
          </a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1">
            <button className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                               text-sm font-bold text-white
                               bg-gradient-to-r ${project.gradient}
                               hover:opacity-90 hover:shadow-lg
                               transition-all duration-200`}>
              <ExternalLink size={15} />
              Live Demo
            </button>
          </a>
        </div>
      </div>

      {/* Bottom gradient accent on hover */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </div>
  );
}

// ─── Project Data ────────────────────────────────────────────────
const projects = [
  {
    title: 'My Portfolio Website',
    description: 'A modern, fully responsive developer portfolio built with React and Tailwind CSS. Features smooth animations, dark mode support, project showcase, and a clean minimal design to highlight skills and experience.',
    tech: ['React', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
    github: 'https://github.com/shishirshahi460/portfolio',
    demo: 'https://shishirshahi.dev',
    icon: <Globe size={28} />,
    gradient: 'from-indigo-500 to-violet-600',
    category: 'Web App',
    featured: true,
  },
  {
    title: 'Todo App',
    description: 'A feature-rich task management application with CRUD operations, priority levels, due dates, and local storage persistence. Clean UI with real-time filtering and category-based organisation.',
    tech: ['React', 'Tailwind CSS', 'LocalStorage', 'Context API'],
    github: 'https://github.com/shishirshahi460/todo-app',
    demo: 'https://todo.shishirshahi.dev',
    icon: <CheckSquare size={28} />,
    gradient: 'from-emerald-500 to-teal-600',
    category: 'Productivity',
    featured: false,
  },
  {
    title: 'Travel Booking App',
    description: 'A full-stack travel booking platform with destination search, tour packages, booking management, user authentication, and payment integration. Built with a modern REST API backend.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    github: 'https://github.com/shishirshahi460/travel-booking',
    demo: 'https://travel.shishirshahi.dev',
    icon: <Globe size={28} />,
    gradient: 'from-sky-500 to-blue-600',
    category: 'Full-Stack',
    featured: true,
  },
  {
    title: 'Ecommerce App',
    description: 'A production-ready ecommerce application with product listing, cart management, order tracking, admin dashboard, and secure payment processing. Supports user authentication and role-based access.',
    tech: ['React', 'Laravel', 'MySQL', 'Stripe', 'Redux'],
    github: 'https://github.com/shishirshahi460/ecommerce-app',
    demo: 'https://shop.shishirshahi.dev',
    icon: <ShoppingCart size={28} />,
    gradient: 'from-rose-500 to-pink-600',
    category: 'Full-Stack',
    featured: true,
  },
  {
    title: 'University Web App',
    description: 'A comprehensive university management system with student portals, course registration, grade management, timetable scheduling, and a faculty dashboard. Role-based access for admins, faculty, and students.',
    tech: ['React', 'Django', 'PostgreSQL', 'REST API', 'JWT'],
    github: 'https://github.com/shishirshahi460/university-app',
    demo: 'https://university.shishirshahi.dev',
    icon: <GraduationCap size={28} />,
    gradient: 'from-amber-500 to-orange-600',
    category: 'Web App',
    featured: false,
  },
  {
    title: 'Restaurant Management System',
    description: 'A complete restaurant management solution with digital menus, table booking, order management, kitchen display integration, POS billing, and real-time inventory tracking for staff and managers.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Tailwind'],
    github: 'https://github.com/shishirshahi460/restaurant-management',
    demo: 'https://restaurant.shishirshahi.dev',
    icon: <UtensilsCrossed size={28} />,
    gradient: 'from-fuchsia-500 to-purple-600',
    category: 'Full-Stack',
    featured: false,
  },
  {
    title: 'Chat Application',
    description: 'A real-time messaging application with private and group chats, media sharing, read receipts, online presence indicators, and push notifications. Built with WebSockets for instant message delivery.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'JWT'],
    github: 'https://github.com/shishirshahi460/chat-app',
    demo: 'https://chat.shishirshahi.dev',
    icon: <MessageSquare size={28} />,
    gradient: 'from-cyan-500 to-sky-600',
    category: 'Real-Time',
    featured: false,
  },
  {
    title: 'Online Learning Platform',
    description: 'A scalable e-learning platform with course creation, video streaming, interactive quizzes, progress tracking, certificates, and student-instructor messaging. Supports free and paid course models with Stripe checkout.',
    tech: ['React', 'Node.js', 'MongoDB', 'AWS S3', 'Stripe'],
    github: 'https://github.com/shishirshahi460/learning-platform',
    demo: 'https://learn.shishirshahi.dev',
    icon: <BookOpen size={28} />,
    gradient: 'from-lime-500 to-emerald-600',
    category: 'Full-Stack',
    featured: true,
  },
];

const stats = [
  { value: '50+', label: 'Projects Completed', icon: <Layers size={18} /> },
  { value: '8+', label: 'Tech Stacks Used', icon: <Code2 size={18} /> },
  { value: '100%', label: 'Client Satisfaction', icon: <Star size={18} /> },
  { value: '2+', label: 'Years Experience', icon: <Clock size={18} /> },
];

// ─── Main Component ──────────────────────────────────────────────
export default function Projects() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState('All');

  // Start at the top when arriving from the Home page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const categories = ['All', 'Full-Stack', 'Web App', 'Real-Time', 'Productivity'];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#f7f8ff] dark:bg-[#0b0d1a] text-slate-900 dark:text-slate-100 overflow-x-hidden">

      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-indigo-200/35 dark:bg-indigo-900/15 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[420px] h-[420px] rounded-full bg-violet-200/30 dark:bg-violet-900/12 blur-3xl" />
        <div className="absolute bottom-32 left-1/4 w-[380px] h-[380px] rounded-full bg-sky-200/25 dark:bg-sky-900/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 py-20 lg:py-28">

        {/* ══════════════════════════════════════════
            HERO HEADER
        ══════════════════════════════════════════ */}
        <div
          className="text-center mb-20"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.75s ease, transform 0.75s ease',
          }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400 mb-4">
            My Work
          </span>
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            Featured{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                Projects
              </span>
              <svg className="absolute -bottom-1 left-0 w-full" height="5" viewBox="0 0 320 5" preserveAspectRatio="none">
                <path d="M0 2.5 Q80 0 160 2.5 Q240 5 320 2.5" stroke="url(#ul)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <defs>
                  <linearGradient id="ul" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10">
            A curated collection of projects I've built — spanning full-stack web apps, mobile applications,
            real-time systems, and more. Each one reflects my commitment to clean code and great user experiences.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-4 justify-center">
            {stats.map(({ value, label, icon }) => (
              <div key={label}
                className="inline-flex items-center gap-3 bg-white dark:bg-slate-800/70 backdrop-blur
                           border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3 shadow-sm">
                <span className="text-indigo-500">{icon}</span>
                <div className="text-left">
                  <div className="text-xl font-black text-slate-800 dark:text-slate-100 leading-none">{value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            FILTER TABS
        ══════════════════════════════════════════ */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-12"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.75s ease 0.2s',
          }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 border
                ${filter === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent shadow-lg shadow-indigo-500/25'
                  : 'bg-white dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
            >
              {cat}
              {cat === 'All' && (
                <span className="ml-2 text-xs opacity-70">({projects.length})</span>
              )}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            PROJECT GRID
        ══════════════════════════════════════════ */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400 dark:text-slate-600">
            <Layers size={40} className="mx-auto mb-3 opacity-40" />
            <p className="font-medium">No projects in this category yet.</p>
          </div>
        )}

        {/* ══════════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════════ */}
        <div className="mt-24 relative bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700
                        rounded-3xl p-10 md:p-16 text-center overflow-hidden shadow-2xl shadow-indigo-500/30">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
              Have a Project in Mind?
            </h2>
            <p className="text-indigo-200 max-w-md mx-auto mb-8 text-sm md:text-base leading-relaxed">
              I'm always open to new opportunities and collaborations. Let's build something amazing together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:shishirshahi@email.com">
                <button className="flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50
                                   px-8 py-3.5 rounded-2xl font-bold transition-all hover:-translate-y-0.5 shadow-lg">
                  Get in Touch
                  <ExternalLink size={15} />
                </button>
              </a>
              <a href="https://github.com/shishirshahi460" target="_blank" rel="noopener noreferrer">
                <button className="flex items-center gap-2 border-2 border-white/40 hover:border-white/70
                                   text-white px-8 py-3.5 rounded-2xl font-bold transition-all
                                   hover:-translate-y-0.5 backdrop-blur">
                  <Github size={16} />
                  View GitHub
                </button>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}