import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const APPROACH = [
  { icon: "🔍", title: "Start with the problem", body: "Before any solution, I get obsessive about the problem — talking to users, watching sessions, reading tickets until the pain is clear." },
  { icon: "📐", title: "Ruthless prioritisation", body: "Not everything ships. I'd rather do three things well than ten things badly. RICE, MoSCoW, gut — whichever helps the team agree." },
  { icon: "🤝", title: "Ship with the team, not at them", body: "Engineers and designers aren't order-takers. The best ideas come from the people closest to the craft." },
  { icon: "🔄", title: "Iterate before you optimise", body: "Launch the boring version first. Learn. Then make it sharp. Premature polish is the most expensive kind." },
];

function StackCard({
  i,
  total,
  progress,
}: {
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card occupies a slice of the scroll range.
  // Card i fully revealed once progress passes i / total.
  const slice = 1 / total;
  const enterStart = (i - 1) * slice;
  const enterEnd = i * slice;

  // Slide in from below (except first card which starts visible).
  const y = useTransform(
    progress,
    [enterStart, enterEnd],
    i === 0 ? [0, 0] : [80, 0]
  );
  const opacity = useTransform(
    progress,
    [enterStart, enterEnd - 0.001],
    i === 0 ? [1, 1] : [0, 1]
  );
  // Resting cards get a slight scale-down + downward offset to show the stack.
  const restOffset = (total - 1 - i) * 14;
  const restScale = 1 - (total - 1 - i) * 0.03;

  const finalY = useTransform(y, (v) => v + restOffset);

  const a = APPROACH[i];
  return (
    <motion.div
      style={{
        y: finalY,
        opacity,
        scale: restScale,
        background: "var(--bg-strip)",
        color: "var(--text-on-dark)",
        borderLeft: "3px solid var(--accent)",
        borderRadius: 16,
        padding: 28,
        position: "absolute",
        inset: 0,
        zIndex: 10 + i,
        boxShadow: "var(--shadow-float)",
      }}
      whileHover={{ scale: restScale + 0.01 }}
    >
      <div className="text-2xl mb-2">{a.icon}</div>
      <h4 style={{ fontSize: 18, color: "var(--text-on-dark)" }}>{a.title}</h4>
      <p className="mt-2 text-[14px]" style={{ color: "rgba(244,242,238,0.7)", lineHeight: 1.6 }}>
        {a.body}
      </p>
    </motion.div>
  );
}

export default function ApproachStack() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={wrapperRef}
      // Tall wrapper so user has scroll distance to reveal each card.
      style={{ height: `${APPROACH.length * 70}vh` }}
      className="relative"
    >
      <div className="sticky top-24 h-[420px]">
        <div className="relative w-full h-full">
          {APPROACH.map((_, i) => (
            <StackCard key={i} i={i} total={APPROACH.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}
