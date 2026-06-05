import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const beyond1 = "/assets/beyond-1.jpeg";
const beyond2 = "/assets/beyond-2.jpeg";
const beyond3 = "/assets/beyond-3.jpeg";
const beyond4 = "/assets/beyond-4.png";
const beyond5 = "/assets/beyond-5.jpeg";
const beyond6 = "/assets/beyond-6.jpeg";
const beyond7 = "/assets/beyond-7.jpeg";
const beyond8 = "/assets/beyond-8.jpeg";
const beyond9 = "/assets/beyond-9.jpeg";
const beyond10 = "/assets/beyond-10.jpeg";
const beyond11 = "/assets/beyond-11.jpeg";
const beyond12 = "/assets/beyond-12.jpeg";
const beyond13 = "/assets/beyond-13.jpeg";
const beyond14 = "/assets/beyond-14.jpeg";
const whatsCooking = "/assets/whats_cooking_trimmed_16x9.svg";

type Photo = { image?: string; gradient?: string };

const PHOTOS: Photo[] = [
  { image: beyond1 },
  { image: beyond2 },
  { image: beyond3 },
  { image: beyond4 },
  { image: beyond5 },
  { image: beyond6 },
  { image: beyond7 },
  { image: beyond8 },
  { image: beyond9 },
  { image: beyond10 },
  { image: beyond11 },
  { image: beyond12 },
  { image: beyond13 },
  { image: beyond14 },
];

const FEATURES = [
  "Tell it your ingredients, mood, and time - get a recipe that fits",
  "Quick filters for meal type, diet, and how many you're feeding",
  "Save the ones you love, tweak the ones you almost love",
  "No endless scrolling, just answers based on your kitchen",
];

const BEYOND_ROTATING_WORDS = ["unplug.", "reset."];

export default function Beyond() {
  const ref = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ startX: 0, scrollLeft: 0 });
  const [beyondIndex, setBeyondIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBeyondIndex((i) => (i + 1) % BEYOND_ROTATING_WORDS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  // Curved/coverflow effect: transform each card based on its distance from viewport center
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let raf = 0;
    const update = () => {
      const cRect = container.getBoundingClientRect();
      const center = cRect.left + cRect.width / 2;
      const maxDist = cRect.width / 2 + 200;

      cardRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cardCenter = r.left + r.width / 2;
        const dist = (cardCenter - center) / maxDist; // -1..1
        const clamped = Math.max(-1.2, Math.min(1.2, dist));
        const rotateY = clamped * -28; // degrees
        const translateZ = -Math.abs(clamped) * 120; // px (push sides back)
        const translateY = Math.abs(clamped) * 18; // arc downward at edges? use negative for upward
        el.style.transform = `perspective(1200px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
        el.style.opacity = String(1 - Math.abs(clamped) * 0.25);
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const onDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    setDragging(true);
    drag.current.startX = e.pageX;
    drag.current.scrollLeft = ref.current.scrollLeft;
  };
  const onMove = (e: React.MouseEvent) => {
    if (!dragging || !ref.current) return;
    ref.current.scrollLeft = drag.current.scrollLeft - (e.pageX - drag.current.startX);
  };
  const stop = () => setDragging(false);
  const scrollBy = (dx: number) => ref.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section id="beyond" className="py-24 md:py-32" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[11px] uppercase mb-4" style={{ letterSpacing: "0.15em", color: "var(--accent)" }}>
            Beyond Work
          </p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.1 }}>
            Where I{" "}
            <span className="relative inline-block align-baseline" style={{ minWidth: "5ch" }}>
              <span className="invisible italic whitespace-nowrap" style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}>
                {BEYOND_ROTATING_WORDS[beyondIndex]}
              </span>
              <span className="absolute left-0 top-0 w-full overflow-hidden" style={{ height: "1.2em" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={beyondIndex}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block italic whitespace-nowrap"
                    style={{ color: "var(--accent)", fontFamily: "var(--font-serif, Georgia, serif)" }}
                  >
                    {BEYOND_ROTATING_WORDS[beyondIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </h2>
          <p className="mt-4 text-[16px] max-w-xl" style={{ color: "var(--text-muted)" }}>
            Open skies, unfamiliar cities, food worth finding, and recipes worth experimenting with. This is where I breathe.
          </p>
        </motion.div>
      </div>

      {/* Photo strip */}
      <div className="relative">
        <button
          onClick={() => scrollBy(-320)}
          aria-label="Previous"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center text-white transition-transform hover:scale-110"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scrollBy(320)}
          aria-label="Next"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center text-white transition-transform hover:scale-110"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <ChevronRight size={18} />
        </button>

        <div
          ref={ref}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={stop}
          onMouseLeave={stop}
          className="hide-scrollbar flex gap-6 overflow-x-auto px-6 md:px-20 select-none"
          style={{
            cursor: dragging ? "grabbing" : "grab",
            perspective: "1200px",
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          {PHOTOS.map((p, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="shrink-0 overflow-hidden"
              style={{
                width: 280,
                height: 320,
                borderRadius: 20,
                background: p.image ? `url(${p.image}) center/cover no-repeat` : p.gradient,
                boxShadow: "var(--shadow-card)",
                transformStyle: "preserve-3d",
                transition: "transform 0.15s ease-out, opacity 0.2s ease-out",
                willChange: "transform",
              }}
            />
          ))}
        </div>
      </div>

      {/* What's Cooking */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10"
            style={{ background: "var(--bg-strip)", borderRadius: 24, padding: 48 }}
          >
            {/* Ambient floating glow */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                width: 500,
                height: 500,
                background: "radial-gradient(circle, var(--accent-glow), transparent 70%)",
              }}
              animate={{
                x: [-200, -180, -200],
                y: [-200, -180, -200],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Subtle sparkle dots */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 3 + i,
                    height: 3 + i,
                    left: `${18 + i * 14}%`,
                    top: `${22 + i * 11}%`,
                    background: "var(--accent-light)",
                  }}
                  animate={{
                    opacity: [0.15, 0.45, 0.15],
                    scale: [1, 1.4, 1],
                  }}
                  transition={{
                    duration: 3 + i * 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.6,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <p className="text-[11px] uppercase mb-3" style={{ letterSpacing: "0.15em", color: "var(--accent)" }}>
                ✦ Personal Project
              </p>
              <h3 style={{ fontSize: 36, color: "var(--text-on-dark)", lineHeight: 1.15 }}>
                What's Cooking?
              </h3>
              <p className="mt-4 text-[15px]" style={{ color: "rgba(244,242,238,0.75)", lineHeight: 1.7 }}>
                An AI-powered recipe app born from too many "what do I make" moments.
              </p>
              <ul className="mt-5 space-y-2.5">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[14px]" style={{ color: "rgba(244,242,238,0.85)" }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://whatscooking-nu.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-7 px-6 py-3 rounded-full text-[14px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "var(--accent-dark)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent-dark)")}
              >
                Try it live →
              </a>
            </div>

            <motion.div
              className="relative z-10"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div style={{ borderRadius: 12, background: "#2a2a2a", overflow: "hidden", boxShadow: "var(--shadow-float)" }}>
                <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: "#1a1a1a" }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                </div>
                <img src={whatsCooking} alt="What's Cooking app" style={{ display: "block", width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
