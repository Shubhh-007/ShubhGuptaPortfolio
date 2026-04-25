import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import { ArrowRight, User, Code2, FolderGit2, Clock, type LucideIcon } from "lucide-react";
import berlin from "@/assets/berlin.jpg";
import vault from "@/assets/vault.jpg";
import heistRoom from "@/assets/heist-room.jpg";
import mask from "@/assets/mask.jpg";

type Role = {
  to: "/about" | "/skills" | "/projects" | "/journey";
  code: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  img: string;
  rotate: number;
};

const ROLES: Role[] = [
  { to: "/about", code: "BERLIN", title: "About", desc: "The man behind the mask. Composed, calculated.", icon: User, img: berlin, rotate: -6 },
  { to: "/skills", code: "DENVER", title: "Skills", desc: "Tools of the trade. Loud, fast, lethal.", icon: Code2, img: mask, rotate: 4 },
  { to: "/projects", code: "NAIROBI", title: "Projects", desc: "Operations executed. Vaults cracked.", icon: FolderGit2, img: vault, rotate: -3 },
  { to: "/journey", code: "TOKYO", title: "Journey", desc: "The story so far. Chaotic. Beautiful.", icon: Clock, img: heistRoom, rotate: 6 },
];

export function RolePanels({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 [perspective:1800px]">
      {ROLES.map((role, i) => (
        <Panel key={role.to} role={role} index={i} mouse={mouse} />
      ))}
    </div>
  );
}

function Panel({ role, index, mouse }: { role: Role; index: number; mouse: { x: number; y: number } }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sRx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sRy = useSpring(ry, { stiffness: 150, damping: 15 });
  const tRx = useTransform(sRx, (v) => `${v}deg`);
  const tRy = useTransform(sRy, (v) => `${v}deg`);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 18);
    rx.set(-py * 18);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    setHovered(false);
  };

  // mouse parallax drift across the whole grid
  const driftX = mouse.x * (index % 2 === 0 ? -14 : 14);
  const driftY = mouse.y * (index < 2 ? -10 : 10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotateZ: role.rotate * 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotateZ: role.rotate }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ x: driftX, y: driftY, transformStyle: "preserve-3d" }}
      className="relative"
    >
      <Link
        ref={ref}
        to={role.to}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        className="group relative block aspect-[3/4] overflow-hidden bg-card border border-border/60 transition-all duration-500 hover:border-heist-red"
        style={{
          transformStyle: "preserve-3d",
          // @ts-expect-error - motion values
          rotateX: tRx,
          rotateY: tRy,
        }}
      >
        {/* Layer 1: image */}
        <motion.img
          src={role.img}
          alt=""
          loading="lazy"
          animate={{ scale: hovered ? 1.18 : 1.05 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700"
        />

        {/* Layer 2: dark gradient + red wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(229,9,20,0.45), transparent 60%)" }}
        />

        {/* Scan line */}
        <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-heist-red to-transparent opacity-0 group-hover:opacity-80 animate-scan" style={{ boxShadow: "0 0 20px #E50914" }} />

        {/* Corner brackets */}
        <CornerBrackets />

        {/* Layer 3: content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-heist-red animate-pulse-red" />
              <span className="font-display text-[10px] tracking-[0.4em] text-muted-foreground">
                ROLE 0{index + 1}
              </span>
            </div>
            <role.icon className="w-5 h-5 text-heist-red transition-transform duration-500 group-hover:rotate-12" />
          </div>

          <div>
            <p className="font-display text-xs tracking-[0.5em] text-heist-red mb-2 transition-all duration-300 group-hover:tracking-[0.7em]">
              {role.code}
            </p>
            <h3 className="font-display text-4xl md:text-5xl tracking-tight leading-none mb-3 group-hover:text-glow-red transition">
              {role.title}
            </h3>
            <motion.p
              initial={false}
              animate={{ opacity: hovered ? 1 : 0.5, y: hovered ? 0 : 6 }}
              transition={{ duration: 0.4 }}
              className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4"
            >
              {role.desc}
            </motion.p>
            <div className="inline-flex items-center gap-2 text-[10px] font-display tracking-[0.4em] text-foreground group-hover:text-heist-red transition">
              <span className="w-6 h-px bg-current" />
              EXECUTE
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>

        {/* Hover glow */}
        <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: "0 0 80px -10px #E50914, inset 0 0 40px -10px rgba(229,9,20,0.4)" }}
        />
      </Link>
    </motion.div>
  );
}

function CornerBrackets() {
  const c = "absolute w-4 h-4 border-heist-red opacity-60 group-hover:opacity-100 transition";
  return (
    <>
      <span className={`${c} top-2 left-2 border-t border-l`} />
      <span className={`${c} top-2 right-2 border-t border-r`} />
      <span className={`${c} bottom-2 left-2 border-b border-l`} />
      <span className={`${c} bottom-2 right-2 border-b border-r`} />
    </>
  );
}