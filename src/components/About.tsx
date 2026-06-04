import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { User, Linkedin } from "lucide-react";
import ApproachStack from "./ApproachStack";
import portraitAsset from "@/assets/portrait-v2.jpeg.asset.json";

import f22Logo from "@/assets/f22.svg.asset.json";
import cars24Logo from "@/assets/cars24.png.asset.json";
import nextleapLogo from "@/assets/nextleap.jpg.asset.json";
import shabariLogo from "@/assets/shabari.jpeg.asset.json";

const COMPANIES = [
  { name: "F22", role: "Lead Product Designer", years: "2024–Current", grad: "linear-gradient(135deg,#7A8F7B,#A5B5A3)", logo: f22Logo.url },
  { name: "Cars24", role: "Product Designer", years: "2022–2024", grad: "#4F46E5", logo: cars24Logo.url },
  { name: "NextLeap", role: "Consulting", years: "2020–2022", grad: "#000000", logo: nextleapLogo.url },
  { name: "Shabari.AI", role: "Junior Designer", years: "2019–2020", grad: "#ffffff", logo: shabariLogo.url },
];

const TOOLS = [
  { name: "Figma", url: "https://cdn.simpleicons.org/figma" },
  { name: "Jira", url: "https://cdn.simpleicons.org/jira" },
  { name: "Miro", url: "https://cdn.simpleicons.org/miro" },
  { name: "Mixpanel", url: "https://cdn.simpleicons.org/mixpanel" },
  { name: "Google Analytics", url: "https://cdn.simpleicons.org/googleanalytics" },
  { name: "PostHog", url: "https://www.google.com/s2/favicons?domain=posthog.com&sz=64" },
  { name: "Statsig", url: "https://www.google.com/s2/favicons?domain=statsig.com&sz=64" },
  { name: "Claude", url: "https://cdn.simpleicons.org/claude" },
  { name: "ChatGPT", url: "https://www.google.com/s2/favicons?domain=chatgpt.com&sz=64" },
  { name: "Perplexity", url: "https://cdn.simpleicons.org/perplexity" },
  { name: "Lovable", url: "https://www.google.com/s2/favicons?domain=lovable.dev&sz=64" },
  { name: "Emergent", url: "https://www.google.com/s2/favicons?domain=emergent.sh&sz=64" },
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

        <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-12 md:gap-16">
          {/* LEFT — Portrait + Identity + Where I've Been */}
          <div className="flex flex-col h-full">
            {/* Portrait — replace inner <User/> with <img src="..." className="absolute inset-0 w-full h-full object-cover" /> */}
            <div
              className="relative w-full overflow-hidden flex items-end justify-center"
              style={{
                aspectRatio: "4/5",
                maxWidth: 380,
                borderRadius: 20,
                background: "linear-gradient(180deg, #2a2a2a 0%, #0f0f0f 100%)",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              <img src={portraitAsset.url} alt="Geetika portrait" className="absolute inset-0 w-full h-full object-cover" />
              

              <div className="absolute bottom-4 right-4 flex gap-2">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur transition-transform hover:scale-110"
                  style={{ background: "rgba(0,0,0,0.55)", color: "#fff" }}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

            {/* Name */}
            <div className="mt-6">
              <h3 style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.2 }}>Geetika</h3>
              <p className="mt-1 text-[14px]" style={{ color: "var(--text-muted)" }}>
                Associate Product Manager
              </p>
            </div>

            {/* Where I've Been */}
            <div className="mt-10 mt-auto pt-10">
              <p className="text-[14px] font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                Where I've been
              </p>

              {!showAll ? (
                <div className="relative">
                  {/* Stacked cards peeking below */}
                  <div
                    aria-hidden
                    className="absolute left-4 right-4 -bottom-2 h-4"
                    style={{
                      background: "var(--bg-card)",
                      borderRadius: 14,
                      border: "1px solid var(--border)",
                      boxShadow: "var(--shadow-card)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute left-2 right-2 -bottom-1 h-4"
                    style={{
                      background: "var(--bg-card)",
                      borderRadius: 14,
                      border: "1px solid var(--border)",
                      boxShadow: "var(--shadow-card)",
                    }}
                  />
                  <div
                    className="relative p-4 flex items-center gap-3"
                    style={{
                      background: "var(--bg-card)",
                      borderRadius: 14,
                      border: "1px solid var(--border)",
                      boxShadow: "var(--shadow-card)",
                    }}
                  >
                    <div className="w-9 h-9 rounded-full shrink-0 overflow-hidden flex items-center justify-center" style={{ background: COMPANIES[0].grad }}>
                      <img src={COMPANIES[0].logo} alt={COMPANIES[0].name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[15px] font-semibold">{COMPANIES[0].name}</div>
                        <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                          {COMPANIES[0].role}
                        </div>
                      </div>
                      <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                        {COMPANIES[0].years}
                      </div>
                    </div>
                  </div>
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
                          borderRadius: 14,
                          border: "1px solid var(--border)",
                          boxShadow: "var(--shadow-card)",
                        }}
                      >
                        <div className="w-9 h-9 rounded-full shrink-0 overflow-hidden flex items-center justify-center" style={{ background: c.grad }}>
                          <img src={c.logo} alt={c.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
                          <div>
                            <div className="text-[15px] font-semibold">{c.name}</div>
                            <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                              {c.role}
                            </div>
                          </div>
                          <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                            {c.years}
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
                {showAll ? "Hide" : "Show all"}
              </button>
            </div>
          </div>

          {/* RIGHT — Bio */}
          <div className="text-[18px]" style={{ color: "var(--text-primary)", lineHeight: 1.55 }}>
            <p>
              <strong>Mostly listening.</strong> I started in consulting at 21, moved into product through self-teaching, and now work as an associate product manager building things people actually use. Different industries, same lesson: the work gets better when you slow down enough to actually understand the people using it.
            </p>

            <p className="mt-6">
              <strong>Right now I'm deep in product strategy</strong>, designing how teams build, measure, and iterate on the things that actually matter. It's messy, fast, and genuinely new, which means I'm wrong a lot and learning constantly. I like it that way. The moment I think I've got something figured out is usually the moment I've stopped paying attention.
            </p>

            <p className="mt-6">
              <strong>I care a lot about the small things</strong>, the wording on an empty state, the weight of a button press, the rhythm of a flow. Not because polish is the point, but because those details are where trust gets built. I want the people I work with, teammates and users, to feel like someone actually thought about them. That's the part I'm still trying to get right, every project.
            </p>


            <p className="mt-6">
              <strong>What I'm looking for next</strong> is a team that takes craft seriously, treats users like collaborators, and isn't afraid to throw away good work to make room for better. If that sounds like you, I'd love to talk.
            </p>
          </div>
        </div>

        {/* Tools strip — divider between About and Approach */}
        <div className="mt-24 md:mt-28">
          <div className="flex items-center gap-6 mb-8">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <p className="text-[11px] uppercase" style={{ letterSpacing: "0.2em", color: "var(--accent)" }}>
              Tools I Use
            </p>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 pb-8">
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
                  className="absolute -bottom-6 text-[11px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider before How I Approach */}
        <div className="mt-16 md:mt-20 mb-12">
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
            <ApproachStack />

            <div className="md:sticky md:top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="p-6 md:p-7"
                style={{
                  background: "var(--bg-card)",
                  borderRadius: 20,
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{
                    background: "linear-gradient(135deg, #EEF3ED, #d4ddd4)",
                    color: "var(--accent)",
                  }}
                >
                  <User size={22} strokeWidth={1.5} />
                </div>

                <h4
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "clamp(18px, 1.8vw, 22px)",
                    lineHeight: 1.2,
                    color: "var(--text-muted)",
                    fontWeight: 400,
                  }}
                >
                  Curious about my work?
                </h4>
                <h4
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "clamp(18px, 1.8vw, 22px)",
                    lineHeight: 1.2,
                    color: "var(--text-primary)",
                    fontWeight: 600,
                  }}
                >
                  Find me on LinkedIn
                </h4>

                <p className="mt-3 text-[13px]" style={{ color: "var(--text-body)", lineHeight: 1.55 }}>
                  Always up for a chat about design, AI, or what you're building.
                </p>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-full text-[13px] text-white transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "#0a0a0a" }}
                >
                  <span
                    className="w-5 h-5 rounded flex items-center justify-center"
                    style={{ background: "#fff", color: "#0a0a0a" }}
                  >
                    <Linkedin size={12} strokeWidth={2.5} />
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
