import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";

const seasons = [
  { season: "Season 1", year: "2019-2020", title: "Secondary School", desc: "Completed Class X from Saraswati Shishu Mandir Sr. Sec. School with 92%. Built foundational logic and discipline." },
  { season: "Season 2", year: "2021-2022", title: "Senior Secondary", desc: "Completed Class XII (PCM) from MG Inter College, Gorakhpur with 92%. Dived deeper into mathematics and sciences." },
  { season: "Season 3", year: "2023-2027", title: "B.Tech Computer Science", desc: "Pursuing B.Tech CSE at NIET, Greater Noida (8.0 CGPA). Mastered core concepts, DSA, and modern web frameworks." },
  { season: "Season 4", year: "Aug 2024", title: "Python Intern", desc: "Worked as a Python Intern at YBI Foundation. Developed scripts, optimized data-processing, and earned certification." },
  { season: "Season 5", year: "Present", title: "Production Ready", desc: "Building full-stack platforms like AI Quiz Master and Food Donation Apps. Looking for the next big score." },
];

export default function Journey() {
  return (
    <PageTransition>
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <Reveal className="mb-20">
          <p className="font-display text-xs tracking-[0.5em] text-heist-red mb-3">▎ FILE 04 · TIMELINE</p>
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