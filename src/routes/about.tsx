import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, Compass, Lightbulb, HandshakeIcon, Trophy } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/card";
import keithPhoto from "@/assets/keith-mascarenhas.jpg";
import diyaPhoto from "@/assets/diya-shivlani.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AI Asset IQ" },
      { name: "description", content: "Senior consultants pairing deep industry experience with applied AI engineering." },
      { property: "og:title", content: "About AI Asset IQ" },
      { property: "og:description", content: "Senior consultants pairing deep industry experience with applied AI engineering." },
    ],
  }),
  component: AboutPage,
});

const team = [
  {
    name: "Keith Mascarenhas",
    title: "Co-Founder",
    bio: "Co-founder of AI Asset IQ, helping organizations and families make smarter decisions across enterprise and financial assets.",
    linkedin: "https://www.linkedin.com/in/keith-mascarenhas-03a53434",
    photo: keithPhoto,
  },
  {
    name: "Diya Shivlani",
    title: "Co-Founder",
    bio: "Co-founder of AI Asset IQ, partnering with Keith to build trusted AI-powered consulting for enterprise and financial growth.",
    linkedin: "https://www.linkedin.com/in/diyashivlani",
    photo: diyaPhoto,
  },
  {
    name: "[PLACEHOLDER] Partner",
    title: "Partner",
    bio: "[PLACEHOLDER] Partner profile details to be added.",
    linkedin: "#",
  },
];

const values = [
  { icon: Compass, title: "Outcome over hype", text: "We chase measurable wins, not buzzwords." },
  { icon: Lightbulb, title: "Pragmatic innovation", text: "The simplest model that works is the right model." },
  { icon: HandshakeIcon, title: "Long-term partnership", text: "Built to be your partner for years, not a quarter." },
  { icon: Trophy, title: "Excellence", text: "Senior teams. No juniors learning on your dime." },
];

function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About"
        title="Built by operators. Sharpened by AI."
        subtitle="We started AI Asset IQ because the firms doing serious AI work were ignoring the operators who needed it most."
      />

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Our Story</h2>
        <p className="mt-4 text-muted-foreground">
          AI Asset IQ was founded on a simple premise: world-class AI consulting shouldn't be reserved
          for hyperscalers and Fortune 50 balance sheets. Mid-market industrial operators and individual
          households deserve the same caliber of thinking — applied with the pragmatism of people who've
          actually run plants, managed grids, and built financial plans for real families.
        </p>

        <h3 className="mt-12 text-xl font-bold">Mission</h3>
        <p className="mt-3 text-muted-foreground">
          To make intelligent decision-making about every asset — physical, financial, and operational —
          accessible, measurable, and trusted.
        </p>
      </section>

      <section className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Our Values</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card key={v.title} className="border-border/60 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <v.icon className="h-5 w-5" />
                </div>
                <h4 className="font-semibold">{v.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Team</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {team.map((m) => (
            <Card key={m.name} className="border-border/60 p-6 text-center">
              {m.photo ? (
                <img src={m.photo} alt={`${m.name}, ${m.title} at AI Asset IQ`} className="mx-auto h-28 w-28 rounded-full object-cover" />
              ) : (
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-accent text-xs font-medium text-primary-foreground">
                  [PLACEHOLDER]
                </div>
              )}
              <h4 className="mt-4 font-semibold">{m.name}</h4>
              <p className="text-sm text-muted-foreground">{m.title}</p>
              <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
              <a href={m.linkedin} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center justify-center rounded-md border border-border p-2 text-muted-foreground transition-smooth hover:border-accent hover:text-accent" aria-label={`${m.name} LinkedIn profile`}>
                <Linkedin className="h-4 w-4" />
              </a>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Partners & Affiliations
          </p>
          {/* [PLACEHOLDER] partner logos */}
          <div className="mt-8 grid grid-cols-2 gap-6 opacity-60 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex h-16 items-center justify-center rounded-md border border-dashed border-border text-xs text-muted-foreground">
                Partner Logo
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
