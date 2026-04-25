import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";

function NotFoundComponent() {
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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Professor — Mastermind Behind Code" },
      { name: "description", content: "A cinematic portfolio inspired by La Casa de Papel. Enter the heist." },
      { name: "author", content: "The Professor" },
      { property: "og:title", content: "The Professor — Mastermind Behind Code" },
      { property: "og:description", content: "A cinematic portfolio inspired by La Casa de Papel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="grain">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <Outlet />
    </>
  );
}
