const ROW1 = [
  "Product Strategy", "Roadmapping", "User Research", "Agile / Scrum",
  "Stakeholder Management", "Data Analytics", "A/B Testing", "Go-to-Market", "OKRs & KPIs",
];
const ROW2 = [
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
    <section style={{ background: "var(--bg-strip)" }} className="py-10 space-y-4">
      <Row items={ROW1} />
      <Row items={ROW2} reverse />
    </section>
  );
}
