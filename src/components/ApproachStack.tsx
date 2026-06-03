import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const APPROACH = [
  { icon: "🔍", title: "Start with the problem", body: "Before any solution, I get obsessive about the problem — talking to users, watching sessions, reading tickets until the pain is clear." },
  { icon: "📐", title: "Ruthless prioritisation", body: "Not everything ships. I'd rather do three things well than ten things badly. RICE, MoSCoW, gut — whichever helps the team agree." },
  { icon: "🤝", title: "Ship with the team, not at them", body: "Engineers and designers aren't order-takers. The best ideas come from the people closest to the craft." },
  { icon: "🔄", title: "Iterate before you optimise", body: "Launch the boring version first. Learn. Then make it sharp. Premature polish is the most expensive kind." },
];

const TOTAL = APPROACH.length;

function StackCard({
  i,
  progress,
}: {
  i: number;
  progress: MotionValue<number>;
}) {
  const revealPoint = i / TOTAL;
  const restOffset = (TOTAL - 1 - i) * 10;
  const restScale = 1 - (TOTAL - 1 - i) * 0.04;
  const y = useTransform(progress, (value) => {
    if (value <= revealPoint) return 70 + restOffset;
    const local = Math.min(1, (value - revealPoint) * TOTAL * 1.2);
    return 70 + restOffset - local * 70;
  });
  const opacity = useTransform(progress, (value) => {
    if (i === 0) return 1;
    if (value <= revealPoint) return 0;
    return Math.min(1, (value - revealPoint) * TOTAL * 2.2);
  });

  const a = APPROACH[i];
  return (
    <motion.div
      style={{
        y,
        opacity,
        scale: restScale,
        background: "var(--bg-strip)",
        color: "var(--text-on-dark)",
        borderLeft: "3px solid var(--accent)",
        borderRadius: 12,
        padding: 20,
        position: "absolute",
        left: "50%",
        top: 0,
        width: "min(420px, 100%)",
        x: "-50%",
        zIndex: 10 + i,
        boxShadow: "var(--shadow-float)",
      }}
    >
      <div className="text-xl mb-1">{a.icon}</div>
      <h4 style={{ fontSize: 16, color: "var(--text-on-dark)" }}>{a.title}</h4>
      <p className="mt-1.5 text-[13px]" style={{ color: "rgba(244,242,238,0.7)", lineHeight: 1.55 }}>
        {a.body}
      </p>
    </motion.div>
  );
}

export default function ApproachStack() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 80%", "end 30%"],
  });

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${TOTAL * 70}vh` }}
      className="relative"
    >
      <div className="sticky top-24 h-[420px]">
        <div className="relative w-full h-full">
          {APPROACH.map((_, i) => (
            <StackCard key={i} i={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}
