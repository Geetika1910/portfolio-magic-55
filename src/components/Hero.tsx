import { motion } from "framer-motion";
import { heroAnchorRef } from "./FlyingCards";
import StatusPill from "./StatusPill";
import work1Thumb from "@/assets/work-1-thumb.png.asset.json";
import work2Thumb from "@/assets/work-2-thumb.png.asset.json";
import work3Thumb from "@/assets/work-3-thumb.png.asset.json";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const lineVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const MOBILE_STACK = [
  { title: "Date Planner for Bumble", tag: "Growth", img: work1Thumb.url },
  { title: "Hindi News DAU Growth", tag: "RCA & Growth", img: work2Thumb.url },
  { title: "Mixpanel Automation", tag: "AI Automation", img: work3Thumb.url },
];

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
          className="w-full md:w-3/5"
        >
          <motion.div variants={lineVariant} className="mb-6">
            <StatusPill />
          </motion.div>

          <h1
            className="font-normal"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(28px, 3.6vw, 50px)",
              lineHeight: 1.08,
              color: "var(--text-primary)",
            }}
          >
            <motion.span
              variants={lineVariant}
              className="block md:whitespace-nowrap"
              style={{ color: "var(--text-muted)" }}
            >
              Hi <span style={{ color: "var(--accent)" }}>✦</span> I'm Geetika.
            </motion.span>
            <motion.span
              variants={lineVariant}
              className="block md:whitespace-nowrap"
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
              Glad you found your way here.
            </strong>
            <br />
            I make sense of the noise to turn messy problems into clean, shippable products.
          </motion.p>

          <motion.div variants={lineVariant} className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={() => go("work")}
              className="px-7 py-3.5 rounded-full text-[15px] text-white transition-all duration-300 lg:hover:-translate-y-0.5 lg:hover:shadow-lg"
              style={{ background: "var(--accent-dark)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent-dark)")}
            >
              See my work →
            </button>
            <button
              onClick={() => go("about")}
              className="px-7 py-3.5 rounded-full text-[15px] transition-all duration-300 lg:hover:-translate-y-0.5"
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

        {/* Desktop: anchor for the flying card deck (rendered as fixed overlay) */}
        <div
          ref={heroAnchorRef}
          aria-hidden
          className="hidden md:block w-full md:w-2/5"
          style={{ minHeight: 380 }}
        />

        {/* Mobile: visible mini-stack preview of recent work */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden w-full mt-4 cursor-pointer text-left bg-transparent p-0"
          onClick={() => go("work")}
          aria-label="Jump to work"
        >
          <div className="relative mx-auto" style={{ maxWidth: 320, height: 280 }}>
            {MOBILE_STACK.map((c, i) => {
              const offset = (i - 1) * 14;
              const rot = (i - 1) * 3;
              return (
                <div
                  key={c.title}
                  className="absolute left-1/2 top-0 overflow-hidden"
                  style={{
                    width: 280,
                    transform: `translateX(calc(-50% + ${offset}px)) rotate(${rot}deg)`,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    boxShadow: "var(--shadow-card)",
                    zIndex: 10 - i,
                  }}
                >
                  <div style={{ height: 150, background: `url(${c.img}) center/cover no-repeat` }} />
                  <div className="p-4">
                    <span
                      className="inline-block px-2.5 py-1 rounded-full text-[11px]"
                      style={{ background: "var(--accent-pale)", color: "var(--accent)" }}
                    >
                      {c.tag}
                    </span>
                    <h3 className="mt-2" style={{ fontSize: 16, color: "var(--text-primary)", lineHeight: 1.3 }}>
                      {c.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.button>
      </div>
    </section>
  );
}
