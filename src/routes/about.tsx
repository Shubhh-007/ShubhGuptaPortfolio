import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { PageTransition } from "@/components/PageTransition";
import hallway from "@/assets/hallway.jpg";
import berlin from "@/assets/berlin.jpg";
import dali from "@/assets/dali-outline.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Berlin — File 02 | Classified Identity" },
      { name: "description", content: "Surveillance file 02. Subject: Berlin. The man behind the mask." },
      { property: "og:title", content: "FILE 02 — BERLIN" },
      { property: "og:description", content: "You don't see me. You see the system I built." },
    ],
  }),
  component: About,
});

/* ---------- typing effect ---------- */
function Typed({ text, delay = 0, speed = 22, className = "", onDone }: { text: string; delay?: number; speed?: number; className?: string; onDone?: () => void }) {
  const [shown, setShown] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(id);
  }, [started, text, speed, onDone]);
  return (
    <span className={className}>
      {shown}
      {started && shown.length < text.length && <span className="inline-block w-[0.5ch] h-[1em] -mb-[2px] bg-heist-red animate-pulse ml-[1px]" />}
    </span>
  );
}

/* ---------- log entry ---------- */
function LogEntry({ label, lines, delay }: { label: string; lines: string[]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="border-l border-heist-red/40 pl-6 py-2 relative">
      <div className="absolute -left-[5px] top-3 w-[9px] h-[9px] bg-heist-red rounded-full animate-pulse-red" />
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[10px] tracking-[0.4em] text-heist-red">▎ {label}</span>
        <span className="font-mono text-[10px] text-muted-foreground/60">// LOG_{String(delay).padStart(3,"0")}</span>
      </div>
      <div className="font-mono text-sm md:text-base leading-relaxed text-foreground/90 space-y-2">
        {lines.map((l, i) => (
          <div key={i}>
            {inView ? <Typed text={l} delay={delay + i * 600} speed={14} /> : <span className="opacity-0">{l}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- glitch heading ---------- */
function Glitch({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span aria-hidden className="absolute inset-0 text-heist-red opacity-70 mix-blend-screen animate-glitch" style={{ transform: "translate(2px,0)" }}>{children}</span>
      <span aria-hidden className="absolute inset-0 text-cyan-400 opacity-50 mix-blend-screen animate-glitch" style={{ transform: "translate(-2px,0)", animationDelay: "0.15s" }}>{children}</span>
    </span>
  );
}

function About() {
  const root = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end end"] });

  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.35]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [0.9, 0]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.4], ["0px", "8px"]);
  const darken = useTransform(scrollYProgress, [0, 1], [0.4, 0.92]);

  /* ---------- CHECKPOINT SYSTEM ----------
   * CP1 0.40 — mask trace appears (5%)
   * CP2 0.60 — mask faint (15%)
   * CP3 0.78 — mask half visible (45%)
   * CP4 0.86 — mask FULLY visible (100%) — locks in BEFORE final line
   * CP5 0.90 — final line reveal begins
   */
  const CHECKPOINTS = [0.4, 0.6, 0.78, 0.86];
  const maskOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 0.78, 0.86, 1],
    [0, 0.05, 0.15, 0.45, 1, 1]
  );
  const maskScale = useTransform(scrollYProgress, [0.4, 0.86], [1.5, 1]);
  const maskBlur = useTransform(scrollYProgress, [0.4, 0.86], [12, 0]);
  const maskFilter = useTransform(maskBlur, (v) => `blur(${v}px)`);
  const finalText = useTransform(scrollYProgress, [0.88, 0.96], [0, 1]);
  const finalY = useTransform(scrollYProgress, [0.88, 0.96], [40, 0]);

  // checkpoint flash trigger
  const [activeCP, setActiveCP] = useState(-1);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = CHECKPOINTS.reduce((acc, cp, i) => (v >= cp ? i : acc), -1);
      setActiveCP((prev) => (prev !== idx ? idx : prev));
    });
  }, [scrollYProgress]);

  // mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const px = useTransform(sx, (v) => v * 20);
  const py = useTransform(sy, (v) => v * 20);
  const pxR = useTransform(sx, (v) => v * -30);
  const pyR = useTransform(sy, (v) => v * -30);

  // cursor glow
  const [cursor, setCursor] = useState({ x: -200, y: -200, active: false });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    setCursor({ x: e.clientX, y: e.clientY, active: true });
  };

  // surveillance clock
  const [clock, setClock] = useState("");
  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      setClock(`${d.toISOString().slice(0,10)} ${d.toTimeString().slice(0,8)} UTC`);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // image hover glitch
  const [imgHover, setImgHover] = useState(false);

  return (
    <PageTransition>
      <div
        ref={root}
        onMouseMove={onMove}
        onMouseLeave={() => setCursor((c) => ({ ...c, active: false }))}
        className="relative bg-background"
        style={{ cursor: "none" }}
      >
        {/* cursor red glow */}
        <div
          className="pointer-events-none fixed z-[100] mix-blend-screen transition-opacity duration-300"
          style={{
            left: cursor.x - 120,
            top: cursor.y - 120,
            width: 240,
            height: 240,
            opacity: cursor.active ? 1 : 0,
            background: "radial-gradient(circle, rgba(229,9,20,0.35), transparent 60%)",
          }}
        />
        <div
          className="pointer-events-none fixed z-[101] w-2 h-2 rounded-full bg-heist-red transition-opacity"
          style={{ left: cursor.x - 4, top: cursor.y - 4, opacity: cursor.active ? 1 : 0, boxShadow: "0 0 12px #E50914" }}
        />

        {/* global film grain + scanlines */}
        <div className="pointer-events-none fixed inset-0 z-[60] opacity-[0.18] mix-blend-overlay grain-animated" />
        <div className="pointer-events-none fixed inset-0 z-[59] opacity-30" style={{ background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 1px, transparent 1px, transparent 3px)" }} />
        <motion.div className="pointer-events-none fixed inset-0 z-[58] bg-background" style={{ opacity: darken }} />

        {/* surveillance HUD */}
        <div className="pointer-events-none fixed top-20 left-4 right-4 z-[70] flex justify-between font-mono text-[10px] tracking-[0.3em] text-heist-red/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-heist-red animate-pulse-red" />
            REC ● CAM_07 / SUBJECT_001
          </div>
          <div className="hidden md:block">{clock}</div>
        </div>

        {/* ============ ACT 1 — HERO HALLWAY ============ */}
        <section className="relative h-[100vh] overflow-hidden flex items-end pb-20 md:pb-32">
          <motion.div className="absolute inset-0" style={{ scale: heroScale, opacity: heroOpacity, filter: useTransform(heroBlur, (v) => `blur(${v})`) }}>
            <motion.img
              src={hallway}
              alt="Surveillance footage of a silhouetted figure"
              width={1080}
              height={1920}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ x: px, y: py }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, #000 95%)" }} />
            {/* flicker */}
            <motion.div
              className="absolute inset-0 bg-heist-red/10"
              animate={{ opacity: [0, 0.25, 0, 0.1, 0, 0.4, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </motion.div>

          {/* corner brackets */}
          {(["top-6 left-6 border-t border-l","top-6 right-6 border-t border-r","bottom-6 left-6 border-b border-l","bottom-6 right-6 border-b border-r"]).map((c) => (
            <span key={c} className={`absolute ${c} w-10 h-10 border-heist-red/70`} />
          ))}

          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-mono text-xs tracking-[0.5em] text-heist-red mb-6"
            >
              <Glitch>▎ FILE 02 · BERLIN · CLASSIFIED</Glitch>
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl md:text-9xl leading-[0.85] tracking-tight"
            >
              THE <span className="text-heist-red text-glow-red">MAN</span>...
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 2.1, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl md:text-9xl leading-[0.85] tracking-tight mt-2"
            >
              BEHIND THE <Glitch className="text-heist-red text-glow-red">MASK.</Glitch>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 1 }}
              className="mt-10 flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] text-muted-foreground"
            >
              <span className="w-12 h-px bg-heist-red" />
              SCROLL TO DECRYPT
              <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>↓</motion.span>
            </motion.div>
          </div>
        </section>

        {/* ============ ACT 2 — DOSSIER ============ */}
        <section className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-5 gap-12">
          {/* sticky surveillance image */}
          <div className="md:col-span-2 md:sticky md:top-32 self-start">
            <motion.div
              onMouseEnter={() => setImgHover(true)}
              onMouseLeave={() => setImgHover(false)}
              style={{ x: pxR, y: pyR }}
              className="relative aspect-[3/4] overflow-hidden border border-heist-red/40"
            >
              {/* base */}
              <motion.img
                src={berlin}
                alt="Subject 001"
                width={1080}
                height={1440}
                loading="lazy"
                animate={{ scale: imgHover ? 1.08 : [1, 1.06, 1] }}
                transition={imgHover ? { duration: 0.6 } : { duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* RGB split layers on hover */}
              <motion.img
                src={berlin}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen pointer-events-none"
                style={{ filter: "url(#none)" }}
                animate={{
                  opacity: imgHover ? 0.6 : 0,
                  x: imgHover ? [0, 6, -4, 5, 0] : 0,
                  filter: ["hue-rotate(0deg) saturate(3)", "hue-rotate(20deg) saturate(4)", "hue-rotate(0deg)"],
                }}
                transition={{ duration: 0.4, repeat: imgHover ? Infinity : 0 }}
              />
              <motion.img
                src={berlin}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen pointer-events-none"
                animate={{
                  opacity: imgHover ? 0.4 : 0,
                  x: imgHover ? [0, -6, 4, -5, 0] : 0,
                  filter: ["hue-rotate(180deg) saturate(3)", "hue-rotate(200deg)", "hue-rotate(180deg)"],
                }}
                transition={{ duration: 0.4, repeat: imgHover ? Infinity : 0 }}
              />

              {/* dali mask overlay */}
              <motion.img
                src={dali}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-contain p-8 pointer-events-none mix-blend-screen invert"
                style={{ opacity: maskOpacity, scale: maskScale }}
              />

              {/* gradient + red wash */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 30%, rgba(229,9,20,0.25), transparent 70%)" }} />

              {/* scan line */}
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-heist-red to-transparent animate-scan" style={{ boxShadow: "0 0 16px #E50914" }} />

              {/* corner brackets */}
              {(["top-2 left-2 border-t border-l","top-2 right-2 border-t border-r","bottom-2 left-2 border-b border-l","bottom-2 right-2 border-b border-r"]).map((c) => (
                <span key={c} className={`absolute ${c} w-5 h-5 border-heist-red`} />
              ))}

              {/* hud */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between font-mono text-[9px] tracking-[0.3em] text-heist-red">
                <span>ID_001 · BERLIN</span>
                <span className="animate-pulse-red">● ACTIVE</span>
              </div>
              <div className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.3em] text-muted-foreground">
                ZOOM 1.00x
              </div>
            </motion.div>

            <div className="mt-4 font-mono text-[10px] tracking-[0.3em] text-muted-foreground/70 flex justify-between">
              <span>ENC: AES-256</span>
              <span>FRAME 00427</span>
            </div>
          </div>

          {/* logs */}
          <div className="md:col-span-3 space-y-12">
            <LogEntry
              label="SUBJECT STATEMENT"
              delay={0}
              lines={[
                "> In this heist, I play my role differently.",
                "> I don't break into vaults.",
                "> I build the systems that protect them.",
              ]}
            />
            <LogEntry
              label="BEHAVIOR ANALYSIS"
              delay={400}
              lines={[
                "> Treats every project as a precision operation.",
                "> Architecture, design, execution — calculated.",
                "> Obsesses over details that make products feel inevitable.",
                "> No improvisation. No noise. Only the plan.",
              ]}
            />
            <LogEntry
              label="PROFILE NOTES"
              delay={800}
              lines={[
                "> Renders pixel-perfect interfaces.",
                "> Wires resilient backends under pressure.",
                "> Reverse-engineers film scores after dark.",
                "> Considers Tuesday a weekend. Espresso required.",
              ]}
            />

            {/* metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-heist-red/30 border border-heist-red/30">
              {[
                { k: "5+", v: "YRS ACTIVE" },
                { k: "40+", v: "OPERATIONS" },
                { k: "12", v: "STACKS" },
                { k: "∞", v: "ESPRESSO" },
              ].map((s) => (
                <div key={s.v} className="bg-background p-5">
                  <p className="font-display text-4xl md:text-5xl text-heist-red text-glow-red">{s.k}</p>
                  <p className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground mt-2">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ ACT 3 — FINAL REVEAL ============ */}
        <section className="relative h-[120vh]">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            <motion.img
              src={dali}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-contain p-12 md:p-32 mix-blend-screen invert"
              style={{ opacity: maskOpacity, scale: maskScale }}
            />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 20%, #000 80%)" }} />
            <motion.div
              style={{ opacity: finalText, y: finalY }}
              className="relative z-10 text-center px-6 max-w-5xl"
            >
              <p className="font-mono text-[10px] tracking-[0.5em] text-heist-red mb-6">▎ FINAL TRANSMISSION</p>
              <h2 className="font-display text-4xl md:text-7xl leading-[0.95] tracking-tight">
                "You don't <Glitch className="text-heist-red text-glow-red">see</Glitch> me.
                <br />
                You see the <Glitch className="text-heist-red text-glow-red">system</Glitch>
                <br />
                I built."
              </h2>
              <p className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground/70 mt-10">— SUBJECT 001 · END OF FILE</p>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
