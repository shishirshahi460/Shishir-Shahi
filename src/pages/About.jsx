import React, { useEffect, useState, useRef } from 'react';
import profileImg from "../assets/1.jpeg";
import {
  Code2, Smartphone, Database, Layout, Globe, GraduationCap,
  Briefcase, Target, Award, BookOpen, ChevronRight, ExternalLink,
  Calendar, MapPin, Zap, Heart, Coffee, Star
} from 'lucide-react';

// ─── Reusable: fade-in on scroll ────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Reusable: Section Wrapper ───────────────────────────────────
function Section({ children, className = '', delay = 0 }) {
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
      <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-slate-50 mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────
const techStack = [
  { label: 'React', color: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 border-sky-200 dark:border-sky-800' },
  { label: 'Next.js', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' },
  { label: 'React Native', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800' },
  { label: 'Flutter', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
  { label: 'Node.js', color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800' },
  { label: 'Laravel', color: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-800' },
  { label: 'Django', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
  { label: 'MySQL', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 border-orange-200 dark:border-orange-800' },
  { label: 'PostgreSQL', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' },
  { label: 'MongoDB', color: 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300 border-lime-200 dark:border-lime-800' },
  { label: 'Tailwind CSS', color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300 border-teal-200 dark:border-teal-800' },
  { label: 'TypeScript', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200 border-blue-200 dark:border-blue-800' },
  { label: 'Git & GitHub', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
  { label: 'REST APIs', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800' },
  { label: 'Figma', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300 border-pink-200 dark:border-pink-800' },
];

const skillCards = [
  { icon: <Globe size={24} />, title: 'Web Development', desc: 'Building responsive, performant web apps with React, Next.js, and modern tooling.', gradient: 'from-sky-500 to-blue-600' },
  { icon: <Smartphone size={24} />, title: 'Mobile Development', desc: 'Cross-platform mobile experiences with React Native and Flutter.', gradient: 'from-violet-500 to-purple-600' },
  { icon: <Database size={24} />, title: 'Backend & APIs', desc: 'RESTful API design with Node.js, Django, Laravel, and SQL/NoSQL databases.', gradient: 'from-emerald-500 to-teal-600' },
  { icon: <Layout size={24} />, title: 'UI / UX Design', desc: 'Clean, accessible, pixel-perfect interfaces designed in Figma and built with Tailwind.', gradient: 'from-rose-500 to-pink-600' },
  { icon: <Code2 size={24} />, title: 'Database Design', desc: 'Schema design, optimization, and management across relational and document stores.', gradient: 'from-amber-500 to-orange-600' },
  { icon: <Zap size={24} />, title: 'Performance & DevOps', desc: 'Git workflows, CI/CD basics, performance profiling, and deployment pipelines.', gradient: 'from-fuchsia-500 to-purple-600' },
];

const education = [
  {
    degree: 'Master of Computer Science (MCS)',
    school: 'Lincoln University College, Malaysia',
    location: 'Kathmandu, Nepal',
    period: '2026 – Present',
    icon: <GraduationCap size={20} />,
    color: 'from-indigo-500 to-violet-500',
    status: 'Ongoing',
  },
  {
    degree: 'Bachelor of Information Technology (BIT)',
    school: 'Lincoln University College, Malaysia',
    location: 'Kathmandu, Nepal',
    period: '2022 – 2025',
    icon: <BookOpen size={20} />,
    color: 'from-sky-500 to-blue-500',
    status: 'Completed',
  },
];

const achievements = [
  { icon: <Award size={18} />, text: 'Completed 10+ full-stack web & mobile projects', color: 'text-amber-500' },
  { icon: <Star size={18} />, text: 'Active open-source contributor on GitHub', color: 'text-indigo-500' },
  { icon: <Heart size={18} />, text: 'Passionate about clean code & modern UI patterns', color: 'text-rose-500' },
  { icon: <Coffee size={18} />, text: 'Continuously upskilling through courses & self-study', color: 'text-emerald-500' },
];

const goals = [
  { icon: <Target size={18} />, title: 'Short-term', desc: 'Join a growth-oriented team where I can contribute meaningfully to real-world products while deepening my full-stack expertise.', color: 'from-indigo-500 to-blue-500' },
  { icon: <Briefcase size={18} />, title: 'Mid-term', desc: 'Lead feature development on impactful software projects, mentor junior developers, and grow into a senior engineering role.', color: 'from-violet-500 to-purple-500' },
  { icon: <Globe size={18} />, title: 'Long-term', desc: 'Build or contribute to products that genuinely improve people\'s lives, and eventually give back to the developer community through open source and teaching.', color: 'from-rose-500 to-pink-500' },
];

// ─── Main Component ──────────────────────────────────────────────
export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div className="min-h-screen bg-[#f7f8ff] dark:bg-[#0b0d1a] text-slate-900 dark:text-slate-100 overflow-x-hidden">

      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-indigo-200/35 dark:bg-indigo-900/15 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[420px] h-[420px] rounded-full bg-purple-200/30 dark:bg-purple-900/12 blur-3xl" />
        <div className="absolute bottom-32 left-1/4 w-[380px] h-[380px] rounded-full bg-sky-200/25 dark:bg-sky-900/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 py-20 lg:py-28 space-y-28">

        {/* ══════════════════════════════════════════
            1. HERO — Introduction
        ══════════════════════════════════════════ */}
        <Section delay={0}>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Profile photo */}
            <div className="flex-shrink-0 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-500 blur-2xl opacity-40 dark:opacity-50 animate-pulse" />
                <div className="relative p-[3px] rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 shadow-2xl shadow-indigo-500/30">
                  <div className="w-52 h-52 md:w-60 md:h-60 rounded-full overflow-hidden bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 flex items-center justify-center">
                    {/*
                      ✏️ Replace with your real photo:
                      <img src="/profile.jpg" alt="Shishir Shahi" className="w-full h-full object-cover" />
                    */}

                    
                    {/* <img
                      src="https://ui-avatars.com/api/?name=Shishir+Shahi&size=280&background=6366f1&color=ffffff&font-size=0.35&bold=true"
                      alt="Shishir Shahi"
                      className="w-full h-full object-cover"
                    /> */}
                  <img
                  src={profileImg}
                  alt="Shishir Shahi"
                  className="w-48 h-48 md:w-60 md:h-60 rounded-full object-cover border-4 border-indigo-500 shadow-xl hover:scale-105 transition-transform duration-300"
                />


                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-1 -right-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-3 py-1.5 shadow-lg text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  MCS Student 🎓
                </div>
                <div className="absolute -bottom-1 -left-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-3 py-1.5 shadow-lg text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Open to Work ✅
                </div>
              </div>
            </div>

            {/* Intro text */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400 mb-4">
                About Me
              </span>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight leading-[1.07] mb-6">
                Shishir{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                  Shahi
                </span>
              </h1>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-5 max-w-xl mx-auto lg:mx-0">
                I'm a <strong className="text-slate-800 dark:text-slate-200 font-semibold">Software Engineer</strong> based in Kathmandu, Nepal — currently pursuing my Master of Computer Science while actively building real-world web and mobile applications.
              </p>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                I love turning complex problems into clean, intuitive digital experiences. My work is driven by a deep respect for <em className="text-slate-700 dark:text-slate-300">clean code</em>, thoughtful <em className="text-slate-700 dark:text-slate-300">UX</em>, and continuous growth.
              </p>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {[
                  { label: 'BIT Graduate', icon: <GraduationCap size={14} /> },
                  { label: 'Kathmandu, Nepal', icon: <MapPin size={14} /> },
                  { label: '10+ Projects Delivered', icon: <Briefcase size={14} /> },
                  { label: 'MCS — In Progress', icon: <Calendar size={14} /> },
                ].map(({ label, icon }) => (
                  <span key={label}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold
                               bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700
                               text-slate-600 dark:text-slate-300 shadow-sm backdrop-blur">
                    <span className="text-indigo-500">{icon}</span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            2. BACKGROUND & EXPERIENCE
        ══════════════════════════════════════════ */}
        <Section delay={0}>
          <SectionHeader
            eyebrow="My Journey"
            title="Background & Experience"
            subtitle="A blend of academic rigour and hands-on project work across full-stack and mobile development."
          />

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Briefcase size={20} />,
                title: 'Freelance Full-Stack Developer',
                sub: '2022 – Present',
                color: 'from-indigo-500 to-violet-500',
                bullets: [
                  'Delivered 10+ web & mobile projects for clients across Nepal',
                  'Built REST APIs and admin dashboards using Node.js & Laravel',
                  'Integrated payment gateways, auth systems & third-party APIs',
                  'Collaborated with designers to implement pixel-perfect UIs',
                ],
              },
              {
                icon: <Code2 size={20} />,
                title: 'Academic Project Lead',
                sub: '2020 – 2023',
                color: 'from-sky-500 to-blue-500',
                bullets: [
                  'Led teams of 3–5 developers for major academic capstone projects',
                  'Developed a hospital management system with role-based access',
                  'Built a cross-platform mobile app in Flutter with Firebase backend',
                  'Applied Agile methodologies and version control best practices',
                ],
              },
            ].map(({ icon, title, sub, color, bullets }) => (
              <div key={title}
                className="group bg-white dark:bg-slate-900/60 backdrop-blur border border-slate-100 dark:border-slate-800
                           rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-4 mb-5">
                  <div className={`flex-shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base leading-snug">{title}</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {bullets.map(b => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                      <ChevronRight size={14} className="mt-0.5 flex-shrink-0 text-indigo-400" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            3. SKILLS CARDS
        ══════════════════════════════════════════ */}
        <Section delay={0}>
          <SectionHeader
            eyebrow="What I Do"
            title={<>Core <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">Skills</span></>}
            subtitle="A broad set of disciplines I bring to every project — from design to deployment."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillCards.map(({ icon, title, desc, gradient }, i) => (
              <div key={title}
                className="group relative bg-white dark:bg-slate-900/60 backdrop-blur border border-slate-100 dark:border-slate-800
                           rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
                {/* subtle gradient top strip */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                  {icon}
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            4. TECH STACK BADGES
        ══════════════════════════════════════════ */}
        <Section delay={0}>
          <SectionHeader
            eyebrow="Technology"
            title="Tech Stack"
            subtitle="Languages, frameworks, and tools I use day-to-day."
          />

          <div className="flex flex-wrap gap-3 justify-center">
            {techStack.map(({ label, color }) => (
              <span key={label}
                className={`px-4 py-2 rounded-full text-xs font-bold border ${color}
                            hover:scale-105 hover:shadow-md transition-all duration-200 cursor-default`}>
                {label}
              </span>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            5. EDUCATION
        ══════════════════════════════════════════ */}
        <Section delay={0}>
          <SectionHeader
            eyebrow="Academic Background"
            title="Education"
            subtitle="Grounded in computer science fundamentals with a focus on applied software engineering."
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-300 via-violet-300 to-transparent dark:from-indigo-700 dark:via-violet-700" />

            <div className="space-y-6">
              {education.map(({ degree, school, location, period, icon, color, status }) => (
                <div key={degree}
                  className="group flex gap-6 items-start">
                  {/* Timeline dot */}
                  <div className={`hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${color}
                                  items-center justify-center text-white shadow-lg
                                  group-hover:scale-110 transition-transform z-10`}>
                    {icon}
                  </div>

                  <div className="flex-1 bg-white dark:bg-slate-900/60 backdrop-blur border border-slate-100 dark:border-slate-800
                                  rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base leading-snug">{degree}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{school}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold
                                       ${status === 'Ongoing'
                          ? 'bg-indigo-50 text-indigo-600 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800'
                          : 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
                        }`}>
                        {status === 'Ongoing' && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />}
                        {status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-400 dark:text-slate-500 mt-3">
                      <span className="flex items-center gap-1.5"><MapPin size={12} />{location}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={12} />{period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            6. CAREER GOALS
        ══════════════════════════════════════════ */}
        <Section delay={0}>
          <SectionHeader
            eyebrow="Looking Ahead"
            title={<>Career <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">Goals</span></>}
            subtitle="Where I'm headed — professionally and personally — in the years ahead."
          />

          <div className="grid md:grid-cols-3 gap-5">
            {goals.map(({ icon, title, desc, color }) => (
              <div key={title}
                className="group relative bg-white dark:bg-slate-900/60 backdrop-blur border border-slate-100 dark:border-slate-800
                           rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r ${color}`} />
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                  {icon}
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2 text-sm uppercase tracking-wide">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            7. ACHIEVEMENTS / PERSONAL
        ══════════════════════════════════════════ */}
        <Section delay={0}>
          <SectionHeader
            eyebrow="Highlights"
            title="Achievements & Values"
            subtitle="Things that define how I work and what I've accomplished so far."
          />

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {achievements.map(({ icon, text, color }) => (
              <div key={text}
                className="flex items-center gap-4 bg-white dark:bg-slate-900/60 backdrop-blur border border-slate-100 dark:border-slate-800
                           rounded-2xl px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <span className={`flex-shrink-0 ${color}`}>{icon}</span>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            8. CTA
        ══════════════════════════════════════════ */}
        <Section delay={0}>
          <div className="relative bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-3xl p-10 md:p-16 text-center overflow-hidden shadow-2xl shadow-indigo-500/30">
            {/* Decorative orbs inside CTA */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                Let's Build Something Together
              </h2>
              <p className="text-indigo-200 max-w-md mx-auto mb-8 text-sm md:text-base leading-relaxed">
                I'm open to freelance projects, full-time roles, and exciting collaborations. Reach out and let's chat!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="mailto:shishirshahi@email.com">
                  <button className="flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-3.5 rounded-2xl font-bold transition-all hover:-translate-y-0.5 shadow-lg">
                    Get in Touch
                    <ExternalLink size={15} />
                  </button>
                </a>
                <a
                  href="https://docs.google.com/document/d/1AEsxgq2IlWl06_kEpgPZk8xG11TSlwPt/edit?usp=sharing"
                  target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center gap-2 border-2 border-white/40 hover:border-white/70 text-white px-8 py-3.5 rounded-2xl font-bold transition-all hover:-translate-y-0.5 backdrop-blur">
                    Download Resume
                  </button>
                </a>
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}