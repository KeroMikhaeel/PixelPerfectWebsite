import { motion } from "framer-motion";
import { HeroCube } from "../three/hero-cube";
import { MagneticButton } from "../magnetic-button";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] } }),
};

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* ambient gold glow */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-25 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #c5a059 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1400px] w-full px-[6vw] pt-32 pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
        <div className="relative z-10">
          <motion.p initial="hidden" animate="show" variants={fadeUp} custom={0} className="eyebrow mb-7">
            PixelPerfect — Founded by Kerollos Mikhaeel
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.12}
            className="font-display text-[clamp(2.75rem,6.4vw,5.6rem)] leading-[1.05] tracking-[-0.01em] text-ivory"
          >
            Precision in
            <br />
            <span className="gold-gradient-text italic">Every Pixel.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.26}
            className="mt-8 max-w-[34rem] text-[1.05rem] leading-[1.75] text-muted-text font-light"
          >
            Crafting ultra-high-end educational decks and visual brand identities for founders,
            investors, and institutions who refuse to look ordinary.
          </motion.p>

          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0.4} className="mt-12 flex flex-wrap items-center gap-6">
            <MagneticButton href="#contact" variant="solid">
              Initiate Project
            </MagneticButton>
            <MagneticButton href="#work" variant="ghost">
              View Selected Work
            </MagneticButton>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.55}
            className="mt-20 flex items-center gap-10 hairline-t pt-8 max-w-[30rem]"
          >
            <div>
              <p className="font-display text-2xl text-gold">4</p>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-text mt-1">Years Refining Craft</p>
            </div>
            <div className="h-8 w-px bg-gold/20" />
            <div>
              <p className="font-display text-2xl text-gold">50+</p>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-text mt-1">Projects Delivered</p>
            </div>
          </motion.div>
        </div>

        <div className="relative h-[420px] lg:h-[620px]">
          <HeroCube />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-text">
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
