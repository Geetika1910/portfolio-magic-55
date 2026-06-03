const ROW1 = [
  "Product Strategy", "Roadmapping", "User Research", "Agile / Scrum",
  "Stakeholder Management", "Data Analytics", "A/B Testing", "Go-to-Market", "OKRs & KPIs",
  "Figma", "SQL", "Customer Discovery", "Prioritisation Frameworks",
  "Cross-functional Leadership", "Competitive Analysis", "Prototyping", "PRD Writing", "Sprint Planning",
];

function Pill({ label }: { label: string }) {
  return (
    <div
      className="flex items-center gap-2.5 px-4 py-2 rounded-full whitespace-nowrap shrink-0 transition-transform hover:scale-105"
      style={{
        border: "1px solid rgba(255,255,255,0.15)",
        color: "rgba(255,255,255,0.75)",
        fontSize: 13,
      }}
    >
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: "var(--accent)" }}
      />
      {label}
    </div>
  );
}

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden marquee-wrap marquee-mask">
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        {doubled.map((s, i) => (
          <Pill key={i} label={s} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsMarquee() {
  return (
    <div className="relative">
      <svg
        className="block w-full"
        style={{ height: 40, marginBottom: -1, color: "var(--bg-strip)" }}
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,20 C150,0 300,40 600,20 C900,0 1050,40 1200,20 L1200,40 L0,40 Z"
          fill="currentColor"
        />
      </svg>

      <section style={{ background: "var(--bg-strip)" }} className="py-10">
        <Row items={ROW1} />
      </section>

      <svg
        className="block w-full"
        style={{ height: 40, marginTop: -1, color: "var(--bg-strip)" }}
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 C150,40 300,0 600,20 C900,40 1050,0 1200,30 L1200,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
