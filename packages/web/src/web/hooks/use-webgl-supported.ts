import { useEffect, useState } from "react";

let cached: boolean | null = null;

function detect(): boolean {
  if (cached !== null) return cached;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    cached = !!gl;
  } catch {
    cached = false;
  }
  return cached;
}

/** True once we've confirmed the browser can create a WebGL context. Starts true (optimistic) then corrects. */
export function useWebglSupported(): boolean {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    setSupported(detect());
  }, []);
  return supported;
}
