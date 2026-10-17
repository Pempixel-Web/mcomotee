import corporate1 from "./assets/gallery/corporate-1.png";
import corporate2 from "./assets/gallery/corporate-2.png";
import wedding1 from "./assets/gallery/wedding-1.png";
import birthday1 from "./assets/gallery/birthday-1.png";
import military1 from "./assets/gallery/military-1.png";

import armyLogo from "./assets/army.png";
import lushLogo from "./assets/lush.png";
import maltaGuinnessLogo from "./assets/maltaguinness.png";
import nyscLogo from "./assets/nysc.png";
import superCommandoLogo from "./assets/supercommando.png";

import aboutme from "./assets/about-me.png";
// Import Profile About

// Importing Carousel Images
import hero1 from "./assets/hero-1.png";
import hero2 from "./assets/hero-2.png";
import hero3 from "./assets/hero-3.png";
// Importing Carousel Images

import logo from "./assets/logo.png";
import logofooter from "./assets/logo-white.png";
import React, { useEffect, useRef, useState, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/*  Purple  #770875  |  Ink #150512  |  Gold accent #FFD700           */
/*  Paper   #FAF6F9  |  Type: "Fraunces" (display) + "Inter" (body)   */
/* ------------------------------------------------------------------ */

const WHATSAPP_NUMBER = "2348012345678"; // placeholder — swap for the real number
const waLink = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

/* ---------------------------- utilities ---------------------------- */

function useOnScreen(threshold = 0.18) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const [ref, visible] = useOnScreen();
  return (
    <Tag
      ref={ref}
      className={`will-change-transform transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function Counter({ target, suffix = "", duration = 1700 }) {
  const [ref, visible] = useOnScreen(0.5);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let raf;
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ------------------------------ icons ------------------------------ */

const Icon = {
  mic: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...p}
    >
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" strokeLinecap="round" />
      <path d="M12 18v3.5M9 21.5h6" strokeLinecap="round" />
    </svg>
  ),
  screen: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...p}
    >
      <rect x="2.5" y="4.5" width="19" height="12" rx="1.5" />
      <path d="M8 20.5h8M12 16.5v4" strokeLinecap="round" />
    </svg>
  ),
  heart: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...p}
    >
      <path d="M12 20.5s-7.7-4.9-10-9.9C0.4 6.8 2.6 3.5 6 3.5c2.1 0 3.7 1.2 6 3.6 2.3-2.4 3.9-3.6 6-3.6 3.4 0 5.6 3.3 4 7.1-2.3 5-10 9.9-10 9.9Z" />
    </svg>
  ),
  target: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...p}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  chat: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...p}
    >
      <path d="M3.5 12a8.5 8.5 0 1 1 3.4 6.8L3 20l1.3-3.6A8.4 8.4 0 0 1 3.5 12Z" />
    </svg>
  ),
  flower: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...p}
    >
      <path d="M12 3c1.5 2 1.5 4.5 0 6.5C10.5 7.5 10.5 5 12 3Z" />
      <path d="M12 21c1.5-2 1.5-4.5 0-6.5-1.5 2-1.5 4.5 0 6.5Z" />
      <path d="M3 12c2-1.5 4.5-1.5 6.5 0-2 1.5-4.5 1.5-6.5 0Z" />
      <path d="M21 12c-2-1.5-4.5-1.5-6.5 0 2 1.5 4.5 1.5 6.5 0Z" />
      <circle cx="12" cy="12" r="2.2" />
    </svg>
  ),
  whatsapp: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1s-.5-.2-.7.1-.8 1-.9 1.2-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.1 8.1 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5a.5.5 0 0 0 0-.5c-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4A3.4 3.4 0 0 0 6 9.7a5.9 5.9 0 0 0 1.3 3.2 13.6 13.6 0 0 0 5.2 4.6c.7.3 1.3.5 1.7.6a4.1 4.1 0 0 0 1.9.1 3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3Z" />
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.1 8.1 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
    </svg>
  ),
  mail: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...p}
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M3 6l9 7 9-7" />
    </svg>
  ),
  phone: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...p}
    >
      <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v4a2 2 0 0 1-2.2 2A17 17 0 0 1 2 6.2 2 2 0 0 1 4 4Z" />
    </svg>
  ),
  pin: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...p}
    >
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.3" />
    </svg>
  ),
  play: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  ),
  ig: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...p}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M14 2h2.9c.3 1.8 1.5 3.3 3.6 3.8v3a7.6 7.6 0 0 1-3.6-1v6.6a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v3.1a2.5 2.5 0 1 0 1.8 2.4V2Z" />
    </svg>
  ),
  youtube: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...p}
    >
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="M10.5 9.5l5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" />
    </svg>
  ),
  menu: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...p}
    >
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  ),
  home: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...p}
    >
      <path
        d="M4 11.5 12 4l8 7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10v9a1 1 0 0 0 1 1h3.5v-5h3v5H17a1 1 0 0 0 1-1v-9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  user: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...p}
    >
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c1-4 4-6 7-6s6 2 7 6" strokeLinecap="round" />
    </svg>
  ),
  images: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...p}
    >
      <rect x="2.5" y="7" width="15" height="13" rx="2" />
      <rect x="6.5" y="3" width="15" height="13" rx="2" opacity="0.55" />
    </svg>
  ),
  bell: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...p}
    >
      <path d="M12 4v1.6" strokeLinecap="round" />
      <path d="M4 17c0-4.5 3.6-8 8-8s8 3.5 8 8" strokeLinecap="round" />
      <path d="M3 17h18" strokeLinecap="round" />
      <circle cx="12" cy="19.4" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  frame: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...p}
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.6" fill="currentColor" stroke="none" />
      <path
        d="M4 17l5-5 4 4 3-3 4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  moon: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...p}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </svg>
  ),
  close: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...p}
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  ),
  chevron: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...p}
    >
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/* ------------------------------- data ------------------------------- */

const NAV_LINKS = [
  { label: "Home", href: "#home", icon: Icon.home },
  { label: "About", href: "#about", icon: Icon.user },
  { label: "Gallery", href: "#gallery", icon: Icon.images },
  { label: "Services", href: "#services", icon: Icon.bell },
  { label: "Reels", href: "#reels", icon: Icon.ig },
  { label: "Brand", href: "#brand", icon: Icon.frame },
  { label: "Contact", href: "#contact", icon: Icon.mail },
];

// const CLIENTS = [
//   "MTN Nigeria",
//   "Access Bank",
//   "Coca-Cola",
//   "GTCo",
//   "Dangote Group",
//   "Nestlé",
//   "Zenith Bank",
//   "UBA",
//   "Heineken",
//   "Flutterwave",
// ];

const CLIENTS = [
  {
    name: "Nigerian Army",
    logo: armyLogo,
  },
  {
    name: "Lush Hair",
    logo: lushLogo,
  },
  {
    name: "Malta Guinness",
    logo: maltaGuinnessLogo,
  },
  {
    name: "NYSC",
    logo: nyscLogo,
  },
  {
    name: "Supa Komando Energy Drink",
    logo: superCommandoLogo,
  },
];

const CATEGORIES = [
  "All",
  "Corporate",
  "Weddings & Social",
  "Conferences & Launches",
  "Awards",
];

const GALLERY = [
  {
    id: 1,
    cat: "Corporate",
    title: "Lush Hair Event",
    loc: "Lagos, Nigeria",
    image: corporate1,
    instagram: "https://www.instagram.com/CLIENT_INSTAGRAM_LINK/",
  },

  {
    id: 2,
    cat: "Corporate",
    title: "Supa Komando Event",
    loc: "Lagos, Nigeria",
    image: corporate2,
    instagram: "https://www.instagram.com/CLIENT_INSTAGRAM_LINK/",
  },

  {
    id: 3,
    cat: "Corporate",
    title: "NYSC Event",
    loc: "Lagos, Nigeria",
    image: military1,
    instagram: "https://www.instagram.com/CLIENT_INSTAGRAM_LINK/",
  },

  {
    id: 4,
    cat: "Corporate",
    title: "Malta Guinness Event",
    loc: "Lagos, Nigeria",
    image: corporate1,
    instagram: "https://www.instagram.com/CLIENT_INSTAGRAM_LINK/",
  },

  {
    id: 5,
    cat: "Corporate",
    title: "Nigerian Army Event",
    loc: "Lagos, Nigeria",
    image: military1,
    instagram: "https://www.instagram.com/CLIENT_INSTAGRAM_LINK/",
  },

  {
    id: 6,
    cat: "Weddings & Social",
    title: "Wedding Celebration",
    loc: "Lagos, Nigeria",
    image: wedding1,
    instagram: "https://www.instagram.com/CLIENT_INSTAGRAM_LINK/",
  },

  {
    id: 7,
    cat: "Weddings & Social",
    title: "Birthday Celebration",
    loc: "Lagos, Nigeria",
    image: birthday1,
    instagram: "https://www.instagram.com/CLIENT_INSTAGRAM_LINK/",
  },
];

const SERVICES = [
  {
    icon: Icon.mic,
    title: "Corporate Event Hosting",
    desc: "Polished, professional hosting that keeps board rooms and ballrooms alike on schedule and on message.",
  },
  {
    icon: Icon.screen,
    title: "Conferences & Product Launches",
    desc: "High-energy stage presence that builds anticipation and lands your big reveal with impact.",
  },
  {
    icon: Icon.heart,
    title: "Weddings & Social Events",
    desc: "Warm, witty and bilingual — guiding your guests through every tradition and toast with grace.",
  },
  {
    icon: Icon.target,
    title: "Training & Coaching",
    desc: "Hands-on public speaking and MC coaching for teams and individuals who want to own the mic.",
  },
  {
    icon: Icon.chat,
    title: "Talk Show Hosting",
    desc: "Sharp interviewing and audience rapport for panels, podcasts and televised conversations.",
  },
  {
    icon: Icon.flower,
    title: "Funerals & Life Celebrations",
    desc: "Dignified, compassionate hosting that honours a life while holding space for the family.",
  },
];

const REELS = [
  {
    id: 1,
    seed: "reel1",
    caption: "Opening a 1,000-guest gala with zero notes 🎤",
  },
  {
    id: 2,
    seed: "reel2",
    caption: "Bilingual toast that had the whole hall on its feet",
  },
  {
    id: 3,
    seed: "reel3",
    caption: "Product launch countdown — chills every time",
  },
  {
    id: 4,
    seed: "reel4",
    caption: "Behind the scenes: mic check, 6am call time",
  },
];

/* ------------------------------ sections ----------------------------- */

function Nav({ open, setOpen }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#FAF6F9] shadow-[0_2px_20px_rgba(21,5,18,0.08)]">
        {/* <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-20 md:h-24"> */}

        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="flex items-center gap-3 group">
            {/* <span className="grid place-items-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#150512] text-[#FFD700] border-2 border-[#770875] transition-transform duration-300 group-hover:scale-105">
              <Icon.mic style={{ width: 20, height: 20 }} />
            </span>
            <span className="font-serif text-xl md:text-2xl tracking-tight text-[#150512] leading-none">
              The<span className="text-[#770875]">Corporate</span>Emcee
            </span> */}
            <img
              src={logo}
              alt="The Corporate Emcee"
              className="h-14 md:h-16 w-auto shrink-0 object-contain"
            />
          </a>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid place-items-center w-11 h-11 md:w-12 md:h-12 rounded-full text-[#150512] hover:bg-[#790b77]/6 transition-colors duration-200"
          >
            <Icon.menu style={{ width: 28, height: 28 }} />
          </button>
        </div>
      </header>

      {/* backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[55] bg-[#0a0210]/50 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* slide-in drawer */}
      <aside
        className={`fixed top-0 right-0 z-[60] h-full w-[82%] sm:w-[380px] bg-[#61085f] text-white transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute top-5 right-5 grid place-items-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors duration-200"
        >
          <Icon.close style={{ width: 20, height: 20 }} />
        </button>

        <nav className="flex flex-col gap-1 mt-24 px-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 py-4 text-[17px] font-semibold text-white hover:text-[#FFD700] transition-colors duration-200"
            >
              <l.icon
                style={{ width: 20, height: 20 }}
                className="text-[#FFD700] shrink-0"
              />
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={waLink("Hi TheCorporateMC, I'd like to book you for my event.")}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-8 left-8 right-8 inline-flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#b38f20] text-[#150512] font-semibold px-5 py-3.5 rounded-full transition-colors duration-200"
        >
          <Icon.whatsapp style={{ width: 16, height: 16 }} />
          Book on WhatsApp
        </a>
      </aside>
    </>
  );
}

// const HERO_SLIDES = [
//   "https://picsum.photos/seed/mcee-hero-a/1800/1100",
//   "https://picsum.photos/seed/mcee-hero-b/1800/1100",
//   "https://picsum.photos/seed/mcee-hero-c/1800/1100",
// ];

const HERO_SLIDES = [hero1, hero2, hero3];

const HERO_STATS = [
  { n: 67, s: "+", label: "Events Hosted" },
  { n: 3, s: "+", label: "Countries" },
  { n: 98.9, s: "%", label: "Satisfaction" },
];

function Hero() {
  const [slide, setSlide] = useState(0);
  const [night, setNight] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setSlide((i) => (i + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      className="relative h-[100svh] min-h-[640px] max-h-[980px] overflow-hidden flex items-center pt-20 md:pt-24"
    >
      {/* autoplay background carousel */}
      {HERO_SLIDES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            i === slide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={src}
            alt="The Corporate Emcee hosting a live event"
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* colour + darkness overlays */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(180deg, rgba(38,7,15,0.55) 0%, rgba(30,6,14,0.72) 55%, rgba(12,3,9,0.92) 100%)",
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background: "rgba(5,2,8,0.35)", opacity: night ? 1 : 0 }}
      />

      {/* content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 md:px-8 text-center">
        <Reveal key={`h-${slide}`}>
          {/* <h1 className="font-serif italic text-white text-[60px] leading-[1.18] sm:text-5xl md:text-[58px] md:leading-[1.12]">
            "Your Event Just Got Better with{" "}
            <span className="font-bold not-italic">MC Omo Tee</span>"
          </h1> */}

          <h1 className="font-serif italic text-white text-[42px] leading-[1.12] sm:text-6xl md:text-[76px] md:leading-[1.08] lg:text-[84px]">
            "Your Event Just Got Better with{" "}
            <span className="font-bold not-italic">MC Omo Tee</span>"
          </h1>
        </Reveal>
        <Reveal delay={100}>
          {/* <p className="font-serif italic text-[#FFD700] text-xl sm:text-2xl md:text-[28px] mt-6">
            Nigeria's top Master of Ceremony
          </p> */}

          <p className="font-serif italic text-[#FFD700] text-2xl sm:text-3xl md:text-[40px] mt-8">
            Nigeria's top Master of Ceremony
          </p>
        </Reveal>
        <Reveal delay={180}>
          <p className="text-white/80 text-[14.5px] sm:text-base mt-5 max-w-2xl mx-auto">
            from your corporate event to your social event, your audience is in
            expert hands.
          </p>
        </Reveal>
        <Reveal delay={260}>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-9">
            <a
              href={waLink(
                "Hi TheCorporateMC, I'd like to book you for my event.",
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#FFD700] hover:bg-[#b38f20] text-[#150512] font-semibold px-7 py-3.5 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-[#FFD700]/30 hover:-translate-y-0.5"
            >
              Book The Corporate Mcee
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 border-2 border-[#FFD700] text-[#FFD700] font-semibold px-7 py-3.5 rounded-full hover:bg-[#FFD700]/10 transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-xl mx-auto mt-12">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[#FFD700]/40 bg-black/25 backdrop-blur-sm py-4 px-2"
              >
                <div className="font-serif font-bold text-2xl sm:text-3xl text-[#FFD700]">
                  <Counter target={stat.n} suffix={stat.s} />
                </div>
                <div className="text-white/80 text-[11px] sm:text-[12.5px] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* carousel dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === slide ? "w-6 bg-[#FFD700]" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* ambience toggle */}
      <button
        aria-label="Toggle ambience"
        onClick={() => setNight((n) => !n)}
        className="absolute bottom-6 left-6 z-10 grid place-items-center w-12 h-12 rounded-full bg-[#770875] text-white shadow-lg shadow-[#770875]/40 hover:scale-105 transition-transform duration-200"
      >
        <Icon.moon style={{ width: 18, height: 18 }} />
      </button>
    </section>
  );
}

// function Marquee() {
//   const list = [...CLIENTS, ...CLIENTS];
//   return (
//     <section className="py-14 md:py-20 bg-white border-y border-[#150512]/6">
//       <Reveal>
//         <p className="text-center font-serif text-2xl md:text-3xl text-[#150512] px-6">
//           Trusted by Icons, Powered by Presence
//         </p>
//       </Reveal>
//       <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
//         <div className="flex w-max gap-4 animate-marquee">
//           {list.map((name, i) => (
//             <span
//               key={i}
//               className="shrink-0 px-6 py-3 rounded-full border border-[#150512]/10 text-[#3a1938] text-[14px] font-medium bg-[#FAF6F9]"
//             >
//               {name}
//             </span>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
function Marquee() {
  const list = [...CLIENTS, ...CLIENTS];

  return (
    <section className="py-14 md:py-20 bg-white border-y border-[#150512]/6">
      <Reveal>
        <p className="text-center font-serif text-2xl md:text-3xl text-[#150512] px-6">
          Trusted by Icons, Powered by Presence
        </p>

        <p className="text-center mt-3 text-sm md:text-base text-[#7a6877]">
          Our valued clients and partners
        </p>
      </Reveal>

      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max gap-6 animate-marquee">
          {list.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="group relative shrink-0 w-44 h-32 md:w-52 md:h-36 rounded-2xl bg-white border border-[#150512]/8 shadow-[0_8px_30px_rgba(21,5,18,0.08)] overflow-hidden flex items-center justify-center transition-all duration-300 hover:shadow-[0_12px_35px_rgba(21,5,18,0.14)] hover:-translate-y-1"
            >
              {/* Brand logo */}
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-[75%] max-h-[65%] object-contain transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover brand name */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#3a1938]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-4 text-center text-white text-sm md:text-base font-semibold">
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [category, setCategory] = useState("All");
  const [fade, setFade] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const filtered = GALLERY.filter(
    (g) => category === "All" || g.cat === category,
  );
  const shown = filtered.slice(0, visibleCount);

  const changeCategory = (cat) => {
    if (cat === category) return;
    setFade(false);
    setTimeout(() => {
      setCategory(cat);
      setVisibleCount(8);
      setFade(true);
    }, 180);
  };

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const step = useCallback(
    (dir) => {
      setLightboxIdx((cur) => {
        if (cur === null) return cur;
        const len = filtered.length;
        return (cur + dir + len) % len;
      });
    },
    [filtered.length],
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, step]);

  const active = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[#FAF6F9]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="font-serif text-3xl md:text-[44px] leading-tight text-[#150512]">
            Moments That Made the Mic Sparkle
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="flex flex-wrap gap-2.5 mt-9">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => changeCategory(cat)}
                className={`text-[13.5px] font-medium px-4.5 py-2 rounded-full border transition-all duration-200 ${
                  category === cat
                    ? "bg-[#770875] border-[#770875] text-white"
                    : "bg-white border-[#150512]/12 text-[#3a1938] hover:border-[#770875]/40"
                }`}
                style={{ paddingLeft: 18, paddingRight: 18 }}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 transition-opacity duration-200 ${fade ? "opacity-100" : "opacity-0"}`}
        >
          {shown.map((item, idx) => (
            // <button
            //   key={item.id}
            //   onClick={() => openLightbox(idx)}
            //   className="group relative aspect-[4/5] rounded-2xl overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#770875]"
            // >

            <a
              key={item.id}
              href={item.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden text-left block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#770875]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-[#150512]/85 via-[#150512]/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" /> */}

              <div className="absolute inset-0 bg-gradient-to-t from-[#150512]/90 via-[#150512]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="absolute top-4 right-4 grid place-items-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white transition-all duration-300 group-hover:bg-[#770875] group-hover:scale-110">
                <Icon.ig style={{ width: 18, height: 18 }} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-[11.5px] uppercase tracking-wide text-[#FFD700]">
                  {item.cat}
                </p>
                <p className="font-serif text-[16px] leading-tight mt-1">
                  {item.title}
                </p>
                <p className="text-[12px] opacity-75 mt-0.5">{item.loc}</p>
              </div>
            </a>
          ))}
        </div>

        {visibleCount < filtered.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisibleCount((v) => v + 4)}
              className="px-7 py-3 rounded-full border border-[#150512]/15 text-[#150512] text-[14px] font-medium hover:border-[#770875] hover:text-[#770875] transition-colors duration-200"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] bg-[#150512]/92 backdrop-blur-sm flex items-center justify-center p-5"
          onClick={closeLightbox}
        >
          <button
            aria-label="Close"
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white"
          >
            <Icon.close style={{ width: 26, height: 26 }} />
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 md:left-8 grid place-items-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <Icon.chevron
              style={{ width: 20, height: 20, transform: "rotate(180deg)" }}
            />
          </button>
          <div
            className="max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-2xl overflow-hidden">
              <img
                src={`https://picsum.photos/seed/${active.seed}/900/1100`}
                alt={active.title}
                className="w-full max-h-[70vh] object-cover"
              />
            </div>
            <div className="text-white mt-4 text-center">
              <p className="text-[12px] uppercase tracking-wide text-[#FFD700]">
                {active.cat}
              </p>
              <p className="font-serif text-xl mt-1">{active.title}</p>
              <p className="text-[13px] opacity-70 mt-0.5">{active.loc}</p>
            </div>
          </div>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-3 md:right-8 grid place-items-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <Icon.chevron style={{ width: 20, height: 20 }} />
          </button>
        </div>
      )}
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] max-w-md mx-auto shadow-xl shadow-[#150512]/10">
            <img
              src="aboutme"
              alt="Omotoyosi Damilare"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:flex absolute top-6 -right-6 bg-white rounded-2xl shadow-xl shadow-[#150512]/10 px-5 py-3.5 items-center gap-2.5">
            <Icon.chat
              className="text-[#770875]"
              style={{ width: 16, height: 16 }}
            />
            <span className="text-[13px] font-semibold text-[#150512]">
              Bilingual Hosting
            </span>
          </div>
          <div className="hidden md:flex absolute bottom-8 -left-6 bg-white rounded-2xl shadow-xl shadow-[#150512]/10 px-5 py-3.5 items-center gap-2.5">
            <Icon.target
              className="text-[#FFD700]"
              style={{ width: 16, height: 16 }}
            />
            <span className="text-[13px] font-semibold text-[#150512]">
              Award Winning
            </span>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="text-[13px] font-medium text-[#770875]">
              The Story
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight text-[#150512] mt-3">
              The mind of a psychologist, the mic of a showman
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-[#3a1938]/80 text-[15.5px] leading-relaxed mt-6">
              Oluwatosin Aina studied psychology at Obafemi Awolowo University,
              and it shows in every room he hosts — he reads an audience before
              he ever reaches for the mic. That instinct, paired with a booming,
              unmistakable voice, earned him the nickname "The Range Master," a
              nod to his command of every register a stage demands, from
              boardroom composure to dancefloor energy. Beyond hosting, he is
              the founder of The Naked Truth, a platform for candid
              conversations on culture and self-development, and Communicado, a
              communications and events outfit built to help brands and couples
              say exactly what they mean, exactly when it matters.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="inline-flex items-center gap-2 bg-[#770875]/8 text-[#770875] text-[13px] font-medium px-4 py-2 rounded-full">
                <Icon.chat style={{ width: 14, height: 14 }} /> Bilingual
                Hosting
              </span>
              <span className="inline-flex items-center gap-2 bg-[#FFD700]/12 text-[#8a6d16] text-[13px] font-medium px-4 py-2 rounded-full">
                <Icon.target style={{ width: 14, height: 14 }} /> Award Winning
              </span>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <a
              href={waLink(
                "Hi, I'd like to request availability for The Corporate Emcee.",
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-9 bg-[#150512] hover:bg-[#770875] text-white font-medium px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            >
              Request Availability
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#FAF6F9]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-[13px] font-medium text-[#770875]">
            What He Brings to the Stage
          </span>
          <h2 className="font-serif text-3xl md:text-[44px] leading-tight text-[#150512] mt-3">
            Services Built Around Your Occasion
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="group h-full bg-white rounded-2xl p-7 border border-[#150512]/6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#770875]/10 hover:border-[#770875]/25">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-[#770875]/10 text-[#770875] transition-colors duration-300 group-hover:bg-[#770875] group-hover:text-white">
                  <s.icon style={{ width: 20, height: 20 }} />
                </span>
                <h3 className="font-serif text-lg text-[#150512] mt-5">
                  {s.title}
                </h3>
                <p className="text-[#3a1938]/70 text-[14px] leading-relaxed mt-2.5">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reels() {
  return (
    <section id="reels" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[13px] font-medium text-[#770875]">
              On Instagram
            </span>
            <h2 className="font-serif text-3xl md:text-[44px] leading-tight text-[#150512] mt-3">
              Latest Reels
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[#150512] font-medium border-b border-[#150512]/30 hover:border-[#770875] hover:text-[#770875] pb-0.5 transition-colors duration-200"
          >
            Follow for more reels
            <Icon.chevron style={{ width: 15, height: 15 }} />
          </a>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {REELS.map((r, i) => (
            <Reveal key={r.id} delay={i * 70}>
              <div className="group relative aspect-[9/16] rounded-2xl overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${r.seed}/420/740`}
                  alt={r.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#150512]/90 via-[#150512]/10 to-transparent" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid place-items-center w-14 h-14 rounded-full bg-white/20 backdrop-blur text-white transition-transform duration-300 group-hover:scale-110">
                    <Icon.play style={{ width: 20, height: 20 }} />
                  </span>
                </span>
                <p className="absolute bottom-4 left-4 right-4 text-white text-[13px] leading-snug">
                  {r.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandPortrait() {
  const rows = [
    { label: "Nickname", value: "The Range Master" },
    { label: "Brand Tone", value: "Bold, energetic, premium" },
    {
      label: "Strengths",
      value: "Bilingual hosting, crowd control, corporate protocol",
    },
    { label: "Style", value: "Charismatic, polished, endlessly quotable" },
  ];
  return (
    <section
      id="brand"
      className="py-24 md:py-32 bg-[#150512] text-[#FAF6F9] relative overflow-hidden"
    >
      <div
        className="absolute -top-24 right-0 w-[420px] h-[420px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(119,8,117,0.55) 0%, rgba(119,8,117,0) 70%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-16 items-center relative">
        <Reveal>
          <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] max-w-md">
            <img
              src="https://picsum.photos/seed/mcee-brand/650/820"
              alt="The Corporate Emcee brand portrait"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-serif text-2xl md:text-[32px] leading-snug text-[#FAF6F9]">
              "Your event just got better with The Corporate Emcee."
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-1"
                >
                  <span className="text-[13px] text-[#FFD700] uppercase tracking-wide">
                    {row.label}
                  </span>
                  <span className="text-[14.5px] text-[#FAF6F9]/85 sm:text-right">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <a
              href="https://picsum.photos/seed/portfolio/1/1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-10 bg-[#770875] hover:bg-[#8f0f8c] text-white font-medium px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            >
              Download Portfolio PDF
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    eventType: "",
    eventDate: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submission:", form);
    setSent(true);
    setForm({
      fullName: "",
      email: "",
      eventType: "",
      eventDate: "",
      message: "",
    });
    setTimeout(() => setSent(false), 4000);
  };

  const infoBlocks = [
    {
      icon: Icon.whatsapp,
      label: "WhatsApp",
      value: "+234 801 234 5678",
      href: waLink(
        "Hi, I'd like to enquire about booking The Corporate Emcee.",
      ),
    },
    {
      icon: Icon.mail,
      label: "Email",
      value: "hello@thecorporatemcee.com",
      href: "mailto:hello@thecorporatemcee.com",
    },
    {
      icon: Icon.phone,
      label: "Call",
      value: "+234 801 234 5678",
      href: "tel:+2348012345678",
    },
    { icon: Icon.pin, label: "Location", value: "Lagos, Nigeria", href: "#" },
  ];

  const inputClass =
    "w-full bg-white border border-[#150512]/12 rounded-xl px-4 py-3 text-[14.5px] text-[#150512] placeholder:text-[#3a1938]/40 focus:outline-none focus:ring-2 focus:ring-[#770875]/40 focus:border-[#770875] transition-colors duration-200";

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#FAF6F9]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-[0.85fr,1.15fr] gap-14">
        <div>
          <Reveal>
            <span className="text-[13px] font-medium text-[#770875]">
              Let's Talk
            </span>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight text-[#150512] mt-3">
              Let's Make Your Event Unforgettable
            </h2>
            <p className="text-[#3a1938]/70 text-[15px] leading-relaxed mt-4 max-w-md">
              Tell us a little about your event and we'll get back to you with
              availability and a quote.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            {infoBlocks.map((b, i) => (
              <Reveal key={b.label} delay={i * 60}>
                <a
                  href={b.href}
                  target={b.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-start gap-3 bg-white rounded-2xl p-5 border border-[#150512]/6 hover:border-[#770875]/30 hover:shadow-lg hover:shadow-[#770875]/8 transition-all duration-200"
                >
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-[#770875]/10 text-[#770875] shrink-0">
                    <b.icon style={{ width: 16, height: 16 }} />
                  </span>
                  <div>
                    <p className="text-[12px] text-[#3a1938]/60">{b.label}</p>
                    <p className="text-[13.5px] font-medium text-[#150512] mt-0.5">
                      {b.value}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={100}>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[1.75rem] p-7 md:p-9 border border-[#150512]/6 shadow-xl shadow-[#150512]/5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[13px] font-medium text-[#150512]">
                  Full Name
                </label>
                <input
                  required
                  value={form.fullName}
                  onChange={update("fullName")}
                  placeholder="Your full name"
                  className={`${inputClass} mt-2`}
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#150512]">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  className={`${inputClass} mt-2`}
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#150512]">
                  Event Type
                </label>
                <select
                  required
                  value={form.eventType}
                  onChange={update("eventType")}
                  className={`${inputClass} mt-2 appearance-none`}
                >
                  <option value="" disabled>
                    Select event type
                  </option>
                  <option>Corporate Event</option>
                  <option>Wedding / Social Event</option>
                  <option>Conference / Product Launch</option>
                  <option>Training / Coaching</option>
                  <option>Talk Show</option>
                  <option>Funeral / Life Celebration</option>
                </select>
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#150512]">
                  Event Date
                </label>
                <input
                  required
                  type="date"
                  value={form.eventDate}
                  onChange={update("eventDate")}
                  className={`${inputClass} mt-2`}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[13px] font-medium text-[#150512]">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell us about your event..."
                  className={`${inputClass} mt-2 resize-none`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-7 inline-flex items-center justify-center gap-2 bg-[#770875] hover:bg-[#5c065b] text-white font-medium py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#770875]/25"
            >
              Send Message
            </button>
            <p
              className={`text-center text-[13px] text-[#770875] mt-3 transition-opacity duration-300 ${sent ? "opacity-100" : "opacity-0"}`}
            >
              Thanks — your message has been noted. We'll be in touch shortly!
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const quickLinks = NAV_LINKS;
  const serviceLinks = SERVICES.map((s) => s.title);
  const socials = [
    { icon: Icon.ig, href: "https://instagram.com" },
    { icon: Icon.tiktok, href: "https://tiktok.com" },
    { icon: Icon.youtube, href: "https://youtube.com" },
  ];
  return (
    <footer className="bg-[#150512] text-[#FAF6F9]/80 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-[1.3fr,1fr,1fr] gap-12">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <img
                src={logofooter}
                alt="The Corporate Emcee"
                className="h-14 md:h-16 w-auto shrink-0 object-contain"
              />
            </a>
            <p className="text-[14px] leading-relaxed mt-5 max-w-xs">
              Your event just got better with The Corporate Emcee — bold,
              bilingual hosting for every kind of stage.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid place-items-center w-9 h-9 rounded-full border border-white/15 hover:border-[#770875] hover:bg-[#770875] transition-colors duration-200"
                >
                  <s.icon style={{ width: 15, height: 15 }} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[13px] font-semibold text-white uppercase tracking-wide">
              Quick Links
            </p>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[14px] hover:text-[#FFD700] transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[13px] font-semibold text-white uppercase tracking-wide">
              Services
            </p>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-[14px] hover:text-[#FFD700] transition-colors duration-200"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px]">
          <p>
            © {new Date().getFullYear()} MC Omo Tee — Omotoyosi Oluwadamilare.
            All rights reserved.
          </p>
          <p>
            Designed by{" "}
            <a href="https://myportfooolio.vercel.app/">Pempixel Web</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------- app -------------------------------- */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-sans bg-[#FAF6F9] text-[#150512] antialiased">
      <Nav open={menuOpen} setOpen={setMenuOpen} />
      <main>
        <Hero />
        <Marquee />
        <Gallery />
        <About />
        <Services />
        <Reels />
        <BrandPortrait />
        <Contact />
      </main>
      <Footer />

      <a
        href={waLink("Hi TheCorporateMC, I'd like to book you for my event.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 grid place-items-center w-14 h-14 rounded-full bg-[#770875] text-white shadow-xl shadow-[#770875]/40 hover:scale-105 transition-transform duration-200 lg:hidden"
      >
        <Icon.whatsapp style={{ width: 22, height: 22 }} />
      </a>
    </div>
  );
}
