import { Routes, Route, Link } from "react-router-dom";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { MusicPlayer } from "@/components/MusicPlayer";

import Index from "@/routes/index";
import About from "@/routes/about";
import Skills from "@/routes/skills";
import Journey from "@/routes/journey";
import Projects from "@/routes/projects";
import Contact from "@/routes/contact";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-heist px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-[10rem] leading-none text-heist-red text-glow-red">404</h1>
        <h2 className="mt-2 font-display text-3xl tracking-widest text-foreground">THE HEIST WENT WRONG</h2>
        <p className="mt-4 text-sm text-muted-foreground">This route is not part of the plan.</p>
        <div className="mt-8">
          <Link to="/" className="inline-flex items-center justify-center rounded-none bg-red-grad px-8 py-3 font-display tracking-[0.3em] text-primary-foreground glow-red hover:glow-red-strong transition">
            BACK TO BASE
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
