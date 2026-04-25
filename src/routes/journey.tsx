import { createFileRoute } from "@tanstack/react-router";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Tokyo — Journey | The Professor" },
      { name: "description", content: "The story so far. Seasons of the heist, episode by episode." },
      { property: "og:title", content: "Tokyo — Journey" },
      { property: "og:description", content: "The story so far." },
    ],
  }),
  component: Journey,
});

const seasons = [
  { season: "Season 1", year: "2019", title: "The Awakening", desc: "Wrote my first line of code. Fell in love with the puzzle. Built static sites that nobody asked for." },
  { season: "Season 2", year: "2020", title: "Joining The Crew", desc: "First freelance gig. Learned what 'production' actually means. Shipped, broke, fixed, shipped again." },
  { season: "Season 3", year: "2021", title: "The Big Score", desc: "Joined a startup. Built dashboards used by thousands. Discovered design systems were my obsession." },
  { season: "Season 4", year: "2023", title: "Going Solo", desc: "Launched independent products. Mastered full-stack architecture. Started teaching what I learned." },
  { season: "Season 5", year: "2025", title: "The Final Heist", desc: "Now crafting cinematic experiences and tooling that bends reality. The heist continues." },
];

function Journey() {
  return (
    <PageTransition>
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <Reveal className="mb-20">
          <p className="font-display text-xs tracking-[0.5em] text-heist-red mb-3">▎ FILE 04 · TOKYO</p>
          <h1 className="font-display text-6xl md:text-9xl leading-[0.9] tracking-tight">THE <span className="text-heist-red">STORY</span><br/>SO FAR.</h1>
        </Reveal>

        <div className="grid md:grid-cols-[200px_1fr] gap-12">
          <aside className="md:sticky md:top-32 self-start">
            <p className="font-display text-xs tracking-[0.4em] text-heist-red mb-2">▎ NARRATOR</p>
            <p className="font-display text-3xl tracking-tight leading-tight">The Story<br/>So Far</p>
            <p className="mt-4 text-xs text-muted-foreground">5 seasons. One heist. No regrets.</p>
          </aside>

          <div className="relative pl-8 md:pl-12 border-l-2 border-border">
            {seasons.map((s, i) => (
              <Reveal key={s.season} delay={i * 0.05} className="relative pb-16 last:pb-0">
                <div className="absolute -left-[42px] md:-left-[56px] top-2 w-4 h-4 rounded-full bg-heist-red glow-red" />
                <div className="absolute -left-[35px] md:-left-[49px] top-3 w-2 h-2 rounded-full bg-background" />
                <p className="font-display text-xs tracking-[0.4em] text-heist-red">{s.season.toUpperCase()} · {s.year}</p>
                <h3 className="mt-2 font-display text-4xl md:text-5xl tracking-tight">{s.title}</h3>
                <p className="mt-4 text-muted-foreground max-w-xl leading-relaxed">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}