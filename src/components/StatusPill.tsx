import { useEffect, useState } from "react";

const WORDS = ["opportunities", "collaboration", "partnerships"];

export default function StatusPill() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full"
      style={{
        background: "color-mix(in oklab, var(--accent) 12%, transparent)",
        border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)",
        padding: "4px 12px 4px 10px",
        height: 26,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: "var(--accent)",
          boxShadow: "0 0 0 4px color-mix(in oklab, var(--accent) 20%, transparent)",
          animation: "pulse 1.6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--accent)",
          display: "flex",
          alignItems: "center",
          gap: 5,
          whiteSpace: "nowrap",
        }}
      >
        <span>Open to</span>
        <span style={{ position: "relative", height: 16, overflow: "hidden", minWidth: 110, display: "inline-block" }}>
          {WORDS.map((w, idx) => (
            <span
              key={w}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: `translateY(${(idx - i) * 100}%)`,
                opacity: idx === i ? 1 : 0,
                transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease",
              }}
            >
              {w}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

