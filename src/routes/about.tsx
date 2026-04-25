import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import berlin from "@/assets/berlin.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Berlin — About | The Professor" },
      { name: "description", content: "The man behind the mask. About the mastermind behind the code." },
      { property: "og:title", content: "Berlin — About" },
      { property: "og:description", content: "The man behind the mask." },
    ],
  }),
  component: About,
});

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <PageTransition>
      <section ref={ref} className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
        <Reveal className="mb-16">
          <p className="font-display text-xs tracking-[0.5em] text-heist-red mb-3">▎ FILE 02 · BERLIN</p>
          <h1 className="font-display text-6xl md:text-9xl leading-[0.9] tracking-tight">THE <span className="text-heist-red">MAN</span><br/>BEHIND <br/>THE MASK.</h1>
        </Reveal>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3 md:sticky md:top-32">
            <motion.div style={{ y: imgY }} className="relative aspect-[3/4] overflow-hidden border border-border group">
              <img
                src={berlin}
                alt="The Professor in shadow"
                width={1280}
                height={1600}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 30%, rgba(229,9,20,0.2), transparent 65%)" }} />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between font-display text-xs tracking-[0.3em] text-muted-foreground">
                <span>SUBJECT 001</span>
                <span className="text-heist-red">ACTIVE</span>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-2 space-y-10">
            <Reveal>
              <p className="font-display text-2xl md:text-3xl leading-snug border-l-2 border-heist-red pl-6">
                "In this heist, I play my role differently. I don't break into vaults — I build the systems that protect them."
              </p>
            </Reveal>

            <Reveal delay={0.1} className="space-y-6 text-muted-foreground leading-relaxed">
              <p>I'm a developer who treats every project like a precision operation. Architecture, design, execution — every line of code is part of the plan.</p>
              <p>From rendering pixel-perfect interfaces to wiring resilient backends, I obsess over the details that make products feel inevitable.</p>
              <p>When I'm not at the keyboard, I'm reverse-engineering film scores, drinking espresso, and pretending Tuesday is a weekend.</p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                {[
                  { k: "5+", v: "Years coding" },
                  { k: "40+", v: "Projects shipped" },
                  { k: "12", v: "Stacks mastered" },
                  { k: "∞", v: "Cups of coffee" },
                ].map((s) => (
                  <div key={s.v}>
                    <p className="font-display text-5xl text-heist-red text-glow-red">{s.k}</p>
                    <p className="font-display text-xs tracking-[0.3em] text-muted-foreground mt-1">{s.v.toUpperCase()}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}