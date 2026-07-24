import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

type GangImage = { src: string; bg: string; panel: string };

const IMAGES: GangImage[] = [
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png',
    bg: '#F4845F',
    panel: '#F79B7F',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png',
    bg: '#E882B4',
    panel: '#ED9DC4',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png',
    bg: '#6EB5FF',
    panel: '#8DC4FF',
  },
];

type Member = { name: string; quote: string; description: string; accent: string };

const MEMBERS: Member[] = [
  {
    name: 'THE RUGGER',
    quote: 'I promise absolutely nothing.',
    description: 'Born in the shadows of a thousand abandoned whitepapers. Sells the dream, keeps the bag.',
    accent: '#F4845F',
  },
  {
    name: 'THE DEGEN',
    quote: 'I bought the top.',
    description: 'Bought the top. Still buying. Still smiling. Ape first, research never.',
    accent: '#6BBF7A',
  },
  {
    name: 'THE DIAMOND HAND',
    quote: 'I never sell.',
    description: 'Held through the abyss and back. Paper hands need not apply.',
    accent: '#E882B4',
  },
  {
    name: 'THE MOON CHASER',
    quote: 'Next stop: Lunar Orbit.',
    description: 'Charts point upward. Spirit points further. Fueled by pure unfiltered hopium.',
    accent: '#6EB5FF',
  },
];

type Role = 'CENTER' | 'LEFT' | 'RIGHT' | 'BACK';
const DURATION = 650;
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    IMAGES.forEach((img) => {
      const pre = new Image();
      pre.src = img.src;
    });
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const active = MEMBERS[activeIndex];
  const activeImage = IMAGES[activeIndex];

  const goTo = (next: number) => {
    if (isAnimating) return;
    const normalized = ((next % 4) + 4) % 4;
    if (normalized === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(normalized);
    window.setTimeout(() => setIsAnimating(false), DURATION);
  };

  const next = () => goTo(activeIndex + 1);
  const prev = () => goTo(activeIndex - 1);

  const roles = useMemo<Record<Role, number>>(() => ({
    CENTER: activeIndex,
    LEFT: (activeIndex + 3) % 4,
    RIGHT: (activeIndex + 1) % 4,
    BACK: (activeIndex + 2) % 4,
  }), [activeIndex]);

  const getRole = (i: number): Role => {
    if (i === roles.CENTER) return 'CENTER';
    if (i === roles.LEFT) return 'LEFT';
    if (i === roles.RIGHT) return 'RIGHT';
    return 'BACK';
  };

  const getStyle = (role: Role): React.CSSProperties => {
    const base: React.CSSProperties = {
      transition: `all ${DURATION}ms ${EASING}`,
      transitionProperty: 'transform, filter, opacity, left, right',
    };
    if (isMobile) {
      switch (role) {
        case 'CENTER': return { ...base, left: '50%', transform: 'translateX(-50%) scale(1.25)', opacity: 1, filter: 'blur(0px)', zIndex: 40, bottom: '6%' };
        case 'LEFT':   return { ...base, left: '8%', transform: 'translateX(0) scale(0.55)', opacity: 0.45, filter: 'blur(6px)', zIndex: 20, bottom: '8%' };
        case 'RIGHT':  return { ...base, left: 'auto', right: '8%', transform: 'translateX(0) scale(0.55)', opacity: 0.45, filter: 'blur(6px)', zIndex: 20, bottom: '8%' };
        case 'BACK':   return { ...base, left: '50%', transform: 'translateX(-50%) scale(0.35)', opacity: 0.3, filter: 'blur(10px)', zIndex: 10, bottom: '10%' };
      }
    }
    switch (role) {
      case 'CENTER': return { ...base, left: '50%', transform: 'translateX(-50%) scale(1.7)', opacity: 1, filter: 'blur(0px)', zIndex: 40, bottom: '0%' };
      case 'LEFT':   return { ...base, left: '30%', transform: 'translateX(-50%) scale(1.1)', opacity: 0.5, filter: 'blur(4px)', zIndex: 20, bottom: '4%' };
      case 'RIGHT':  return { ...base, left: '70%', transform: 'translateX(-50%) scale(1.1)', opacity: 0.5, filter: 'blur(4px)', zIndex: 20, bottom: '4%' };
      case 'BACK':   return { ...base, left: '50%', transform: 'translateX(-50%) scale(0.7)', opacity: 0.3, filter: 'blur(8px)', zIndex: 10, bottom: '6%' };
    }
  };

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
      style={{ background: activeImage.bg, transition: `background-color ${DURATION}ms ${EASING}` }}
    >
      {/* Grain */}
      <div className="grain-overlay pointer-events-none absolute inset-0 z-[60] opacity-[0.07] mix-blend-soft-light" aria-hidden />

      {/* Bottom gradient fade into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-[55] bg-gradient-to-t from-black/40 to-transparent" />

      {/* Top left brand */}
      <div className="absolute top-20 left-6 sm:top-24 sm:left-10 z-50">
        <div className="mt-1 h-[2px] w-10 bg-white/40" />
      </div>

      {/* Top right counter */}
      <div className="absolute top-20 right-6 sm:top-24 sm:right-10 z-50 flex items-center gap-3">
        <span className="font-gochi text-2xl text-white/90 tabular-nums">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <span className="font-gochi text-xs tracking-[0.3em] text-white/50 uppercase">/ 04</span>
      </div>

      {/* Dot indicators */}
      <div className="absolute top-1/2 right-5 sm:right-8 z-50 flex flex-col gap-2 -translate-y-1/2">
        {MEMBERS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'h-6 w-2 bg-white'
                : 'h-2 w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to ${MEMBERS[i].name}`}
          />
        ))}
      </div>

      {/* Stage */}
      <div className="absolute inset-0 z-20">
        {IMAGES.map((img, i) => {
          const role = getRole(i);
          const style = getStyle(role);
          const isCenter = role === 'CENTER';
          return (
            <div
              key={img.src}
              className="absolute bottom-0"
              style={{ ...style, height: isMobile ? '60%' : '78%', maxWidth: '90%' }}
            >
              <img
                src={img.src}
                alt={MEMBERS[i].name}
                draggable={false}
                className={isCenter ? 'animate-float h-full w-auto object-contain' : 'h-full w-auto object-contain'}
                style={{ filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.25))' }}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom left: character info */}
      <div className="absolute bottom-16 left-6 sm:bottom-14 sm:left-10 z-50 max-w-[55vw] sm:max-w-xs md:max-w-sm">
        <div key={activeIndex} className="animate-text-in">
          <div
            className="mb-2 h-[3px] w-12 rounded-full"
            style={{ background: active.accent, transition: `background-color ${DURATION}ms ${EASING}` }}
          />
          <h3 className="font-gochi text-4xl sm:text-6xl md:text-7xl leading-none text-white tracking-wide">
            {active.name}
          </h3>
          <p className="mt-2 font-gochi text-base sm:text-5g text-white/85 italic">
            "{active.quote}"
          </p>
          <p className="mt-1 font-gochi text-xs sm:text-sm text-white/65 leading-relaxed hidden sm:block">
            {active.description}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={prev}
            disabled={isAnimating}
            aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white/80 transition-all duration-300 hover:scale-110 hover:border-white hover:text-white disabled:opacity-40"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
          <button
            onClick={next}
            disabled={isAnimating}
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white/80 transition-all duration-300 hover:scale-110 hover:border-white hover:text-white disabled:opacity-40"
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Bottom right: CTA */}
      <div className="absolute bottom-16 right-6 sm:bottom-14 sm:right-10 z-50 flex flex-col items-end gap-3">
        <button
          id="buy"
          onClick={scrollDown}
          className="group flex items-center gap-3 rounded-full bg-white/95 px-5 py-3 sm:px-7 sm:py-4 text-black shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:bg-white"
        >
          <span className="font-gochi text-base sm:text-xl tracking-wide leading-none">JOIN THE GANG</span>
          <span className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight size={16} strokeWidth={2.5} />
          </span>
        </button>
      </div>
    </section>
  );
}
