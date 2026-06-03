import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { User } from "lucide-react";
import ApproachStack from "./ApproachStack";

const COMPANIES = [
  { name: "Company A", role: "Senior Product Manager", years: "2024–Present", grad: "linear-gradient(135deg,#7A8F7B,#A5B5A3)" },
  { name: "Company B", role: "Product Manager", years: "2021–2024", grad: "linear-gradient(135deg,#f6d365,#fda085)" },
  { name: "Company C", role: "Associate PM", years: "2019–2021", grad: "linear-gradient(135deg,#a1c4fd,#c2e9fb)" },
  { name: "Company D", role: "Product Analyst", years: "2018–2019", grad: "linear-gradient(135deg,#fbc2eb,#a18cd1)" },
];

const TOOLS = [
  { name: "Figma", url: "https://cdn.simpleicons.org/figma" },
  { name: "Jira", url: "https://cdn.simpleicons.org/jira" },
  { name: "Miro", url: "https://cdn.simpleicons.org/miro" },
  { name: "Mixpanel", url: "https://cdn.simpleicons.org/mixpanel" },
  { name: "Google Analytics", url: "https://cdn.simpleicons.org/googleanalytics" },
];
const TEXT_TOOLS = [
  { name: "Claude", grad: "linear-gradient(135deg,#f6d365,#fda085)" },
  { name: "Lovable", grad: "linear-gradient(135deg,#fbc2eb,#a6c1ee)" },
  { name: "n8n", grad: "linear-gradient(135deg,#c471f5,#fa71cd)" },
  { name: "Whimsical", grad: "linear-gradient(135deg,#a1c4fd,#c2e9fb)" },
];

const APPROACH = [
  { icon: "🔍", title: "Start with the problem", body: "Before any solution, I get obsessive about the problem — talking to users, watching sessions, reading tickets until the pain is clear." },
  { icon: "📐", title: "Ruthless prioritisation", body: "Not everything ships. I'd rather do three things well than ten things badly. RICE, MoSCoW, gut — whichever helps the team agree." },
  { icon: "🤝", title: "Ship with the team, not at them", body: "Engineers and designers aren't order-takers. The best ideas come from the people closest to the craft." },
  { icon: "🔄", title: "Iterate before you optimise", body: "Launch the boring version first. Learn. Then make it sharp. Premature polish is the most expensive kind." },
];

export default function About() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="about" className="py-24 md:py-32" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-[11px] uppercase mb-4" style={{ letterSpacing: "0.15em", color: "var(--accent)" }}>
            About
          </p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.1 }}>
            More than a roadmap.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-16">
          {/* LEFT */}
          <div>
            {/* TODO: Replace with <img src="your-photo.jpg" ... /> */}
            <div
              className="w-full max-w-[320px] flex items-center justify-center mx-auto md:mx-0"
              style={{
                height: 380,
                borderRadius: 24,
                background: "linear-gradient(135deg, #EEF3ED, #d4ddd4)",
                color: "var(--accent)",
              }}
            >
              <User size={72} strokeWidth={1.2} />
            </div>

            <div className="mt-6">
              <h3 style={{ fontSize: 22, fontWeight: 600 }}>Your Name</h3>
              <div className="flex items-center gap-2 mt-1 text-[14px]" style={{ color: "var(--text-muted)" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />
                Product Manager
              </div>
            </div>

            <div className="mt-10">
              <p className="text-[11px] uppercase mb-4" style={{ letterSpacing: "0.15em", color: "var(--accent)" }}>
                Where I've Been
              </p>

              {!showAll ? (
                <div className="relative" style={{ height: 110 }}>
                  {COMPANIES.slice(0, 3).map((c, i) => (
                    <div
                      key={c.name}
                      className="absolute left-0 right-0 p-4 flex items-center gap-3"
                      style={{
                        top: i * 6,
                        transform: `scale(${1 - i * 0.03})`,
                        background: "var(--bg-card)",
                        borderRadius: 12,
                        boxShadow: "var(--shadow-card)",
                        border: "1px solid var(--border)",
                        zIndex: 10 - i,
                      }}
                    >
                      <div className="w-8 h-8 rounded-full shrink-0" style={{ background: c.grad }} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-semibold truncate">{c.name}</div>
                        <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                          {c.role} · {c.years}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {COMPANIES.map((c, i) => (
                      <motion.div
                        key={c.name}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="p-4 flex items-center gap-3"
                        style={{
                          background: "var(--bg-card)",
                          borderRadius: 12,
                          boxShadow: "var(--shadow-card)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div className="w-8 h-8 rounded-full shrink-0" style={{ background: c.grad }} />
                        <div>
                          <div className="text-[14px] font-semibold">{c.name}</div>
                          <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                            {c.role} · {c.years}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              <button
                onClick={() => setShowAll((v) => !v)}
                className="mt-4 text-[13px] underline underline-offset-4"
                style={{ color: "var(--accent)" }}
              >
                {showAll ? "Hide" : "Show All"}
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <p
              className="italic"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(22px, 2.4vw, 28px)",
                lineHeight: 1.4,
                color: "var(--text-primary)",
              }}
            >
              "I think of myself as the translator between what users desperately need and what engineers can actually build."
            </p>
            <div className="mt-8 space-y-5 text-[16px]" style={{ color: "var(--text-body)", lineHeight: 1.75 }}>
              <p>
                I've spent the last few years working across growth, marketplace, and platform teams — usually somewhere between the messy zero-to-one and the discipline of scaling what works.
              </p>
              <p>
                My favourite work sits at the intersection of customer obsession and clean execution: deep discovery, sharp PRDs, and a team that wants to ship something they're proud of.
              </p>
              <p>
                Outside of product I read more than I should, cook badly but happily, and chase good light wherever I can find it.
              </p>
            </div>
          </div>
        </div>

        {/* How I Approach */}
        <div className="mt-24 md:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h3 style={{ fontSize: 32, lineHeight: 1.2 }}>How I Approach Problems</h3>
            <p className="mt-3 text-[16px]" style={{ color: "var(--text-muted)" }}>
              A few principles I keep coming back to.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Tools */}
            <div>
              <p className="text-[11px] uppercase mb-5" style={{ letterSpacing: "0.15em", color: "var(--accent)" }}>
                Tools I Use
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                {TOOLS.map((t) => (
                  <motion.div
                    key={t.name}
                    whileHover={{ y: -4, borderColor: "var(--accent)" }}
                    className="flex flex-col items-center justify-center p-4 gap-2"
                    style={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--bg-card)" }}
                  >
                    <img src={t.url} alt={t.name} className="w-8 h-8" style={{ filter: "grayscale(0.3)" }} />
                    <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>{t.name}</span>
                  </motion.div>
                ))}
                {TEXT_TOOLS.map((t) => (
                  <motion.div
                    key={t.name}
                    whileHover={{ y: -4, borderColor: "var(--accent)" }}
                    className="flex flex-col items-center justify-center p-4 gap-2"
                    style={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--bg-card)" }}
                  >
                    <div className="px-2.5 py-1 rounded-full text-[11px] text-white flex items-center gap-1.5"
                      style={{ background: t.grad }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      {t.name}
                    </div>
                    <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>{t.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Approach cards */}
            <div className="space-y-4">
              {APPROACH.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ x: 6 }}
                  style={{
                    background: "var(--bg-strip)",
                    color: "var(--text-on-dark)",
                    borderLeft: "3px solid var(--accent)",
                    borderRadius: 16,
                    padding: 28,
                  }}
                >
                  <div className="text-2xl mb-2">{a.icon}</div>
                  <h4 style={{ fontSize: 18, color: "var(--text-on-dark)" }}>{a.title}</h4>
                  <p className="mt-2 text-[14px]" style={{ color: "rgba(244,242,238,0.7)", lineHeight: 1.6 }}>
                    {a.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
