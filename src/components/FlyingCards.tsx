import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import work1Thumb from "@/assets/work-1-thumb.png.asset.json";
import work2Thumb from "@/assets/work-2-thumb.png.asset.json";
import work3Thumb from "@/assets/work-3-thumb.png.asset.json";
import work4Thumb from "@/assets/work-4-thumb.png.asset.json";

export type Slot = { x: number; y: number; w: number; h: number };

// Module-level shared refs so Hero + Work can register their target slots
// and FlyingCards can read them.
export const heroAnchorRef = { current: null as HTMLDivElement | null };
export const workSlotRefs: { current: HTMLDivElement | null }[] = [
  { current: null }, { current: null }, { current: null }, { current: null },
];

const CARDS: { title: string; tag: string; grad: string; pdf: string; img?: string }[] = [
  { title: "Date Planner for Bumble",                       tag: "Growth",          grad: "linear-gradient(135deg,#f6d365,#fda085)", pdf: "/project1.pdf", img: work1Thumb.url },
  { title: "Increasing DAU of Hindi News Platform",         tag: "RCA and Growth",  grad: "linear-gradient(135deg,#5ee7df,#b490ca)", pdf: "/project2.pdf", img: work2Thumb.url },
  { title: "Mixpanel Event Writing Automation",             tag: "AI Automation",   grad: "linear-gradient(135deg,#fbc2eb,#a18cd1)", pdf: "/project3.pdf", img: work3Thumb.url },
  { title: "Increasing Zomato Reviews",                     tag: "Growth",          grad: "linear-gradient(135deg,#84fab0,#8fd3f4)", pdf: "/project4.pdf", img: work4Thumb.url },
];

function readRect(el: HTMLElement | null): Slot | null {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top, w: r.width, h: r.height };
}

export default function FlyingCards() {
  const [isMounted, setIsMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [heroSlot, setHeroSlot] = useState<Slot | null>(null);
  const [workSlots, setWorkSlots] = useState<(Slot | null)[]>([null, null, null, null]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [viewportWidth, setViewportWidth] = useState(1280);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const workEl = document.getElementById("work");
      setViewportWidth(window.innerWidth);
      if (workEl) {
        const r = workEl.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress 0 = Work top still below viewport bottom
        // progress 1 = Work has scrolled up so grid is roughly at viewport center
        const start = vh * 0.9;
        const end = vh * 0.15;
        const p = (start - r.top) / (start - end);
        setProgress(Math.max(0, Math.min(1, p)));
      }
      setHeroSlot(readRect(heroAnchorRef.current));
      setWorkSlots(workSlotRefs.map((r) => readRect(r.current)));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Fanned start positions relative to heroSlot
  const startFor = (i: number): Slot => {
    if (!heroSlot) {
      // fallback if anchor not measured yet
      return { x: Math.max(24, viewportWidth - 350), y: 200 + i * 18, w: 290, h: 250 };
    }
    const cardW = Math.min(290, heroSlot.w);
    const baseX = heroSlot.x + (heroSlot.w - cardW) / 2;
    const baseY = heroSlot.y + 20;
    return {
      x: baseX + (i - 1.5) * 14,
      y: baseY + i * 28,
      w: cardW,
      h: 250,
    };
  };

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 hidden md:block">
      {CARDS.map((c, i) => {
        const start = startFor(i);
        const end = workSlots[i] || start;
        const p = ease(progress);
        const x = lerp(start.x, end.x, p);
        const y = lerp(start.y, end.y, p);
        const w = lerp(start.w, end.w, p);
        const startRot = i % 2 === 0 ? -4 : 4;
        const rot = startRot * (1 - p);
        const isHover = hovered === i;
        return (
          <a
            key={i}
            href={c.pdf}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="absolute pointer-events-auto cursor-pointer overflow-hidden"
            style={{
              left: 0,
              top: 0,
              width: w,
              transform: `translate3d(${x}px, ${y + (isHover ? -6 : 0)}px, 0) rotate(${rot}deg) scale(${isHover ? 1.02 : 1})`,
              background: "var(--bg-card)",
              borderRadius: 16,
              boxShadow: isHover ? "var(--shadow-hover)" : "var(--shadow-card)",
              border: `1px solid ${isHover ? "var(--accent)" : "var(--border)"}`,
              zIndex: 10 - i + (isHover ? 100 : 0),
              transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              willChange: "transform",
            }}
          >
            <div style={{ height: lerp(140, 200, p), background: c.img ? `url(${c.img}) center/cover no-repeat` : c.grad }} />
            <div className="p-6">
              <span
                className="inline-block px-2.5 py-1 rounded-full text-[11px]"
                style={{ background: "var(--accent-pale)", color: "var(--accent)" }}
              >
                {c.tag}
              </span>
              <div className="mt-3 flex items-start justify-between gap-4">
                <h3 style={{ fontSize: 20, color: "var(--text-primary)", lineHeight: 1.3 }}>
                  {c.title}
                </h3>
                <div
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    border: `1px solid ${isHover ? "var(--accent)" : "var(--border-strong)"}`,
                    background: isHover ? "var(--accent)" : "transparent",
                    color: isHover ? "#fff" : "var(--text-body)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
