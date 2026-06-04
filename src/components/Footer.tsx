import { Linkedin, Mail, Phone, FileText } from "lucide-react";
import { motion } from "framer-motion";
import resumePdf from "@/assets/resume.pdf.asset.json";

const LINKS = [
  { icon: Linkedin, label: "linkedin.com/in/yourprofile", href: "https://linkedin.com/in/yourprofile" },
  { icon: Mail, label: "yourname@gmail.com", href: "mailto:yourname@gmail.com" },
  { icon: Phone, label: "+91 99999 99999", href: "tel:+919999999999" },
  { icon: FileText, label: "Download Resume", href: resumePdf.url },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative" style={{ background: "#0E0E0E", color: "var(--text-on-dark)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-20 py-20">
        <h2
          className="italic"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(28px, 4vw, 40px)",
            color: "var(--text-on-dark)",
            lineHeight: 1.2,
          }}
        >
          Thanks for scrolling this far. ✨
        </h2>
        <p className="mt-4 text-[16px] max-w-xl" style={{ color: "rgba(244,242,238,0.6)" }}>
          Seriously though — if you made it here, we're probably meant to work together. Drop me a line.
        </p>

        <div className="mt-10 flex flex-wrap gap-6">
          {LINKS.map((l) => {
            const Icon = l.icon;
            // TODO: Replace href values with your real contacts
            return (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") || l.href.endsWith(".pdf") ? "_blank" : undefined}
                rel="noreferrer"
                whileHover={{ y: -3 }}
                className="flex items-center gap-3 group"
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <Icon size={16} />
                </span>
                <span
                  className="text-[14px] transition-colors"
                  style={{ color: "rgba(244,242,238,0.85)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(244,242,238,0.85)")}
                >
                  {l.label}
                </span>
              </motion.a>
            );
          })}
        </div>

        <hr className="my-10" style={{ border: 0, borderTop: "1px solid rgba(255,255,255,0.08)" }} />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[13px]" style={{ color: "rgba(244,242,238,0.5)" }}>
          <span>© 2025 Your Name · Built with care (and too much coffee)</span>
          <span>Product Manager · Chennai</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 w-[60px] h-[80px] pointer-events-none">
        {["♥", "✦", "♥", "✦"].map((c, i) => (
          <span
            key={i}
            className="float-heart absolute"
            style={{
              color: "var(--accent)",
              fontSize: 16,
              left: (i * 14) % 40,
              bottom: 0,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            {c}
          </span>
        ))}
      </div>
    </footer>
  );
}
