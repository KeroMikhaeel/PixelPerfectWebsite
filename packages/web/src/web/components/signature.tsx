/** Gold signature stroke that draws itself once `active` flips true (on submit success). */
export function Signature({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 300 90" className="w-full max-w-[280px] mx-auto" aria-hidden="true">
      <path
        d="M12 62 C 30 20, 46 20, 52 50 C 58 78, 70 78, 78 45 C 84 22, 92 22, 96 48 C 100 68, 108 55, 118 40 C 128 25, 140 25, 150 42 C 158 55, 165 32, 178 30 C 196 27, 205 55, 222 50 C 240 45, 248 30, 264 34 C 276 37, 282 48, 290 44"
        fill="none"
        stroke="#c5a059"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{
          strokeDasharray: 620,
          strokeDashoffset: active ? 0 : 620,
          filter: active ? "drop-shadow(0 0 6px rgba(197,160,89,0.85))" : "none",
          transition: "stroke-dashoffset 1.4s cubic-bezier(0.65,0,0.35,1), filter 1.4s ease",
        }}
      />
    </svg>
  );
}
