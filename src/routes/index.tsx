import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SkillsMarquee from "@/components/SkillsMarquee";
import Work from "@/components/Work";
import About from "@/components/About";
import Beyond from "@/components/Beyond";
import Footer from "@/components/Footer";
import FlyingCards from "@/components/FlyingCards";
import CustomCursor from "@/components/CustomCursor";
import PdfViewer from "@/components/PdfViewer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your Name — Product Manager Portfolio" },
      { name: "description", content: "Product Manager portfolio — case studies, approach, and side projects." },
      { property: "og:title", content: "Your Name — Product Manager" },
      { property: "og:description", content: "I turn messy problems into clean products." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Header />
      <Hero />
      <SkillsMarquee />
      <Work />
      <About />
      <Beyond />
      <Footer />
      <FlyingCards />
      <CustomCursor />
    </main>
  );
}
