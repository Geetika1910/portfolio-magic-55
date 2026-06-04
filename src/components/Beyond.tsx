import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import beyond1 from "@/assets/beyond-1.jpeg.asset.json";
import beyond2 from "@/assets/beyond-2.jpeg.asset.json";
import beyond3 from "@/assets/beyond-3.jpeg.asset.json";
import beyond4 from "@/assets/beyond-4.png.asset.json";
import beyond5 from "@/assets/beyond-5.jpeg.asset.json";
import beyond6 from "@/assets/beyond-6.jpeg.asset.json";
import beyond7 from "@/assets/beyond-7.jpeg.asset.json";
import beyond8 from "@/assets/beyond-8.jpeg.asset.json";
import beyond9 from "@/assets/beyond-9.jpeg.asset.json";
import beyond10 from "@/assets/beyond-10.jpeg.asset.json";

type Photo = { image?: string; gradient?: string };

const PHOTOS: Photo[] = [
  { image: beyond1.url },
  { image: beyond2.url },
  { image: beyond3.url },
  { image: beyond4.url },
  { image: beyond5.url },
  { image: beyond6.url },
  { image: beyond7.url },
  { image: beyond8.url },
  { image: beyond9.url },
  { image: beyond10.url },
  { gradient: "linear-gradient(135deg,#bfa078,#6e5a3c)" },
  { gradient: "linear-gradient(135deg,#7d9a8a,#3f5c4a)" },
  { gradient: "linear-gradient(135deg,#c8a890,#7a5848)" },
  { gradient: "linear-gradient(135deg,#9ab0c0,#5a7080)" },
];

const FEATURES = [
  "Discover new recipes from across regions",
  "Quick filters for time, diet, and pantry",
  "Save and remix your favourites",
  "Built for the way I actually cook",
];

export default function Beyond() {
  const ref = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ startX: 0, scrollLeft: 0 });

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
            Where I unplug & get inspired.
          </h2>
          <p className="mt-4 text-[16px] max-w-xl" style={{ color: "var(--text-muted)" }}>
            Mountains, mirrors, slow mornings, and side projects. The stuff that keeps the work honest.
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
          {PHOTOS.map((g, i) => (
            // TODO: Replace with <img src=".." />
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="shrink-0"
              style={{
                width: 280,
                height: 320,
                borderRadius: 20,
                background: g,
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
                A side project I tinker with on weekends — a small, friendly recipe app for people who actually cook at home.
              </p>
              <ul className="mt-5 space-y-2.5">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[14px]" style={{ color: "rgba(244,242,238,0.85)" }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                    {f}
                  </li>
                ))}
              </ul>
              {/* TODO: Replace href with your What's Cooking URL */}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-7 px-6 py-3 rounded-full text-[14px] text-white transition-all hover:-translate-y-0.5"
                style={{ background: "var(--accent)" }}
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
                {/* TODO: Replace with <img src="screenshot.png" /> */}
                <div style={{ height: 280, background: "linear-gradient(135deg, #6b8e6b, #3a5c3a)" }} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
