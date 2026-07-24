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

const SLICES = [
  { label: 'Liquidity Pool', pct: 40, color: '#F4845F' },
  { label: 'Community & Airdrops', pct: 30, color: '#6BBF7A' },
  { label: 'CEX Listings', pct: 20, color: '#E882B4' },
  { label: 'Marketing', pct: 10, color: '#6EB5FF' },
];

export default function Tokenomics() {
  const { ref, visible } = useInView();

  return (
    <section id="tokenomics" className="relative bg-[#0d0d0d] py-24 sm:py-36 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block mb-4 font-gochi text-sm tracking-[0.3em] text-white/40 uppercase">The Numbers</span>
          <h2 className="font-gochi text-4xl sm:text-6xl text-white">Tokenomics</h2>
          <p className="mt-4 font-gochi text-lg text-white/50 max-w-xl mx-auto">
            Simple. Clean. No tricks. Just vibes and a billion tokens.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Donut chart (CSS) */}
          <div className={`flex justify-center transition-all duration-700 delay-200 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                {SLICES.reduce<{ els: React.ReactNode[]; offset: number }>(
                  (acc, slice) => {
                    const r = 80;
                    const circ = 2 * Math.PI * r;
                    const dash = (slice.pct / 100) * circ;
                    const gap = circ - dash;
                    acc.els.push(
                      <circle
                        key={slice.label}
                        cx="100" cy="100" r={r}
                        fill="none"
                        stroke={slice.color}
                        strokeWidth="28"
                        strokeDasharray={`${dash} ${gap}`}
                        strokeDashoffset={-acc.offset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dasharray 1s ease, stroke-dashoffset 1s ease' }}
                      />
                    );
                    acc.offset += dash;
                    return acc;
                  },
                  { els: [], offset: 0 }
                ).els}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-gochi text-3xl sm:text-4xl text-white">1B</p>
                <p className="font-gochi text-sm text-white/40 tracking-widest">$GANG</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-4">
            {SLICES.map((s, i) => (
              <div
                key={s.label}
                className={`flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 transition-all duration-700 ${
                  visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${i * 100 + 300}ms` }}
              >
                <div className="h-3 w-3 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <span className="font-gochi text-base sm:text-lg text-white/80 flex-1">{s.label}</span>
                <span className="font-gochi text-2xl text-white" style={{ color: s.color }}>{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contract address */}
        <div
          className={`mt-16 rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-700 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-gochi text-sm tracking-[0.3em] text-white/40 uppercase mb-3">Contract Address</p>
          <p className="font-gochi text-sm sm:text-base text-white/70 break-all tracking-wider">
            0x00000000000000000000000000000GANG
          </p>
          <p className="mt-2 font-gochi text-xs text-white/30">TBA — stay tuned degen</p>
        </div>
      </div>
    </section>
  );
}
