import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const PHOTOS = [
  "linear-gradient(135deg,#6b8e6b,#3a5c3a)",
  "linear-gradient(135deg,#a8c0d8,#5e7a92)",
  "linear-gradient(135deg,#d4a373,#8b5a3c)",
  "linear-gradient(135deg,#7a8f7b,#a5b5a3)",
  "linear-gradient(135deg,#c9b99a,#8b7355)",
  "linear-gradient(135deg,#4a6741,#87a878)",
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
          style={{ cursor: dragging ? "grabbing" : "grab" }}
        >
          {PHOTOS.map((g, i) => (
            // TODO: Replace with <img src=".." />
            <motion.div
              key={i}
              whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="shrink-0"
              style={{
                width: 280,
                height: 320,
                borderRadius: 20,
                background: g,
                boxShadow: "var(--shadow-card)",
              }}
            />
          ))}
        </div>
      </div>

      {/* What's Cooking */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mt-20">
        <div
          className="relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10"
          style={{ background: "var(--bg-strip)", borderRadius: 24, padding: 48 }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              width: 600, height: 600, left: "-200px", top: "-200px",
              background: "radial-gradient(circle, var(--accent-glow), transparent 70%)",
            }}
          />
          <div className="relative">
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

          <div className="relative">
            <div style={{ borderRadius: 12, background: "#2a2a2a", overflow: "hidden", boxShadow: "var(--shadow-float)" }}>
              <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: "#1a1a1a" }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
              </div>
              {/* TODO: Replace with <img src="screenshot.png" /> */}
              <div style={{ height: 280, background: "linear-gradient(135deg, #6b8e6b, #3a5c3a)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
