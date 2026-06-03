import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { User, Linkedin } from "lucide-react";
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
  { name: "Claude", url: "https://cdn.simpleicons.org/claude" },
  { name: "Notion", url: "https://cdn.simpleicons.org/notion" },
  { name: "n8n", url: "https://cdn.simpleicons.org/n8n" },
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

            {/* Where I've Been — moved to right column to align with text */}
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
        </div>

        {/* Tools strip — sits between About and Approach as a divider */}
        <div className="mt-24 md:mt-28">
          <div className="flex items-center gap-6 mb-8">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <p className="text-[11px] uppercase" style={{ letterSpacing: "0.2em", color: "var(--accent)" }}>
              Tools I Use
            </p>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {TOOLS.map((t) => (
              <div key={t.name} className="group relative flex flex-col items-center">
                <motion.img
                  src={t.url}
                  alt={t.name}
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-9 h-9 transition-all"
                  style={{ filter: "grayscale(1) opacity(0.7)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0) opacity(1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(1) opacity(0.7)")}
                />
                <span
                  className="absolute -bottom-7 text-[11px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider strip before How I Approach */}
        <div className="mt-24 md:mt-28 mb-12">
          <div className="h-px w-full" style={{ background: "var(--border)" }} />
        </div>

        {/* How I Approach */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-[11px] uppercase mb-4" style={{ letterSpacing: "0.15em", color: "var(--accent)" }}>
              Approach
            </p>
            <h3 style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.2 }}>How I Approach Problems</h3>
            <p className="mt-3 text-[16px]" style={{ color: "var(--text-muted)" }}>
              A few principles I keep coming back to.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Approach cards on the LEFT */}
            <ApproachStack />

            {/* LinkedIn CTA card on the RIGHT — sticky */}
            <div className="md:sticky md:top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="p-8 md:p-10"
                style={{
                  background: "var(--bg-card)",
                  borderRadius: 24,
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
                  style={{
                    background: "linear-gradient(135deg, #EEF3ED, #d4ddd4)",
                    color: "var(--accent)",
                  }}
                >
                  <User size={36} strokeWidth={1.4} />
                </div>

                <h4
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "clamp(26px, 3vw, 34px)",
                    lineHeight: 1.15,
                    color: "var(--text-muted)",
                    fontWeight: 400,
                  }}
                >
                  Curious about my work?
                </h4>
                <h4
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "clamp(26px, 3vw, 34px)",
                    lineHeight: 1.15,
                    color: "var(--text-primary)",
                    fontWeight: 600,
                  }}
                >
                  Find me on LinkedIn
                </h4>

                <p className="mt-5 text-[15px]" style={{ color: "var(--text-body)", lineHeight: 1.6 }}>
                  Always up for a conversation about design, AI, or what you're working on.
                </p>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 mt-8 px-5 py-3 rounded-full text-[14px] text-white transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "#0a0a0a" }}
                >
                  <span
                    className="w-6 h-6 rounded flex items-center justify-center"
                    style={{ background: "#fff", color: "#0a0a0a" }}
                  >
                    <Linkedin size={14} strokeWidth={2.5} />
                  </span>
                  Connect on LinkedIn
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
