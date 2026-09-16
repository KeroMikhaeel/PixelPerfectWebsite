import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "solid" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
}

/** Metallic pill CTA that leans toward the cursor within its radius. */
export function MagneticButton({
  children,
  onClick,
  href,
  className,
  variant = "solid",
  type = "button",
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 12, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 150, damping: 12, mass: 0.4 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.5);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] transition-colors duration-300 select-none";
  const solid = "bg-gold text-[#14100a] hover:bg-gold-bright";
  const ghost = "border border-gold/50 text-ivory hover:border-gold hover:text-gold";

  const Comp = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className="inline-block"
      data-cursor="link"
    >
      <Comp
        // @ts-expect-error -- polymorphic anchor/button
        href={href}
        type={href ? undefined : type}
        onClick={onClick}
        disabled={disabled}
        className={cn(base, variant === "solid" ? solid : ghost, disabled && "opacity-50 pointer-events-none", className)}
      >
        {children}
      </Comp>
    </motion.div>
  );
}
