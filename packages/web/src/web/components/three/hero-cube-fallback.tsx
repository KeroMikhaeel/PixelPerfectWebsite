/** CSS/SVG stand-in for the WebGL hero cube on devices without WebGL. */
export function HeroCubeFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div
        className="absolute w-[70%] h-[70%] rounded-full opacity-25 blur-[80px]"
        style={{ background: "radial-gradient(circle, #c5a059 0%, transparent 70%)" }}
      />
      <svg viewBox="0 0 400 400" className="relative w-[75%] max-w-[420px] animate-[spin_28s_linear_infinite]" style={{ animationDirection: "alternate" }}>
        <polygon points="200,30 340,110 340,290 200,370 60,290 60,110" fill="none" stroke="#c5a059" strokeWidth="1.5" opacity="0.85" />
        <g transform="translate(200,200)">
          <polygon points="0,-70 70,-35 70,35 0,70 -70,35 -70,-35" fill="none" stroke="#e4c989" strokeWidth="2" />
          <line x1="0" y1="-70" x2="0" y2="0" stroke="#e4c989" strokeWidth="1.4" opacity="0.7" />
          <line x1="70" y1="-35" x2="0" y2="0" stroke="#e4c989" strokeWidth="1.4" opacity="0.7" />
          <line x1="-70" y1="-35" x2="0" y2="0" stroke="#e4c989" strokeWidth="1.4" opacity="0.7" />
          <line x1="70" y1="35" x2="0" y2="0" stroke="#e4c989" strokeWidth="1.4" opacity="0.7" />
          <line x1="-70" y1="35" x2="0" y2="0" stroke="#e4c989" strokeWidth="1.4" opacity="0.7" />
          <line x1="0" y1="70" x2="0" y2="0" stroke="#e4c989" strokeWidth="1.4" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}
