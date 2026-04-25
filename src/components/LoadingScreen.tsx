import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import vault from "@/assets/vault.jpg";

const LINES = [
  "> INITIALIZING HEIST...",
  "> BYPASSING SECURITY...",
  "> ACCESS GRANTED",
  "> WELCOME, PROFESSOR",
];

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 3200;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(100, Math.round(((t - start) / duration) * 100));
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        setGlitch(true);
        setTimeout(() => setDone(true), 600);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (lineIdx >= LINES.length) return;
    const full = LINES[lineIdx];
    if (typed.length < full.length) {
      const id = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 35);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      if (lineIdx < LINES.length - 1) {
        setLineIdx(lineIdx + 1);
        setTyped("");
      }
    }, 500);
    return () => clearTimeout(id);
  }, [typed, lineIdx]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          <motion.div
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img src={vault} alt="" className="w-full h-full object-cover opacity-30" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          <div className="absolute inset-0 animate-pulse-red opacity-50" style={{ background: "radial-gradient(circle at 50% 50%, rgba(229,9,20,0.35), transparent 60%)" }} />
          {glitch && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1, 0] }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-heist-red mix-blend-difference"
            />
          )}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center px-6"
          >
            <motion.h1
              animate={glitch ? { x: [0, -4, 4, -2, 0], opacity: [1, 0.7, 1, 0.5, 1] } : {}}
              transition={{ duration: 0.4, repeat: glitch ? 2 : 0 }}
              className="font-display text-6xl md:text-8xl tracking-widest text-foreground text-glow-red"
            >
              BELLA <span className="text-heist-red">CIAO</span>
            </motion.h1>
            <div className="mt-8 h-6 font-display text-sm md:text-base tracking-[0.3em] text-heist-red">
              {typed}
              <span className="inline-block w-2 h-4 ml-1 bg-heist-red animate-pulse align-middle" />
            </div>
            <div className="mt-10 mx-auto w-64 h-[2px] bg-secondary overflow-hidden">
              <motion.div className="h-full bg-red-grad" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-4 font-display text-3xl text-heist-red tabular-nums">{String(progress).padStart(3, "0")}%</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}