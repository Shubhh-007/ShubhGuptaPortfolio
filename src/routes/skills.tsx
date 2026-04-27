import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Code2, Server, Wrench, X, Zap, Cpu, Radio, Power } from "lucide-react";
import vault from "@/assets/vault.jpg";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Denver — Arsenal | The Professor" },
      { name: "description", content: "Heist preparation interface. The digital arsenal behind every operation." },
      { property: "og:title", content: "Denver — Arsenal" },
      { property: "og:description", content: "Heist preparation interface." },
    ],
  }),
  component: Skills,
});

type Skill = {
  name: string;
  level: number;
  category: string;
  desc: string;
  ops: string[];
};

const SKILLS: Skill[] = [
  { name: "React", level: 90, category: "FRONTEND", desc: "Component architectures and dynamic interfaces.", ops: ["AI Quiz Master"] },
  { name: "JavaScript", level: 95, category: "FRONTEND", desc: "Core frontend logic and interactivity.", ops: ["AI Quiz Master", "Food Donation App"] },
  { name: "HTML5 / CSS3", level: 90, category: "FRONTEND", desc: "Semantic markup and responsive styling.", ops: ["Food Donation App"] },
  { name: "Python", level: 92, category: "BACKEND", desc: "Data processing, backend logic, and scripts.", ops: ["AI Quiz Master", "YBI Foundation"] },
  { name: "Django", level: 85, category: "BACKEND", desc: "Robust backend API and database schemas.", ops: ["AI Quiz Master", "Food Donation App"] },
  { name: "SQL", level: 88, category: "BACKEND", desc: "Relational database querying and management.", ops: ["AI Quiz Master", "Food Donation App"] },
  { name: "C++", level: 80, category: "BACKEND", desc: "System-level logic and foundational programming.", ops: ["DSA"] },
  { name: "Git & GitHub", level: 90, category: "TOOLS", desc: "Version control and collaborative workflows.", ops: ["All Projects"] },
  { name: "NumPy", level: 85, category: "TOOLS", desc: "Scientific computing and array processing.", ops: ["Data Analysis"] },
  { name: "Basic DSA", level: 80, category: "TOOLS", desc: "Algorithms, logic-based problem solving.", ops: ["YBI Foundation"] },
];

const CATEGORY_ICON: Record<string, typeof Code2> = {
  FRONTEND: Code2,
  BACKEND: Server,
  TOOLS: Wrench,
};

function Skills() {
  const [armed, setArmed] = useState(false);
  const [active, setActive] = useState<Skill | null>(null);
  const [filter, setFilter] = useState<string>("ALL");

  const filtered = filter === "ALL" ? SKILLS : SKILLS.filter(s => s.category === filter);

  return (
    <PageTransition>
      <section className={`relative min-h-screen overflow-hidden ${armed ? "armed" : ""}`}>
        {/* Layered background */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url(${vault})`, filter: "blur(8px) brightness(0.35)" }}
          />
          <div className="absolute inset-0 bg-blueprint-grid opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
          {/* Vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.9) 100%)" }} />
          {/* Red light sources */}
          <div className={`absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl ${armed ? "opacity-50 animate-pulse-red" : "opacity-20"}`} style={{ background: "radial-gradient(circle, #E50914 0%, transparent 70%)" }} />
          <div className={`absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl ${armed ? "opacity-50 animate-pulse-red" : "opacity-15"}`} style={{ background: "radial-gradient(circle, #E50914 0%, transparent 70%)" }} />
          {/* Flickering light */}
          <div className="absolute inset-0 animate-glitch" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(229,9,20,0.03) 50%, transparent 100%)" }} />
        </div>
        <div className="grain-animated absolute inset-0 pointer-events-none" />

        <CursorGlow />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          {/* HUD Header */}
          <div className="flex items-start justify-between mb-12 gap-6 flex-wrap">
            <div>
              <p className="font-display text-xs tracking-[0.5em] text-heist-red mb-3 flex items-center gap-2">
                <Radio className="w-3 h-3 animate-pulse" /> ▎ FILE 03 · DENVER · ARSENAL
              </p>
              <h1 className="font-display text-5xl md:text-8xl leading-[0.9] tracking-tight relative">
                <GlitchText>TOOLS OF</GlitchText><br />
                <span>THE </span>
                <span className="text-heist-red text-glow-red animate-glitch inline-block">TRADE</span>
                <span>.</span>
              </h1>
              <p className="mt-6 max-w-xl text-muted-foreground text-sm md:text-base">
                <span className="text-heist-red font-display tracking-widest">[ STATUS: {armed ? "ARMED" : "STANDBY"} ]</span> — every heist needs the right gear. Hover to scan. Click to open the dossier.
              </p>
            </div>

            {/* Arm toggle */}
            <ArmToggle armed={armed} onToggle={() => setArmed(a => !a)} />
          </div>

          {/* Category filter */}
          <div className="flex gap-2 mb-10 flex-wrap">
            {["ALL", "FRONTEND", "BACKEND", "TOOLS"].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 font-display text-xs tracking-[0.3em] border transition-all ${
                  filter === cat
                    ? "border-heist-red bg-heist-red/10 text-heist-red glow-red"
                    : "border-border text-muted-foreground hover:border-heist-red hover:text-heist-red"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Arsenal grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((s, i) => (
                <SkillModule key={s.name} skill={s} index={i} armed={armed} onOpen={() => setActive(s)} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {active && <DetailPanel skill={active} onClose={() => setActive(null)} />}
        </AnimatePresence>
      </section>
    </PageTransition>
  );
}

function GlitchText({ children }: { children: string }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span aria-hidden className="absolute inset-0 text-heist-red opacity-70 mix-blend-screen" style={{ transform: "translate(2px,0)" }}>{children}</span>
      <span aria-hidden className="absolute inset-0 text-cyan-400 opacity-40 mix-blend-screen" style={{ transform: "translate(-2px,0)" }}>{children}</span>
    </span>
  );
}

function ArmToggle({ armed, onToggle }: { armed: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`group relative flex items-center gap-4 px-5 py-3 border-2 transition-all ${
        armed ? "border-heist-red bg-heist-red/15 glow-red-strong" : "border-border bg-card/50 hover:border-heist-red"
      }`}
    >
      <div className="flex flex-col items-start">
        <span className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">ARSENAL MODE</span>
        <span className={`font-display text-base tracking-[0.2em] ${armed ? "text-heist-red text-glow-red" : "text-foreground"}`}>
          {armed ? "// ACTIVATED" : "// STANDBY"}
        </span>
      </div>
      <div className={`relative w-14 h-7 rounded-full border-2 transition-all ${armed ? "border-heist-red bg-heist-red/30" : "border-border bg-secondary"}`}>
        <motion.div
          animate={{ x: armed ? 26 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`absolute top-[2px] w-5 h-5 rounded-full ${armed ? "bg-heist-red shadow-[0_0_15px_#E50914]" : "bg-muted-foreground"}`}
        />
      </div>
      <Power className={`w-5 h-5 ${armed ? "text-heist-red animate-pulse" : "text-muted-foreground"}`} />
    </button>
  );
}

function SkillModule({ skill, index, armed, onOpen }: { skill: Skill; index: number; armed: boolean; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);
  const Icon = CATEGORY_ICON[skill.category];

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); setHover(false); };

  return (
    <motion.button
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      onClick={onOpen}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1000 }}
      className="group relative text-left p-6 backdrop-blur-md bg-card/40 border border-border/60 will-change-transform overflow-hidden cursor-pointer"
    >
      {/* Floating idle (breathing) */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
        className="relative"
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 transition-all ${hover || armed ? "text-heist-red animate-pulse" : "text-muted-foreground"}`} />
            <span className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">{skill.category}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-heist-red animate-pulse" />
            <span className="font-mono text-[10px] text-heist-red">LIVE</span>
          </div>
        </div>

        <h3 className="font-display text-2xl tracking-wide mb-1 group-hover:tracking-[0.05em] transition-all">{skill.name}</h3>

        {/* Radar / Ring meter */}
        <div className="flex items-center gap-5 mt-5">
          <RingMeter level={skill.level} active={hover || armed} armed={armed} />
          <div className="flex-1">
            <TerminalLine level={skill.level} hover={hover} armed={armed} />
            <CountUp value={skill.level} active={hover} className="font-display text-3xl text-heist-red tabular-nums leading-none mt-2 block" />
          </div>
        </div>
      </motion.div>

      {/* Scan line on hover */}
      {(hover || armed) && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-0 right-0 h-[2px] animate-scan" style={{ background: "linear-gradient(90deg, transparent, #E50914, transparent)", boxShadow: "0 0 12px #E50914" }} />
        </div>
      )}

      {/* Glow border on hover */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity ${hover ? "opacity-100" : "opacity-0"}`}
        style={{ boxShadow: "inset 0 0 0 1px #E50914, 0 0 40px -5px #E50914" }} />

      {/* Corner ticks */}
      {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map(p => (
        <span key={p} className={`absolute w-3 h-3 ${p} border-heist-red ${
          p.includes("top") ? "border-t" : "border-b"
        } ${p.includes("left") ? "border-l" : "border-r"} opacity-60`} />
      ))}
    </motion.button>
  );
}

function RingMeter({ level, active, armed }: { level: number; active: boolean; armed: boolean }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c - (c * level) / 100;
  return (
    <div className="relative w-16 h-16 shrink-0">
      <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
        <circle cx="32" cy="32" r={r} stroke="currentColor" strokeWidth="2" fill="none" className="text-secondary" />
        <motion.circle
          cx="32" cy="32" r={r}
          stroke="#E50914" strokeWidth="2.5" fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: armed ? 0.6 : 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: "drop-shadow(0 0 6px #E50914)" }}
          strokeLinecap="round"
        />
        {/* Inner rotating tick */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: armed ? 2 : 6, repeat: Infinity, ease: "linear" }}
          style={{ originX: "32px", originY: "32px" }}
        >
          <line x1="32" y1="10" x2="32" y2="14" stroke="#E50914" strokeWidth="2" />
        </motion.g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Zap className={`w-4 h-4 text-heist-red ${active ? "animate-pulse" : ""}`} />
      </div>
    </div>
  );
}

function TerminalLine({ level, hover, armed }: { level: number; hover: boolean; armed: boolean }) {
  const blocks = 10;
  const filled = Math.round((level / 100) * blocks);
  const intense = hover || armed;
  return (
    <div className="font-mono text-[10px] tracking-wider text-muted-foreground flex items-center gap-1">
      <span className="text-heist-red">$</span>
      <span>scan</span>
      <span className="text-foreground/80 ml-1">[</span>
      <span className={intense ? "text-heist-red text-glow-red" : "text-heist-red"}>
        {"█".repeat(filled)}
      </span>
      <span className="text-muted-foreground/40">{"░".repeat(blocks - filled)}</span>
      <span className="text-foreground/80">]</span>
    </div>
  );
}

function CountUp({ value, active, className }: { value: number; active: boolean; className?: string }) {
  const [n, setN] = useState(value);
  useEffect(() => {
    if (!active) { setN(value); return; }
    let raf: number; const start = performance.now(); const dur = 600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(p * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setN(0); raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);
  return <span className={className}>{n}<span className="text-base text-muted-foreground">%</span></span>;
}

function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  useEffect(() => {
    const handler = (e: globalThis.MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);
  return (
    <motion.div
      className="pointer-events-none fixed z-30 w-[300px] h-[300px] rounded-full blur-3xl"
      style={{ x, y, translateX: "-50%", translateY: "-50%", background: "radial-gradient(circle, rgba(229,9,20,0.18) 0%, transparent 70%)" }}
    />
  );
}

function DetailPanel({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  const Icon = CATEGORY_ICON[skill.category];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/85 backdrop-blur-xl" />
      {/* Animated grid bg */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30" />
      <motion.div
        initial={{ scale: 0.85, opacity: 0, rotateX: -10 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-card/90 border-2 border-heist-red glow-red-strong p-8 md:p-12"
      >
        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-0 right-0 h-[2px] animate-scan" style={{ background: "linear-gradient(90deg, transparent, #E50914, transparent)" }} />
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-heist-red/20 transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Icon className="w-4 h-4 text-heist-red animate-pulse" />
          <span className="font-display text-[10px] tracking-[0.4em] text-heist-red">DOSSIER · {skill.category}</span>
        </div>

        <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-2">
          {skill.name.toUpperCase()}
        </h2>
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-[2px] bg-gradient-to-r from-heist-red to-transparent" />
          <span className="font-display text-2xl text-heist-red text-glow-red tabular-nums">{skill.level}%</span>
        </div>

        <p className="text-foreground/80 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">{skill.desc}</p>

        <div>
          <p className="font-display text-[10px] tracking-[0.4em] text-muted-foreground mb-3 flex items-center gap-2">
            <Cpu className="w-3 h-3" /> OPERATIONS DEPLOYED
          </p>
          <ul className="grid sm:grid-cols-2 gap-2">
            {skill.ops.map((op, i) => (
              <motion.li
                key={op}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="font-mono text-sm border border-border/60 px-3 py-2 bg-background/40 flex items-center gap-2"
              >
                <span className="text-heist-red">▎</span>{op}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Corner ticks */}
        {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map(p => (
          <span key={p} className={`absolute w-5 h-5 ${p} border-heist-red`} />
        ))}
      </motion.div>
    </motion.div>
  );
}