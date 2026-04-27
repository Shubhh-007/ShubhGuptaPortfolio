import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { RolePanels } from "@/components/RolePanels";
import { Particles } from "@/components/Particles";
import heistRoom from "@/assets/heist-room.jpg";
import blueprint from "@/assets/blueprint.jpg";
import vault from "@/assets/vault.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Professor — Mastermind Behind Code" },
      { name: "description", content: "Enter the heist. A cinematic portfolio of code, craft, and chaos." },
      { property: "og:title", content: "The Professor — Mastermind Behind Code" },
      { property: "og:description", content: "Enter the heist. A cinematic portfolio." },
    ],
  }),
  component: Index,
});

const NAME = "Shubh Gupta";
const TAGLINE = "Full Stack Web Developer";

const words = ["Hi,", "I'm", "Shubh", "Gupta."];

function Index() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  // Mouse parallax for blueprint section
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <PageTransition>
      {/* HERO */}
      <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center grain-animated">
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0"
        >
          <img src={heistRoom} alt="" className="w-full h-full object-cover opacity-40" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 opacity-60"
          aria-hidden
        >
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] rounded-full blur-[120px]" style={{ background: "radial-gradient(circle, rgba(229,9,20,0.35), transparent 70%)" }} />
        </motion.div>

        {/* Floating red shapes */}
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[8%] w-32 h-32 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(229,9,20,0.25)" }}
        />
        <motion.div
          animate={{ y: [0, 40, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[10%] w-48 h-48 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(229,9,20,0.2)" }}
        />

        {/* Vertical side text */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-display text-xs tracking-[0.5em] text-muted-foreground hidden md:block">
          CODENAME · SHUBH
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right font-display text-xs tracking-[0.5em] text-heist-red hidden md:block">
          LA RESISTENCIA
        </div>

        <motion.div style={{ y: textY }} className="relative z-10 text-center px-6 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-display text-xs md:text-sm tracking-[0.5em] text-heist-red mb-6"
          >
            ▎ THE HEIST BEGINS
          </motion.p>

          <h1 className="font-display text-6xl md:text-9xl leading-[0.9] tracking-tight text-foreground">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`inline-block mr-4 ${w === "Gupta." ? "text-heist-red text-glow-red" : ""}`}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="mt-8 font-body text-lg md:text-2xl text-muted-foreground tracking-wide"
          >
            {TAGLINE}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="mt-12 flex items-center justify-center gap-4 flex-wrap"
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-3 bg-red-grad px-8 py-4 font-display text-sm tracking-[0.3em] text-primary-foreground glow-red hover-heist"
            >
              ENTER THE HEIST
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 border border-border px-8 py-4 font-display text-sm tracking-[0.3em] text-foreground hover:border-heist-red hover:text-heist-red transition"
            >
              MEET SHUBH GUPTA
            </Link>
          </motion.div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-display text-[10px] tracking-[0.4em] text-muted-foreground">SCROLL</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-heist-red to-transparent">
            <ArrowDown className="w-3 h-3 text-heist-red animate-scroll-indicator -ml-[5px]" />
          </div>
        </motion.div>
      </section>

      {/* ROLE SELECTION — MISSION CONTROL */}
      <section className="relative overflow-hidden py-32 px-6 grain-animated">
        {/* Layer 1: blurred vault image */}
        <div className="absolute inset-0 -z-10">
          <img src={vault} alt="" className="w-full h-full object-cover opacity-25 blur-md scale-110" loading="lazy" />
        </div>
        {/* Layer 2: blueprint grid + dark wash */}
        <div className="absolute inset-0 -z-10 bg-blueprint-grid opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/85 to-background" />

        {/* Red corner light sources */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: "rgba(229,9,20,0.25)" }} />
        <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: "rgba(229,9,20,0.2)" }} />

        {/* Floating particles */}
        <Particles count={30} />

        {/* Vertical scanning line across whole section */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-heist-red/60 to-transparent animate-scan" style={{ animationDuration: "6s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Mission select header */}
          <Reveal className="mb-20 text-center">
            <div className="inline-flex items-center gap-3 mb-6 font-display text-[10px] tracking-[0.6em] text-heist-red">
              <span className="w-8 h-px bg-heist-red" />
              MISSION CONTROL · CLASSIFIED
              <span className="w-8 h-px bg-heist-red" />
            </div>
            <h2 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.04em] leading-[0.85]">
              <motion.span
                animate={{ opacity: [1, 0.85, 1, 0.95, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-block"
              >
                CHOOSE YOUR
              </motion.span>
              <br />
              <span className="relative inline-block">
                <span className="text-heist-red text-glow-red animate-glitch">ROLE</span>
                {/* glitch shadows */}
                <span aria-hidden className="absolute inset-0 text-heist-red opacity-40 animate-glitch" style={{ transform: "translate(2px, -1px)", mixBlendMode: "screen", animationDelay: "0.2s" }}>ROLE</span>
                <span aria-hidden className="absolute inset-0 text-cyan-400 opacity-30 mix-blend-screen" style={{ transform: "translate(-2px, 1px)" }}>ROLE</span>
              </span>
            </h2>
            <p className="mt-8 max-w-md mx-auto text-sm md:text-base text-muted-foreground tracking-wide">
              Every member of the crew has a part to play.
              <br />
              <span className="text-heist-red/80">Select your operative to begin.</span>
            </p>
          </Reveal>

          <RolePanels mouse={mouse} />

          {/* Footer telemetry strip */}
          <Reveal className="mt-20 flex items-center justify-between flex-wrap gap-4 font-display text-[10px] tracking-[0.4em] text-muted-foreground border-t border-border/40 pt-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-heist-red animate-pulse-red" />
              SIGNAL · ENCRYPTED
            </span>
            <span>04 OPERATIVES · STANDBY</span>
            <span className="text-heist-red">LIVE FEED</span>
          </Reveal>
        </div>
      </section>

      {/* QUOTE BANNER */}
      <section className="relative py-32 border-y border-border bg-card/30 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at center, rgba(229,9,20,0.25), transparent 60%)" }} />
        <Reveal className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="font-display text-3xl md:text-6xl leading-tight tracking-tight">
            "A plan without flaws is just a <span className="text-heist-red text-glow-red">dream</span>.
            Mine has flaws — that's why it works."
          </p>
          <p className="mt-8 font-display text-xs tracking-[0.5em] text-muted-foreground">— SHUBH GUPTA</p>
        </Reveal>
      </section>

      {/* INTERACTIVE BLUEPRINT */}
      <section className="relative h-[80vh] overflow-hidden border-b border-border">
        <motion.div
          style={{
            x: mouse.x * -30,
            y: mouse.y * -30,
            scale: 1.1,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute inset-0"
        >
          <img src={blueprint} alt="Vault blueprint" className="w-full h-full object-cover opacity-50" loading="lazy" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />

        <motion.div
          style={{ x: mouse.x * 20, y: mouse.y * 20 }}
          className="absolute top-[20%] left-[15%] w-3 h-3 rounded-full bg-heist-red glow-red"
        />
        <motion.div
          style={{ x: mouse.x * 35, y: mouse.y * 35 }}
          className="absolute top-[60%] right-[20%] w-3 h-3 rounded-full bg-heist-red glow-red"
        />
        <motion.div
          style={{ x: mouse.x * 15, y: mouse.y * 15 }}
          className="absolute bottom-[25%] left-[40%] w-3 h-3 rounded-full bg-heist-red glow-red"
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <Reveal>
            <p className="font-display text-xs tracking-[0.5em] text-heist-red mb-3">▎ THE PLAN · CLASSIFIED</p>
            <h2 className="font-display text-5xl md:text-8xl tracking-tight max-w-4xl">EVERY MOVE<br/><span className="text-heist-red">PLANNED.</span></h2>
            <p className="mt-6 max-w-md mx-auto text-muted-foreground">Move your cursor. The blueprint follows the operator.</p>
          </Reveal>
        </div>
      </section>

      <footer className="py-10 px-6 text-center text-xs font-display tracking-[0.3em] text-muted-foreground">
        © {new Date().getFullYear()} {NAME.toUpperCase()} · BELLA CIAO
      </footer>
    </PageTransition>
  );
}
