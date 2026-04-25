import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Nairobi — Projects | The Professor" },
      { name: "description", content: "Heists pulled off. A horizontal scroll through the catalog of crimes." },
      { property: "og:title", content: "Nairobi — Projects" },
      { property: "og:description", content: "Heists pulled off." },
    ],
  }),
  component: Projects,
});

const projects = [
  { title: "The Mint", tag: "Fintech Platform", desc: "Real-time trading dashboard with edge-rendered charts and sub-100ms updates.", color: "from-red-900 to-black" },
  { title: "Bella Ciao", tag: "Music Streaming", desc: "Cinematic streaming app with AI-curated playlists and offline-first architecture.", color: "from-rose-900 to-black" },
  { title: "Royal Mint", tag: "E-Commerce", desc: "Headless storefront pulling 500K monthly visitors with sub-second LCP.", color: "from-red-950 to-zinc-900" },
  { title: "The Vault", tag: "Password Manager", desc: "Zero-knowledge encrypted vault with biometric unlock across all devices.", color: "from-amber-900 to-black" },
  { title: "Operation Paris", tag: "Travel SaaS", desc: "AI itinerary builder used by 40K travelers. Optimized for chaos.", color: "from-red-800 to-zinc-950" },
  { title: "El Plan", tag: "Project OS", desc: "Internal tool that orchestrates teams, deadlines, and chaos. Mission control.", color: "from-stone-900 to-black" },
];

function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  // Move horizontally: translate from 0 to -((n-1)/n * 100%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.333%"]);

  return (
    <PageTransition>
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <Reveal>
          <p className="font-display text-xs tracking-[0.5em] text-heist-red mb-3">▎ FILE 05 · NAIROBI</p>
          <h1 className="font-display text-6xl md:text-9xl leading-[0.9] tracking-tight">HEISTS <span className="text-heist-red">PULLED</span><br/>OFF.</h1>
          <p className="mt-6 max-w-xl text-muted-foreground">Scroll vertically — the catalog moves horizontally. Each one was a precision job.</p>
        </Reveal>
      </section>

      {/* Horizontal scroll section: tall outer for scroll length, sticky inner for viewport */}
      <div ref={ref} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-6 pl-6">
            {projects.map((p, i) => (
              <article key={p.title} className="group relative shrink-0 w-[85vw] md:w-[60vw] lg:w-[50vw] h-[70vh] border border-border bg-card overflow-hidden hover-heist">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color}`} />
                <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 70% 30%, rgba(229,9,20,0.35), transparent 60%)" }} />
                <div className="absolute top-6 left-6 right-6 flex justify-between font-display text-[10px] tracking-[0.4em] text-muted-foreground">
                  <span>HEIST 0{i + 1}</span>
                  <span className="text-heist-red">CLASSIFIED</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-[10rem] md:text-[14rem] leading-none text-foreground/10 select-none">0{i + 1}</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="font-display text-xs tracking-[0.4em] text-heist-red mb-2">{p.tag.toUpperCase()}</p>
                  <h3 className="font-display text-4xl md:text-6xl tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground max-w-md">{p.desc}</p>
                  <button className="mt-5 inline-flex items-center gap-2 font-display text-xs tracking-[0.3em] text-foreground hover:text-heist-red transition">
                    VIEW HEIST <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </article>
            ))}
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-8 left-6 right-6 h-[2px] bg-secondary">
            <motion.div style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }} className="h-full bg-red-grad" />
          </div>
          <div className="absolute bottom-12 right-6 font-display text-[10px] tracking-[0.4em] text-muted-foreground">
            SCROLL ↓
          </div>
        </div>
      </div>
    </PageTransition>
  );
}