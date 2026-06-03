import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const GRADIENTS = [
  "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
  "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
];

const CARDS = [
  { title: "Onboarding Overhaul", tag: "Growth" },
  { title: "Churn Dashboard", tag: "Analytics" },
  { title: "Marketplace 0→1", tag: "Launch" },
  { title: "AI Recommendations", tag: "Personalisation" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const lineVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function HeroCard({
  index,
  scrollYProgress,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Fanned hero positions
  const startX = index * 14 - 21;
  const startY = index * 18 - 27;
  const startRot = index % 2 === 0 ? -3 : 3;

  // Grid target positions (2x2). cards land outward
  const col = index % 2;
  const row = Math.floor(index / 2);
  const endX = (col - 0.5) * 280 + startX * -1;
  const endY = 420 + row * 230 - startY;

  const x = useTransform(scrollYProgress, [0, 1], [startX, endX]);
  const y = useTransform(scrollYProgress, [0, 1], [startY, endY]);
  const rotate = useTransform(scrollYProgress, [0, 0.6, 1], [startRot, startRot / 2, 0]);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <motion.a
      href={`/project${index + 1}.pdf`}
      target="_blank"
      rel="noreferrer"
      style={{
        x, y, rotate, opacity, scale,
        position: "absolute",
        top: 0,
        left: "50%",
        marginLeft: -130,
        width: 260,
        background: "var(--bg-card)",
        borderRadius: 16,
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--border)",
        zIndex: 10 - index,
      }}
      whileHover={{ y: (y.get?.() ?? 0) - 6, scale: 1.02, boxShadow: "var(--shadow-hover)" }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="overflow-hidden cursor-pointer block"
    >
      <div style={{ height: 120, background: GRADIENTS[index] }} />
      <div className="p-4">
        <p className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>
          {CARDS[index].title}
        </p>
        <span
          className="inline-block mt-2 px-2.5 py-1 rounded-full text-[11px]"
          style={{ background: "var(--accent-pale)", color: "var(--accent)" }}
        >
          {CARDS[index].tag}
        </span>
      </div>
    </motion.a>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={heroRef}
      className="relative pt-[72px]"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-20 min-h-screen flex flex-col md:flex-row items-center gap-12 md:gap-16 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full md:w-3/5"
        >
          <motion.p
            variants={lineVariant}
            className="text-[11px] uppercase mb-6"
            style={{ letterSpacing: "0.15em", color: "var(--accent)" }}
          >
            Product Manager · Builder · Storyteller
          </motion.p>

          <h1
            className="font-normal"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(44px, 7vw, 80px)",
              lineHeight: 1.05,
              color: "var(--text-primary)",
            }}
          >
            <motion.span variants={lineVariant} className="block">
              I turn messy
            </motion.span>
            <motion.span variants={lineVariant} className="block">
              problems <em>into</em>
            </motion.span>
            <motion.span variants={lineVariant} className="block">
              <em style={{ color: "var(--accent)" }}>clean</em> products.
            </motion.span>
          </h1>

          <motion.p
            variants={lineVariant}
            className="mt-7 max-w-xl text-[18px]"
            style={{ color: "var(--text-muted)", lineHeight: 1.55 }}
          >
            Product Manager who treats every PRD like a love letter to the user.
          </motion.p>

          <motion.div variants={lineVariant} className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={() => go("work")}
              className="px-7 py-3.5 rounded-full text-[15px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "var(--accent)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
            >
              See my work →
            </button>
            <button
              onClick={() => go("about")}
              className="px-7 py-3.5 rounded-full text-[15px] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                border: "1.5px solid var(--accent)",
                color: "var(--accent)",
                background: "transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-pale)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              My story
            </button>
          </motion.div>
        </motion.div>

        <div className="w-full md:w-2/5 relative" style={{ minHeight: 380 }}>
          <div className="relative w-full h-[380px]">
            {CARDS.map((_, i) => (
              <HeroCard key={i} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
