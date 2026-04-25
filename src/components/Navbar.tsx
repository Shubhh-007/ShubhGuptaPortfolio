import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Professor", sub: "Home" },
  { to: "/about", label: "Berlin", sub: "About" },
  { to: "/skills", label: "Denver", sub: "Skills" },
  { to: "/journey", label: "Tokyo", sub: "Journey" },
  { to: "/projects", label: "Nairobi", sub: "Projects" },
  { to: "/contact", label: "Helsinki", sub: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl bg-background/60 border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-2xl tracking-widest">
            LA <span className="text-heist-red">CASA</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group relative font-display text-sm tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: true }}
              >
                <span>{l.label}</span>
                <span className="block text-[10px] text-heist-red opacity-0 group-hover:opacity-100 transition tracking-wider">{l.sub}</span>
              </Link>
            ))}
          </nav>
          <button
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 text-foreground hover:text-heist-red transition"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-4">
              <span className="font-display text-2xl tracking-widest">LA <span className="text-heist-red">CASA</span></span>
              <button onClick={() => setOpen(false)} className="p-2 text-foreground"><X className="w-7 h-7" /></button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link to={l.to} className="font-display text-5xl tracking-widest hover:text-heist-red transition text-center block">
                    {l.label}
                    <span className="block text-xs text-muted-foreground tracking-[0.4em] mt-1">{l.sub}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}