import { motion } from "framer-motion";

const APPROACH = [
  {
    title: "Start with the problem",
    body: "Before any solution, I get obsessive about the problem — talking to users, watching sessions, reading tickets until the pain is clear.",
  },
  {
    title: "Ruthless prioritisation",
    body: "Not everything ships. I'd rather do three things well than ten things badly. RICE, MoSCoW, gut — whichever helps the team agree.",
  },
  {
    title: "Ship with the team, not at them",
    body: "Engineers and designers aren't order-takers. The best ideas come from the people closest to the craft.",
  },
  {
    title: "Iterate before you optimise",
    body: "Launch the boring version first. Learn. Then make it sharp. Premature polish is the most expensive kind.",
  },
];

export default function ApproachStack() {
  return (
    <div className="max-w-2xl mx-auto">
      {APPROACH.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="group grid grid-cols-[auto_1fr] gap-6 md:gap-8 py-7 md:py-8"
          style={{
            borderTop: i === 0 ? "1px solid var(--border)" : undefined,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            className="italic leading-none transition-colors duration-300"
            style={{
              fontFamily: "var(--font-serif, Georgia, serif)",
              fontSize: "clamp(34px, 4vw, 48px)",
              color: "var(--text-muted)",
              fontWeight: 400,
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className="pt-1">
            <h4
              style={{
                fontSize: "clamp(18px, 1.6vw, 20px)",
                color: "var(--text-primary)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              {a.title}
            </h4>
            <p
              className="mt-2 text-[14px] md:text-[14.5px]"
              style={{ color: "var(--text-body)", lineHeight: 1.65, maxWidth: "52ch" }}
            >
              {a.body}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
