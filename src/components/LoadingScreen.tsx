import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(100, Math.round(((t - start) / duration) * 100));
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 300);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background"
        >
          <div className="absolute inset-0 animate-pulse-red opacity-40" style={{ background: "radial-gradient(circle at 50% 50%, rgba(229,9,20,0.25), transparent 60%)" }} />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center"
          >
            <h1 className="font-display text-6xl md:text-8xl tracking-widest text-foreground text-glow-red">
              BELLA <span className="text-heist-red">CIAO</span>
            </h1>
            <p className="mt-4 font-body text-sm tracking-[0.4em] text-muted-foreground uppercase">Loading the heist</p>
            <div className="mt-10 mx-auto w-64 h-[2px] bg-secondary overflow-hidden">
              <motion.div className="h-full bg-red-grad" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-4 font-display text-3xl text-heist-red tabular-nums">{progress}%</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}