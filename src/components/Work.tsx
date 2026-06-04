import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import work1Thumb from "@/assets/work-1-thumb.png.asset.json";
import work2Thumb from "@/assets/work-2-thumb.png.asset.json";
import work3Thumb from "@/assets/work-3-thumb.png.asset.json";
import work4Thumb from "@/assets/work-4-thumb.png.asset.json";
import work5Thumb from "@/assets/work-5-thumb.png.asset.json";
import work6Thumb from "@/assets/work-6-thumb.png.asset.json";
import work7Thumb from "@/assets/work-7-thumb.png.asset.json";
import work8Thumb from "@/assets/work-8-thumb.png.asset.json";
import work9Thumb from "@/assets/work-9-thumb.png.asset.json";
import work10Thumb from "@/assets/work-10-thumb.png.asset.json";

const ROTATING_WORDS = ["ideated.", "shipped."];
import { ArrowRight } from "lucide-react";
import { workSlotRefs } from "./FlyingCards";

type Project = { title: string; tag: string; desc: string; pdf: string; grad: string; img?: string };

const PROJECTS: Project[] = [
  { title: "Date Planner for Bumble", tag: "Growth", desc: "Took a leaky onboarding funnel from 20% to 68% completion by obsessing over the first 5 minutes.", pdf: "/project1.pdf", grad: "linear-gradient(135deg, #f6d365, #fda085)", img: work1Thumb.url },
  { title: "Increasing DAU of leading Hindi News Platform", tag: "RCA and Growth", desc: "Surfaced churn signals 30 days early — reduced customer churn by 35% in two quarters.", pdf: "/project2.pdf", grad: "linear-gradient(135deg, #5ee7df, #b490ca)", img: work2Thumb.url },
  { title: "Mixpanel Event Writing Automation", tag: "AI Automation", desc: "Built a two-sided marketplace from scratch. 10K transactions in the first 90 days.", pdf: "/project3.pdf", grad: "linear-gradient(135deg, #fbc2eb, #a18cd1)", img: work3Thumb.url },
  { title: "Increasing Zomato Reviews", tag: "Growth", desc: "Shipped an AI rec engine that increased session time by 40% without feeling creepy.", pdf: "/project4.pdf", grad: "linear-gradient(135deg, #84fab0, #8fd3f4)", img: work4Thumb.url },
  { title: "Paytm Expense Tracker", tag: "New Feature", desc: "", pdf: "/project5.pdf", grad: "linear-gradient(135deg, #ffd194, #d1913c)", img: work5Thumb.url },
  { title: "Analysing Market for Gig Workers in Healthcare Industry", tag: "Market Analysis", desc: "", pdf: "/project6.pdf", grad: "linear-gradient(135deg, #c471f5, #fa71cd)", img: work6Thumb.url },
  { title: "UI/UX Heuristics Teardown of Google Keep", tag: "UI/UX", desc: "", pdf: "/project7.pdf", grad: "linear-gradient(135deg, #a1c4fd, #c2e9fb)", img: work7Thumb.url },
  { title: "Shopping Bot for GIVA", tag: "AI", desc: "", pdf: "/project8.pdf", grad: "linear-gradient(135deg, #ff9a9e, #fad0c4)", img: work8Thumb.url },
  { title: "Reviews Writing Flow Teardown of Urbanic", tag: "Product Teardown", desc: "", pdf: "/project9.pdf", grad: "linear-gradient(135deg, #667eea, #764ba2)", img: work9Thumb.url },
  { title: "Onboarding Flow Teardown of Duolingo", tag: "Product Teardown", desc: "", pdf: "/project10.pdf", grad: "linear-gradient(135deg, #11998e, #38ef7d)", img: work10Thumb.url },
];

function ProjectCard({ p }: { p: (typeof PROJECTS)[number] }) {
  return (
    <motion.a
      href={p.pdf}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -8, boxShadow: "var(--shadow-hover)", borderColor: "var(--accent)" }}
      transition={{ duration: 0.3 }}
      className="block overflow-hidden cursor-pointer group"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div
        className="relative"
        style={{
          height: 200,
          background: p.img ? `url(${p.img}) center/cover no-repeat` : p.grad,
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <span className="text-white text-[15px] flex items-center gap-2">
            View Project <ArrowRight size={16} />
          </span>
        </div>
      </div>
      <div className="p-6">
        <span
          className="inline-block px-2.5 py-1 rounded-full text-[11px]"
          style={{ background: "var(--accent-pale)", color: "var(--accent)" }}
        >
          {p.tag}
        </span>
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 style={{ fontSize: 20, color: "var(--text-primary)", lineHeight: 1.3 }}>
            {p.title}
          </h3>
          <div
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:bg-[var(--accent)] group-hover:text-white group-hover:border-[var(--accent)]"
            style={{ border: "1px solid var(--border-strong)", color: "var(--text-body)" }}
          >
            <ArrowRight size={14} />
          </div>
        </div>
        <p className="mt-3 text-[14px]" style={{ color: "var(--text-muted)", lineHeight: 1.55 }}>
          {p.desc}
        </p>
      </div>
    </motion.a>
  );
}

/**
 * Placeholder slot for the first 4 grid cells. The flying cards from the
 * hero land into these positions. We reserve their footprint with the same
 * approximate height as a project card so layout doesn't shift, but render
 * nothing visible. On mobile (no flying cards) we render the real card.
 */
function PlaceholderSlot({ index }: { index: number }) {
  const p = PROJECTS[index];
  return (
    <>
      {/* Mobile fallback — flying overlay is hidden < md */}
      <div className="md:hidden">
        <ProjectCard p={p} />
      </div>
      {/* Desktop landing slot */}
      <div
        ref={(el) => {
          workSlotRefs[index].current = el;
        }}
        aria-hidden
        className="hidden md:block"
        style={{ height: 360, borderRadius: 16 }}
      />
    </>
  );
}

export default function Work() {
  const [expanded, setExpanded] = useState(false);
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const extra = PROJECTS.slice(4);

  useEffect(() => {
    const id = setInterval(() => {
      setRotatingIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="work" className="py-24 md:py-32" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-[11px] uppercase mb-4" style={{ letterSpacing: "0.15em", color: "var(--accent)" }}>
            Professional Work
          </p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.1 }}>
            Things I've{" "}
            <span className="relative inline-block align-baseline" style={{ minWidth: "5.5ch" }}>
              {/* invisible sizer keeps baseline + width stable */}
              <span className="invisible italic whitespace-nowrap" style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}>
                {ROTATING_WORDS[rotatingIndex]}
              </span>
              <span className="absolute left-0 top-0 w-full overflow-hidden" style={{ height: "1.2em" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingIndex}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block italic whitespace-nowrap"
                    style={{ color: "var(--accent)", fontFamily: "var(--font-serif, Georgia, serif)" }}
                  >
                    {ROTATING_WORDS[rotatingIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </h2>
          <p className="mt-4 text-[16px] max-w-xl" style={{ color: "var(--text-muted)" }}>
            A handful of products and features I've helped guide from fuzzy idea to launched outcome.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1, 2, 3].map((i) => (
            <PlaceholderSlot key={i} index={i} />
          ))}

          <AnimatePresence>
            {expanded &&
              extra.map((p) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProjectCard p={p} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="px-7 py-3 rounded-full text-[14px] transition-all hover:-translate-y-0.5"
            style={{ border: "1.5px solid var(--accent)", color: "var(--accent)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-pale)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {expanded ? "Show Less" : "View More Projects"}
          </button>
        </div>
      </div>
    </section>
  );
}
