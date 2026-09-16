const ITEMS = [
  "EDUCATIONAL DECKS",
  "BRAND SYSTEMS",
  "INVESTOR NARRATIVES",
  "VISUAL IDENTITY",
  "PITCH DECK DESIGN",
  "PRESENTATION SYSTEMS",
];

export function Marquee() {
  const line = ITEMS.join("   •   ");
  return (
    <div className="relative hairline-t hairline-b py-6 overflow-hidden bg-canvas-2/40">
      <div className="flex whitespace-nowrap will-change-transform pp-marquee-track">
        <span className="font-display text-sm tracking-[0.3em] text-muted-text px-6">
          {line} &nbsp;•&nbsp; {line}
        </span>
        <span className="font-display text-sm tracking-[0.3em] text-muted-text px-6">
          {line} &nbsp;•&nbsp; {line}
        </span>
      </div>
    </div>
  );
}
