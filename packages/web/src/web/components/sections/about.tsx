import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-[6vw] grid lg:grid-cols-[0.85fr_1.15fr] gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto lg:mx-0"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full border border-gold/25" />
            <div className="absolute inset-4 rounded-full border border-gold/15" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-charcoal to-canvas-3 flex items-center justify-center">
              <span className="font-display text-5xl md:text-6xl gold-gradient-text">KM</span>
            </div>
            <div
              className="absolute -inset-10 rounded-full opacity-30 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, #c5a059 0%, transparent 70%)" }}
            />
          </div>
        </motion.div>

        <div>
          <p className="eyebrow mb-5">The Founder</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] text-ivory leading-[1.2] mb-8">
            Kerollos Mikhaeel
          </h2>
          <blockquote className="font-display italic text-xl md:text-2xl text-ivory/90 leading-[1.6] border-l border-gold/40 pl-6 mb-8">
            "Every deck is a first impression frozen in time. My work is to make sure that impression
            is unforgettable — precise, deliberate, and impossible to mistake for anyone else's."
          </blockquote>
          <p className="text-muted-text leading-[1.9] max-w-xl mb-6">
            Kerollos founded PixelPerfect to close the gap between brilliant ideas and the visual
            language they deserve. Over four years and fifty-plus projects, PixelPerfect has become
            the studio founders and institutions turn to when a deck or a brand system has to carry
            real stakes — investor rooms, classrooms, and boardrooms alike.
          </p>
          <div className="flex items-center gap-8 hairline-t pt-6 mt-8 max-w-md">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-text mb-1">Studio</p>
              <p className="text-ivory text-sm">PixelPerfect</p>
            </div>
            <div className="h-8 w-px bg-gold/20" />
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-text mb-1">Focus</p>
              <p className="text-ivory text-sm">Educational Decks &amp; Branding</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
