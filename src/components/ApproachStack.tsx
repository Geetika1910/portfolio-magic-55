import { motion } from "framer-motion";

const APPROACH = [
  {
    title: "Start with the problem",
    body: "Before any solution, I get obsessive about the problem. Talking to users, watching sessions, digging into the data, sitting with the frustration until the real pain becomes clear. A well-defined problem is already half the solution.",
  },
  {
    title: "Prioritise what actually matters",
    body: "Real decisions are messier than any framework. I look at impact, business reality, user pain, and what the team can actually ship. Not everything is worth solving. Figuring out what is, is the real work.",
  },
  {
    title: "Ship with the team, not at them",
    body: "Engineers and designers are not order-takers. The best ideas come from the people closest to the craft. I would rather slow down to align than speed up and ship the wrong thing.",
  },
  {
    title: "Iterate before you optimise",
    body: "Launch the version that works. Learn from real users. Then make it sharp. Premature polish is the most expensive kind.",
  },
  {
    title: "Stay close to the data, closer to the person",
    body: "Numbers tell you what happened. Users tell you why. I try not to let one replace the other. The best decisions usually live somewhere between the two.",
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
