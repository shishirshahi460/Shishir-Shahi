import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Send, ArrowRight, User, AtSign, FileText, MessageSquare, CheckCircle2 } from "lucide-react";
import emailjs from "@emailjs/browser";

// ─── Same EmailJS credentials as ContactPage.jsx ─────────────────
const EMAILJS_SERVICE_ID  = 'service_sv7w02r'; 
const EMAILJS_TEMPLATE_ID = 'template_fxuuj1k';
const EMAILJS_PUBLIC_KEY  = 'VZGxj0NSlvs0HHvQJ';

// ─── Form Input ───────────────────────────────────────────────────
function FormInput({ label, icon, type = "text", placeholder, name, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
        {label} {required && <span className="text-indigo-500">*</span>}
      </label>
      <div className={`relative flex items-center rounded-xl border-2 bg-white dark:bg-slate-800/60 backdrop-blur transition-all duration-300
                      ${focused ? "border-indigo-400 dark:border-indigo-500 shadow-lg shadow-indigo-500/10"
                                : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"}`}>
        <span className={`absolute left-3.5 transition-colors duration-200 ${focused ? "text-indigo-500" : "text-slate-400"}`}>
          {icon}
        </span>
        <input
          type={type} name={name} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={placeholder} required={required}
          className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-slate-800 dark:text-slate-100
                     placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none rounded-xl"
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
      <div className={`relative rounded-xl border-2 bg-white dark:bg-slate-800/60 backdrop-blur transition-all duration-300
                      ${focused ? "border-indigo-400 dark:border-indigo-500 shadow-lg shadow-indigo-500/10"
                                : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"}`}>
        <span className={`absolute top-3.5 left-3.5 transition-colors duration-200 ${focused ? "text-indigo-500" : "text-slate-400"}`}>
          {icon}
        </span>
        <textarea
          name={name} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={placeholder} required={required} rows={4}
          className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-slate-800 dark:text-slate-100
                     placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none rounded-xl resize-none"
        />
      </div>
    </div>
  );
}

// ─── Hire Me Modal ────────────────────────────────────────────────
function HireMeModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [form, setForm]           = useState({ name: "", email: "", subject: "", message: "" });

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
          to_email:   "shishirshahi05@gmail.com",
          reply_to:   form.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Failed to send. Please email me directly at shishirshahi05@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal panel */}
      <div
        className="relative z-10 w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl
                   border border-slate-100 dark:border-slate-800 overflow-hidden
                   animate-[fadeSlideUp_0.35s_ease]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "fadeSlideUp 0.35s ease" }}
      >
        {/* Gradient top strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600" />

        {/* Header */}
        <div className="flex items-start justify-between px-7 pt-6 pb-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
              Inquiry 🚀
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Fill in the form — I'll reply within 24 hours.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700
                       flex items-center justify-center text-slate-500 dark:text-slate-400
                       transition-all hover:scale-110 flex-shrink-0 ml-4"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 pb-7">
          {submitted ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center justify-center py-8 text-center gap-5">
              {/* Animated checkmark */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600
                              flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                <CheckCircle2 size={36} className="text-white" />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">
                  Message Sent! 🎉
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Your message has been delivered to{" "}
                  <strong className="text-indigo-500">shishirshahi05@gmail.com</strong>.
                  I'll get back to you within 24 hours!
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-slate-100 dark:bg-slate-800" />

              {/* Buttons — full width, stacked, clearly visible */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={() => setSubmitted(false)}
                  className="flex-1 flex items-center justify-center gap-2
                             px-5 py-3 rounded-xl text-sm font-bold
                             bg-slate-100 dark:bg-slate-800
                             text-slate-700 dark:text-slate-200
                             border-2 border-slate-200 dark:border-slate-700
                             hover:bg-slate-200 dark:hover:bg-slate-700
                             hover:border-indigo-300 dark:hover:border-indigo-600
                             transition-all duration-200 hover:-translate-y-0.5"
                >
                  ✉️ Send Another Message
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2
                             px-5 py-3 rounded-xl text-sm font-bold
                             bg-gradient-to-r from-indigo-600 to-violet-600
                             hover:from-indigo-500 hover:to-violet-500
                             text-white shadow-lg shadow-indigo-500/25
                             transition-all duration-200 hover:-translate-y-0.5"
                >
                  ✓ Close
                </button>
              </div>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Full Name" icon={<User size={15} />}
                  name="name" value={form.name} onChange={handleChange}
                  placeholder="Your Name" required
                />
                <FormInput
                  label="Email" icon={<AtSign size={15} />}
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="your@email.com" required
                />
              </div>
              <FormInput
                label="Subject" icon={<FileText size={15} />}
                name="subject" value={form.subject} onChange={handleChange}
                placeholder="Project Inquiry / Collaboration" required
              />
              <FormTextarea
                label="Message" icon={<MessageSquare size={15} />}
                name="message" value={form.message} onChange={handleChange}
                placeholder="Tell me about your project or what you need help with..."
                required
              />

              {/* Error */}
              {error && (
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800
                               rounded-xl p-3 text-xs text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit" disabled={loading}
                className="group w-full flex items-center justify-center gap-2
                           bg-gradient-to-r from-indigo-600 to-violet-600
                           hover:from-indigo-500 hover:to-violet-500
                           disabled:opacity-70 disabled:cursor-not-allowed
                           text-white px-6 py-3.5 rounded-xl font-black text-sm
                           transition-all shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-400 dark:text-slate-600">
                Delivered to{" "}
                <span className="text-indigo-500 font-semibold">shishirshahi05@gmail.com</span>
                {" "}· Reply within{" "}
                <span className="text-indigo-500 font-semibold">24 hours</span>
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────
const Navbar = () => {
  const [isOpen, setIsOpen]         = useState(false);
  const [showHireModal, setShowHireModal] = useState(false);

  const navLinks = [
    { name: "Home",     path: "/" },
    { name: "About",    path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Contact",  path: "/contact" },
    { name: "Blogs",    path: "/blogs" },
    { name: "Gallery",  path: "/gallery" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/75 backdrop-blur-md transition-all dark:border-gray-800 dark:bg-slate-950/75">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <svg
                width="36"
                height="36"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:rotate-6 transition-transform"
              >
                <defs>
                  <linearGradient id="navLogoGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <rect width="64" height="64" rx="14" fill="url(#navLogoGrad)" />
                <text
                  x="32"
                  y="44"
                  fontFamily="Arial, sans-serif"
                  fontSize="36"
                  fontWeight="900"
                  textAnchor="middle"
                  fill="#fff"
                >
                  S
                </text>
              </svg>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Shishir Shahi
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                >
                  {link.name}
                </Link>
              ))}

              {/* ── Inquiry button → opens modal ── */}
              <button
                onClick={() => setShowHireModal(true)}
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600
                           hover:from-indigo-500 hover:to-violet-500
                           px-5 py-2 text-sm font-bold text-white
                           shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40
                           transition-all hover:-translate-y-0.5"
              >
                Inquiry
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-slate-900"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-950">
            <div className="space-y-1 px-4 pb-4 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-900"
                >
                  {link.name}
                </Link>
              ))}

              {/* ── Mobile Inquiry button → opens modal ── */}
              <button
                onClick={() => { setShowHireModal(true); setIsOpen(false); }}
                className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl
                           bg-gradient-to-r from-indigo-600 to-violet-600
                           py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25
                           transition-all active:scale-95"
              >
                Inquiry
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hire Me Modal ── */}
      {showHireModal && (
        <HireMeModal onClose={() => setShowHireModal(false)} />
      )}
    </>
  );
};

export default Navbar;