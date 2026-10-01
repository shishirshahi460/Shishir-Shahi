import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  X, ZoomIn, Grid, Layers, ChevronLeft, ChevronRight,
  Camera, Image, Download, Share2, Heart
} from 'lucide-react';

// ─── Reusable: fade-in on scroll ─────────────────────────────────
function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
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
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}>
      {children}
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────
// GALLERY DATA
// ✏️  HOW TO ADD YOUR OWN IMAGES:
//    1. Put images in /public/gallery/ folder
//    2. Set src: '/gallery/your-image.jpg'
//    OR use any public URL as src
// ─────────────────────────────────────────────────────────────────
const GALLERY = [
  // ── Nature ──
  {
    id: 1,
    src: '/gallery/nature/1.png',
    thumb: '/gallery/nature/1.png',
    title: 'Lapchi, Dolakha',
    category: 'Nature',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 2,
    src: '/gallery/nature/2a.png',
    thumb:'/gallery/nature/2a.png',
    title: 'Lapchi, Dolakha',
    category: 'Nature',
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    id: 3,
    src: '/gallery/nature//3a.png',
    thumb:'/gallery/nature/3a.png',
    title: 'Lapchi, Dolakha',
    category: 'Nature',
    gradient: 'from-lime-500 to-emerald-600',
  },
  {
    id: 4,
    src: '/gallery/nature/2.JPG',
    thumb: '/gallery/nature/2.JPG',
    title: 'Shivapuri, Kathmandu',
    category: 'Nature',
    gradient: 'from-amber-500 to-orange-600',
  },

  // ── Travel ──
  {
    id: 5,
    src: '/gallery/travel/T1.PNG',
    thumb: '/gallery/travel/T1.PNG',
    title: 'Blue Lake, Manang',
    category: 'Travel',
    gradient: 'from-indigo-500 to-violet-600',
  },
  {
    id: 6,
    src: '/gallery/travel/T2.PNG',
    thumb: '/gallery/travel/T2.PNG',
    title: 'Green lake, Manang',
    category: 'Travel',
    gradient: 'from-sky-500 to-cyan-600',
  },
  {
    id: 7,
    src: '/gallery/travel/T3.JPG',
    thumb: '/gallery/travel/T3.JPG',
    title: 'Manang',
    category: 'Travel',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    id: 8,
    src: '/gallery/travel/T4.PNG',
    thumb: '/gallery/travel/T4.PNG',
    title: 'Mustang, Nepal',
    category: 'Travel',
    gradient: 'from-amber-500 to-rose-500',
  },

  // ── Events ──
  {
    id: 9,
    src: '/gallery/events/E1.PNG',
    thumb: '/gallery/events/E1.PNG',
    title: 'My Bachelor’s Convocation',
    category: 'Events',
    gradient: 'from-fuchsia-500 to-purple-600',
  },
  {
    id: 10,
    src: '/gallery/events/E2.PNG',
    thumb: '/gallery/events/E2.PNG',
    title: 'DevRumble competition',
    category: 'Events',
    gradient: 'from-rose-500 to-orange-500',
  },
  {
    id: 11,
    src: '/gallery/events/E3.PNG',
    thumb: '/gallery/events/E3.PNG',
    title: 'Hackathon Judge & Mentor',
    category: 'Events',
    gradient: 'from-violet-500 to-indigo-600',
  },

  // ── Personal ──
  {
    id: 12,
    src: '/gallery/personal/6.jpeg',
    thumb: '/gallery/personal/6.jpeg',
    title: 'Coding Session',
    category: 'Personal',
    gradient: 'from-slate-600 to-slate-800',
  },
  {
    id: 13,
    src: '/gallery/personal/p6.jpeg',
    thumb:'/gallery/personal/p6.jpeg',
    title: 'Late Night Build',
    category: 'Personal',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    id: 14,
    src: '/gallery/personal/P2.jpeg',
    thumb: '/gallery/personal/P2.jpeg',
    title: 'Team Collab',
    category: 'Personal',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 15,
    src: '/gallery/personal/P7.JPG',
    thumb: '/gallery/personal/P7.JPG',
    title: 'Bachelor’s Degree Graduate',
    category: 'Personal',
    gradient: 'from-amber-500 to-orange-600',
  },
];

const CATEGORIES = ['All', 'Nature', 'Travel', 'Events', 'Personal'];

// ─── Lightbox ────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const img = images[index];

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

      {/* Panel */}
      <div
        className="relative z-10 flex flex-col items-center max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between w-full mb-4 px-1">
          <div>
            <p className="font-black text-white text-base">{img.title}</p>
            <span className={`inline-block text-xs font-bold px-3 py-0.5 rounded-full bg-gradient-to-r ${img.gradient} text-white mt-1`}>
              {img.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">{index + 1} / {images.length}</span>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition-all hover:scale-110 ml-2"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
          <img
            src={img.src}
            alt={img.title}
            className="w-full max-h-[70vh] object-contain"
          />
          {/* Prev / Next */}
          <button
            onClick={onPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-black/50 hover:bg-black/70 backdrop-blur flex items-center justify-center text-white transition-all hover:scale-110"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={onNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-black/50 hover:bg-black/70 backdrop-blur flex items-center justify-center text-white transition-all hover:scale-110"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1 max-w-full scrollbar-hide">
          {images.map((im, i) => (
            <button
              key={im.id}
              onClick={() => { /* handled via index prop */ onPrev(); onPrev(); }}
              className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200
                ${i === index ? 'border-indigo-500 scale-105 shadow-lg shadow-indigo-500/30' : 'border-transparent opacity-50 hover:opacity-80'}`}
            >
              <img src={im.thumb} alt={im.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Gallery Card ─────────────────────────────────────────────────
function GalleryCard({ item, index, onClick }) {
  const [ref, visible] = useReveal();
  const [liked, setLiked] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden cursor-pointer
                 shadow-md hover:shadow-2xl transition-all duration-400 bg-slate-200 dark:bg-slate-800"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
        transition: `opacity 0.6s ease ${index * 60}ms, transform 0.6s ease ${index * 60}ms, box-shadow 0.3s ease`,
        aspectRatio: index % 5 === 0 ? '4/5' : index % 3 === 0 ? '3/4' : '1/1',
      }}
      onClick={() => onClick(index)}
    >
      {/* Skeleton shimmer while loading */}
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-pulse" />
      )}

      {/* Image */}
      <img
        src={item.thumb}
        alt={item.title}
        onLoad={() => setImgLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500
                    group-hover:scale-110 group-hover:brightness-90
                    ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Category pill — top left */}
      <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black text-white
                       bg-gradient-to-r ${item.gradient} shadow-lg
                       translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                       transition-all duration-300`}>
        {item.category}
      </div>

      {/* Like button — top right */}
      <button
        onClick={(e) => { e.stopPropagation(); setLiked(l => !l); }}
        className={`absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center
                    backdrop-blur-sm shadow-lg transition-all duration-200
                    translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                    ${liked ? 'bg-rose-500 text-white scale-110' : 'bg-white/20 text-white hover:bg-rose-500'}`}
      >
        <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
      </button>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4
                      translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                      transition-all duration-300">
        <p className="text-white font-black text-sm leading-snug mb-1 drop-shadow">{item.title}</p>
        <div className="flex items-center gap-1 text-white/70 text-xs">
          <ZoomIn size={12} />
          <span>Click to preview</span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────
export default function GalleryPage() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [viewMode, setViewMode] = useState('masonry'); // 'masonry' | 'grid'

  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  const filtered = activeFilter === 'All'
    ? GALLERY
    : GALLERY.filter(img => img.category === activeFilter);

  const openLightbox = useCallback((i) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const nextImage = useCallback(() => setLightboxIndex(i => (i + 1) % filtered.length), [filtered.length]);

  const stats = [
    { value: `${GALLERY.length}+`, label: 'Photos', icon: <Image size={18} /> },
    { value: `${CATEGORIES.length - 1}`,  label: 'Categories', icon: <Layers size={18} /> },
    { value: '4K',   label: 'Resolution',  icon: <Camera size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8ff] dark:bg-[#0b0d1a] text-slate-900 dark:text-slate-100 overflow-x-hidden">

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-indigo-200/35 dark:bg-indigo-900/15 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[420px] h-[420px] rounded-full bg-violet-200/30 dark:bg-violet-900/12 blur-3xl" />
        <div className="absolute bottom-32 left-1/4 w-[380px] h-[380px] rounded-full bg-sky-200/25 dark:bg-sky-900/10 blur-3xl" />
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 py-20 lg:py-28 space-y-20">

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
            Visual Showcase
          </span>

          <h1 className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            My{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                Gallery
              </span>
              <svg className="absolute -bottom-1 left-0 w-full" height="5" viewBox="0 0 240 5" preserveAspectRatio="none">
                <path d="M0 2.5 Q60 0 120 2.5 Q180 5 240 2.5" stroke="url(#ul-gl)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <defs>
                  <linearGradient id="ul-gl" x1="0" y1="0" x2="240" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8">
            A curated collection of my captured moments, travels, events, and creative visuals.
            Click any image to open the full preview.
          </p>

          {/* Stats strip */}
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
            2. CONTROLS — Filter + View toggle
        ══════════════════════════════════════════ */}
        <Reveal>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 border
                    ${activeFilter === cat
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent shadow-lg shadow-indigo-500/25'
                      : 'bg-white dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`}
                >
                  {cat}
                  {cat === 'All' && <span className="ml-1.5 text-xs opacity-60">({GALLERY.length})</span>}
                </button>
              ))}
            </div>

            {/* View mode toggle */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-800/70 backdrop-blur border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setViewMode('masonry')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all
                  ${viewMode === 'masonry' ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-500'}`}
              >
                <Layers size={14} />
                Masonry
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all
                  ${viewMode === 'grid' ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-500'}`}
              >
                <Grid size={14} />
                Grid
              </button>
            </div>
          </div>
        </Reveal>

        {/* ══════════════════════════════════════════
            3. GALLERY GRID
        ══════════════════════════════════════════ */}
        {viewMode === 'masonry' ? (
          /* Masonry layout using CSS columns */
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-0">
            {filtered.map((item, i) => (
              <div key={item.id} className="break-inside-avoid mb-4">
                <MasonryCard item={item} index={i} onClick={() => openLightbox(i)} />
              </div>
            ))}
          </div>
        ) : (
          /* Uniform grid layout */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((item, i) => (
              <GalleryCard key={item.id} item={item} index={i} onClick={openLightbox} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24 text-slate-400 dark:text-slate-600">
            <Camera size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-bold text-lg">No photos in this category yet.</p>
            <p className="text-sm mt-1">Check back soon!</p>
          </div>
        )}

        {/* ══════════════════════════════════════════
            4. CTA BANNER
        ══════════════════════════════════════════ */}
        <Reveal>
          <div className="relative bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700
                          rounded-3xl p-10 md:p-14 text-center overflow-hidden shadow-2xl shadow-indigo-500/30">
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-indigo-200 mb-4">
                More Content
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                Want to See More?
              </h2>
              <p className="text-indigo-200 max-w-md mx-auto mb-8 text-sm md:text-base leading-relaxed">
                Follow me on Instagram, YouTube, or TikTok for more photos and behind-the-scenes content.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="https://instagram.com/shishir.05" target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50
                                     px-8 py-3.5 rounded-2xl font-bold transition-all hover:-translate-y-0.5 shadow-lg">
                    Instagram
                    <Share2 size={15} />
                  </button>
                </a>
                <a href="https://www.youtube.com/@shishir.05" target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center gap-2 border-2 border-white/40 hover:border-white/80
                                     text-white px-8 py-3.5 rounded-2xl font-bold transition-all
                                     hover:-translate-y-0.5 backdrop-blur">
                    YouTube
                    <Share2 size={15} />
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

// ─── Masonry Card (taller, natural aspect ratio) ──────────────────
function MasonryCard({ item, index, onClick }) {
  const [ref, visible] = useReveal();
  const [liked, setLiked] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden cursor-pointer
                 shadow-md hover:shadow-2xl transition-all duration-300 bg-slate-200 dark:bg-slate-800"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${index * 50}ms, transform 0.6s ease ${index * 50}ms, box-shadow 0.3s ease`,
      }}
      onClick={onClick}
    >
      {!imgLoaded && (
        <div className="w-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-pulse" style={{ paddingBottom: '75%' }} />
      )}
      <img
        src={item.thumb}
        alt={item.title}
        onLoad={() => setImgLoaded(true)}
        className={`w-full h-auto object-cover transition-all duration-500
                    group-hover:scale-105 group-hover:brightness-90
                    ${imgLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Category */}
      <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black text-white bg-gradient-to-r ${item.gradient} shadow-lg translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300`}>
        {item.category}
      </div>
      {/* Like */}
      <button
        onClick={(e) => { e.stopPropagation(); setLiked(l => !l); }}
        className={`absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg transition-all duration-200 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ${liked ? 'bg-rose-500 text-white scale-110' : 'bg-white/20 text-white hover:bg-rose-500'}`}
      >
        <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
      </button>
      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white font-black text-sm drop-shadow">{item.title}</p>
        <div className="flex items-center gap-1 text-white/60 text-xs mt-0.5">
          <ZoomIn size={11} />
          <span>Click to preview</span>
        </div>
      </div>
    </div>
  );
}


