import { useEffect } from "react";
import { pointerStore } from "../lib/pointer-store";

/** Mounted once at the app root — feeds normalized pointer coords into `pointerStore`. */
export function PointerTracker() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointerStore.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerStore.y = (e.clientY / window.innerHeight) * 2 - 1;
      pointerStore.active = true;
    };
    const onLeave = () => {
      pointerStore.active = false;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return null;
}
