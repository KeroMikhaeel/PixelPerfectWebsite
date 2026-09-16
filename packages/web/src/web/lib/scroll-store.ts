/**
 * Module-level mutable scroll state, written by <SmoothScroll> on every Lenis
 * tick and read directly inside R3F `useFrame` loops. Deliberately not React
 * state/context — 3D layers read it every animation frame and a re-render per
 * scroll tick would be far too expensive.
 */
export const scrollStore = {
  /** Normalized scroll velocity, roughly -1..1 range in typical trackpad/wheel use, unclamped. */
  velocity: 0,
  /** Raw scroll position in px. */
  scrollY: 0,
  /** 0..1 progress through the full page height. */
  progress: 0,
};
