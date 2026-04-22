import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Building2, LineChart, Zap, Target, ShieldCheck, Star } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BLOG_POSTS } from "@/data/blog";
import { REVIEWS } from "@/data/reviews";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Asset IQ — Intelligent Assets, Smarter Futures" },
      { name: "description", content: "AI-powered consulting for enterprise assets and personal financial growth." },
      { property: "og:title", content: "AI Asset IQ — Intelligent Assets, Smarter Futures" },
      { property: "og:description", content: "AI-powered consulting for enterprise assets and personal financial growth." },
    ],
  }),
  component: HomePage,
});

const whyCards = [
  { icon: Zap, title: "Speed", text: "Move from concept to measurable AI value in weeks, not quarters." },
  { icon: Target, title: "Precision", text: "Models and plans tailored to your industry, your data, your goals." },
  { icon: ShieldCheck, title: "Trusted Expertise", text: "Senior consultants with deep operational and financial experience." },
];

function HomePage() {
  const latestPosts = BLOG_POSTS.slice(0, 3);
  const featuredReviews = REVIEWS.slice(0, 4);

  return (
    <SiteShell>
      <PageHero
        eyebrow="AI Consulting"
        title={<>Intelligent Assets.<br /><span className="text-accent">Smarter Futures.</span></>}
        subtitle="AI-powered consulting for enterprise assets and personal financial growth."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="hero" size="xl" asChild>
            <Link to="/enterprise">Enterprise Solutions <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
          <Button variant="outlineAccent" size="xl" asChild>
            <Link to="/financial">Financial Planning</Link>
          </Button>
        </div>
      </PageHero>

      {/* Two CTA cards */}
      <section className="mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { to: "/enterprise" as const, icon: Building2, title: "Enterprise Solutions", text: "AI strategy and asset intelligence for renewable energy, oil & gas, and utilities.", accent: "bg-gradient-accent" },
            { to: "/financial" as const, icon: LineChart, title: "Financial Planning", text: "Personalized AI-driven plans, debt relief, insurance, and wealth protection.", accent: "bg-gradient-gold" },
          ].map((c) => (
            <Link key={c.to} to={c.to}>
              <Card className="group relative h-full overflow-hidden border-border/60 p-8 transition-smooth hover:border-accent hover:shadow-glow">
                <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg ${c.accent}`}>
                  <c.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-semibold">{c.title}</h3>
                <p className="mt-3 text-muted-foreground">{c.text}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-accent">
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Who we are */}
      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">Who We Are</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A new kind of consulting firm.</h2>
        <p className="mt-6 text-lg text-muted-foreground">
          AI Asset IQ pairs senior industry operators with applied AI engineers to help mid-market
          enterprises and individuals make better decisions about the assets that matter most.
          We build pragmatic strategies, ship working systems, and stand behind the outcomes.
        </p>
      </section>

      {/* Why */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Why AI Asset IQ</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {whyCards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-border/60 p-8">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{c.title}</h3>
                  <p className="mt-2 text-muted-foreground">{c.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest blog */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">From the Blog</h2>
            <p className="mt-2 text-muted-foreground">Insights on AI, energy, and modern financial planning.</p>
          </div>
          <Link to="/blog" className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex">
            All posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {latestPosts.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }}>
              <Card className="group h-full overflow-hidden border-border/60 transition-smooth hover:border-accent hover:shadow-glow">
                {/* [PLACEHOLDER] featured image */}
                <div className="aspect-[16/10] bg-gradient-navy" />
                <div className="p-6">
                  <span className="text-xs font-medium uppercase tracking-wider text-accent">{p.category}</span>
                  <h3 className="mt-2 line-clamp-2 text-lg font-semibold group-hover:text-accent">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <p className="mt-4 text-xs text-muted-foreground">{p.date} · {p.readTime}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews preview */}
      <section className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">What Our Clients Say</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredReviews.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full border-border/60 p-6">
                  <div className="flex gap-0.5 text-gold">
                    {Array.from({ length: r.rating }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-3 line-clamp-5 text-sm">"{r.text}"</p>
                  <div className="mt-4 border-t border-border/60 pt-3 text-xs">
                    <p className="font-semibold text-muted-foreground">{r.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outlineAccent" asChild>
              <Link to="/reviews">Read all reviews</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
