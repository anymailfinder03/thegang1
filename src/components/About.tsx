import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.15) {
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

const STATS = [
  { label: 'Total Supply', value: '1,000,000,000', unit: '$GANG' },
  { label: 'Liquidity Locked', value: '100%', unit: 'FOREVER' },
  { label: 'Tax', value: '0 / 0', unit: 'BUY / SELL' },
  { label: 'Holders', value: '69,420', unit: '& GROWING' },
];

export default function About() {
  const { ref, visible } = useInView();

  return (
    <section id="about" className="relative bg-black py-24 sm:py-36 overflow-hidden">
      {/* Blurred bg blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#F4845F]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#6EB5FF]/20 blur-[120px]" />

      <div
        ref={ref}
        className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Left: text */}
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block mb-4 font-gochi text-sm tracking-[0.3em] text-white/40 uppercase">
            What is this?
          </span>
          <h2 className="font-gochi text-4xl sm:text-6xl leading-tight text-white">
            A Gang of Degens,{' '}
            <span className="text-[#F4845F]">United</span> by{' '}
            <span className="text-[#6EB5FF]">Hopium</span>
          </h2>
          <p className="mt-6 font-gochi text-lg text-white/60 leading-relaxed">
            $GANG isn't just a token. It's a lifestyle. Four legendary archetypes — The Rugger, The Degen, The Diamond Hand, and The Moon Chaser — forged together in the fires of a bear market, rising again for one final moon mission.
          </p>
          <p className="mt-4 font-gochi text-lg text-white/60 leading-relaxed">
            No VC allocations. No insider wallets. No dev wallet. Just pure, unadulterated community chaos — and a ticker that slaps.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {['No Team Tokens', 'Renounced Contract', 'LP Burned', 'Community Owned'].map((tag) => (
              <span
                key={tag}
                className="font-gochi text-sm px-4 py-2 rounded-full border border-white/20 text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: stats grid */}
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <p className="relative font-gochi text-xs tracking-[0.2em] text-white/40 uppercase mb-2">{s.label}</p>
              <p className="relative font-gochi text-2xl sm:text-3xl text-white leading-none">{s.value}</p>
              <p className="relative font-gochi text-xs text-white/40 mt-1 tracking-widest">{s.unit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
