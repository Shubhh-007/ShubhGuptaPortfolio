import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import resumePdf from "@/assets/Shubh_Resume.pdf";

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
  const location = useLocation();

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
            LA CASA DE <span className="text-heist-red">PAPEL</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `group relative font-display text-sm tracking-[0.3em] uppercase transition ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                <span>{l.label}</span>
                <span className="block text-[10px] text-heist-red opacity-0 group-hover:opacity-100 transition tracking-wider">{l.sub}</span>
              </NavLink>
            ))}
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-6 flex items-center gap-2 border border-heist-red px-5 py-2.5 font-display text-xs tracking-[0.2em] text-heist-red hover:bg-heist-red hover:text-primary-foreground transition glow-red group"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-1 transition" />
              DOWNLOAD DOSSIER
            </a>
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
              <span className="font-display text-2xl tracking-widest">LA CASA DE <span className="text-heist-red">PAPEL</span></span>
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
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: links.length * 0.07 }}
              >
                <a
                  href={resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-3 bg-red-grad px-10 py-5 font-display text-lg tracking-[0.3em] text-primary-foreground glow-red"
                >
                  <Download className="w-6 h-6" />
                  DOWNLOAD DOSSIER
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

};