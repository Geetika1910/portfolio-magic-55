import { motion } from "framer-motion";
import { heroAnchorRef } from "./FlyingCards";
import StatusPill from "./StatusPill";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const lineVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative pt-[72px]" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-20 min-h-screen flex flex-col md:flex-row items-center gap-12 md:gap-24 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full md:w-1/2"
        >
          <motion.div variants={lineVariant} className="mb-6">
            <StatusPill />
          </motion.div>

          <h1
            className="font-normal"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(32px, 4.6vw, 60px)",
              lineHeight: 1.08,
              color: "var(--text-primary)",
            }}
          >
            <motion.span
              variants={lineVariant}
              className="block whitespace-nowrap"
              style={{ color: "var(--text-muted)" }}
            >
              Hi <span style={{ color: "var(--accent)" }}>✦</span> I'm Geetika.
            </motion.span>
            <motion.span
              variants={lineVariant}
              className="block whitespace-nowrap"
              style={{ fontWeight: 600 }}
            >
              Associate <em style={{ color: "var(--accent)" }}>Product</em> Manager
            </motion.span>
          </h1>

          <motion.p
            variants={lineVariant}
            className="mt-7 max-w-xl text-[18px]"
            style={{ color: "var(--text-body)", lineHeight: 1.55 }}
          >
            <strong style={{ color: "var(--text-primary)" }}>
              Welcome to my little corner of the internet.
            </strong>
            <br />
            I'm an associate product manager who finds the signal in the noise..
            then makes it pretty.
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

        {/* Anchor area for the flying card deck — the cards themselves are
            rendered as a fixed overlay (FlyingCards) so they can travel
            into the Work section as the user scrolls. */}
        <div
          ref={heroAnchorRef}
          aria-hidden
          className="w-full md:w-2/5"
          style={{ minHeight: 380 }}
        />
      </div>
    </section>
  );
}
