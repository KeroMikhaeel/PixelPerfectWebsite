import { useEffect, useRef } from "react";

/**
 * Gold dot + trailing ring cursor. Liquid-expands and tints gold over any
 * element carrying `data-cursor="link"` / `"drag"` / `"view"`. No-op on touch.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    document.documentElement.classList.add("pp-cursor-enabled");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    let hovering: string | null = null;
    let rafId = 0;

    let moved = false;
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!moved) {
        moved = true;
        ring.x = mouse.x;
        ring.y = mouse.y;
        dotRef.current?.style.setProperty("opacity", "1");
        ringRef.current?.style.setProperty("opacity", "1");
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      hovering = target?.getAttribute("data-cursor") ?? null;
      applyHoverState();
    };
    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (target) {
        hovering = null;
        applyHoverState();
      }
    };

    function applyHoverState() {
      const ringEl = ringRef.current;
      const dotEl = dotRef.current;
      if (!ringEl || !dotEl) return;
      if (hovering === "link") {
        ringEl.style.width = "64px";
        ringEl.style.height = "64px";
        ringEl.style.borderColor = "rgba(228,201,137,0.9)";
        ringEl.style.background = "rgba(197,160,89,0.08)";
        dotEl.style.opacity = "0";
      } else if (hovering === "view") {
        ringEl.style.width = "88px";
        ringEl.style.height = "88px";
        ringEl.style.borderColor = "rgba(228,201,137,0.9)";
        ringEl.style.background = "rgba(197,160,89,0.1)";
        dotEl.style.opacity = "0";
      } else {
        ringEl.style.width = "34px";
        ringEl.style.height = "34px";
        ringEl.style.borderColor = "rgba(197,160,89,0.55)";
        ringEl.style.background = "transparent";
        dotEl.style.opacity = "1";
      }
    }

    function tick() {
      ring.x += (mouse.x - ring.x) * 0.18;
      ring.y += (mouse.y - ring.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%,-50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%,-50%)`;
      }
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("pp-cursor-enabled");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="pp-cursor-ring hidden md:block" />
      <div ref={dotRef} className="pp-cursor-dot hidden md:block" />
    </>
  );
}
