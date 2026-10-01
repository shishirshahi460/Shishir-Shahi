import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Smartphone, Database, Layout, Globe, ArrowRight, Download } from 'lucide-react';
import profileImg from "../assets/1.jpeg";
import LatestBlogs from "../components/LatestBlogs";

const Home = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const skills = [
    {
      name: "Web Development",
      icon: <Globe size={22} />,
      desc: "React, Next.js, modern full-stack web apps",
      color: "from-blue-500 to-cyan-400",
      bg: "bg-blue-50 dark:bg-blue-950/40",
      border: "border-blue-100 dark:border-blue-900/50",
    },
    {
      name: "Mobile App Development",
      icon: <Smartphone size={22} />,
      desc: "Cross-platform apps with React Native & Flutter",
      color: "from-violet-500 to-purple-400",
      bg: "bg-violet-50 dark:bg-violet-950/40",
      border: "border-violet-100 dark:border-violet-900/50",
    },
    {
      name: "API & Backend",
      icon: <Database size={22} />,
      desc: "RESTful APIs, Node.js, Django, Laravel",
      color: "from-emerald-500 to-teal-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "border-emerald-100 dark:border-emerald-900/50",
    },
    {
      name: "UI/UX Improvements",
      icon: <Layout size={22} />,
      desc: "Pixel-perfect, accessible, responsive design",
      color: "from-rose-500 to-pink-400",
      bg: "bg-rose-50 dark:bg-rose-950/40",
      border: "border-rose-100 dark:border-rose-900/50",
    },
    {
      name: "Database Management",
      icon: <Code size={22} />,
      desc: "MySQL, PostgreSQL, MongoDB & schema design",
      color: "from-amber-500 to-orange-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-100 dark:border-amber-900/50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors overflow-hidden">

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">

        {/* Subtle background blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-100/60 dark:bg-indigo-900/20 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 right-0 w-[380px] h-[380px] rounded-full bg-purple-100/50 dark:bg-purple-900/15 blur-3xl" />

        <div
          className="relative flex flex-col-reverse lg:flex-row items-center gap-14 lg:gap-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {/* ── Left: Text Content ── */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-7 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              Available for Collaborations
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] mb-6">
              Hi, I'm{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                  Shishir Shahi
                </span>
                {/* underline accent */}
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none">
                  <path d="M0 3 Q75 0 150 3 Q225 6 300 3" stroke="url(#ug)" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <defs>
                    <linearGradient id="ug" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
              A passionate <strong className="text-slate-800 dark:text-slate-200 font-semibold">Software Engineer</strong>, BIT graduate, and MCS student with hands-on experience in web and mobile application development — building clean, scalable digital solutions that solve real problems.
            </p>

            <blockquote className="text-sm md:text-base text-slate-500 dark:text-slate-500 italic border-l-4 border-indigo-400 pl-4 mb-10 max-w-md mx-auto lg:mx-0">
              "I combine academic learning with practical project work to deliver reliable and modern software. I believe in continuous learning, clean code, and professional communication."
            </blockquote>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {/* Opens the Projects page */}
              <Link
                to="/projects"
                className="group flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5"
              >
                View Projects
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Put your resume at public/resume.pdf */}
              <a href="/resume.pdf" download>
                <button className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all hover:-translate-y-0.5 shadow-sm">
                  <Download size={16} />
                  Download Resume
                </button>
              </a>
            </div>
          </div>

          {/* ── Right: Profile Photo ── */}
          <div className="flex-shrink-0 flex justify-center">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-500 blur-xl opacity-40 dark:opacity-50 animate-pulse" />

              {/* Gradient border ring */}
              <div className="relative p-1 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 shadow-2xl shadow-indigo-500/30">
                <div className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 flex items-center justify-center">
                  <img
                    src={profileImg}
                    alt="Shishir Shahi"
                    className="w-48 h-48 md:w-60 md:h-60 rounded-full object-cover border-4 border-indigo-500 shadow-xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Floating badge — top right */}
              <div className="absolute -top-2 -right-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-3 py-1.5 shadow-lg text-xs font-bold text-indigo-600 dark:text-indigo-400">
                MCS Student 🎓
              </div>

              {/* Floating badge — bottom left */}
              <div className="absolute -bottom-2 -left-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-3 py-1.5 shadow-lg text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Open to Work ✅
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Skills Section ───────────────────────────────────── */}
      <section
        className="mx-auto max-w-7xl px-6 pb-24"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
        }}
      >
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3">
            What I Bring to the Table
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Core{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm md:text-base">
            A blend of technologies and disciplines I work with to deliver high-quality software.
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className={`group relative flex flex-col gap-3 p-6 rounded-2xl border ${skill.bg} ${skill.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default`}
              style={{
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {skill.icon}
              </div>

              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base leading-snug mb-1">
                  {skill.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {skill.desc}
                </p>
              </div>

              {/* Gradient hover accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Latest Blogs Section ──────────────────────────────────── */}
      <LatestBlogs />
    </div>
  );
};

export default Home;