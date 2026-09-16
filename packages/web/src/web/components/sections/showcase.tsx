import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface CaseStudy {
  title: string;
  category: string;
  tags: string[];
  span: string;
  pattern: "hex" | "grid" | "rays" | "layers";
}

const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Meridian Capital",
    category: "Investor Deck",
    tags: ["Educational Deck", "Data Narrative"],
    span: "lg:col-span-7",
    pattern: "hex",
  },
  {
    title: "Aurum Institute",
    category: "Brand System",
    tags: ["Identity", "Guidelines"],
    span: "lg:col-span-5",
    pattern: "grid",
  },
  {
    title: "Northstar Academy",
    category: "Educational Deck",
    tags: ["Curriculum", "Visual System"],
    span: "lg:col-span-5",
    pattern: "rays",
  },
  {
    title: "Obsidian Ventures",
    category: "Brand System",
    tags: ["Identity", "Pitch Kit"],
    span: "lg:col-span-7",
    pattern: "layers",
  },
];

function CardPattern({ pattern }: { pattern: CaseStudy["pattern"] }) {
  if (pattern === "hex") {
    return (
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full opacity-[0.35]">
        {Array.from({ length: 5 }).map((_, i) => (
          <polygon
            key={i}
            points="200,20 340,90 340,210 200,280 60,210 60,90"
            fill="none"
            stroke="#c5a059"
            strokeWidth="0.6"
            transform={`translate(0, ${(i - 2) * 8}) scale(${1 - i * 0.14})`}
            style={{ transformOrigin: "200px 150px" }}
          />
        ))}
      </svg>
    );
  }
  if (pattern === "grid") {
    return (
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full opacity-[0.3]">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" stroke="#c5a059" strokeWidth="0.4" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="#c5a059" strokeWidth="0.4" />
        ))}
      </svg>
    );
  }
  if (pattern === "rays") {
    return (
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full opacity-[0.3]">
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={i}
            x1="200"
            y1="150"
            x2={200 + Math.cos((i / 14) * Math.PI * 2) * 260}
            y2={150 + Math.sin((i / 14) * Math.PI * 2) * 260}
            stroke="#c5a059"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full opacity-[0.3]">
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={40 + i * 8} y={40 + i * 30} width="320" height="1" fill="#c5a059" opacity={1 - i * 0.12} />
      ))}
    </svg>
  );
}

function Card({ item, index }: { item: CaseStudy; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={item.span}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          setTilt({ x: 0, y: 0 });
        }}
        data-cursor="view"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovering ? "scale(1.015)" : "scale(1)"}`,
          transition: "transform 0.35s ease",
        }}
        className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-gold/15 bg-gradient-to-br from-charcoal via-canvas-3 to-canvas-2"
      >
        <CardPattern pattern={item.pattern} />

        {/* gold foil sweep border */}
        <div
          className="absolute inset-0 rounded-sm pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovering ? 1 : 0,
            background:
              "linear-gradient(120deg, transparent 30%, rgba(228,201,137,0.5) 50%, transparent 70%)",
            backgroundSize: "250% 250%",
            backgroundPosition: hovering ? "100% 100%" : "0% 0%",
            transition: "background-position 1.1s ease, opacity 0.5s ease",
            mixBlendMode: "screen",
          }}
        />
        <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-gold/20 group-hover:ring-gold/60 transition-colors duration-500" />

        {/* glass overlay content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-canvas/90 via-canvas/10 to-transparent">
          <p className="eyebrow mb-2">{item.category}</p>
          <h3 className="font-display text-2xl md:text-3xl text-ivory">{item.title}</h3>
          <div className="mt-3 flex gap-2 flex-wrap">
            {item.tags.map((t) => (
              <span key={t} className="text-[0.62rem] uppercase tracking-[0.15em] text-muted-text border border-gold/20 rounded-full px-3 py-1">
                {t}
              </span>
            ))}
          </div>
          <div
            className="mt-5 inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-400"
          >
            View Case Study <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Showcase() {
  return (
    <section id="work" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-[6vw]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="eyebrow mb-5">Selected Work</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] text-ivory max-w-xl leading-[1.15]">
              Educational Decks &amp; Brand Systems, built for the boardroom.
            </h2>
          </div>
          <p className="text-muted-text text-sm max-w-xs leading-relaxed">
            Placeholder studies shown below — real client work to be added by PixelPerfect.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {CASE_STUDIES.map((item, i) => (
            <Card key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
