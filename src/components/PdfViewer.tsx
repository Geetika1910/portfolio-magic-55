import { useEffect, useState } from "react";
import { X, ExternalLink } from "lucide-react";

export type OpenPdfDetail = { url: string; title?: string };

export function openPdf(detail: OpenPdfDetail) {
  window.dispatchEvent(new CustomEvent<OpenPdfDetail>("openPdf", { detail }));
}

export default function PdfViewer() {
  const [pdf, setPdf] = useState<OpenPdfDetail | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<OpenPdfDetail>;
      setPdf(ce.detail);
    };
    window.addEventListener("openPdf", handler);
    return () => window.removeEventListener("openPdf", handler);
  }, []);

  useEffect(() => {
    if (pdf) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [pdf]);

  if (!pdf) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={() => setPdf(null)}
    >
      <div
        className="flex items-center justify-between px-4 py-3 gap-3"
        style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-sm truncate">{pdf.title || "Project PDF"}</span>
        <div className="flex items-center gap-2">
          <a
            href={pdf.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-white/30 hover:bg-white/10 transition"
          >
            Open in new tab <ExternalLink size={12} />
          </a>
          <button
            onClick={() => setPdf(null)}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-white/30 hover:bg-white/10 transition"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      <iframe
        src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(new URL(pdf.url, window.location.origin).href)}`}
        title={pdf.title || "Project PDF"}
        className="flex-1 w-full bg-white"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
