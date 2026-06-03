import { motion } from "framer-motion";
import { useRef, type MouseEvent } from "react";

const APPROACH = [
  { icon: "🔍", title: "Start with the problem", body: "Before any solution, I get obsessive about the problem — talking to users, watching sessions, reading tickets until the pain is clear." },
  { icon: "📐", title: "Ruthless prioritisation", body: "Not everything ships. I'd rather do three things well than ten things badly. RICE, MoSCoW, gut — whichever helps the team agree." },
  { icon: "🤝", title: "Ship with the team, not at them", body: "Engineers and designers aren't order-takers. The best ideas come from the people closest to the craft." },
  { icon: "🔄", title: "Iterate before you optimise", body: "Launch the boring version first. Learn. Then make it sharp. Premature polish is the most expensive kind." },
];

function SpotlightCard({
  i,
  icon,
  title,
  body,
}: {
  i: number;
  icon: string;
  title: string;
  body: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden"
      ref={ref}
      onMouseMove={handleMove}
      style={{
        background: "#1e2620",
        color: "var(--text-on-dark)",
        borderRadius: 16,
        padding: 1,
        boxShadow: "var(--shadow-float)",
      }}
    >
      {/* Spotlight glow that follows cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(280px circle at var(--mx) var(--my), color-mix(in oklab, var(--accent) 28%, transparent), transparent 60%)",
        }}
      />
      {/* Inner card */}
      <div
        className="relative h-full"
        style={{
          background: "#1e2620",
          borderRadius: 15,
          padding: 22,
          borderLeft: "3px solid var(--accent)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{icon}</span>
          <span
            className="text-[11px] tracking-[0.18em] uppercase"
            style={{ color: "rgba(244,242,238,0.45)" }}
          >
            0{i + 1}
          </span>
        </div>
        <h4 style={{ fontSize: 16, color: "var(--text-on-dark)" }}>{title}</h4>
        <p
          className="mt-2 text-[13.5px]"
          style={{ color: "rgba(244,242,238,0.7)", lineHeight: 1.6 }}
        >
          {body}
        </p>
      </div>
    </motion.div>
  );
}

export default function ApproachStack() {
  return (
    <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
      {APPROACH.map((a, i) => (
        <SpotlightCard key={i} i={i} {...a} />
      ))}
    </div>
  );
}
