import { useEffect, useState } from "react";

const PILLS = [
  { label: "Open to opportunities", emoji: "✨" },
  { label: "Collaborate", emoji: "🤝" },
  { label: "Partnerships", emoji: "💫" },
];

export default function StatusPill() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % PILLS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full overflow-hidden"
      style={{
        background: "color-mix(in oklab, var(--accent) 12%, transparent)",
        border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)",
        padding: "4px 10px 4px 8px",
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
      <div style={{ position: "relative", height: 16, overflow: "hidden", minWidth: 150 }}>
        {PILLS.map((p, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent)",
              transform: `translateY(${(idx - i) * 100}%)`,
              opacity: idx === i ? 1 : 0,
              transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease",
              whiteSpace: "nowrap",
            }}
          >
            <span>{p.emoji}</span>
            <span>{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
