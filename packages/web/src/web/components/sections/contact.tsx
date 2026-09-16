import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Facebook, Loader2 } from "lucide-react";
import { ContactPen } from "../three/contact-pen";
import { Signature } from "../signature";
import { MagneticButton } from "../magnetic-button";
import { useCreateInquiry } from "../../queries/inquiries";

const PROJECT_TYPES = ["Educational Deck", "Brand System", "Investor Narrative", "Other"];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const pulseRef = useRef(0);

  const createInquiry = useCreateInquiry();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createInquiry.mutate(
      { name, email, projectType, message },
      {
        onSuccess: () => {
          setSubmitted(true);
          pulseRef.current = 1;
          setTimeout(() => {
            pulseRef.current = 0;
          }, 900);
        },
      },
    );
  }

  return (
    <section id="contact" className="relative py-32 md:py-44 overflow-hidden">
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #c5a059 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-[1400px] px-[6vw] grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
        <div className="order-2 lg:order-1 relative">
          <div className="relative h-[280px] md:h-[360px] mb-6">
            <ContactPen pulseRef={pulseRef} />
          </div>
          <div className="h-16 flex items-center justify-center">
            <Signature active={submitted} />
          </div>

          <div className="mt-10 space-y-4 max-w-sm mx-auto">
            <a href="mailto:mr.perfect.pixel@gmail.com" data-cursor="link" className="flex items-center gap-3 text-sm text-muted-text hover:text-gold transition-colors">
              <Mail size={16} className="text-gold" /> mr.perfect.pixel@gmail.com
            </a>
            <a href="tel:+201276974731" data-cursor="link" className="flex items-center gap-3 text-sm text-muted-text hover:text-gold transition-colors">
              <Phone size={16} className="text-gold" /> +20 127 697 4731
            </a>
            <div className="flex items-center gap-6 pt-2">
              <a href="https://instagram.com/the_perfect_pixelist" target="_blank" rel="noreferrer" data-cursor="link" className="flex items-center gap-2 text-sm text-muted-text hover:text-gold transition-colors">
                <Instagram size={16} className="text-gold" /> @the_perfect_pixelist
              </a>
              <a href="https://facebook.com/the_perfect_pixelist" target="_blank" rel="noreferrer" data-cursor="link" className="flex items-center gap-2 text-sm text-muted-text hover:text-gold transition-colors">
                <Facebook size={16} className="text-gold" />
              </a>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-2"
        >
          <p className="eyebrow mb-5">Initiate Project</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] text-ivory leading-[1.2] mb-6">
            Let's design something unforgettable.
          </h2>
          <p className="text-muted-text leading-[1.8] mb-10 max-w-lg">
            Tell us about your deck or brand. We reply personally, usually within one business day.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Name">
                <input
                  required
                  aria-label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-gold/25 focus:border-gold outline-none py-3 text-ivory placeholder:text-muted-text/50 transition-colors"
                  placeholder="Your name"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  aria-label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-gold/25 focus:border-gold outline-none py-3 text-ivory placeholder:text-muted-text/50 transition-colors"
                  placeholder="you@company.com"
                />
              </Field>
            </div>

            <Field label="Project Type">
              <select
                aria-label="Project Type"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full bg-transparent border-b border-gold/25 focus:border-gold outline-none py-3 text-ivory transition-colors [&>option]:bg-canvas-3"
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Message">
              <textarea
                required
                aria-label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-transparent border-b border-gold/25 focus:border-gold outline-none py-3 text-ivory placeholder:text-muted-text/50 resize-none transition-colors"
                placeholder="Tell us about the project..."
              />
            </Field>

            <div className="pt-4 flex items-center gap-5">
              <MagneticButton type="submit" variant="solid" disabled={createInquiry.isPending}>
                {createInquiry.isPending ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Sending
                  </>
                ) : (
                  "Initiate Project"
                )}
              </MagneticButton>
              {submitted && <span className="text-gold text-xs uppercase tracking-[0.2em]">Received — thank you.</span>}
              {createInquiry.isError && (
                <span className="text-destructive text-xs uppercase tracking-[0.2em]">Something went wrong.</span>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-muted-text mb-2">{label}</span>
      {children}
    </label>
  );
}
