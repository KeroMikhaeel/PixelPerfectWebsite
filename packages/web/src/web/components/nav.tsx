import { useEffect, useState } from "react";
import { MagneticButton } from "./magnetic-button";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#impact", label: "Impact" },
  { href: "#about", label: "Founder" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-canvas/80 backdrop-blur-xl border-b border-gold/15" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1400px] px-[6vw] h-20 flex items-center justify-between">
        <a href="#top" data-cursor="link" className="flex items-center gap-3 group">
          <img src="/images/logomark-icon.png" alt="PixelPerfect" className="h-9 w-9 object-contain" />
          <span className="font-display text-lg tracking-[0.08em] text-ivory">
            Pixel<span className="text-gold">Perfect</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-10">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-cursor="link"
                className="text-[0.72rem] uppercase tracking-[0.22em] text-muted-text hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <MagneticButton href="#contact" variant="ghost" className="!py-3 !px-6 text-[0.65rem]">
            Initiate Project
          </MagneticButton>
        </div>
      </nav>
    </header>
  );
}
