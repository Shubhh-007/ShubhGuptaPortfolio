import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, X, Github } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import vault from "@/assets/vault.jpg";
import heistRoom from "@/assets/heist-room.jpg";
import blueprint from "@/assets/blueprint.jpg";
import mask from "@/assets/mask.jpg";
import berlin from "@/assets/berlin.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Nairobi — Projects | The Professor" },
      { name: "description", content: "Heists pulled off. A horizontal scroll through the catalog of crimes." },
      { property: "og:title", content: "Nairobi — Projects" },
      { property: "og:description", content: "Heists pulled off." },
    ],
  }),
  component: Projects,
});

const projects = [
  { 
    title: "AI Symptom Pro", tag: "GitHub Project", desc: "AI-based symptom analyzer repository.", img: heistRoom, link: "https://github.com/Shubhh-007/ai-symptom-pro",
    details: {
      problem: "Access to rapid, preliminary medical diagnostics is often delayed, causing anxiety and delaying critical care.",
      solution: "Developed an AI-driven platform that takes user symptoms as input and utilizes a trained model to map them to potential conditions, providing a fast preliminary assessment.",
      techStack: ["Python", "Machine Learning", "React", "FastAPI"]
    }
  },
  { 
    title: "Bus Tracking", tag: "GitHub Project", desc: "Bus tracking system repository.", img: blueprint, link: "https://github.com/Shubhh-007/bus-tracking",
    details: {
      problem: "Commuters face daily uncertainties regarding public transport schedules and real-time bus locations, leading to wasted time at transit stops.",
      solution: "Built a real-time GPS tracking application that broadcasts live bus coordinates to a web dashboard, allowing users to track buses dynamically on an interactive map.",
      techStack: ["JavaScript", "Node.js", "WebSockets", "Google Maps API"]
    }
  },
  { 
    title: "The Mastermind's Archive", tag: "Portfolio", desc: "This very portfolio. A cinematic experience.", img: vault, link: "https://github.com/Shubhh-007/the-mastermind-s-archive",
    details: {
      problem: "Standard web portfolios often lack personality and fail to leave a lasting, memorable impression on recruiters and peers.",
      solution: "Engineered a highly immersive, cinematic web experience themed around 'Money Heist'. Integrated complex scroll animations, dynamic routing, and glassmorphic UI.",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "TanStack Router"]
    }
  },
  { 
    title: "AI Quiz Master", tag: "Full Stack App", desc: "React and Django platform with secure user authentication, database models for scoring logic, and leaderboards.", img: mask, link: "https://github.com/Shubhh-007",
    details: {
      problem: "Educational platforms often rely on static question banks, making quizzes repetitive and easy to memorize.",
      solution: "Created a full-stack platform that dynamically generates questions. Implemented secure user auth, real-time scoring logic, and competitive global leaderboards.",
      techStack: ["React", "Django", "PostgreSQL", "Tailwind CSS"]
    }
  },
  { 
    title: "Food Donation App", tag: "Web Application", desc: "Django app connecting food donors with NGOs. Includes API and database schemas for tracking.", img: berlin, link: "https://github.com/Shubhh-007",
    details: {
      problem: "Massive amounts of surplus food from restaurants go to waste daily while local NGOs struggle to find reliable food sources for the needy.",
      solution: "Developed a location-based matching platform that connects food donors directly with nearby NGOs. Built database schemas for tracking donation lifecycles.",
      techStack: ["Django", "Python", "SQL", "HTML/CSS", "REST APIs"]
    }
  },
];

function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; }
  }, [selectedProject]);

  // Move horizontally: translate from 0 to -((n-1)/n * 100%) -> for 5 items it's -80%
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <PageTransition>
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <Reveal>
          <p className="font-display text-xs tracking-[0.5em] text-heist-red mb-3">▎ FILE 05 · OPERATIONS</p>
          <h1 className="font-display text-6xl md:text-9xl leading-[0.9] tracking-tight">HEISTS <span className="text-heist-red">PULLED</span><br/>OFF.</h1>
          <p className="mt-6 max-w-xl text-muted-foreground">Scroll vertically — the catalog moves horizontally. Each one was a precision job.</p>
        </Reveal>
      </section>

      {/* Horizontal scroll section: tall outer for scroll length, sticky inner for viewport */}
      <div ref={ref} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-6 pl-6">
            {projects.map((p, i) => (
              <article key={p.title} className="group relative shrink-0 w-[85vw] md:w-[60vw] lg:w-[50vw] h-[70vh] border border-border bg-card overflow-hidden hover-heist">
                <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500" style={{ background: "radial-gradient(circle at 70% 30%, rgba(229,9,20,0.4), transparent 60%)" }} />
                <div className="absolute top-6 left-6 right-6 flex justify-between font-display text-[10px] tracking-[0.4em] text-muted-foreground">
                  <span>HEIST 0{i + 1}</span>
                  <span className="text-heist-red">CLASSIFIED</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-[10rem] md:text-[14rem] leading-none text-foreground/10 select-none">0{i + 1}</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="font-display text-xs tracking-[0.4em] text-heist-red mb-2">{p.tag.toUpperCase()}</p>
                  <h3 className="font-display text-4xl md:text-6xl tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground max-w-md">{p.desc}</p>
                  <button onClick={() => setSelectedProject(p)} className="mt-5 inline-flex items-center gap-2 font-display text-xs tracking-[0.3em] text-foreground hover:text-heist-red transition">
                    VIEW OPERATION <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </article>
            ))}
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-8 left-6 right-6 h-[2px] bg-secondary">
            <motion.div style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }} className="h-full bg-red-grad" />
          </div>
          <div className="absolute bottom-12 right-6 font-display text-[10px] tracking-[0.4em] text-muted-foreground">
            SCROLL ↓
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-background/90 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-card border border-border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-border bg-black/40">
                <div>
                  <p className="font-display text-xs tracking-[0.4em] text-heist-red mb-1">{selectedProject.tag.toUpperCase()}</p>
                  <h2 className="font-display text-3xl tracking-tight">{selectedProject.title}</h2>
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-2 text-muted-foreground hover:text-heist-red transition">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-10 overflow-y-auto flex-1 custom-scrollbar">
                <img src={selectedProject.img} alt={selectedProject.title} className="w-full h-48 md:h-80 object-cover mb-10 border border-border opacity-80" />
                
                <div className="space-y-10">
                  <section>
                    <h3 className="font-display text-xl tracking-wider text-heist-red mb-3">▎ THE PROBLEM</h3>
                    <p className="text-lg leading-relaxed text-muted-foreground border-l border-heist-red/30 pl-4">
                      {selectedProject.details.problem}
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="font-display text-xl tracking-wider text-heist-red mb-3">▎ THE SOLUTION</h3>
                    <p className="text-lg leading-relaxed text-muted-foreground border-l border-heist-red/30 pl-4">
                      {selectedProject.details.solution}
                    </p>
                  </section>

                  <section>
                    <h3 className="font-display text-xl tracking-wider text-heist-red mb-4">▎ TECH STACK (ARSENAL)</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.details.techStack.map(tech => (
                        <span key={tech} className="px-4 py-2 text-sm font-display tracking-widest border border-border bg-card text-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-border bg-black/40 flex justify-end">
                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-red-grad px-6 py-3 font-display text-sm tracking-[0.3em] text-primary-foreground glow-red hover-heist transition">
                  <Github className="w-4 h-4" />
                  ACCESS REPOSITORY
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}