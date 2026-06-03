import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const APPROACH = [
  { icon: "🔍", title: "Start with the problem", body: "Before any solution, I get obsessive about the problem — talking to users, watching sessions, reading tickets until the pain is clear." },
  { icon: "📐", title: "Ruthless prioritisation", body: "Not everything ships. I'd rather do three things well than ten things badly. RICE, MoSCoW, gut — whichever helps the team agree." },
  { icon: "🤝", title: "Ship with the team, not at them", body: "Engineers and designers aren't order-takers. The best ideas come from the people closest to the craft." },
  { icon: "🔄", title: "Iterate before you optimise", body: "Launch the boring version first. Learn. Then make it sharp. Premature polish is the most expensive kind." },
];

const TOTAL = APPROACH.length;

function StickyCard({
  i,
  progress,
}: {
  i: number;
  progress: MotionValue<number>;
}) {
  // Each card occupies an equal slice of the scroll
  const start = i / TOTAL;
  const end = (i + 1) / TOTAL;

  // Previous cards scale down + dim as later cards arrive on top
  const scale = useTransform(
    progress,
    [start, Math.min(1, end + 0.05)],
    [1, i === TOTAL - 1 ? 1 : 0.92],
  );
  const opacity = useTransform(
    progress,
    [start, Math.min(1, end + 0.05)],
    [1, i === TOTAL - 1 ? 1 : 0.5],
  );

  const a = APPROACH[i];
  return (
    <div
      className="sticky"
      style={{
        top: `calc(20vh + ${i * 14}px)`,
        zIndex: 10 + i,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          background: "var(--bg-strip)",
          color: "var(--text-on-dark)",
          borderLeft: "3px solid var(--accent)",
          borderRadius: 14,
          padding: 26,
          width: "min(480px, 100%)",
          marginInline: "auto",
          boxShadow: "var(--shadow-float)",
          transformOrigin: "top center",
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{a.icon}</span>
          <span
            className="text-[12px] tracking-wider uppercase"
            style={{ color: "rgba(244,242,238,0.45)" }}
          >
            0{i + 1} / 0{TOTAL}
          </span>
        </div>
        <h4 style={{ fontSize: 18, color: "var(--text-on-dark)" }}>{a.title}</h4>
        <p
          className="mt-2 text-[14px]"
          style={{ color: "rgba(244,242,238,0.7)", lineHeight: 1.6 }}
        >
          {a.body}
        </p>
      </motion.div>
    </div>
  );
}

export default function ApproachStack() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex flex-col gap-[40vh] pb-[30vh]">
        {APPROACH.map((_, i) => (
          <StickyCard key={i} i={i} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}
