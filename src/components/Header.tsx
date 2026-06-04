import { useEffect, useRef, useState } from "react";
import { Menu, X, Linkedin, User, Upload } from "lucide-react";
import resumePdf from "@/assets/resume.pdf.asset.json";

type NavItem = {
  label: string;
  id: string;
  hover: "underline" | "fill" | "rotate" | "swap";
};

const NAV: NavItem[] = [
  { label: "Work", id: "work", hover: "underline" },
  { label: "About", id: "about", hover: "fill" },
  { label: "Beyond", id: "beyond", hover: "rotate" },
  { label: "Contact", id: "contact", hover: "swap" },
];

function NavButton({ item, onClick }: { item: NavItem; onClick: () => void }) {
  const base: React.CSSProperties = {
    letterSpacing: "0.12em",
    color: "var(--text-muted)",
    fontSize: 12,
    textTransform: "uppercase",
    position: "relative",
    padding: "6px 2px",
    overflow: "hidden",
    display: "inline-block",
    height: 28,
  };

  if (item.hover === "underline") {
    return (
      <button onClick={onClick} className="group" style={base}>
        <span className="transition-colors group-hover:text-[var(--accent-light)]" style={{ color: "var(--text-muted)" }}>
          {item.label}
        </span>
        <span
          aria-hidden
          className="absolute left-0 bottom-1 h-[1.5px] w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
          style={{ background: "var(--accent-light)" }}
        />
      </button>
    );
  }

  if (item.hover === "fill") {
    return (
      <button
        onClick={onClick}
        className="group rounded-full px-3 transition-colors duration-300"
        style={{ ...base, padding: "6px 12px" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "color-mix(in oklab, var(--accent) 22%, transparent)";
          e.currentTarget.style.color = "var(--accent-light)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "var(--text-muted)";
        }}
      >
        {item.label}
      </button>
    );
  }

  if (item.hover === "rotate") {
    return (
      <button onClick={onClick} className="group inline-flex items-center gap-1.5" style={base}>
        <span
          aria-hidden
          className="inline-block transition-transform duration-500 group-hover:rotate-[360deg]"
          style={{ color: "var(--accent-light)" }}
        >
          ✦
        </span>
        <span className="transition-colors group-hover:text-[var(--accent-light)]">{item.label}</span>
      </button>
    );
  }

  // swap (vertical letter slide)
  return (
    <button onClick={onClick} className="group" style={base}>
      <span className="relative block leading-[16px] overflow-hidden" style={{ height: 16 }}>
        <span
          className="block transition-transform duration-300 group-hover:-translate-y-full"
          style={{ color: "var(--text-muted)" }}
        >
          {item.label}
        </span>
        <span
          className="block transition-transform duration-300 group-hover:-translate-y-full"
          style={{ color: "var(--accent-light)" }}
        >
          {item.label}
        </span>
      </span>
    </button>
  );
}

function AvatarUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("profile-avatar") : null;
    if (stored) setSrc(stored);
  }, []);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setSrc(dataUrl);
      try {
        localStorage.setItem("profile-avatar", dataUrl);
      } catch {}
    };
    reader.readAsDataURL(file);
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="group relative w-9 h-9 rounded-full overflow-hidden shrink-0 transition-transform hover:scale-105"
      style={{
        border: "1.5px solid var(--accent)",
        background: "color-mix(in oklab, var(--accent) 18%, transparent)",
      }}
      aria-label="Upload profile picture"
      title="Upload profile picture"
    >
      {src ? (
        <img src={src} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center" style={{ color: "var(--text-on-dark)" }}>
          <User size={16} />
        </span>
      )}
      <span
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: "rgba(0,0,0,0.55)", color: "white" }}
      >
        <Upload size={13} />
      </span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFile}
      />
    </button>
  );
}

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
        <div className="flex items-center gap-3">
          <AvatarUpload />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[18px] font-medium tracking-tight transition-transform hover:scale-105"
            style={{ color: "var(--text-on-dark)" }}
          >
            Geetika
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <NavButton key={n.id} item={n} onClick={() => go(n.id)} />
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
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
