import React, { useEffect, useRef, useState } from 'react';
import {
  Mail, MapPin, Globe, GitBranch, Send, ArrowRight, ExternalLink,
  MessageSquare, User, AtSign, FileText, CheckCircle2,
  Zap, Heart, Download
} from 'lucide-react';
import emailjs from '@emailjs/browser';

// ─── ✏️  YOUR EMAILJS CREDENTIALS ────────────────────────────────
// 1. Go to https://emailjs.com and create a FREE account
// 2. Add Email Service (Gmail) → copy Service ID
// 3. Create Email Template    → copy Template ID
// 4. Go to Account → API Keys → copy Public Key
// Paste them below:

const EMAILJS_SERVICE_ID  = 'service_sv7w02r';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_fxuuj1k';  // e.g. 'template_xyz456'
const EMAILJS_PUBLIC_KEY  = 'VZGxj0NSlvs0HHvQJ';   // e.g. 'abcDEFghiJKL'
// ─────────────────────────────────────────────────────────────────

// Aliases for unavailable icons in older lucide-react versions
const Github = GitBranch;

// ─── Custom SVG social icons ──────────────────────────────────────
const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const YoutubeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.19 8.19 0 004.79 1.52V6.82a4.85 4.85 0 01-1.02-.13z"/>
  </svg>
);

// ─── Reusable hooks & components ─────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}>
      {children}
    </div>
  );
}

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

// ─── DATA ─────────────────────────────────────────────────────────
const contactInfo = [
  {
    icon: <Mail size={22} />,
    label: 'Email',
    value: 'shishirshahi05@gmail.com',
    href: 'mailto:shishirshahi05@gmail.com',
    gradient: 'from-indigo-500 to-violet-600',
    bg: 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/40',
    desc: 'Drop me an email anytime',
  },
  {
    icon: <MapPin size={22} />,
    label: 'Location',
    value: 'Kathmandu, Nepal',
    href: 'https://maps.google.com/?q=Kathmandu,Nepal',
    gradient: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/40',
    desc: 'Available for remote & local work',
  },
  {
    icon: <Globe size={22} />,
    label: 'Portfolio',
    value: 'shishirshahi.com.np',
    href: 'https://www.shishirshahi.com.np',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/40',
    desc: 'View my full portfolio',
  },
];

const socials = [
  {
    icon: <Github size={22} />,
    label: 'GitHub',
    handle: '@shishirshahi460',
    href: 'https://github.com/shishirshahi460',
    bg: 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700',
    iconBg: 'bg-slate-800 dark:bg-slate-700',
  },
  {
    icon: <LinkedinIcon size={22} />,
    label: 'LinkedIn',
    handle: 'Shishir Shahi',
    href: 'https://np.linkedin.com/in/shishirshahi',
    bg: 'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/40',
    iconBg: 'bg-blue-600',
  },
  {
    icon: <InstagramIcon size={22} />,
    label: 'Instagram',
    handle: '@shishir.05',
    href: 'https://instagram.com/shishir.05',
    bg: 'bg-pink-50 dark:bg-pink-950/30 border-pink-100 dark:border-pink-900/40',
    iconBg: 'bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400',
  },
  {
    icon: <FacebookIcon size={22} />,
    label: 'Facebook',
    handle: 'ShishirShahiVlogs',
    href: 'https://www.facebook.com/ShishirShahiVlogs',
    bg: 'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/40',
    iconBg: 'bg-blue-500',
  },
  {
    icon: <YoutubeIcon size={22} />,
    label: 'YouTube',
    handle: '@shishir.05',
    href: 'https://www.youtube.com/@shishir.05',
    bg: 'bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-900/40',
    iconBg: 'bg-red-600',
  },
  {
    icon: <TikTokIcon size={22} />,
    label: 'TikTok',
    handle: '@shishir.05',
    href: 'https://vt.tiktok.com/ZSdKeg41R/',
    bg: 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700',
    iconBg: 'bg-slate-900',
  },
];

// ─── Form Input ───────────────────────────────────────────────────
function FormInput({ label, icon, type = 'text', placeholder, name, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
        {label} {required && <span className="text-indigo-500">*</span>}
      </label>
      <div className={`relative flex items-center rounded-2xl border-2 bg-white dark:bg-slate-800/60 backdrop-blur transition-all duration-300
                      ${focused ? 'border-indigo-400 dark:border-indigo-500 shadow-lg shadow-indigo-500/10'
                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}>
        <span className={`absolute left-4 transition-colors duration-200 ${focused ? 'text-indigo-500' : 'text-slate-400'}`}>
          {icon}
        </span>
        <input
          type={type} name={name} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={placeholder} required={required}
          className="w-full pl-11 pr-4 py-3.5 bg-transparent text-sm text-slate-800 dark:text-slate-100
                     placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none rounded-2xl"
        />
      </div>
    </div>
  );
}

// ─── Form Textarea ────────────────────────────────────────────────
function FormTextarea({ label, icon, placeholder, name, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
        {label} {required && <span className="text-indigo-500">*</span>}
      </label>
      <div className={`relative rounded-2xl border-2 bg-white dark:bg-slate-800/60 backdrop-blur transition-all duration-300
                      ${focused ? 'border-indigo-400 dark:border-indigo-500 shadow-lg shadow-indigo-500/10'
                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}>
        <span className={`absolute top-4 left-4 transition-colors duration-200 ${focused ? 'text-indigo-500' : 'text-slate-400'}`}>
          {icon}
        </span>
        <textarea
          name={name} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={placeholder} required={required} rows={5}
          className="w-full pl-11 pr-4 py-3.5 bg-transparent text-sm text-slate-800 dark:text-slate-100
                     placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none rounded-2xl resize-none"
        />
      </div>
    </div>
  );
}

// ─── Social Card ──────────────────────────────────────────────────
function SocialCard({ social, index }) {
  const [ref, visible] = useReveal();
  return (
    <a ref={ref} href={social.href} target="_blank" rel="noopener noreferrer"
      className={`group flex items-center gap-4 ${social.bg} border rounded-2xl px-5 py-4
                 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 70}ms, transform 0.6s ease ${index * 70}ms, box-shadow 0.3s ease`,
      }}>
      <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${social.iconBg} flex items-center justify-center
                       text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
        {social.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-black text-slate-800 dark:text-slate-100 text-sm leading-none mb-1">{social.label}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{social.handle}</p>
      </div>
      <ExternalLink size={14} className="text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0" />
    </a>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────
export default function ContactPage() {
  const [mounted, setMounted]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [form, setForm]         = useState({ name: '', email: '', subject: '', message: '' });
  const formRef                 = useRef(null);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // ── EmailJS sends directly to shishirshahi05@gmail.com ──────
    // Template variables used:  {{from_name}}  {{from_email}}
    //                           {{subject}}    {{message}}
    // In your EmailJS template set "To Email" = shishirshahi05@gmail.com
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
          to_email:   'shishirshahi05@gmail.com',  // recipient
          reply_to:   form.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Failed to send message. Please try again or email me directly at shishirshahi05@gmail.com');
    } finally {
      setLoading(false);
    }
  };

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
        <div className="text-center"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.75s ease, transform 0.75s ease',
          }}>
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400 mb-4">
            Contact Me
          </span>
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            Get{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                In Touch
              </span>
              <svg className="absolute -bottom-1 left-0 w-full" height="5" viewBox="0 0 300 5" preserveAspectRatio="none">
                <path d="M0 2.5 Q75 0 150 2.5 Q225 5 300 2.5" stroke="url(#ul-ct)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <defs>
                  <linearGradient id="ul-ct" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8">
            Let's collaborate and build something amazing together. Whether it's a project,
            a question, or just a hello — my inbox is always open.
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800/70 backdrop-blur
                          border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-semibold shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            Available for New Projects &amp; Collaborations
          </div>
        </div>

        {/* ══════════════════════════════════════════
            2. CONTACT INFO CARDS
        ══════════════════════════════════════════ */}
        <Reveal>
          <SectionHeader
            eyebrow="Contact Info"
            title={<>Reach Me <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">Directly</span></>}
            subtitle="Prefer to reach out directly? Here are the best ways to get in touch with me."
          />
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {contactInfo.map(({ icon, label, value, href, gradient, bg, desc }, i) => (
              <Reveal key={label} delay={i * 80}>
                <a href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer"
                  className={`group flex flex-col items-center text-center gap-4 ${bg} border
                             rounded-3xl p-7 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden relative`}>
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center
                                  text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">{label}</p>
                    <p className="font-black text-slate-800 dark:text-slate-100 text-sm mb-1 break-all">{value}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* ══════════════════════════════════════════
            3. FORM + SOCIAL SIDEBAR
        ══════════════════════════════════════════ */}
        <div>
          <Reveal>
            <SectionHeader
              eyebrow="Send a Message"
              title={<>Let's <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">Connect</span></>}
              subtitle="Fill in the form — it lands directly in my Gmail inbox. I typically respond within 24 hours."
            />
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* ── Form (3/5) ── */}
            <div className="lg:col-span-3">
              <Reveal>
                <div className="bg-white dark:bg-slate-900/60 backdrop-blur border border-slate-100 dark:border-slate-800 rounded-3xl p-7 md:p-9 shadow-sm">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/30">
                        <CheckCircle2 size={36} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">Message Sent! 🎉</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                          Your message has been delivered to <strong>shishirshahi05@gmail.com</strong>.
                          I'll get back to you within 24 hours.
                        </p>
                      </div>
                      <button onClick={() => setSubmitted(false)}
                        className="mt-2 px-6 py-2.5 rounded-xl text-sm font-bold border-2 border-slate-200 dark:border-slate-700
                                   hover:border-indigo-300 dark:hover:border-indigo-600 transition-all">
                        Send Another
                      </button>
                    </div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">

                      <div className="grid sm:grid-cols-2 gap-5">
                        <FormInput label="Full Name" icon={<User size={16} />} name="name" value={form.name}
                          onChange={handleChange} placeholder="Your Name" required />
                        <FormInput label="Email Address" icon={<AtSign size={16} />} type="email" name="email"
                          value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                      </div>
                      <FormInput label="Subject" icon={<FileText size={16} />} name="subject" value={form.subject}
                        onChange={handleChange} placeholder="Project Inquiry / Collaboration" required />
                      <FormTextarea label="Message" icon={<MessageSquare size={16} />} name="message"
                        value={form.message} onChange={handleChange}
                        placeholder="Tell me about your project, goals, or just say hello..." required />

                      {/* Error message */}
                      {error && (
                        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-3 text-xs text-red-600 dark:text-red-400">
                          {error}
                        </div>
                      )}

                      <button type="submit" disabled={loading}
                        className="group w-full flex items-center justify-center gap-2
                                   bg-gradient-to-r from-indigo-600 to-violet-600
                                   hover:from-indigo-500 hover:to-violet-500
                                   disabled:opacity-70 disabled:cursor-not-allowed
                                   text-white px-8 py-4 rounded-2xl font-black text-sm
                                   transition-all shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5">
                        {loading ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                            Sending to Gmail...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Message
                            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs text-slate-400 dark:text-slate-600">
                        Delivered directly to{' '}
                        <span className="text-indigo-500 font-semibold">shishirshahi05@gmail.com</span>
                        {' '}· I'll reply within <span className="text-indigo-500 font-semibold">24 hours</span>.
                      </p>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>

            {/* ── Social Sidebar (2/5) ── */}
            <div className="lg:col-span-2 space-y-4">
              <Reveal delay={100}>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5 text-center lg:text-left">
                  Find me on social media
                </p>
              </Reveal>
              {socials.map((social, i) => (
                <SocialCard key={social.label} social={social} index={i} />
              ))}
              <Reveal delay={socials.length * 70 + 100}>
                <div className="mt-6 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30
                               border border-indigo-100 dark:border-indigo-900/40 rounded-2xl p-5 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap size={16} className="text-indigo-500" />
                    <span className="text-sm font-black text-slate-800 dark:text-slate-100">Quick Responder</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    I'm active daily and usually reply within a few hours during business hours.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            4. CTA BANNER
        ══════════════════════════════════════════ */}
        <Reveal>
          <div className="relative bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700
                          rounded-3xl p-10 md:p-16 text-center overflow-hidden shadow-2xl shadow-indigo-500/30">
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart size={18} className="text-rose-300 fill-rose-300 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">Let's Create Together</span>
                <Heart size={18} className="text-rose-300 fill-rose-300 animate-pulse" />
              </div>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-black text-white mb-4 tracking-tight">
                Let's Build Something<br className="hidden sm:block" /> Great Together
              </h2>
              <p className="text-indigo-200 max-w-lg mx-auto mb-10 text-sm md:text-base leading-relaxed">
                Have an idea? A project in mind? Or just want to say hi? I'm always excited to
                connect with fellow developers, designers, and entrepreneurs.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="mailto:shishirshahi05@gmail.com">
                  <button className="flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50
                                     px-8 py-3.5 rounded-2xl font-bold transition-all hover:-translate-y-0.5 shadow-lg">
                    <Mail size={16} />
                    Send Email
                  </button>
                </a>
                <a href="https://github.com/shishirshahi460" target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center gap-2 border-2 border-white/40 hover:border-white/80
                                     text-white px-8 py-3.5 rounded-2xl font-bold transition-all hover:-translate-y-0.5 backdrop-blur">
                    <Github size={16} />
                    View GitHub
                  </button>
                </a>
                <a href="https://docs.google.com/document/d/1AEsxgq2IlWl06_kEpgPZk8xG11TSlwPt/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center gap-2 border-2 border-white/40 hover:border-white/80
                                     text-white px-8 py-3.5 rounded-2xl font-bold transition-all hover:-translate-y-0.5 backdrop-blur">
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