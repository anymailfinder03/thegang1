const ITEMS = ['$GANG', 'TO THE MOON', 'DEGEN LIFE', 'DIAMOND HANDS', 'APE IN', 'NEVER SELL', 'LFG', 'WAGMI'];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="relative bg-black border-y border-white/10 py-3 overflow-hidden select-none">
      <div className="ticker-track flex gap-12 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="font-gochi text-sm tracking-[0.3em] text-white/40 uppercase flex-shrink-0">
            {item}
            <span className="ml-12 text-white/20">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
