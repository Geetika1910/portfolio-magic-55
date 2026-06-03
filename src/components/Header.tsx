import { useEffect, useState } from "react";
import { Menu, X, Linkedin } from "lucide-react";

const NAV = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Beyond", id: "beyond" },
  { label: "Contact", id: "contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] transition-shadow duration-300"
      style={{
        background: "var(--bg-strip)",
        backdropFilter: "blur(12px)",
        boxShadow: scrolled ? "0 8px 24px rgba(0,0,0,0.25)" : "none",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-[18px] font-medium tracking-tight transition-transform hover:scale-105"
          style={{ color: "var(--text-on-dark)" }}
        >
          Your Name
        </button>

        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="text-[12px] uppercase transition-colors duration-200 hover:tracking-[0.18em]"
              style={{ letterSpacing: "0.1em", color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* TODO: Replace with your LinkedIn URL */}
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ border: "1px solid rgba(255,255,255,0.15)", color: "var(--text-on-dark)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <Linkedin size={15} />
          </a>
          {/* TODO: Replace with your resume PDF path */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-300 hover:-translate-y-0.5"
            style={{
              border: "1px solid var(--accent)",
              color: "var(--text-on-dark)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Resume
          </a>
        </div>

        <button
          className="md:hidden w-10 h-10 flex items-center justify-center"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          style={{ color: "var(--text-on-dark)" }}
        >
          <Menu size={22} />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8"
          style={{ background: "var(--bg-strip)" }}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center"
            style={{ color: "var(--text-on-dark)" }}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="text-2xl uppercase"
              style={{ letterSpacing: "0.15em", color: "var(--text-on-dark)", fontFamily: "Playfair Display, serif" }}
            >
              {n.label}
            </button>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-4 px-6 py-2.5 rounded-full text-sm"
            style={{ border: "1px solid var(--accent)", color: "var(--text-on-dark)" }}
          >
            Resume
          </a>
        </div>
      )}
    </header>
  );
}
