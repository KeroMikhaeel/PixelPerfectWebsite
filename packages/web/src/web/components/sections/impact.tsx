import { motion } from "framer-motion";
import { Constellation, useInViewProgress } from "../three/constellation";

const METRICS = [
  { value: "4+", label: "Years of Dedicated Craft" },
  { value: "50+", label: "Projects Delivered Successfully" },
  { value: "100%", label: "Founder-Led Attention to Detail" },
];

export function Impact() {
  const { elRef, progressRef } = useInViewProgress<HTMLDivElement>();

  return (
    <section id="impact" className="relative py-32 md:py-44 overflow-hidden">
      <div ref={elRef} className="mx-auto max-w-[1400px] px-[6vw]">
        <div className="text-center mb-8">
          <p className="eyebrow mb-5">Client Impact</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] text-ivory">A Track Record in Numbers</h2>
        </div>

        <div className="relative h-[260px] md:h-[340px]">
          <Constellation progressRef={progressRef} />

          <div className="relative h-full grid grid-cols-1 md:grid-cols-3 items-center">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                className="text-center px-4"
              >
                <p className="font-display text-[clamp(2.5rem,6vw,4rem)] gold-gradient-text bg-canvas/70 backdrop-blur-sm rounded-full inline-block px-6">
                  {m.value}
                </p>
                <p className="mt-3 text-[0.72rem] uppercase tracking-[0.2em] text-muted-text bg-canvas/70 backdrop-blur-sm rounded-full inline-block px-4 py-1">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-center text-muted-text text-xs mt-6 italic">
          Figures reflect PixelPerfect's current portfolio and are editable as new work ships.
        </p>
      </div>
    </section>
  );
}
