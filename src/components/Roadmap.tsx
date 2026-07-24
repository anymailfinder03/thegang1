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

const PHASES = [
  {
    phase: 'Phase 1',
    title: 'The Rug Setup',
    color: '#F4845F',
    items: ['Token Launch', 'Liquidity Pool', 'Gang NFT Teaser', 'First 1,000 Holders'],
    done: true,
  },
  {
    phase: 'Phase 2',
    title: 'The Degen Arc',
    color: '#6BBF7A',
    items: ['CoinGecko & CMC Listing', 'Gang Merch Drop', '10,000 Holders', 'Degen Dashboard'],
    done: false,
    active: true,
  },
  {
    phase: 'Phase 3',
    title: 'Diamond Hands Protocol',
    color: '#E882B4',
    items: ['CEX Listing', 'Gang DAO Launch', 'Cross-chain Bridge', '100K Holders'],
    done: false,
  },
  {
    phase: 'Phase 4',
    title: 'Moon Mission',
    color: '#6EB5FF',
    items: ['Tier 1 Exchange', 'Gang Metaverse HQ', 'Gang Token V2', 'Lunar Orbit Confirmed'],
    done: false,
  },
];

export default function Roadmap() {
  const { ref, visible } = useInView();

  return (
    <section id="roadmap" className="relative bg-[#0d0d0d] py-24 sm:py-36 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="pointer-events-none absolute -bottom-60 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#6BBF7A]/10 blur-[140px]" />

      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block mb-4 font-gochi text-sm tracking-[0.3em] text-white/40 uppercase">The Plan</span>
          <h2 className="font-gochi text-4xl sm:text-6xl text-white">Roadmap</h2>
          <p className="mt-4 font-gochi text-lg text-white/50 max-w-xl mx-auto">
            We have a plan. Whether we follow it is another story.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-white/10" />

          <div className="flex flex-col gap-8 md:gap-0">
            {PHASES.map((p, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={p.phase}
                  className={`relative md:grid md:grid-cols-2 md:gap-12 ${isLeft ? '' : 'md:direction-rtl'}`}
                >
                  {/* Dot */}
                  <div
                    className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-black z-10 transition-all duration-500"
                    style={{
                      background: p.done || p.active ? p.color : '#333',
                      borderColor: p.done || p.active ? p.color : '#444',
                      boxShadow: p.active ? `0 0 20px ${p.color}88` : 'none',
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`md:col-span-1 ${isLeft ? 'md:pr-12 md:col-start-1' : 'md:pl-12 md:col-start-2'}`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-700 ${
                        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      } ${p.active ? 'border-white/30 bg-white/8' : 'border-white/10 bg-white/5'}`}
                      style={{
                        transitionDelay: `${i * 150}ms`,
                        ...(p.active ? { boxShadow: `0 0 40px ${p.color}22` } : {}),
                      }}
                    >
                      {p.active && (
                        <span
                          className="absolute top-4 right-4 font-gochi text-xs px-2 py-1 rounded-full"
                          style={{ background: `${p.color}33`, color: p.color }}
                        >
                          In Progress
                        </span>
                      )}
                      {p.done && (
                        <span className="absolute top-4 right-4 font-gochi text-xs px-2 py-1 rounded-full bg-white/10 text-white/50">
                          Done
                        </span>
                      )}
                      <p className="font-gochi text-xs tracking-[0.25em] uppercase mb-1" style={{ color: p.color }}>
                        {p.phase}
                      </p>
                      <h3 className="font-gochi text-xl sm:text-2xl text-white mb-4">{p.title}</h3>
                      <ul className="space-y-2">
                        {p.items.map((item) => (
                          <li key={item} className="flex items-center gap-3">
                            <span
                              className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                              style={{ background: p.done ? p.color : p.active ? p.color : '#444' }}
                            />
                            <span
                              className={`font-gochi text-sm ${
                                p.done ? 'text-white/50 line-through' : p.active ? 'text-white/80' : 'text-white/40'
                              }`}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
