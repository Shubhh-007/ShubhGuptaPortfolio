import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { Code2, Server, Wrench } from "lucide-react";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Denver — Skills | The Professor" },
      { name: "description", content: "Tools of the trade: frontend, backend, and the toolbox that makes the heist possible." },
      { property: "og:title", content: "Denver — Skills" },
      { property: "og:description", content: "Tools of the trade." },
    ],
  }),
  component: Skills,
});

const groups = [
  {
    label: "Frontend", icon: Code2, items: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind / CSS", level: 90 },
      { name: "Framer Motion", level: 85 },
    ],
  },
  {
    label: "Backend", icon: Server, items: [
      { name: "Node.js", level: 90 },
      { name: "PostgreSQL", level: 82 },
      { name: "REST / GraphQL", level: 88 },
      { name: "Edge Functions", level: 80 },
    ],
  },
  {
    label: "Tools", icon: Wrench, items: [
      { name: "Git / GitHub", level: 95 },
      { name: "Figma", level: 80 },
      { name: "Docker", level: 75 },
      { name: "Vite / Webpack", level: 88 },
    ],
  },
];

function Skills() {
  return (
    <PageTransition>
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <Reveal className="mb-20">
          <p className="font-display text-xs tracking-[0.5em] text-heist-red mb-3">▎ FILE 03 · DENVER</p>
          <h1 className="font-display text-6xl md:text-9xl leading-[0.9] tracking-tight">TOOLS OF<br/>THE <span className="text-heist-red">TRADE</span>.</h1>
          <p className="mt-8 max-w-xl text-muted-foreground">Every heist needs the right gear. These are the weapons in the arsenal.</p>
        </Reveal>

        <div className="space-y-20">
          {groups.map((g, gi) => (
            <div key={g.label}>
              <Reveal className="flex items-center gap-4 mb-8">
                <g.icon className="w-7 h-7 text-heist-red" />
                <h2 className="font-display text-3xl md:text-4xl tracking-tight">{g.label.toUpperCase()}</h2>
                <div className="flex-1 h-px bg-border" />
                <span className="font-display text-xs tracking-[0.3em] text-muted-foreground">0{gi + 1}</span>
              </Reveal>
              <div className="grid md:grid-cols-2 gap-5">
                {g.items.map((s, i) => (
                  <Reveal key={s.name} delay={i * 0.06}>
                    <TiltCard name={s.name} level={s.level} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}

function TiltCard({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(800px) rotateY(0) rotateX(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group p-6 bg-card border border-border hover-heist transition-transform duration-200 will-change-transform"
    >
      <div className="flex justify-between items-baseline mb-4">
        <h3 className="font-display text-xl tracking-wide">{name}</h3>
        <span className="font-display text-sm text-heist-red tabular-nums">{level}%</span>
      </div>
      <div className="h-[3px] bg-secondary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="h-full bg-red-grad"
          style={{ boxShadow: "0 0 12px rgba(229,9,20,0.6)" }}
        />
      </div>
    </div>
  );
}