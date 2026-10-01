import React, { useEffect, useRef, useState } from 'react';
import {
  Layout, Server, Layers, Palette, ShoppingCart, Zap,
  CheckCircle2, Star, GitBranch, ExternalLink, Mail,
  ArrowRight, Code2, Rocket, Shield, Clock, Users, TrendingUp,
  Globe, Download
} from 'lucide-react';

const Github = GitBranch;

// ─── Reusable: fade-in on scroll ────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Reusable: Animated Wrapper ──────────────────────────────────
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Reusable: Section Header ────────────────────────────────────
function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center mb-14">
      <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400 mb-3">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl xl:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-50 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── DATA ────────────────────────────────────────────────────────

const services = [
  {
    icon: <Layout size={26} />,
    title: 'Frontend Development',
    description:
      'Crafting fast, responsive, and visually stunning web interfaces using React and Tailwind CSS. I turn Figma designs into pixel-perfect, accessible, and performant UIs.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    gradient: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-50 dark:bg-sky-950/30 border-sky-100 dark:border-sky-900/40',
    featured: false,
  },
  {
    icon: <Server size={26} />,
    title: 'Backend Development',
    description:
      'Building robust, secure, and scalable server-side systems. From REST API design to database architecture, I handle the full backend lifecycle with Node.js and Laravel.',
    tags: ['Node.js', 'Express', 'Laravel', 'REST APIs'],
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/40',
    featured: false,
  },
  {
    icon: <Layers size={26} />,
    title: 'Full-Stack Web Development',
    description:
      'End-to-end web application development — from database schema and API logic to the final polished UI. I deliver complete, production-ready digital products.',
    tags: ['React', 'Node.js', 'MongoDB', 'MySQL'],
    gradient: 'from-indigo-500 to-violet-600',
    bg: 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/40',
    featured: true,
  },
  {
    icon: <Palette size={26} />,
    title: 'UI / UX Design',
    description:
      'Designing clean, modern, and user-centred interfaces in Figma. I craft design systems, wireframes, and interactive prototypes that look great and feel intuitive.',
    tags: ['Figma', 'Wireframing', 'Prototyping', 'Design Systems'],
    gradient: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/40',
    featured: false,
  },
  {
    icon: <ShoppingCart size={26} />,
    title: 'Ecommerce Development',
    description:
      'Building full-featured online stores with product management, cart systems, order tracking, and secure payment gateway integration (Stripe, eSewa, Khalti).',
    tags: ['React', 'Laravel', 'Stripe', 'MySQL'],
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/40',
    featured: false,
  },
  {
    icon: <Zap size={26} />,
    title: 'Website Optimisation',
    description:
      'Auditing and improving existing websites for speed, SEO, accessibility, and Core Web Vitals. I turn slow, bloated sites into fast, search-engine-friendly experiences.',
    tags: ['Performance', 'SEO', 'Lighthouse', 'Core Web Vitals'],
    gradient: 'from-fuchsia-500 to-purple-600',
    bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30 border-fuchsia-100 dark:border-fuchsia-900/40',
    featured: false,
  },
];

const whyMe = [
  {
    icon: <Code2 size={20} />,
    title: 'Clean & Modern Code',
    desc: 'Every line is written with readability, maintainability, and scalability in mind — no spaghetti, no shortcuts.',
    gradient: 'from-indigo-500 to-violet-600',
  },
  {
    icon: <Clock size={20} />,
    title: 'Fast Delivery',
    desc: 'I respect deadlines. Projects are delivered on time with clear communication and regular progress updates.',
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    icon: <Globe size={20} />,
    title: 'Responsive by Default',
    desc: 'Every product I build is fully responsive — designed and tested across mobile, tablet, and desktop.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: <Shield size={20} />,
    title: 'Scalable Architecture',
    desc: 'I architect solutions that grow with your business — modular, decoupled, and built for the long term.',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: <Users size={20} />,
    title: 'Client-Focused',
    desc: 'Your vision drives every decision. I listen, iterate, and stay available throughout the entire project lifecycle.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: <TrendingUp size={20} />,
    title: 'Continuous Improvement',
    desc: 'I invest in my own growth — staying current with the latest tools, patterns, and best practices in the industry.',
    gradient: 'from-fuchsia-500 to-purple-600',
  },
];

const stats = [
  { value: '50+',  label: 'Projects Completed',       icon: <Rocket size={20} />,  gradient: 'from-indigo-500 to-violet-600' },
  { value: '100%', label: 'Client Satisfaction',       icon: <Star size={20} />,    gradient: 'from-amber-500 to-orange-500' },
  { value: '8+',   label: 'Tech Stacks Mastered',      icon: <Layers size={20} />,  gradient: 'from-sky-500 to-blue-600' },
  { value: '3+',   label: 'Years of Experience',       icon: <TrendingUp size={20} />, gradient: 'from-emerald-500 to-teal-600' },
];

const process = [
  { step: '01', title: 'Discovery',    desc: 'We discuss your goals, requirements, and vision for the project.',        gradient: 'from-indigo-500 to-violet-600' },
  { step: '02', title: 'Planning',     desc: 'I create a detailed roadmap, tech stack selection, and project timeline.', gradient: 'from-sky-500 to-blue-600' },
  { step: '03', title: 'Development',  desc: 'Clean, iterative development with regular demos and progress updates.',     gradient: 'from-emerald-500 to-teal-600' },
  { step: '04', title: 'Delivery',     desc: 'Final testing, deployment, handover, and post-launch support.',            gradient: 'from-rose-500 to-pink-600' },
];

// ─── Service Card ────────────────────────────────────────────────
function ServiceCard({ service, index }) {
  const [ref, visible] = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col bg-white dark:bg-slate-900/70 backdrop-blur
                 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden
                 shadow-sm hover:shadow-2xl transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? 'translateY(-8px)' : 'translateY(0)'
          : 'translateY(36px)',
        transition: `opacity 0.65s ease ${index * 90}ms, transform 0.35s ease, box-shadow 0.35s ease`,
      }}
    >
      {/* Featured banner */}
      {service.featured && (
        <div className={`bg-gradient-to-r ${service.gradient} text-white text-[10px] font-black uppercase tracking-widest text-center py-1.5`}>
          ⭐ Most Popular
        </div>
      )}

      {/* Top gradient strip */}
      <div className={`h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${service.featured ? 'hidden' : ''}`} />

      <div className="flex flex-col flex-1 p-7">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center
                        text-white shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
          {service.icon}
        </div>

        <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-3 leading-snug
                       group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {service.title}
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-1">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.tags.map(tag => (
            <span key={tag}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold
                         bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400
                         border border-slate-200 dark:border-slate-700">
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a href="mailto:shishirshahi@email.com">
          <button className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                             text-sm font-bold text-white bg-gradient-to-r ${service.gradient}
                             hover:opacity-90 hover:shadow-lg transition-all duration-200`}>
            Get Started
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </a>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────
export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div className="min-h-screen bg-[#f7f8ff] dark:bg-[#0b0d1a] text-slate-900 dark:text-slate-100 overflow-x-hidden">

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-indigo-200/35 dark:bg-indigo-900/15 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[420px] h-[420px] rounded-full bg-violet-200/30 dark:bg-violet-900/12 blur-3xl" />
        <div className="absolute bottom-32 left-1/4 w-[380px] h-[380px] rounded-full bg-sky-200/25 dark:bg-sky-900/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 py-20 lg:py-28 space-y-28">

        {/* ══════════════════════════════════════════
            1. HERO
        ══════════════════════════════════════════ */}
        <div
          className="text-center"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.75s ease, transform 0.75s ease',
          }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400 mb-4">
            What I Offer
          </span>

          <h1 className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            My{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                Services
              </span>
              <svg className="absolute -bottom-1 left-0 w-full" height="5" viewBox="0 0 320 5" preserveAspectRatio="none">
                <path d="M0 2.5 Q80 0 160 2.5 Q240 5 320 2.5" stroke="url(#ul-srv)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <defs>
                  <linearGradient id="ul-srv" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-6">
            High-quality web development &amp; UI/UX solutions — tailored to your goals,
            built with modern tools, and delivered with care.
          </p>

          {/* Highlight pill */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                          bg-white dark:bg-slate-800/70 backdrop-blur
                          border border-indigo-100 dark:border-indigo-800
                          text-indigo-600 dark:text-indigo-400 text-sm font-semibold shadow-sm mb-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            Available for New Projects
          </div>

          {/* Quick stats strip */}
          <div className="flex flex-wrap gap-4 justify-center">
            {stats.map(({ value, label, icon, gradient }) => (
              <div key={label}
                className="inline-flex items-center gap-3 bg-white dark:bg-slate-800/70 backdrop-blur
                           border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3 shadow-sm">
                <span className="text-indigo-500">{icon}</span>
                <div className="text-left">
                  <div className={`text-xl font-black leading-none bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                    {value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            2. SERVICES GRID
        ══════════════════════════════════════════ */}
        <div>
          <Reveal>
            <SectionHeader
              eyebrow="Services"
              title={<>What I Can <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">Build For You</span></>}
              subtitle="From design to deployment — I cover the full spectrum of modern web development."
            />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            3. HOW I WORK — Process
        ══════════════════════════════════════════ */}
        <Reveal>
          <SectionHeader
            eyebrow="My Process"
            title={<>How I <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">Work</span></>}
            subtitle="A simple, transparent, and collaborative process — from first conversation to final delivery."
          />

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-300 dark:from-indigo-700 dark:via-violet-700 dark:to-purple-700" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {process.map(({ step, title, desc, gradient }, i) => (
                <Reveal key={step} delay={i * 90}>
                  <div className="group relative bg-white dark:bg-slate-900/60 backdrop-blur border border-slate-100 dark:border-slate-800
                                 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    {/* Step number */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-4
                                    text-white text-xl font-black shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {step}
                    </div>
                    <h3 className="font-black text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══════════════════════════════════════════
            4. WHY CHOOSE ME
        ══════════════════════════════════════════ */}
        <Reveal>
          <SectionHeader
            eyebrow="Why Work With Me"
            title={<>Why <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">Choose Me</span></>}
            subtitle="I don't just write code — I build products. Here's what sets my work apart."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyMe.map(({ icon, title, desc, gradient }, i) => (
              <Reveal key={title} delay={i * 70}>
                <div className="group relative flex gap-4 bg-white dark:bg-slate-900/60 backdrop-blur
                               border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm
                               hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className={`flex-shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br ${gradient}
                                  flex items-center justify-center text-white shadow-md
                                  group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 dark:text-slate-100 mb-1.5 text-sm leading-snug">{title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* ══════════════════════════════════════════
            5. TESTIMONIAL / TRUST STRIP
        ══════════════════════════════════════════ */}
        <Reveal>
          <div className="bg-white dark:bg-slate-900/60 backdrop-blur border border-slate-100 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400 mb-3">
                Trusted By Clients
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100">
                What Clients Say
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  quote: "Shishir delivered our ecommerce platform on time and exceeded every expectation. The code was clean, the design was stunning, and he communicated perfectly throughout.",
                  name: "Client A",
                  role: "Ecommerce Startup, Nepal",
                  gradient: 'from-indigo-500 to-violet-600',
                },
                {
                  quote: "We needed a complex admin dashboard built quickly. Shishir understood the brief immediately, asked the right questions, and delivered something we're genuinely proud of.",
                  name: "Client B",
                  role: "SaaS Product, Remote",
                  gradient: 'from-emerald-500 to-teal-600',
                },
              ].map(({ quote, name, role, gradient }, i) => (
                <Reveal key={name} delay={i * 100}>
                  <div className="relative bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
                    <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${gradient}`} />
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-5">
                      "{quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-black shadow-md`}>
                        {name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 dark:text-slate-100">{name}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">{role}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══════════════════════════════════════════
            6. CTA BANNER
        ══════════════════════════════════════════ */}
        <Reveal>
          <div className="relative bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700
                          rounded-3xl p-10 md:p-16 text-center overflow-hidden shadow-2xl shadow-indigo-500/30">
            {/* Orbs */}
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/5 blur-xl pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-indigo-200 mb-4">
                Ready to Start?
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-black text-white mb-4 tracking-tight">
                Let's Build Something<br className="hidden sm:block" /> Amazing Together
              </h2>
              <p className="text-indigo-200 max-w-lg mx-auto mb-10 text-sm md:text-base leading-relaxed">
                Have a project in mind? Whether it's a new product, a redesign, or an optimisation —
                I'd love to hear about it. Let's turn your vision into reality.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="mailto:shishirshahi@email.com">
                  <button className="flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50
                                     px-8 py-3.5 rounded-2xl font-bold transition-all hover:-translate-y-0.5 shadow-lg">
                    <Mail size={16} />
                    Get in Touch
                    <ExternalLink size={14} />
                  </button>
                </a>
                <a href="https://github.com/shishirshahi460" target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center gap-2 border-2 border-white/40 hover:border-white/80
                                     text-white px-8 py-3.5 rounded-2xl font-bold transition-all
                                     hover:-translate-y-0.5 backdrop-blur">
                    <Github size={16} />
                    GitHub
                  </button>
                </a>
                <a href="https://docs.google.com/document/d/1AEsxgq2IlWl06_kEpgPZk8xG11TSlwPt/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center gap-2 border-2 border-white/40 hover:border-white/80
                                     text-white px-8 py-3.5 rounded-2xl font-bold transition-all
                                     hover:-translate-y-0.5 backdrop-blur">
                    <Download size={16} />
                    Download CV
                  </button>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}



