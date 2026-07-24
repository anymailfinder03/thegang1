import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

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

const FAQS = [
  {
    q: 'Is $GANG a real investment?',
    a: "Bro. It's a meme coin. Please do not mortgage your house. We are literally characters called The Rugger and The Degen. Invest only what you can afford to lose — and probably less than that.",
  },
  {
    q: 'Who is behind $GANG?',
    a: "The Gang. The community. Four degens with a dream and a Figma file. There's no shadowy VC, no team allocation, no nothing. Just vibes.",
  },
  {
    q: 'Why is the tax 0/0?',
    a: "Because we hate taxes as much as The Rugger hates accountability. Buy, sell, do whatever — we take nothing.",
  },
  {
    q: 'Is the liquidity locked?',
    a: "LP is burned to a dead wallet. It's not coming back. The Rugger can't even rug it. That's the joke.",
  },
  {
    q: 'When moon?',
    a: "The Moon Chaser says soon. He has been saying this for 3 bear markets. But this time feels different. It always feels different.",
  },
  {
    q: 'What chain is $GANG on?',
    a: "Ethereum mainnet. Where gas fees are a personality test and only true degens survive.",
  },
];

function FaqItem({ q, a, delay, visible }: { q: string; a: string; delay: number; visible: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border border-white/10 rounded-2xl overflow-hidden transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left bg-white/5 hover:bg-white/8 transition-colors duration-200"
      >
        <span className="font-gochi text-base sm:text-lg text-white">{q}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-white/50 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-5 sm:px-6 pb-5 pt-2 font-gochi text-base text-white/60 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { ref, visible } = useInView();

  return (
    <section id="faq" className="relative bg-black py-24 sm:py-36 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div ref={ref} className="mx-auto max-w-3xl px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block mb-4 font-gochi text-sm tracking-[0.3em] text-white/40 uppercase">FAQ</span>
          <h2 className="font-gochi text-4xl sm:text-6xl text-white">Your Degen Questions</h2>
          <p className="mt-4 font-gochi text-lg text-white/50 max-w-xl mx-auto">
            Answered with the honesty of someone who bought at the top.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} delay={i * 80} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
