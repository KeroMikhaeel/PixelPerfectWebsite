import { useEffect } from "react";
import Lenis from "lenis";
import { scrollStore } from "../lib/scroll-store";

/**
 * Wraps the page in inertial (Lenis) smooth scrolling and feeds live scroll
 * velocity/progress into `scrollStore` for the 3D layers to react to.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || reducedMotion) {
      // Let touch devices use native momentum scrolling; still track velocity roughly.
      let last = window.scrollY;
      let lastT = performance.now();
      const onScroll = () => {
        const now = performance.now();
        const y = window.scrollY;
        const dt = Math.max(now - lastT, 1);
        scrollStore.velocity = (y - last) / dt;
        scrollStore.scrollY = y;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollStore.progress = max > 0 ? y / max : 0;
        last = y;
        lastT = now;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ({ velocity, scroll, limit }: { velocity: number; scroll: number; limit: number }) => {
      scrollStore.velocity = velocity;
      scrollStore.scrollY = scroll;
      scrollStore.progress = limit > 0 ? scroll / limit : 0;
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
