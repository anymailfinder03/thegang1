import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = ['About', 'Tokenomics', 'The Gang', 'Roadmap', 'FAQ'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id.toLowerCase().replace(/\s+/g, '-'))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-gochi text-2xl tracking-widest text-white hover:opacity-80 transition-opacity"
        >
          THE GANG
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="font-gochi text-base text-white/70 hover:text-white transition-colors duration-200 tracking-wide"
            >
              {l}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo('buy')}
          className="hidden md:flex items-center gap-2 rounded-full bg-white text-black px-5 py-2 font-gochi text-base tracking-wide hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Buy $GANG
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black/90 backdrop-blur-md px-6 py-4 flex flex-col gap-4 border-t border-white/10">
          {LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="font-gochi text-xl text-white/80 hover:text-white text-left transition-colors"
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => scrollTo('buy')}
            className="mt-2 rounded-full bg-white text-black px-5 py-3 font-gochi text-xl tracking-wide w-full"
          >
            Buy $GANG
          </button>
        </div>
      </div>
    </header>
  );
}
