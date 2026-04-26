import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Mail, MapPin, Github, Phone, Linkedin, Loader2 } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import emailjs from '@emailjs/browser';

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Helsinki — Contact | Shubh Gupta" },
      { name: "description", content: "Join the heist. Get in touch with the Professor." },
      { property: "og:title", content: "Helsinki — Contact" },
      { property: "og:description", content: "Join the heist." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      setError("All fields are required for transmission.");
      setIsSubmitting(false);
      return;
    }

    try {
      // STEPS TO CONNECT YOUR EMAILJS:
      // 1. Create a free account at https://www.emailjs.com/
      // 2. Add an Email Service (e.g. Gmail) and get your SERVICE_ID
      // 3. Create an Email Template and get your TEMPLATE_ID
      // 4. Get your PUBLIC_KEY from the Account settings
      // 5. Replace the 3 strings below with your real keys!
      await emailjs.send(
        'service_o1zzu5p', 
        'template_rz1m9sr', 
        {
          from_name: name,
          from_email: email,
          message: message,
          to_name: 'Shubh Gupta',
          reply_to: email,
        },
        '12Mi4frN5uVyugn7s' 
      );
      setSent(true);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError("Transmission failed. The network might be compromised. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="absolute top-1/3 right-0 w-[40vw] h-[40vw] rounded-full blur-[140px] opacity-40 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(229,9,20,0.5), transparent 70%)" }} />

        <div className="relative grid md:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal>
              <p className="font-display text-xs tracking-[0.5em] text-heist-red mb-3">▎ FILE 06 · INITIATE</p>
              <h1 className="font-display text-6xl md:text-9xl leading-[0.9] tracking-tight">JOIN THE<br/><span className="text-heist-red text-glow-red">HEIST</span>.</h1>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">Got a plan? A project? An impossible idea? Drop a message and let's build something production-ready together.</p>
            </Reveal>

            <Reveal delay={0.2} className="mt-12 space-y-5">
              {[
                { icon: Mail, label: "Email", val: "shubhgupta1707@gmail.com", href: "mailto:shubhgupta1707@gmail.com" },
                { icon: Phone, label: "Phone", val: "+91-75719-21707", href: "tel:+917571921707" },
                { icon: MapPin, label: "Base", val: "Greater Noida, UP" },
                { icon: Linkedin, label: "Network", val: "LinkedIn Profile", href: "https://www.linkedin.com/in/shubhgupta1707" },
                { icon: Github, label: "Code", val: "github.com/Shubhh-007", href: "https://github.com/Shubhh-007" },
              ].map((c) => {
                const inner = (
                  <>
                    <div className="w-12 h-12 flex shrink-0 items-center justify-center border border-border bg-card group-hover:border-heist-red group-hover:glow-red transition">
                      <c.icon className="w-5 h-5 text-heist-red" />
                    </div>
                    <div>
                      <p className="font-display text-[10px] tracking-[0.4em] text-muted-foreground">{c.label.toUpperCase()}</p>
                      <p className="font-body text-foreground group-hover:text-heist-red transition">{c.val}</p>
                    </div>
                  </>
                );

                return c.href ? (
                  <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-4 group">
                    {inner}
                  </a>
                ) : (
                  <div key={c.label} className="flex items-center gap-4 group">
                    {inner}
                  </div>
                );
              })}
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="relative p-8 md:p-10 backdrop-blur-xl bg-card/40 border border-border space-y-6"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
            >
              <div className="absolute -top-3 left-8 px-3 bg-background font-display text-xs tracking-[0.4em] text-heist-red">▎ TRANSMISSION</div>

              {sent ? (
                <div className="py-12 text-center">
                  <p className="font-display text-3xl text-heist-red text-glow-red">MESSAGE RECEIVED</p>
                  <p className="mt-3 text-muted-foreground">Shubh is reviewing the plan. Stay close to the radio.</p>
                </div>
              ) : (
                <>
                  <Field label="Codename" name="name" placeholder="Your name" disabled={isSubmitting} />
                  <Field label="Channel" name="email" type="email" placeholder="you@email.com" disabled={isSubmitting} />
                  <div>
                    <label className="font-display text-[10px] tracking-[0.4em] text-muted-foreground">MESSAGE</label>
                    <textarea
                      name="message"
                      required rows={5}
                      placeholder="Outline the heist..."
                      disabled={isSubmitting}
                      className="mt-2 w-full bg-input/50 border border-border px-4 py-3 text-foreground font-body focus:outline-none focus:border-heist-red focus:glow-red transition resize-none disabled:opacity-50"
                    />
                  </div>
                  
                  {error && <p className="text-heist-red text-sm font-body">{error}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full inline-flex items-center justify-center gap-3 bg-red-grad px-8 py-4 font-display text-sm tracking-[0.3em] text-primary-foreground glow-red hover:glow-red-strong transition disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        ENCRYPTING...
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        SEND TRANSMISSION
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition" />
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="font-display text-[10px] tracking-[0.4em] text-muted-foreground">{label.toUpperCase()}</label>
      <input
        id={name} name={name} type={type} required placeholder={placeholder}
        className="mt-2 w-full bg-input/50 border border-border px-4 py-3 text-foreground font-body focus:outline-none focus:border-heist-red focus:glow-red transition"
      />
    </div>
  );
}