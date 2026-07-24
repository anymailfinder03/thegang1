import { Twitter, Send, ExternalLink } from 'lucide-react';

const SOCIALS = [
  { label: 'Twitter / X', icon: Twitter, href: '#' },
  { label: 'Telegram', icon: Send, href: '#' },
  { label: 'Dexscreener', icon: ExternalLink, href: '#' },
  { label: 'Uniswap', icon: ExternalLink, href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0d0d0d] border-t border-white/10 overflow-hidden">
      {/* Big CTA band */}
      <div className="relative py-20 sm:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#F4845F]/15 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#6EB5FF]/15 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-gochi text-4xl sm:text-6xl md:text-7xl text-white leading-tight">
            Ready to Join{' '}
            <span className="text-[#F4845F]">The</span>{' '}
            <span className="text-[#6EB5FF]">Gang?</span>
          </h2>
          <p className="mt-5 font-gochi text-lg text-white/50">
            One last bull run. One last chance. The Gang is assembling.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-full bg-white text-black px-8 py-4 font-gochi text-xl tracking-wide hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Buy $GANG on Uniswap
            </a>
            <a
              href="#"
              className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-full border border-white/25 text-white px-8 py-4 font-gochi text-xl tracking-wide hover:border-white/60 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              View Chart
            </a>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-white/10 py-8 px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-gochi text-xl text-white/80 tracking-widest">THE GANG</p>
            <p className="font-gochi text-xs text-white/30 mt-1 max-w-xs">
              Not financial advice. This is a meme. Please touch grass occasionally.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/50 hover:border-white/40 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-6xl mt-6 pt-6 border-t border-white/5">
          <p className="font-gochi text-xs text-white/20 text-center">
            © 2025 The Gang. All rights reserved. No rights were harmed — we rugpulled them first.
          </p>
        </div>
      </div>
    </footer>
  );
}
