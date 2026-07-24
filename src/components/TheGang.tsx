import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const MEMBERS = [
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png',
    name: 'THE RUGGER',
    role: 'Chief Exit Strategist',
    quote: 'I promise absolutely nothing.',
    trait: 'Unpredictable',
    color: '#F4845F',
    bg: 'from-[#F4845F]/20 to-transparent',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png',
    name: 'THE DEGEN',
    role: 'Head of Ape Division',
    quote: 'I bought the top.',
    trait: 'All-in Always',
    color: '#6BBF7A',
    bg: 'from-[#6BBF7A]/20 to-transparent',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png',
    name: 'THE DIAMOND HAND',
    role: 'VP of Never Selling',
    quote: 'I never sell.',
    trait: 'Unbreakable',
    color: '#E882B4',
    bg: 'from-[#E882B4]/20 to-transparent',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png',
    name: 'THE MOON CHASER',
    role: 'Director of Hopium',
    quote: 'Next stop: Lunar Orbit.',
    trait: 'Delusionally Optimistic',
    color: '#6EB5FF',
    bg: 'from-[#6EB5FF]/20 to-transparent',
  },
];

export default function TheGang() {
  const { ref, visible } = useInView();

  return (
    <section id="the-gang" className="relative bg-black py-24 sm:py-36 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block mb-4 font-gochi text-sm tracking-[0.3em] text-white/40 uppercase">The Team</span>
          <h2 className="font-gochi text-4xl sm:text-6xl text-white">Meet The Gang</h2>
          <p className="mt-4 font-gochi text-lg text-white/50 max-w-xl mx-auto">
            Four degens. One mission. Zero regrets.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMBERS.map((m, i) => (
            <div
              key={m.name}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-700 hover:-translate-y-2 hover:border-white/25 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Card glow on hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                style={{ boxShadow: `inset 0 0 60px ${m.color}22` }}
              />

              {/* Character image */}
              <div className={`relative h-52 sm:h-56 bg-gradient-to-b ${m.bg} overflow-hidden`}>
                <img
                  src={m.src}
                  alt={m.name}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[90%] w-auto object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.4))' }}
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="h-[2px] w-8 rounded-full mb-3" style={{ background: m.color }} />
                <h3 className="font-gochi text-xl text-white leading-tight">{m.name}</h3>
                <p className="font-gochi text-xs text-white/40 tracking-wide mt-0.5">{m.role}</p>
                <p className="font-gochi text-sm text-white/70 italic mt-3">"{m.quote}"</p>
                <span
                  className="mt-4 inline-block font-gochi text-xs px-3 py-1 rounded-full border"
                  style={{ borderColor: `${m.color}60`, color: m.color }}
                >
                  {m.trait}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
